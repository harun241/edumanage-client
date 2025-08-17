import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sample data
const sampleStats = [
  { category: "Courses Completed", count: 8 },
  { category: "Enrolled Classes", count: 12 },
  { category: "Pending Classes", count: 3 },
  { category: "Certificates Earned", count: 5 },
];

const Chart = ({ data = sampleStats }) => {
  return (
    <div className="h-64 space-y-10 bg-gray-100  rounded-xl shadow p-4">
      <h3 className="text-lg font-semibold mb-4">Dashboard Overview</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
