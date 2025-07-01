
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="relative z-50 w-full px-6 py-4 ">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-8">
          <div className="text-3xl font-bold flex items-center">
            <span className="text-white font-lato font-bold">amazon</span>
            <span className="text-[#FF9900] ml-1 font-lato font-bold">firetv</span>
          </div>
          <div className="hidden md:flex items-center font-lato space-x-6"onClick={() => navigate('/login')}>
            <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-[#FF9900] font-bold transition-colors" >Home</Button>
            <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-[#FF9900] font-bold transition-colors" >Movies</Button>
            <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-[#FF9900] font-bold transition-colors" >TV Shows</Button>
            <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-[#FF9900] font-bold transition-colors" >Live TV</Button>
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
