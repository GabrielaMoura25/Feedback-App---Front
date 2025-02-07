"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Feedback = {
  text: string;
  sentiment: string;
};

export default function AdminPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();

useEffect(() => {
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    if (!token) {
      router.push("/login");
      return;
    }

    if (!isAdmin) {
      setError("Access denied. Only administrators can view this page.");
      return;
    }

    const fetchFeedbacks = async () => {
      const res = await fetch("http://localhost:8000/api/feedbacks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        setError("Error fetching feedbacks.");
        return;
      }
      const data = await res.json();
      setFeedbacks(data);
    };

    fetchFeedbacks();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-500 to-teal-500">
      <div className="bg-white p-10 rounded-lg shadow-xl w-96 text-center">
        <h2 className="text-3xl font-bold text-gray-700 mb-6">Received Feedbacks</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <ul className="text-left">
          {feedbacks.map((feedback, index) => (
            <li key={index} className="border-b p-2 text-gray-800">
              {feedback.text} - <strong>{feedback.sentiment}</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
