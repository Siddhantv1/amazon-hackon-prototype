
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MovieGrid from "@/components/MovieGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Animated movie poster background */}
      <MovieGrid />
      
      {/* Main content */}
      <div className="relative z-20">
        <Header />
        <Hero />
      </div>
    </div>
  );
};

export default Index;
