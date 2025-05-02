// src/component/UserActivityChart.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

// Sample data – replace with actual API or props
const data = [
  { name: "Mon", users: 400 },
  { name: "Tue", users: 300 },
  { name: "Wed", users: 500 },
  { name: "Thu", users: 200 },
  { name: "Fri", users: 700 },
  { name: "Sat", users: 600 },
  { name: "Sun", users: 800 }
];

const UserActivityChart = () => {
  return (
    <div className="w-full h-72 bg-white rounded-xl shadow p-4">
      <h2 className="text-xl font-semibold mb-4">User Activity (Last 7 Days)</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserActivityChart;
