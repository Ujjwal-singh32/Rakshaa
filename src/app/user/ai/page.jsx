"use client";

import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AIComingSoonSection() {
  const router = useRouter();

  const handlechange = () => {
    router.push("/user/home");
  };

  return (
    <section className="bg-purple-200 dark:bg-purple-950 w-screen h-screen overflow-hidden flex items-center justify-center relative">
      <div className="max-w-4xl mx-auto text-center relative z-10 px-4">
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-1 bg-purple-300 dark:bg-purple-800 text-purple-900 dark:text-purple-200 rounded-full text-sm font-semibold">
            <Sparkles className="w-4 h-4 animate-pulse" />
            AI Feature Incoming
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-purple-800 dark:text-purple-300 mb-4">
          Smart Health Assistant
        </h2>
        <p className="text-lg sm:text-xl text-purple-900 dark:text-purple-200 mb-8">
          Our AI-based health advisor will guide you with personalized insights,
          coming very soon.
        </p>
        <button
          onClick={handlechange}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full transition transform hover:scale-105"
        >
          Stay Tuned
        </button>
      </div>

      {/* Subtle glowing background elements */}
      <div className="absolute w-72 h-72 bg-white/20 rounded-full -top-24 -left-24 blur-3xl animate-pulse" />
      <div className="absolute w-60 h-60 bg-white/20 rounded-full -bottom-24 -right-24 blur-2xl animate-pulse" />
    </section>
  );
}
