// Dummy data for the charitable trust

export interface Member {
  id: string;
  name: string;
  address: string;
  aadharNumber: string;
  photo: string;
  occupation: string;
  mobileNo: string;
  gender: 'Male' | 'Female' | 'Other';
  joinDate: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  images: string[];
  category: 'past' | 'future';
  beneficiaries?: number;
}

export interface CarouselItem {
  id: string;
  title: string;
  description: string;
  image: string;
  link?: string;
}

export const dummyMembers: Member[] = [
  {
    id: '1',
    name: 'Rajesh Kumar Das',
    address: 'Brindabanchak, Paschimpara, Hooghly',
    aadharNumber: '1234-5678-9012',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    occupation: 'Teacher',
    mobileNo: '+91-9876543210',
    gender: 'Male',
    joinDate: '2023-01-15'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    address: 'Brindabanchak, Paschimpara, Hooghly',
    aadharNumber: '2345-6789-0123',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=150&h=150&fit=crop&crop=face',
    occupation: 'Social Worker',
    mobileNo: '+91-9876543211',
    gender: 'Female',
    joinDate: '2023-02-20'
  },
  {
    id: '3',
    name: 'Amit Ghosh',
    address: 'Brindabanchak, Paschimpara, Hooghly',
    aadharNumber: '3456-7890-1234',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    occupation: 'Farmer',
    mobileNo: '+91-9876543212',
    gender: 'Male',
    joinDate: '2023-03-10'
  }
];

export const dummyEvents: Event[] = [
  {
    id: '1',
    title: 'Winter Blanket Distribution',
    description: 'Distributed warm blankets to elderly people and homeless individuals during winter season.',
    date: '2024-01-15',
    venue: 'Brindabanchak Community Center',
    images: [
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop'
    ],
    category: 'past',
    beneficiaries: 200
  },
  {
    id: '2',
    title: 'Durga Puja Cultural Festival',
    description: 'Annual Durga Puja celebration with cultural programs and community feast.',
    date: '2024-10-10',
    venue: 'Brindabanchak Puja Pandal',
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=600&fit=crop'
    ],
    category: 'past',
    beneficiaries: 1000
  },
  {
    id: '3',
    title: 'Health Check-up Camp',
    description: 'Free health screening and medical consultation for rural communities.',
    date: '2024-12-20',
    venue: 'Paschimpara Health Center',
    images: [
      'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=600&fit=crop'
    ],
    category: 'future',
    beneficiaries: 300
  },
  {
    id: '4',
    title: 'Women Empowerment Workshop',
    description: 'Skills development and entrepreneurship training for women in rural areas.',
    date: '2025-01-25',
    venue: 'Community Hall, Brindabanchak',
    images: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=600&fit=crop'
    ],
    category: 'future',
    beneficiaries: 150
  }
];

export const carouselItems: CarouselItem[] = [
  {
    id: '1',
    title: 'Serving with Durga Maa\'s Blessings',
    description: 'Our trust works tirelessly to serve the community with the divine strength of Durga Maa',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=600&fit=crop'
  },
  {
    id: '2',
    title: 'Women Empowerment Initiative',
    description: 'Empowering women through skill development and entrepreneurship programs',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&h=600&fit=crop'
  },
  {
    id: '3',
    title: 'Community Health & Wellness',
    description: 'Providing healthcare services and wellness programs for rural communities',
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1200&h=600&fit=crop'
  },
  {
    id: '4',
    title: 'Environmental Conservation',
    description: 'Protecting our environment for future generations through tree plantation and awareness',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop'
  }
];

export const serviceAreas = [
  {
    id: 1,
    title: 'Women Empowerment',
    description: 'Empowering women through education, skills training, and economic opportunities',
    icon: '👩‍💼'
  },
  {
    id: 2,
    title: 'Art & Culture',
    description: 'Preserving and promoting traditional Bengali art, music, and cultural heritage',
    icon: '🎭'
  },
  {
    id: 3,
    title: 'No Hunger',
    description: 'Providing nutritious meals and food security for underprivileged communities',
    icon: '🍽️'
  },
  {
    id: 4,
    title: 'Health Support',
    description: 'Offering healthcare services, medical camps, and health awareness programs',
    icon: '🏥'
  },
  {
    id: 5,
    title: 'Flood Relief',
    description: 'Emergency response and rehabilitation during natural disasters',
    icon: '🌊'
  },
  {
    id: 6,
    title: 'Youth Awareness',
    description: 'Educational programs and career guidance for young people',
    icon: '🎓'
  },
  {
    id: 7,
    title: 'Environment Protection',
    description: 'Environmental conservation and sustainable development initiatives',
    icon: '🌱'
  },
  {
    id: 8,
    title: 'Train Farmers',
    description: 'Agricultural training and modern farming techniques for rural farmers',
    icon: '🚜'
  },
  {
    id: 9,
    title: 'Help Old Age People',
    description: 'Care and support services for elderly community members',
    icon: '👴'
  },
  {
    id: 10,
    title: 'Child Development',
    description: 'Education, nutrition, and development programs for children',
    icon: '👶'
  }
];