import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const pieData = [
  { name: "Math", value: 12 },
  { name: "Physics", value: 8 },
  { name: "Chemistry", value: 15 },
  { name: "Biology", value: 10 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

const DashboardOverview = () => {
  return (
    <div className="space-y-10 p-6 bg-gray-100 ">
      <h3 className="text-2xl font-bold text-center mb-6">Enrollment Distribution</h3>

      <div className="bg-white rounded-xl shadow p-6 max-w-3xl mx-auto">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#3b82f6"
              label
              animationDuration={1500}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardOverview;
