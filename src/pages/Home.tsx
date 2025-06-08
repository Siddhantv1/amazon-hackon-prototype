
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Search, Home as HomeIcon, Tv, Bookmark, Settings, Sofa, Plus } from "lucide-react";
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
    { name: 'Zee5', logo: 'https://akamaividz2.zee5.com/image/upload/w_1013,h_405,c_scale,f_webp,q_auto:eco/resources/0-1-manual_65395a801a6a4b4a850b9094aebccf23/list/1170x4051668082074884zee5logoforweb.png', url: 'https://zee5.com', bgColor: 'bg-black' },
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
    { name: 'Lounge', icon: Sofa, onClick: () => navigate('/watch-party') },
    { name: 'Settings', icon: Settings }
  ];

  const recommendedMovies = [
    { title: "The Accountant 2", image: "https://assetscdn1.paytm.com/images/cinema/The-Accountant-2-118f8700-ede4-11ef-bc88-6d3374531046.jpg" },
    { title: "The Dark Knight Rises", image: "https://i.pinimg.com/originals/e6/b4/2f/e6b42f7280b1522dfa7ba5344ade696b.jpg" },
    { title: "Peaky Blinders", image: "https://miro.medium.com/v2/resize:fit:820/1*EsNbEC8u5QeWqMqa8Hk-Ew.png" },
    { title: "Panchayat", image: "https://feeds.abplive.com/onecms/images/uploaded-images/2024/05/16/3cc6265c0949ec8d0792087bb48eb5fa1715847610947274_original.jpeg?impolicy=abp_cdn&imwidth=640" },
    { title: "Reacher", image: "https://devdiscourse.blob.core.windows.net/devnews/10_08_2023_09_53_10_4031052.jpg" },
    { title: "Criminal Justice", image: "https://i.ytimg.com/vi/98pKCUl4ljM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD5SnLDeU-j0xix5PPDFpXV_DcWyg" },
    { title: "Live: ICCT20 IND v PAK", image: "https://assets-in.bmscdn.com/discovery-catalog/events/et00400032-edznwvluwe-landscape.jpg"},
    { title: "Invincible", image: "https://4kwallpapers.com/images/wallpapers/invincible-poster-2560x1440-20135.png"},
    { title: "Top Gun: Maverick", image: "https://flixchatter.net/wp-content/uploads/2022/05/topgun2-poster.jpg?w=640"},
    { title: "28 Days Later", image: "https://img.englishcinemakyiv.com/yjN9fvEs8f6SN5-l8gp6i8F9Y7xnPSacq9ZT-R6QQ90/resize:fill:800:450:1:0/gravity:sm/aHR0cHM6Ly9leHBhdGNpbmVtYXByb2QuYmxvYi5jb3JlLndpbmRvd3MubmV0L2ltYWdlcy83ODE5NjgzYS0xODdiLTQ3MTQtODNhZC03ZGQ2YmQyZjIzZWMuanBn.jpg" },
    { title: "Friends", image: "https://rukminim2.flixcart.com/image/850/1000/l1whaq80/poster/e/z/i/small-poster-friends-digital-art-wall-poster-300gsm-matt-13x19-original-imagddyjzrqgzfqz.jpeg?q=90&crop=false"},
    { title: "Madgaon Express", image: "https://static.toiimg.com/photo/108237610.cms"},
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
        {/* recommended for today */}
        <div className=" absolute inset-0 flex items-start z-20 bg-[url('/public/ok1.jpg')] bg-cover bg-center">
          <div className="ml-6 mt-60">
            <Button className="backdrop-filter backdrop-blur-sm bg-gray-900/30 hover:bg-white text-white hover:text-black px-6 py-2 rounded">
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
      {/* Nav Bar */}
      <nav className="bg-gray-800 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex space-x-6">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={item.onClick}
                className={
                  `flex items-center p-2 rounded-lg transition-colors duration-200 ease-in-out group ${
                    item.active ? 'bg-white text-black' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                <item.icon className="w-6 h-6 transition-transform duration-200 group-hover:scale-110" />
                <span className="text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {item.name}
                </span>
              </button>
            ))}
          </div>
          <div className="text-sm text-gray-400">
            Friday, June 6, 3:30pm
          </div>
        </div>
      </nav>


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
            <Plus className="w-6 h-6 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Surprise Me Button */}
      <div className="px-6 mb-4">
        <Button variant="outline" className="border-gray-600 text-black hover:text-white hover:bg-gray-700">
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
              <p className="text-sm text-gray-300 text-center font-bold">{movie.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
