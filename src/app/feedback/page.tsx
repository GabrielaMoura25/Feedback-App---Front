"use client";

import { useState } from "react";

export default function FeedbackPage() {
    const [text, setText] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8000/api/feedbacks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ text }),
        });

        const data = await res.json();
        if (res.ok) {
            setMessage("Feedback submitted successfully!");
            setText("");
        } else {
            setMessage(data.message || "Error submitting feedback");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-cyan-500">
            <div className="bg-white p-10 rounded-lg shadow-xl w-96 text-center">
                <h2 className="text-3xl font-bold text-gray-700 mb-6">Submit Your Feedback</h2>
                {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <textarea
                        placeholder="Write your feedback..."
                        className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={text}
                        onChange={(e) => {
                            if (e.target.value.length <= 1000) {
                                setText(e.target.value);
                            }
                        }}
                        maxLength={1000}
                    ></textarea>
                    <p className="text-sm text-gray-600">{text.length}/1000 characters</p>
                    <button className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition" type="submit">
                        Submit Feedback
                    </button>
                </form>
            </div>
        </div>
    );
}
