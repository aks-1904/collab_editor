const Loading = () => {
  return (
    <>
      <style>{`
        @keyframes pulse-custom {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-custom {
          animation: pulse-custom 2s ease-in-out infinite;
        }
        
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .animate-spin-reverse {
          animation: spin-reverse 1.5s linear infinite;
        }
        
        @keyframes dots {
          0%, 20% { color: rgba(255,255,255,0.4); }
          40% { color: rgba(255,255,255,1); }
          100% { color: rgba(255,255,255,0.4); }
        }
        .animate-dots span:nth-child(1) { animation: dots 1.4s infinite; }
        .animate-dots span:nth-child(2) { animation: dots 1.4s infinite 0.2s; }
        .animate-dots span:nth-child(3) { animation: dots 1.4s infinite 0.4s; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        {/* Enhanced background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Main loading container */}
        <div
          className="relative z-10 p-8 bg-white/5 rounded-2xl shadow-2xl border border-white/10 max-w-md w-full text-center animate-float"
          style={{
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
        >
          <div className="flex flex-col items-center justify-center space-y-6">
            {/* Enhanced spinner */}
            <div className="relative w-20 h-20">
              {/* Outer ring */}
              <div className="absolute inset-0 border-4 border-gray-600 border-opacity-20 rounded-full"></div>
              {/* Spinning gradient ring */}
              <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 border-r-blue-500 rounded-full animate-spin-slow"></div>
              {/* Inner spinning ring */}
              <div className="absolute inset-2 border-2 border-transparent border-t-pink-400 border-l-cyan-400 rounded-full animate-spin-reverse"></div>
              {/* Center dot */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Loading text with animation */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-white animate-pulse-custom">
                Loading
                <span className="animate-dots">
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </span>
              </h1>

              {/* Progress indicator */}
              <div className="w-48 h-1 bg-gray-700 rounded-full overflow-hidden mx-auto">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 rounded-full animate-pulse"
                  style={{
                    width: "100%",
                    animation: "pulse 2s ease-in-out infinite",
                  }}
                ></div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-base leading-relaxed">
              Preparing your experience
              <br />
              <span className="text-sm text-gray-400">
                This won't take long...
              </span>
            </p>

            {/* Additional visual elements */}
            <div className="flex space-x-1 justify-center">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: "1s",
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 z-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Loading;
