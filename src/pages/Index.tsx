
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MovieGrid from "@/components/MovieGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      {/* Screen 1 - Original Hero with Movie Background */}
      <div className="relative min-h-screen">
        {/* Animated movie poster background - ONLY for screen 1 */}
        <MovieGrid />
        
        {/* Main content */}
        <div className="relative z-20">
          <Header />
          <Hero />
        </div>
      </div>

      {/* Screen 2 - TV that gets you */}
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-6 transition-all duration-1000 ease-in-out">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
              TV that gets you
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-lg">
              By serving up the best recommendations from all your apps in one place, Fire TV makes it easier than ever to find what to watch.
            </p>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-orange-600 to-red-700 rounded-lg p-4 h-32 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">UNTIL DAWN</span>
                </div>
                <div className="bg-gradient-to-br from-red-800 to-red-900 rounded-lg p-4 h-24 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                  <span className="text-white font-bold">SINNERS</span>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-lg p-4 h-24 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                  <span className="text-white font-bold text-sm">MINECRAFT</span>
                </div>
                <div className="bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg p-4 h-32 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                  <span className="text-white font-bold">JUDGEMENT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Screen 3 - Stream your heart out */}
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-6 transition-all duration-1000 ease-in-out">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="grid grid-cols-3 gap-4">
              {/* Row 1 */}
              <div className="bg-[#146EB4] rounded-lg p-3 h-20 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                <span className="text-white font-bold text-sm">prime video</span>
              </div>
              <div className="bg-orange-600 rounded-lg p-3 h-20 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                <span className="text-white font-bold text-sm">REACHER</span>
              </div>
              <div className="bg-black rounded-lg p-3 h-20 flex items-center justify-center border border-gray-600 transform hover:scale-105 transition-transform duration-300">
                <span className="text-white font-bold text-sm">tv+</span>
              </div>
              
              {/* Row 2 */}
              <div className="bg-blue-600 rounded-lg p-3 h-20 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                <span className="text-white font-bold text-sm">MOANA 2</span>
              </div>
              <div className="bg-red-600 rounded-lg p-3 h-20 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                <span className="text-white font-bold text-sm">YouTube</span>
              </div>
              <div className="bg-teal-600 rounded-lg p-3 h-20 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                <span className="text-white font-bold text-sm">Severance</span>
              </div>
              
              {/* Row 3 */}
              <div className="bg-blue-800 rounded-lg p-3 h-20 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                <span className="text-white font-bold text-sm">Disney+</span>
              </div>
              <div className="bg-gray-700 rounded-lg p-3 h-20 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                <span className="text-white font-bold text-sm">ECHO RIVER</span>
              </div>
              <div className="bg-blue-900 rounded-lg p-3 h-20 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                <span className="text-white font-bold text-sm">peacock</span>
              </div>
              
              {/* Row 4 */}
              <div className="bg-teal-700 rounded-lg p-3 h-20 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                <span className="text-white font-bold text-sm">Hacks</span>
              </div>
              <div className="bg-purple-800 rounded-lg p-3 h-20 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                <span className="text-white font-bold text-sm">max</span>
              </div>
              <div className="bg-gray-600 rounded-lg p-3 h-20 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                <span className="text-white font-bold text-sm">1923</span>
              </div>
            </div>
          </div>
          <div className="text-left order-1 lg:order-2">
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
              Stream your heart out
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-lg">
              Over 1.5 million movies and TV episodes, including favorites from Netflix, Prime Video, Disney+, Max, Apple TV+, Peacock, STARZ, Paramount+, and more.
            </p>
          </div>
        </div>
      </div>

      {/* Screen 4 - Maximize your Fire TV experience */}
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 flex flex-col items-center justify-center px-6 transition-all duration-1000 ease-in-out">
        <div className="max-w-4xl mx-auto text-center mb-auto pt-20">
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
            Maximize your<br />
            Fire TV experience
          </h2>
        </div>
        
        {/* Footer */}
        <div className="w-full max-w-7xl mx-auto mt-auto pb-8">
          <div className="border border-gray-600 rounded-lg p-6 flex justify-between items-center bg-black/30 backdrop-blur-sm">
            <span className="text-gray-400 text-sm">(footer)</span>
            <span className="text-gray-400 text-sm">(c) amazon firetv stick. all rights reserved.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
