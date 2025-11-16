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
    <section className="my-16 px-6 py-12">
      <h2 className="text-4xl font-extrabold text-center mb-14 text-gray-900 dark:text-white tracking-wide">
        🤝 Our Trusted Partners
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {partners.map((partner, index) => (
          <div
            key={index}
            className="
              group
              backdrop-blur-xl
              border border-gray-200/50 dark:border-gray-700/50
              rounded-3xl p-8
              text-center shadow-lg
              transition-all duration-500
              hover:-translate-y-3 
              hover:shadow-2xl
            "
          >
            {/* Logo with gradient ring */}
            <div className="relative w-28 h-28 mx-auto mb-5">
              <div className="
                absolute inset-0
                bg-gradient-to-tr from-blue-400 via-green-400 to-pink-500
                p-[3px] rounded-full
                transition-all duration-500
                group-hover:scale-110
                group-hover:shadow-xl
              ">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Name */}
            <h4 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              {partner.name}
            </h4>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {partner.description}
            </p>

            {/* Badge */}
            <span className="
              inline-block mt-4 px-4 py-1 text-xs
              text-blue-700 dark:text-blue-300
              font-semibold rounded-full
            ">
              Verified Partner
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Partners;
