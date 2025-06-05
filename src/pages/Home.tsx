
import React from 'react';
import { Button } from "@/components/ui/button";
import { Search, Settings, Home as HomeIcon, Tv, Bookmark, Plus, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const apps = [
    { name: 'Netflix', color: 'bg-red-600', textColor: 'text-white' },
    { name: 'Paramount+', color: 'bg-blue-600', textColor: 'text-white' },
    { name: 'Freevee', color: 'bg-yellow-400', textColor: 'text-black' },
    { name: 'Hulu', color: 'bg-green-500', textColor: 'text-black' },
    { name: 'Max', color: 'bg-blue-700', textColor: 'text-white' },
    { name: 'Disney+', color: 'bg-blue-800', textColor: 'text-white' },
    { name: 'ESPN', color: 'bg-red-700', textColor: 'text-white' },
    { name: 'Philo', color: 'bg-white', textColor: 'text-blue-600' },
    { name: 'FuboTV', color: 'bg-orange-600', textColor: 'text-white' },
    { name: 'Prime Video', color: 'bg-cyan-400', textColor: 'text-black' },
    { name: 'YouTube TV', color: 'bg-white', textColor: 'text-red-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-gray-800 p-4">
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-white">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">JM</span>
            </div>
            <span className="font-medium">James M.</span>
          </div>
        </div>

        <nav className="space-y-2">
          <div className="flex items-center space-x-3 p-3 rounded-lg text-gray-300">
            <div className="w-6 h-6 flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-gray-400 rounded"></div>
            </div>
            <span>Inputs</span>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg text-black">
            <HomeIcon className="w-6 h-6" />
            <span className="font-medium">Home</span>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-700 cursor-pointer">
            <Search className="w-6 h-6" />
            <span>Search</span>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-700 cursor-pointer">
            <Tv className="w-6 h-6" />
            <span>Live TV</span>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-700 cursor-pointer">
            <Bookmark className="w-6 h-6" />
            <span>Saved</span>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-700 cursor-pointer">
            <Plus className="w-6 h-6" />
            <span>Add Apps</span>
          </div>

          <div 
            className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-700 cursor-pointer"
            onClick={() => navigate('/watch-party')}
          >
            <Users className="w-6 h-6" />
            <span>Watch Party</span>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-700 cursor-pointer">
            <Settings className="w-6 h-6" />
            <span>Settings</span>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-sm text-gray-400">
            Wednesday, August 30 | 10:32 PM
          </div>
          <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
            Reorder List
          </Button>
        </div>

        {/* Featured Content */}
        <div className="mb-8">
          <div className="relative h-64 bg-gradient-to-r from-gray-800 to-gray-600 rounded-lg overflow-hidden mb-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-wider mb-2">
                  THE PERIPHERAL
                </h1>
                <p className="text-lg">NEW EPISODES FRIDAYS | prime video</p>
              </div>
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Your Apps Section */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Your Apps</h2>
          <div className="grid grid-cols-4 gap-4 mb-4">
            {apps.slice(0, 11).map((app, index) => (
              <div
                key={index}
                className={`${app.color} ${app.textColor} rounded-xl p-6 h-32 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform`}
              >
                <span className="font-bold text-lg">{app.name}</span>
              </div>
            ))}
            <div className="bg-gray-700 border-2 border-dashed border-gray-500 rounded-xl p-6 h-32 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors">
              <Plus className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-gray-400 font-medium">Add Apps</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
