import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative z-40 flex items-center justify-center min-h-screen overflow-hidden">
      <div className="text-center max-w-4xl mx-auto px-6">
        <h1 className="text-6xl md:text-8xl font-['Bebas_Neue'] text-white mb-6 leading-tight">
          Unlimited
          <br />
          <span className="text-[#FF9900]">Entertainment</span>
        </h1>
        <div className="font-lato">
        <p className="text-xl md:text-3xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Watch movies and shows that you'd love.
        </p>
        <div className="flex justify-center">
          <Button
            size="lg"
            className="bg-[#FF9900] hover:bg-[#FF9900]/80 text-black font-bold px-8 py-4 text-lg"
            onClick={() => navigate('/login')}
          >
            Start Watching
          </Button>
        </div>
        <div className="mt-8 text-gray-400">
          <p>Buy once, stream forever.</p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
