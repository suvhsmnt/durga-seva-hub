import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Plus, Edit, Trash2, Save } from "lucide-react";
import { Member } from "@/data/dummyData";
import { useToast } from "@/hooks/use-toast";
import { fetchMembers, addMember, updateMember, deleteMember } from "@/lib/api";

const MEMBER_PLACEHOLDER_PHOTO = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d";

const MemberManagement = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMember, setNewMember] = useState<Partial<Member> & { imageFile?: File }>({
    name: "",
    address: "",
    aadharNumber: "",
    photo: undefined,
    occupation: "",
    mobileNo: "",
    gender: "Male",
    joinDate: new Date().toISOString().split('T')[0],
    imageFile: undefined
  });
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const data = await fetchMembers();
        setMembers(data);
      } catch (error) {
        toast({
          title: "Error",
          description: (error as Error).message || "Failed to fetch members.",
          variant: "destructive"
        });
      }
      
    };
    loadMembers();
    setLoading(false)
    // Cleanup preview URLs on unmount
    return () => {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
    };
    
  }, [photoPreview]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Revoke previous preview URL
    if (photoPreview) URL.revokeObjectURL(photoPreview);

    setNewMember({ ...newMember, imageFile: file });
    const previewUrl = URL.createObjectURL(file);
    setPhotoPreview(previewUrl);
  };

  const resetForm = () => {
    setNewMember({
      name: "",
      address: "",
      aadharNumber: "",
      photo: undefined,
      occupation: "",
      mobileNo: "",
      gender: "Male",
      joinDate: new Date().toISOString().split('T')[0],
      imageFile: undefined
    });
    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
      setPhotoPreview(null);
    }
  };

  const addNewMember = async () => {
    setLoading(true)
    if (newMember.name && newMember.address && newMember.mobileNo) {
      try {
        const member = await addMember(newMember as Omit<Member, 'id'> & { imageFile?: File });
        setMembers([...members, member]);
        resetForm();
        toast({
          title: "Member Added",
          description: "New member has been successfully added to the trust."
        });
      } catch (error) {
        toast({
          title: "Error",
          description: (error as Error).message || "Failed to add member.",
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields (Name, Address, Mobile Number).",
        variant: "destructive"
      });
    }
    setLoading(false)
  };

  const startEditing = (member: Member) => {
    setEditingMember(member);
    setNewMember({ ...member, imageFile: undefined });
    setPhotoPreview(member.photo || null);
  };

  const saveEdit = async () => {
    setLoading(true)
    if (editingMember && newMember.name && newMember.address && newMember.mobileNo) {
      try {
        const updatedMember = await updateMember(editingMember.id, newMember);
        setMembers(members.map(m => m.id === editingMember.id ? updatedMember : m));
        setEditingMember(null);
        resetForm();
        toast({
          title: "Member Updated",
          description: "Member details have been updated."
        });
      } catch (error) {
        toast({
          title: "Error",
          description: (error as Error).message || "Failed to update member.",
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields (Name, Address, Mobile Number).",
        variant: "destructive"
      });
    }
    setLoading(false)
  };

  const cancelEdit = () => {
    setEditingMember(null);
    resetForm();
  };

  const removeMember = async (id: string) => {
    setLoading(true)
    try {
      await deleteMember(id);
      setMembers(members.filter(member => member.id !== id));
      toast({
        title: "Member Removed",
        description: "Member has been removed from the trust."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message || "Failed to remove member.",
        variant: "destructive"
      });
    }
    setLoading(false)
  };

  return (
    <div className="space-y-6">
         {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>{editingMember ? "Edit Member" : "Add New Member"}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              placeholder="Full name"
            />
          </div>
          <div>
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input
              id="mobile"
              value={newMember.mobileNo}
              onChange={(e) => setNewMember({ ...newMember, mobileNo: e.target.value })}
              placeholder="+91-XXXXXXXXXX"
            />
          </div>
          <div>
            <Label htmlFor="aadhar">Aadhar Number</Label>
            <Input
              id="aadhar"
              value={newMember.aadharNumber}
              onChange={(e) => setNewMember({ ...newMember, aadharNumber: e.target.value })}
              placeholder="XXXX-XXXX-XXXX"
            />
          </div>
          <div>
            <Label htmlFor="occupation">Occupation</Label>
            <Input
              id="occupation"
              value={newMember.occupation}
              onChange={(e) => setNewMember({ ...newMember, occupation: e.target.value })}
              placeholder="Occupation"
            />
          </div>
          <div>
            <Label htmlFor="gender">Gender</Label>
            <Select 
              value={newMember.gender} 
              onValueChange={(value) => setNewMember({ ...newMember, gender: value as "Male" | "Female" | "Other" })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="photo">Upload Photo</Label>
            <Input
              id="photo"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {photoPreview && (
              <img
                src={photoPreview}
                alt="Preview"
                style={{ width: "100px", marginTop: "10px" }}
              />
            )}
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={newMember.address}
              onChange={(e) => setNewMember({ ...newMember, address: e.target.value })}
              placeholder="Full address"
            />
          </div>
          <div className="md:col-span-2 flex space-x-2">
            <Button 
              onClick={editingMember ? saveEdit : addNewMember} 
              className="w-full" 
              variant="divine"
            >
              <Save className="w-4 h-4 mr-2" />
              {editingMember ? "Save Changes" : "Add Member"}
            </Button>
            {editingMember && (
              <Button 
                onClick={cancelEdit} 
                className="w-full" 
                variant="outline"
              >
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Current Members ({members.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {members.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-4">
                  <img 
                    src={member.photo || MEMBER_PLACEHOLDER_PHOTO} 
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-foreground">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.occupation} • {member.mobileNo}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => startEditing(member)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => removeMember(member.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberManagement;