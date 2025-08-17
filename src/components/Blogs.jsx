import React from "react";

const blogs = [
  {
    title: "5 Study Hacks to Improve Learning Efficiency",
    desc: "Discover smart techniques to boost memory, focus, and productivity in your studies.",
    image: "https://i.ibb.co.com/qMN9TqKB/image.png",
    date: "Aug 15, 2025",
  },
  {
    title: "The Future of Online Education",
    desc: "How e-learning platforms are transforming the way we learn and teach globally.",
    image: "https://i.ibb.co.com/sp4t1X2M/image.png",
    date: "Aug 12, 2025",
  },
  {
    title: "Top 10 Free Resources for Students",
    desc: "Explore the best free websites, tools, and apps to support your academic journey.",
    image: "https://i.ibb.co.com/qMN9TqKB/image.png",
    date: "Aug 10, 2025",
  },
];

export default function BlogSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          Latest Articles & Resources
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl shadow hover:shadow-lg transition flex flex-col overflow-hidden"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-sm text-gray-500 mb-2">{blog.date}</p>
                <h3 className="text-xl font-semibold mb-3">{blog.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{blog.desc}</p>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
