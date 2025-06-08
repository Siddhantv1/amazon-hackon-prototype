
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="relative z-50 w-full px-6 py-4">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-8">
          <div className="text-3xl font-bold flex items-center">
            <span className="text-white">amazon</span>
            <span className="text-[#FF9900] ml-1">firetv</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-white hover:text-[#FF9900] transition-colors">Home</a>
            <a href="#" className="text-white hover:text-[#FF9900] transition-colors">Movies</a>
            <a href="#" className="text-white hover:text-[#FF9900] transition-colors">TV Shows</a>
            <a href="#" className="text-white hover:text-[#FF9900] transition-colors">Live TV</a>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            className="text-white hover:text-white hover:bg-white/10"
            onClick={() => navigate('/login')}
          >
            Sign In
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
