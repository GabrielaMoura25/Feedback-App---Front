"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const [, setIsAdmin] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const role = localStorage.getItem("role");
        if (role === "admin") {
            setIsAdmin(true);
        }
    }, []);

    const handleAdminClick = () => {
        if (!isClient) return;
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
        } else {
            router.push("/admin");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setIsAdmin(false);
        router.push("/");
    };

    return (
        <nav className="bg-blue-500 p-4 text-white flex justify-between">
            <div className="flex gap-4">
                <button onClick={() => router.push("/")} className="underline">
                    Feedback
                </button>
                <button onClick={handleAdminClick} className="underline">
                    Admin
                </button>
            </div>
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
                Logout
            </button>
        </nav>
    );
}
