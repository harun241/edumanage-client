import React, { useState } from "react";
import { MessageCircle } from "lucide-react";

const StudentSuggestion = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    studyHours: "",
    sleep: "",
    weakSubjects: [],
    practice: "",
    submission: "",
    score: "",
  });

  const [suggestions, setSuggestions] = useState([]);

  const handleSubjectChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setData({ ...data, weakSubjects: selected });
  };

  const generateSuggestions = () => {
    const { studyHours, sleep, weakSubjects, practice, submission, score } = data;
    const s = [];

    if (studyHours < 2) s.push("Study hours খুব কম। প্রতিদিন অন্তত 2-3 ঘণ্টা পড়া উচিত।");
    else if (studyHours <= 4) s.push("Study hours ভালো, কিন্তু consistency বাড়ানো দরকার।");
    else s.push("Study hours যথেষ্ট, এখন efficiency বাড়াও।");

    if (sleep < 6) s.push("ঘুম কম। অন্তত 7 ঘণ্টা ঘুমানোর চেষ্টা কর।");
    else if (sleep > 9) s.push("ঘুম বেশি হয়ে যাচ্ছে—Time management improve কর।");
    else s.push("ঘুম ঠিক আছে!");

    if (weakSubjects.length > 0) {
      weakSubjects.forEach((sub) => {
        s.push(`${sub} সাবজেক্টে দুর্বলতা আছে। সপ্তাহে 3–4 ঘণ্টা পড়ো।`);
      });
    } else s.push("কোনো subject এ দুর্বলতা নেই। Maintain কর।");

    if (practice < 2) s.push("Practice খুব কম। সপ্তাহে অন্তত 3 দিন practice কর।");
    else if (practice <= 4) s.push("Practice ভালো—speed & accuracy বাড়ানো যায়।");
    else s.push("Excellent! Practice routine strong.");

    if (submission === "late") s.push("Assignment সময়মতো জমা দাও। Time management improve করো।");
    else s.push("Assignment submission discipline অসাধারণ!");

    if (score < 40) s.push("Score কম—ছোট goals set করে revise কর।");
    else if (score < 70) s.push("Score ভালো—আরও improve করার সুযোগ আছে।");
    else s.push("Great score! আরও sharpen কর।");

    setSuggestions(s);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateSuggestions();
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-sky-500 to-blue-700 text-white shadow-xl hover:shadow-blue-400/50 transition-all duration-300"
      >
        <MessageCircle size={26} />
      </button>

      {/* Floating Panel */}
      {open && (
        <div className="fixed bottom-20 right-6 w-96 max-h-[60vh] bg-white shadow-2xl rounded-3xl border border-gray-200 p-6 overflow-y-auto animate-fadeIn z-40">
          
          <h1 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Student Improvement AI
          </h1>

          <form onSubmit={handleSubmit} className="grid gap-5">

            <div className="grid gap-1">
              <label className="text-gray-700 font-semibold">Daily Study Hours</label>
              <input
                type="number"
                className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-400 transition"
                value={data.studyHours}
                onChange={(e) => setData({ ...data, studyHours: Number(e.target.value) })}
              />
            </div>

            <div className="grid gap-1">
              <label className="text-gray-700 font-semibold">Daily Sleep (Hours)</label>
              <input
                type="number"
                className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-400 transition"
                value={data.sleep}
                onChange={(e) => setData({ ...data, sleep: Number(e.target.value) })}
              />
            </div>

            <div className="grid gap-1">
              <label className="text-gray-700 font-semibold">Weak Subjects</label>
              <select
                multiple
                className="p-3 rounded-xl border h-24 focus:ring-2 focus:ring-blue-400 transition"
                onChange={handleSubjectChange}
              >
                {["Math", "Physics", "English", "Programming", "Digital Logic", "Data Structure"].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <small className="text-xs text-gray-500">Use CTRL to select multiple</small>
            </div>

            <div className="grid gap-1">
              <label className="text-gray-700 font-semibold">Weekly Practice</label>
              <input
                type="number"
                className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-400 transition"
                value={data.practice}
                onChange={(e) => setData({ ...data, practice: Number(e.target.value) })}
              />
            </div>

            <div className="grid gap-1">
              <label className="text-gray-700 font-semibold">Assignment Submission</label>
              <select
                className="p-3 rounded-xl border focus:ring-2 focus:ring-blue-400"
                value={data.submission}
                onChange={(e) => setData({ ...data, submission: e.target.value })}
              >
                <option value="">Select</option>
                <option value="ontime">On Time</option>
                <option value="late">Late</option>
              </select>
            </div>

            <div className="grid gap-1">
              <label className="text-gray-700 font-semibold">Recent Score</label>
              <input
                type="number"
                className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-400"
                value={data.score}
                onChange={(e) => setData({ ...data, score: Number(e.target.value) })}
              />
            </div>

            <button
              className="mt-2 px-6 py-3 text-lg font-semibold rounded-xl 
              bg-gradient-to-r from-sky-500 to-blue-700 text-white shadow-lg 
              hover:shadow-blue-400/50 transition-all duration-300"
            >
              Generate Suggestions
            </button>
          </form>

          {suggestions.length > 0 && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-2xl">
              <h2 className="text-lg font-bold text-blue-700 mb-3">Improvements</h2>
              <ul className="space-y-2">
                {suggestions.map((text, i) => (
                  <li key={i} className="p-3 bg-white rounded-xl shadow border hover:bg-gray-50">
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default StudentSuggestion;
