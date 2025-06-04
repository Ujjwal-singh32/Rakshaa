"use client"
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Server } from 'lucide-react'; // Optional icon

export default function KeepAlive() {
  const [lastPing, setLastPing] = useState(null);
  const [status, setStatus] = useState('Pinging...');

  useEffect(() => {
    const pingServer = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_FLASK_URL}/ping`);
        if (res.ok) {
          const now = new Date().toLocaleTimeString();
          setLastPing(now);
          setStatus('✅ Server is alive');
        } else {
          setStatus('❌ Server responded with error');
        }
      } catch (err) {
        setStatus('❌ Ping failed. Server might be down.');
        console.error(err);
      }
    };

    pingServer(); // First ping
    const interval = setInterval(pingServer, 300000); // Ping every 5 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>ML Server Pinger</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-purple-200 via-purple-100 to-white flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center border-4 border-purple-300 relative overflow-hidden">

          {/* Animated Pulse */}
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 rounded-full bg-purple-400 opacity-30 animate-ping-slow"></div>
              <div className="absolute inset-0 rounded-full bg-purple-500 opacity-20 animate-ping-slower"></div>
              <div className="flex items-center justify-center w-full h-full">
                <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-white text-2xl shadow-md">
                  <Server size={28} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <h1 className="text-2xl font-bold text-purple-800 mb-2">ML Server Pinger</h1>
            <p className="text-gray-700 mb-4">
              This page pings your ML Flask server every 3 minutes to keep it alive.
            </p>
            <div className="text-sm text-gray-600 bg-purple-50 rounded-lg p-4">
              <p><strong>Status:</strong> {status}</p>
              {lastPing && <p><strong>Last ping:</strong> {lastPing}</p>}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .animate-ping-slow {
          animation: ping 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-ping-slower {
          animation: ping 6s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </>
  );
}
