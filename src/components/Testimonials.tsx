import React from "react";
import { Card, CardContent } from "./ui/card";

const testimonials = [
  {
    name: "John Doe",
    message: "This organization has changed my life for the better. Truly grateful for their support!",
  },
  {
    name: "Jane Smith",
    message: "An amazing team doing incredible work for the community. Highly recommend supporting them!",
  },
  {
    name: "Rahul Verma",
    message: "Their dedication  towards helping people is truly inspiring. Keep up the great work!",
  },
];

const Testimonials = () => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Testimonials</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="shadow-lg border border-gray-200">
            <CardContent className="p-6">
              <p className="italic mb-4">"{testimonial.message}"</p>
              <p className="font-semibold text-right">- {testimonial.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
