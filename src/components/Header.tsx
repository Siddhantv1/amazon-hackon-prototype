
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="relative z-50 w-full px-6 py-4">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-8">
          <div className="text-3xl font-bold text-white">
            <span className="text-[#FF9900]">Amazon</span> Lounge
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-white hover:text-[#FF9900] transition-colors">Home</a>
            <a href="#" className="text-white hover:text-[#FF9900] transition-colors">Movies</a>
            <a href="#" className="text-white hover:text-[#FF9900] transition-colors">TV Shows</a>
            <a href="#" className="text-white hover:text-[#FF9900] transition-colors">My List</a>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-white hover:bg-white/10">
            Sign In
          </Button>
          <Button className="bg-[#FF9900] hover:bg-[#FF9900]/80 text-black">
            Start Free Trial
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
