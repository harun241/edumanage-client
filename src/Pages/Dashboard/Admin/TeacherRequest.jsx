import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FaCheck, FaTimes } from "react-icons/fa";

const TeacherRequest = () => {
  const queryClient = useQueryClient();

  // Fetch teacher requests
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["teacherRequests"],
    queryFn: async () => {
      const res = await axios.get("https://edumanage-server-rho.vercel.app/api/users/teacher-requests", {
        headers: {
          "x-user-email": "admin@example.com",
          "x-user-role": "admin",
        },
      });
      return res.data;
    },
  });

  // Approve Mutation
  const approveMutation = useMutation({
    mutationFn: async (email) => {
      return await axios.patch(`https://edumanage-server-rho.vercel.app/api/users/approve-teacher/${email}`, {}, {
        headers: {
          "x-user-email": "admin@example.com",
          "x-user-role": "admin",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["teacherRequests"]);
    },
    onError: () => {
      alert("❌ Approval failed");
    },
  });

  // Deny Mutation
  const denyMutation = useMutation({
    mutationFn: async (email) => {
      return await axios.patch(`https://edumanage-server-rho.vercel.app/api/users/deny-teacher/${email}`, {}, {
        headers: {
          "x-user-email": "admin@example.com",
          "x-user-role": "admin",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["teacherRequests"]);
    },
    onError: () => {
      alert("❌ Deny failed");
    },
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  if (requests.length === 0)
    return <div className="text-center py-10 text-gray-500">No pending teacher requests.</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6">Pending Teacher Requests</h1>
      <ul className="space-y-4">
        {requests.map((req) => (
          <li
            key={req.email}
            className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-xl shadow"
          >
            <div>
              <h2 className="font-semibold text-lg">{req.name}</h2>
              <p className="text-sm text-gray-500">{req.email}</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => approveMutation.mutate(req.email)}
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full"
                title="Approve"
              >
                <FaCheck />
              </button>
              <button
                onClick={() => denyMutation.mutate(req.email)}
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                title="Deny"
              >
                <FaTimes />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherRequest;
