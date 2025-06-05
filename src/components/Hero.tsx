
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative z-40 flex items-center justify-center min-h-screen">
      <div className="text-center max-w-4xl mx-auto px-6">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
          Unlimited
          <br />
          <span className="text-red-500">Entertainment</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Watch thousands of movies and TV shows. Cancel anytime. No commitments.
        </p>
        <div className="flex justify-center">
          <Button 
            size="lg" 
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg"
            onClick={() => navigate('/login')}
          >
            Start Watching Now
          </Button>
        </div>
        <div className="mt-8 text-gray-400">
          <p>Try free for 30 days. No credit card required.</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
