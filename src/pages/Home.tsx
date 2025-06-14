
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
  const [currentSlide, setCurrentSlide] = useState(0);
  
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
  const bannerData = [
    { image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=2070&auto=format&fit=crop", title: "Explore platforms", buttonText: "Learn More" },
    { image: "https://m.media-amazon.com/images/S/pv-target-images/53e30470b1f7c88cfd4c9176cddcb156e9f152469edd71336f0c57c0839d2c7c.jpg", title: "Until Dawn", buttonText: "Watch Now" },
    { image: "https://ntvb.tmsimg.com/assets/p28215037_v_h8_ab.jpg?w=1280&h=720", title: "A Minecraft Movie", buttonText: "Watch Now" },
    { image: "https://static.mygov.in/static/s3fs-public/mygov_172101958351307401.jpg", title: "Live Sports Action", buttonText: "Go Live" },
    { image: "https://wallpapers.com/images/hd/wolf-of-wall-street-movie-poster-dcz1czdi16k7oxts.jpg", title: "Relive the Classics", buttonText: "Top Picks" },
  ];

  // --- Logic for Custom Slider ---
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % bannerData.length);
    }, 10000); // scrolls every 10 seconds

    return () => clearInterval(slideInterval);
  }, [bannerData.length]);


  // Check URL parameters for lounge information when the component mounts
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const lounge = urlParams.get('lounge');
    if (lounge === 'true') {
      setInWatchParty(true);
    }
  }, []);

  // const ottPlatforms = [
  //   { name: 'Netflix', logo: 'https://logos-world.net/wp-content/uploads/2020/04/Netflix-Logo.png', url: 'https://netflix.com', bgColor: 'bg-red-600' },
  //   { name: 'Prime Video', logo: 'https://m.media-amazon.com/images/G/01/digital/video/web/Logo-min.png', url: 'https://primevideo.com', bgColor: 'bg-[#146EB4]' },
  //   { name: 'YouTube', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg', url: 'https://youtube.com', bgColor: 'bg-red-600' },
  //   { name: 'Zee5', logo: 'https://akamaividz2.zee5.com/image/upload/w_1013,h_405,c_scale,f_webp,q_auto:eco/resources/0-1-manual_65395a801a6a4b4a850b9094aebccf23/list/1170x4051668082074884zee5logoforweb.png', url: 'https://zee5.com', bgColor: 'bg-black' },
  //   { name: 'JioHotstar', logo: 'https://img10.hotstar.com/image/upload/f_auto,q_90,w_256/v1661346101/web-images/logo-d-plus.svg', url: 'https://hotstar.com', bgColor: 'bg-yellow-500' },
  //   { name: 'Sony Liv', logo: 'https://images.ottplay.com/images/sony-liv-1662019009.png', url: 'https://sonyliv.com', bgColor: 'bg-blue-900' },
  //   { name: 'MX Player', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/MX_Player_logo.svg', url: 'https://mxplayer.in', bgColor: 'bg-orange-600' }
  // ];

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
    { title: "The Big Bang Theory", image: "https://m.media-amazon.com/images/S/pv-target-images/7b982e06d08c1909f755785795fadde07545fc829a1525f27981c7fa5e1be5b3.jpg"},
    { title: "Madgaon Express", image: "https://static.toiimg.com/photo/108237610.cms"},
    { title: "Bladerunner 2049", image: "https://c4.wallpaperflare.com/wallpaper/604/994/452/blade-runner-2049-science-fiction-cyberpunk-ryan-gosling-wallpaper-preview.jpg"},
    { title: "Ford v Ferrari", image: "https://i0.wp.com/www.iconvsicon.com/wp-content/uploads/2019/06/Ford_v_Ferrari_OneSheet-featured.jpg?fit=800%2C488&ssl=1"},
    { title: "Logan", image: "https://static1.moviewebimages.com/wordpress/wp-content/uploads/article/sDUsoW8GxAcQeW8nPX4m6KTPrlXm4d.jpg"},
    { title: "Solo Leveling", image: "https://www.gamegrin.com/assets/game/solo-levelingarise/_resampled/SetWidth800-solo-levelingarise-background.jpg"},
    { title: "The Boys", image: "https://4kwallpapers.com/images/wallpapers/the-boys-season-4-2880x1800-17287.jpg"},
    { title: "Parasite", image: "https://mckeestory.com/wp-content/uploads/2020/02/parasite-feb-18-2020.jpg"},
  ];

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* Audio Input Component */}
      <AudioInput visible={audioInputVisible} />
      
      {/* --- Custom slider for banners --- */}
      <div className="relative h-[80vh] bg-stone-800 overflow-hidden">
        {/* User Info */}
        <div className="absolute top-6 left-6 z-30 flex items-center space-x-2 text-white">
            <div className="w-8 h-8 bg-[#146EB4] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">SO</span>
            </div>
            <span className="font-medium drop-shadow-lg">
              {inWatchParty ? `Siddhant O. & ${partyMembers} others` : "Siddhant O."}
            </span>
        </div>

        {/* Slides */}
        <div className="w-full h-full relative">
          {bannerData.map((banner, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            >
              <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${banner.image})`}}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
              <div className="relative z-20 flex flex-col justify-end h-full p-6 md:p-12">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">{banner.title}</h1>
                  <Button className="backdrop-filter backdrop-blur-sm bg-white/20 hover:bg-white text-white hover:text-black px-8 py-3 rounded-lg w-fit transition-colors">
                      {banner.buttonText}
                  </Button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Slider Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
            {bannerData.map((_, index) => (
                <button 
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`} 
                />
            ))}
        </div>
      </div>
      {/* Horizontal Navigation Bar */}
      {/* Nav Bar */}
      <nav className="backdrop-filter backdrop-blur-sm bg-gray-900/30 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex space-x-1">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={item.onClick}
                className={
                  `flex flex-col items-center p-2 rounded-lg transition-colors duration-200 ease-in-out group ${
                    item.active ? 'bg-white text-black' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                <item.icon className="w-6 h-6 transition-transform duration-200 group-hover:scale-110" />
                <span className="text-xs font-bold mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        <div className="flex items-center space-x-2">
          <a
            href="https://www.netflix.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white py-7 px-12 rounded-lg hover:scale-125 border-2 border-transparent hover:border-stone-950 duration-200 relative"
          >
            <img
              src="https://logos-world.net/wp-content/uploads/2020/04/Netflix-Logo.png"
              alt="Netflix"
              className="absolute inset-0 m-auto w-20 h-10"
            />
          </a>

          <a
            href="https://www.primevideo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-sky-500 py-7 px-12 rounded-lg hover:scale-125 border-2 border-transparent hover:border-white duration-200 relative"
          >
            <img
              src="/primevideo.svg"
              alt="Prime Video"
              className="absolute inset-0 m-auto w-20 h-10"
            />
          </a>

          <a
            href="https://www.jiohotstar.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-7 px-12 rounded-lg hover:scale-125 border-2 border-transparent hover:border-white duration-200 relative"
          >
            <img
              src="/liv.png"
              alt="Liv"
              className="absolute inset-0 m-auto w-19 h-9"
            />
          </a>

          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white py-7 px-12 rounded-lg hover:scale-125 border-2 border-transparent hover:border-white duration-200 relative"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
              alt="YouTube"
              className="absolute inset-0 m-auto w-20 h-10"
            />
          </a>

          <a
            href="https://www.zee5.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-stone-300 py-7 px-12 rounded-lg hover:scale-125 border-2 border-transparent hover:border-white duration-200 relative"
          >
            <img
              src="https://logos-world.net/wp-content/uploads/2021/11/ZEE5-Logo.png"
              alt="ZEE5"
              className="absolute inset-0 m-auto w-20 h-10"
            />
          </a>

          <a
            href="https://www.mxplayer.in"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-sky-100 py-7 px-12 rounded-lg hover:scale-125 border-2 hover:border-slate-900 duration-200 relative"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/5c/MX_Player_logo.svg"
              alt="MX Player"
              className="absolute inset-0 m-auto w-20 h-10"
            />
          </a>
        </div>

        </div>
      </nav>

      {/* Surprise Button with recommendation title*/}
      <div className="px-6 py-2 mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recommended for You</h2>
        <Button variant="outline" className="border-gray-600 text-black hover:text-white hover:bg-gray-700">
          Surprise Me
        </Button>
      </div>

      {/* Recommended Content */}
      <div className="px-6 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {recommendedMovies.map((movie, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="aspect-video bg-gray-800 rounded overflow-hidden transition-transform transform group-hover:scale-110 border-2 border-transparent group-hover:border-white">
                <img 
                  src={movie.image} 
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
