import React from "react";
import { useParams } from "react-router-dom";

const blogs = [
  {
    id: "blog1",
    title: "5 Study Hacks to Improve Learning Efficiency",
    date: "Aug 15, 2025",
    image: "https://i.ibb.co/qMN9TqKB/image.png",
    content: `
      <h3>1. Active Recall</h3>
      <p>Test yourself rather than just re-reading notes...</p>
      <h3>2. Spaced Repetition</h3>
      <p>Review material over increasing intervals...</p>
    `,
  },
  {
    id: "blog2",
    title: "The Future of Online Education",
    date: "Aug 12, 2025",
    image: "https://i.ibb.co/sp4t1X2M/image.png",
    content: `<p>Full blog content for The Future of Online Education...</p>`,
  },
  {
    id: "blog3",
    title: "Top 10 Free Resources for Students",
    date: "Aug 10, 2025",
    image: "https://i.ibb.co/qMN9TqKB/image.png",
    content: `<p>Full blog content for Top 10 Free Resources...</p>`,
  },
];

export default function BlogDetails() {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === id);

  if (!blog) return <p>Blog not found</p>; // selected blog na thakle fallback

  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{blog.title}</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">{blog.date}</p>
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full max-h-96 object-cover rounded-xl mb-6"
        />
        <div
          className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-6"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </section>
  );
}
