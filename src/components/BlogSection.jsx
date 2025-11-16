import React, { useRef } from "react";

const blogs = [
  {
    id: "blog1",
    title: "5 Study Hacks to Improve Learning Efficiency",
    date: "Aug 15, 2025",
    image: "https://i.ibb.co/qMN9TqKB/image.png",
    content: `
      <h3>1. Active Recall</h3>
      <p>Test yourself on what you've learned rather than just re-reading notes. This strengthens memory retention.</p>
      <h3>2. Spaced Repetition</h3>
      <p>Review material over increasing intervals to improve long-term retention.</p>
      <h3>3. Pomodoro Technique</h3>
      <p>Study in focused 25-minute intervals with 5-minute breaks to stay fresh and productive.</p>
      <h3>4. Mind Mapping</h3>
      <p>Visualize connections between concepts using diagrams and mind maps.</p>
      <h3>5. Teach What You Learn</h3>
      <p>Explain topics to others; teaching reinforces understanding and highlights gaps.</p>
      <p>Example: Summarize your notes and teach a friend or even yourself aloud.</p>
    `,
  },
  {
    id: "blog2",
    title: "The Future of Online Education",
    date: "Aug 12, 2025",
    image: "https://i.ibb.co/sp4t1X2M/image.png",
    content: `
      <h3>Overview</h3>
      <p>Online education is revolutionizing access to knowledge worldwide. Students can learn anytime, anywhere.</p>
      <h3>Trends Shaping Online Education</h3>
      <ul>
        <li>AI-driven personalized learning</li>
        <li>Virtual and augmented reality classrooms</li>
        <li>Microlearning and short courses</li>
        <li>Global access to top instructors</li>
      </ul>
      <h3>Challenges</h3>
      <p>Connectivity issues, motivation, and lack of hands-on experience can be barriers.</p>
      <p>Insight: Platforms like Coursera and Udemy are creating opportunities for lifelong learning globally.</p>
    `,
  },
  {
    id: "blog3",
    title: "Top 10 Free Resources for Students",
    date: "Aug 10, 2025",
    image: "https://i.ibb.co/qMN9TqKB/image.png",
    content: `
      <h3>1. Khan Academy</h3>
      <p>Free courses on Math, Science, Economics, and more.</p>
      <h3>2. Coursera Free Courses</h3>
      <p>Access many free courses from top universities (audit mode).</p>
      <h3>3. edX Free Courses</h3>
      <p>University-level courses on diverse topics for free.</p>
      <h3>4. Quizlet</h3>
      <p>Flashcards and study tools for memorization.</p>
      <h3>5. Duolingo</h3>
      <p>Learn languages for free with gamified lessons.</p>
      <h3>6. Google Scholar</h3>
      <p>Search for research papers and academic articles.</p>
      <h3>7. OpenStax</h3>
      <p>Free textbooks for college-level subjects.</p>
      <h3>8. Codecademy Free</h3>
      <p>Learn programming basics for free.</p>
      <h3>9. MIT OpenCourseWare</h3>
      <p>Access MIT's course materials online.</p>
      <h3>10. Project Gutenberg</h3>
      <p>Free access to over 60,000 ebooks including classics.</p>
    `,
  },
];

export default function BlogDetailsSection() {
  const blogRefs = useRef([]);

  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-900 dark:text-white tracking-wide">
          📝 Articles & Resources
        </h2>

        {/* Blog Details Section Only */}
        <div className="space-y-20">
          {blogs.map((blog, index) => (
            <div
              key={blog.id}
              ref={(el) => (blogRefs.current[index] = el)}
              className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg scroll-mt-20"
            >
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{blog.title}</h2>
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
          ))}
        </div>
      </div>
    </section>
  );
}
