import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Search, Home as HomeIcon, Tv, Bookmark, Settings, Sofa, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AudioInput from "@/components/AudioInput";
import ContentModal from '@/components/ContentModal';

interface FinalMediaItem {
  id: number;
  title: string;
  backdrop_path: string;
  logo_path: string | null;
  media_type: 'movie' | 'tv';
}

const Home = () => {
  const navigate = useNavigate();
  const [audioInputVisible, setAudioInputVisible] = useState(false);
  const [inWatchParty, setInWatchParty] = useState(false);
  const [partyMembers, setPartyMembers] = useState(3);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedItem, setSelectedItem] = useState<{ id: number; media_type: 'movie' | 'tv' } | null>(null);
  const [recommendedMovies, setRecommendedMovies] = useState<FinalMediaItem[]>([]);

  // --- Effect to fetch movies from the backend ---
  useEffect(() => {
    const fetchMoviesAndTV = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/recommendations');

        if (!response.ok) {
          // log error status
          console.error(`An error occurred: ${response.status}`);
          // Throw an error to be caught by the catch block.
          throw new Error('Failed to fetch from backend.');
        }

        const data = await response.json();
        
        //this was unnecessary but ok(cheking if array was fetched)
        if (Array.isArray(data)) {
            setRecommendedMovies(data);
        } else {
            console.error("Received data is not an array:", data);
            setRecommendedMovies([]); // prevent crash
        }

      } catch (error) {
        console.error('Error fetching recommendations:', error);
        //set empty array incase network error
        setRecommendedMovies([]);
      }
    };

    fetchMoviesAndTV();
  }, []);

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
    { image: "https://www.filmfad.com/wp-content/uploads/2015/03/Secret-Life-of-Walter-Mitty.jpg", title: "Explore platforms", buttonText: "Learn More" },
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

  const navItems = [
    { name: 'Home', icon: HomeIcon, active: true },
    { name: 'Search', icon: Search },
    { name: 'Live TV', icon: Tv },
    { name: 'Saved', icon: Bookmark },
    { name: 'Lounge', icon: Sofa, onClick: () => navigate('/watch-party') },
    { name: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
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
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-7 px-12 rounded-lg hover:scale-125 border-2 border-stone-900 hover:border-white duration-200 relative"
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
            href="https://www.sonyliv.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-blue-900 from-0% via-black via-60% to-purple-800 to-100% py-7 px-12 rounded-lg hover:scale-125 border-2 border-stone-900 hover:border-white duration-200 relative"
          >
            <img
              src="/sony.png"
              alt="Liv"
              className="absolute inset-0 m-auto w-19 h-9"
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
        <Button
          variant="outline"
          className="border-gray-600 text-black hover:text-white hover:bg-gray-700"
          onClick={() => {
            if (recommendedMovies.length > 0) {
              const random = recommendedMovies[Math.floor(Math.random() * recommendedMovies.length)];
              setSelectedItem({ id: random.id, media_type: random.media_type });
            }
          }}>
          Surprise Me
        </Button>
      </div>

      {/* Recommended Content */}
      <div className="px-6 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {recommendedMovies.map((movie) => (
            <div key={movie.id} className="group cursor-pointer" title={movie.title} onClick={() => setSelectedItem({ id: movie.id, media_type: movie.media_type })}>
              <div className="aspect-video bg-gray-800 rounded overflow-hidden transition-transform transform group-hover:scale-110 border-2 border-transparent group-hover:border-white relative">
                <img 
                  src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`} 
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                {movie.logo_path ? (
                  <img 
                    src={movie.logo_path} 
                    alt={movie.title}
                    className="absolute bottom-2 left-2 max-w-[80%] max-h-[40%] object-contain drop-shadow-md"
                  />
                ) : (
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white font-bold text-center p-2">
                    {movie.title}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
          {selectedItem && (
      <ContentModal
        id={selectedItem.id}
        mediaType={selectedItem.media_type}
        onClose={() => setSelectedItem(null)}
      />
    )}

    </div>
  );
};

export default Home;
