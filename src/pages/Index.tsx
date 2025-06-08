
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
        
        {/* Animated overlay that transitions from transparent to dark */}
        <div className="fixed inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 z-15 transition-all duration-1000 ease-in-out opacity-0 animate-fade-in-slow" style={{
          animationDelay: '2s',
          animationFillMode: 'forwards'
        }} />
        
        {/* Main content */}
        <div className="relative z-20">
          <Header />
          <Hero />
        </div>
      </div>

      {/* Screen 2 - TV that gets you */}
      <div className="min-h-screen bg-slate-800 flex items-center justify-center px-6 transition-all duration-1000 ease-in-out">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              TV that gets you
            </h2>
            <p class="text-lg text-gray-300 leading-relaxed">
              By serving up the best recommendations from all your apps in one place,
              Fire TV makes it easier than ever to find what to watch.
            </p>
          </div>
          <div className="relative">
            <img 
              alt="TV recommendations grid" 
              className="rounded-lg shadow-xl w-full" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuARyd9zLp3WU2Chq8QkcmuM0_8E0UMJQH7L_k_hh3ye4j6uWKtkhoPTmlLUwaf_Pe_hQeg6WVR90-ySdUeBIXzTwAiWyJATT5CIZSlFsUuG1stdOugKOQLZbP_6JpjI1W-rUMWdOB_Fxjd8qbgEW2gPerFCqeClMOIDbbboa2nv3-3R_MRicBNlSCUjOAKORY_GOmMUVY_ctqVy7pP0qM9G-MEA5I2mVMUzeY5Rf7xLvfULz99gU3NVZ6wnCLLE-Mrjftd91VweYk4"
            />
          </div>
        </div>
      </div>

      {/* Screen 3 - Stream your heart out */}
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-6 transition-all duration-1000 ease-in-out">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 lg:order-1">
            <img 
              alt="Streaming services logos" 
              className="rounded-lg shadow-xl w-full" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXU38PtgYhXWxfTjFnQ9eU_0jZsjwC4U6H0cxNMEyLnAuyWALlDM1QcfuMaUMs_VMQgZ8cuHUfYpNHX-zZP8_-yKbaFLevwLBxzEgVveG6EV5WDpzOlI9qMA7sEJZb9aKSYikYe7Epn8k9nMDCoRr9Oakn1MjBuW0yMoGtu9Ucly-VNdl8i0yTPysvRt2d2oOpj4RZLjIlerEn87Bry_OJgep_se2Lxt1XEUxK7eJr_NFBQ4OAv5Ggq8kBryF0h-TsbtFbkWdjpFY"
            />
          </div>
          <div className="text-left order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Stream your heart out
            </h2>
            <p class="text-lg text-gray-300 leading-relaxed">
              Over 1.5 million movies and TV episodes. Watch favorites from Netflix, Prime Video, Disney+, Max, Apple TV+, Peacock, STARZ, Paramount+, and more.
            </p>
          </div>
        </div>
      </div>

      {/* Screen 4 - Maximize your Fire TV experience */}
      <div className="min-h-screen bg-slate-800 flex flex-col items-center justify-center px-6 transition-all duration-1000 ease-in-out">
        <div className="max-w-4xl mx-auto text-center mb-auto pt-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 leading-tight">
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
