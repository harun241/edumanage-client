import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I apply for admission?",
    answer:
      "You can apply directly through our online admission form. After submission, our team will contact you for verification.",
  },
  {
    question: "What payment methods are available?",
    answer:
      "We support bKash, Nagad, Rocket, Credit/Debit cards, and direct bank transfers.",
  },
  {
    question: "Do I get a certificate after completing a course?",
    answer:
      "Yes, you will receive a verified digital certificate after successfully completing the course.",
  },
  {
    question: "Can I access the courses on mobile?",
    answer:
      "Absolutely! All courses are mobile-friendly and accessible on any device.",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-xl bg-white shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex items-center justify-between w-full px-6 py-4 text-left font-medium text-gray-800"
              >
                {faq.question}
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
