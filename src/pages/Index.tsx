import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MovieGrid from "@/components/MovieGrid";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
const Index = () => {
  const [fadeOut, setFadeOut] = useState(false);
  const firstSectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentRef = firstSectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setFadeOut(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      {/* Fixed background gradient */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-black via-black/100 to-black pointer-events-none" />

      {/* Section 1 */}
      <section
        ref={firstSectionRef}
        className="relative min-h-screen w-full z-10 snap-start"
      >
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <MovieGrid />
        </div>

        {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70 z-10 pointer-events-none" /> */}

        <div className="relative z-20">
          <Header />
          <Hero />
        </div>
      </section>

      {/* Section 2 */}
      <section className="min-h-screen flex items-center justify-center px-6 z-10 relative snap-start">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h2 className="text-4xl md:text-7xl font-bold font-lato text-white mb-6 leading-tight">
              TV that gets you
            </h2>
            <p className="text-lg text-gray-300 font-lato leading-relaxed">
              By serving up the best recommendations from all your apps in one place,
              Fire TV makes it easier than ever to find what to watch.
            </p>
          </div>
          <div className="relative">
            <img
              alt="TV recommendations grid"
              className="rounded-lg shadow-xl w-full"
              src="/tv-recommendations.jpg"
            />
          </div>
        </div>
      </section>
      <div className="px-full py-full"></div>

      {/* Section 3 */}
      <section className="min-h-screen flex items-center justify-center px-6 z-10 relative snap-start">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 lg:order-1">
            <img
              alt="Streaming services logos"
              className="rounded-lg shadow-xl w-full"
              src="/otts1.png"
            />
          </div>
          <div className="text-left order-1 lg:order-2">
            <h2 className="text-4xl md:text-7xl font-bold font-lato text-white mb-6 leading-tight">
              Stream your heart out
            </h2>
            <p className="text-lg text-gray-300 font-lato leading-relaxed">
              Over 1.5 million movies and TV episodes. Watch favorites from Netflix, Prime Video, JioHotstar, YouTube, SonyLIV, Zee5, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 z-10 relative snap-start">
        <div className="max-w-6xl mx-auto text-center mb-auto pt-20">
          <h1 className="text-6xl md:text-6xl font-bold font-lato text-white mb-12 leading-tight">
            Maximize your<br />
            Fire TV experience
          </h1>
          <Button
            onClick={() => navigate('/login')}
            className="bg-[#FF9900] hover:bg-[#fdd835] font-lato text-black font-semibold px-6 py-3 text-lg mt-4"
          >
            Get Started
          </Button>
        </div>
        <div className="w-full max-w-7xl mx-auto mt-auto pb-8">
          <div className="border border-gray-600 font-lato rounded-lg p-6 flex justify-between items-center bg-black/30 backdrop-blur-sm">
            <span className="justify-center text-gray-400 text-sm">© Amazon Fire TV Stick. All rights reserved.</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
