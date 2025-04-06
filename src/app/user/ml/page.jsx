"use client";

import { Brain } from "lucide-react";
import { useRouter } from "next/navigation";
export default function MLComingSoonSection() {
  const router = useRouter();

  const handlechange = () => {
    router.push("/user/home");
  };
  return (
    <section className="bg-purple-100 dark:bg-purple-900 py-20 px-4 w-full min-h-screen">
      <div className="max-w-5xl mx-auto text-center">
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 rounded-full text-sm font-semibold">
            <Brain className="w-4 h-4 animate-bounce" />
            ML Feature Incoming
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-purple-700 dark:text-purple-400 mb-4">
          Predictive Health Insights
        </h2>
        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8">
          Our ML-powered tool will help you predict potential health issues
          early. Coming soon!
        </p>
        <button
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full transition transform hover:scale-105"
          onClick={handlechange}
        >
          Stay Tuned
        </button>
      </div>
    </section>
  );
}
