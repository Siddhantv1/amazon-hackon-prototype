
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Search, Home as HomeIcon, Tv, Bookmark, Settings, Grid3X3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AudioInput from "@/components/AudioInput";

const Home = () => {
  const navigate = useNavigate();
  const [audioInputVisible, setAudioInputVisible] = useState(false);
  const [inWatchParty, setInWatchParty] = useState(false);
  const [partyMembers, setPartyMembers] = useState(3);
  
  // Effect for handling key press events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'm') {
        setAudioInputVisible(true);
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'm') {
        setAudioInputVisible(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Check URL parameters for lounge information when the component mounts
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const lounge = urlParams.get('lounge');
    if (lounge === 'true') {
      setInWatchParty(true);
    }
  }, []);

  const ottPlatforms = [
    { name: 'Netflix', logo: 'https://logos-world.net/wp-content/uploads/2020/04/Netflix-Logo.png', url: 'https://netflix.com', bgColor: 'bg-red-600' },
    { name: 'Prime Video', logo: 'https://m.media-amazon.com/images/G/01/digital/video/web/Logo-min.png', url: 'https://primevideo.com', bgColor: 'bg-[#146EB4]' },
    { name: 'YouTube', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg', url: 'https://youtube.com', bgColor: 'bg-red-600' },
    { name: 'Disney+', logo: 'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/D7AEE1F05D10FC37C873176AAA26F777FC1B71E7A6563F36C6B1B497116C0454/scale?width=1200&aspectRatio=1.78&format=png', url: 'https://disneyplus.com', bgColor: 'bg-blue-800' },
    { name: 'Hulu', logo: 'https://press.hulu.com/wp-content/uploads/2020/02/hulu-white-1.png', url: 'https://hulu.com', bgColor: 'bg-green-500' },
    { name: 'Zee5', logo: 'https://akamaividz2.zee5.com/image/upload/w_1013,h_405,c_scale,f_webp,q_auto:eco/resources/0-1-manual_65395a801a6a4b4a850b9094aebccf23/list/1170x4051668082074884zee5logoforweb.png', url: 'https://zee5.com', bgColor: 'bg-purple-600' },
    { name: 'JioHotstar', logo: 'https://img10.hotstar.com/image/upload/f_auto,q_90,w_256/v1661346101/web-images/logo-d-plus.svg', url: 'https://hotstar.com', bgColor: 'bg-yellow-500' },
    { name: 'Sony Liv', logo: 'https://images.ottplay.com/images/sony-liv-1662019009.png', url: 'https://sonyliv.com', bgColor: 'bg-blue-900' },
    { name: 'MX Player', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/MX_Player_logo.png/1200px-MX_Player_logo.png', url: 'https://mxplayer.in', bgColor: 'bg-orange-600' }
  ];

  const handlePlatformClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const navItems = [
    { name: 'Home', icon: HomeIcon, active: true },
    { name: 'Search', icon: Search },
    { name: 'Live TV', icon: Tv },
    { name: 'Saved', icon: Bookmark },
    { name: 'Lounge', icon: Grid3X3, onClick: () => navigate('/watch-party') },
    { name: 'Settings', icon: Settings }
  ];

  const recommendedMovies = [
    { title: "The Wilds", image: "https://m.media-amazon.com/images/M/MV5BOWIwZGY0ODEtMTUzYS00ZmYwLWI4NzUtMDUwNjVjNGVhZjZiXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg" },
    { title: "Outlander", image: "https://m.media-amazon.com/images/M/MV5BMTQzNzk4NzA4NF5BMl5BanBnXkFtZTgwNzY4OTQyMTE@._V1_.jpg" },
    { title: "Yellowjackets", image: "https://m.media-amazon.com/images/M/MV5BYjJmMWU3M2UtOGNjMS00ZDNmLWJiOWMtNjhkNTdkMjQ2NWEyXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg" },
    { title: "Baywatch", image: "https://m.media-amazon.com/images/M/MV5BMTEyOTU4MjI1M15BMl5BanBnXkFtZTgwMzg2NDEzNDE@._V1_.jpg" },
    { title: "Reacher", image: "https://m.media-amazon.com/images/M/MV5BYWU4OGFjZGMtZDYzNC00NGZhLTllNWItZGI2M2E3N2YzNjJlXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg" },
    { title: "Bel Air", image: "https://m.media-amazon.com/images/M/MV5BNzAwNzUzNjY4NV5BMl5BanBnXkFtZTgwMzQ3NjM3ODE@._V1_.jpg" }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Audio Input Component */}
      <AudioInput visible={audioInputVisible} />
      
      {/* Featured Content Banner */}
      <div className="relative h-[60vh] bg-gradient-to-r from-[#000000] to-[#146EB4] overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute top-6 left-6 z-20">
          <div className="flex items-center space-x-2 text-white mb-8">
            <div className="w-8 h-8 bg-[#146EB4] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">JM</span>
            </div>
            <span className="font-medium">
              {inWatchParty 
                ? `James M. & ${partyMembers} others`
                : "James M."
              }
            </span>
          </div>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center">
            <h1 className="text-6xl font-bold tracking-wider mb-4 font-['Bebas_Neue'] text-[#FF9900]">
              OUTER RANGE
            </h1>
            <p className="text-xl mb-4">WATCH NOW | prime video</p>
            <Button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded">
              Learn More
            </Button>
          </div>
        </div>
        
        {/* Navigation dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          <div className="w-3 h-3 bg-white rounded-full"></div>
          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
        </div>
      </div>

      {/* Horizontal Navigation Bar */}
      <div className="bg-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  item.active ? 'bg-white text-black' : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </div>
          
          <div className="text-sm text-gray-400">
            Friday, June 6, 3:30pm
          </div>
        </div>
      </div>

      {/* OTT Platforms */}
      <div className="px-6 py-6">
        <div className="flex items-center space-x-4 overflow-x-auto pb-4">
          {ottPlatforms.map((platform, index) => (
            <button
              key={index}
              onClick={() => handlePlatformClick(platform.url)}
              className={`${platform.bgColor} rounded-lg p-4 min-w-[120px] h-16 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform`}
            >
              <span className="font-bold text-white text-sm">{platform.name}</span>
            </button>
          ))}
          <button className="bg-gray-700 border-2 border-dashed border-gray-500 rounded-lg p-4 min-w-[120px] h-16 flex items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors">
            <Grid3X3 className="w-6 h-6 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Surprise Me Button */}
      <div className="px-6 mb-4">
        <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
          Surprise Me
        </Button>
      </div>

      {/* Recommended Content */}
      <div className="px-6 pb-8">
        <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {recommendedMovies.map((movie, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden mb-2 group-hover:scale-105 transition-transform">
                <img 
                  src={movie.image} 
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-gray-300 text-center">{movie.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
