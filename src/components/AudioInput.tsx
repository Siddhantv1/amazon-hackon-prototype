
import React from 'react';
import { Mic, AudioWaveform } from "lucide-react";

interface AudioInputProps {
  visible: boolean;
}

const AudioInput: React.FC<AudioInputProps> = ({ visible }) => {
  return (
    <div
      className={`fixed top-6 right-6 z-50 transition-all duration-300 ease-in-out transform ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      <div className="bg-gradient-to-r from-[#146EB4] to-[#45ACCB] p-1 rounded-full flex items-center">
        <div className="bg-black/90 rounded-full px-4 py-2 flex items-center space-x-3">
          <Mic className="text-[#FF9900] w-5 h-5" />
          <div className="flex items-center h-8 space-x-1">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`w-1 bg-[#FF9900] rounded-full animate-waveform-${i + 1}`}
                style={{
                  height: '60%',
                  animationDelay: `${i * 0.1}s`
                }}
              ></div>
            ))}
          </div>
          <AudioWaveform className="text-[#FF9900] w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default AudioInput;
