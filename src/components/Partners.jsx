import React from "react";

const partners = [
  {
    name: "EduTech",
    logo: "https://i.ibb.co/1tnFJtDN/istockphoto-2160439329-2048x2048.jpg",
    description: "Providing learning technologies and online tools.",
  },
  {
    name: "SkillUp",
    logo: "https://i.ibb.co/mrM39XM4/businesswoman-posing-23-2148142829.jpg",
    description: "Partnered to offer upskilling programs for students.",
  },
  {
    name: "LearnHub",
    logo: "https://i.ibb.co/GQ2wW1FP/brunette-business-woman-with-wavy-long-hair-blue-eyes-stands-holding-notebook-hands-197531-343.jpg",
    description: "Collaborated on course design and expert lectures.",
  },
];

const Partners = () => {
  return (
    <div className="my-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-8">Our Partners</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {partners.map((partner, index) => (
          <div
            key={index}
            className="bg-white p-6 shadow rounded-lg flex flex-col items-center text-center"
          >
            <img src={partner.logo} alt={partner.name} className="h-20 mb-4" />
            <h4 className="text-xl font-semibold mb-2">{partner.name}</h4>
            <p className="text-gray-600">{partner.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
