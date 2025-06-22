import { Suspense, useState, useEffect } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time and wait for DOM to be ready
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center z-50">
        <div className="text-center">
          {/* Animated Code Blocks */}
          <div className="relative mb-8">
            <div className="flex space-x-2 justify-center mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div
                className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-3 h-3 bg-green-500 rounded-full animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 shadow-2xl border border-gray-700 max-w-md mx-auto">
              <div className="space-y-3 font-mono text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-purple-400">const</span>
                  <span className="text-blue-400">developer</span>
                  <span className="text-white">=</span>
                  <span className="text-green-400">&quot;Ajit Singh&quot;</span>
                  <div className="w-2 h-4 bg-white animate-pulse ml-1"></div>
                </div>

                <div className="flex items-center space-x-2 opacity-80">
                  <span className="text-purple-400">const</span>
                  <span className="text-blue-400">skills</span>
                  <span className="text-white">=</span>
                  <span className="text-yellow-400">[</span>
                </div>

                <div className="pl-4 space-y-1 opacity-60">
                  <div className="text-green-400">&quot;React&quot;,</div>
                  <div className="text-green-400">&quot;Next.js&quot;,</div>
                  <div className="text-green-400">&quot;TailwindCSS&quot;</div>
                </div>

                <div className="flex items-center space-x-2 opacity-80">
                  <span className="text-yellow-400">]</span>
                </div>
              </div>
            </div>
          </div>

          {/* Loading Text */}
          <div className="text-white text-xl font-semibold mb-4">
            Loading Portfolio...
          </div>

          {/* Animated Progress Bar */}
          <div className="w-64 h-2 bg-gray-700 rounded-full mx-auto overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"
              style={{
                animation: "loading 2s ease-in-out infinite",
              }}
            ></div>
          </div>
        </div>

        <style jsx>{`
          @keyframes loading {
            0% {
              width: 0%;
            }
            50% {
              width: 70%;
            }
            100% {
              width: 100%;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
