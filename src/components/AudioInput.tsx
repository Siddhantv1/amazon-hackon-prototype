
import React from 'react';
import { Mic } from "lucide-react";

interface AudioInputProps {
  visible: boolean;
}

// Helper component for the animated bars
const WaveformBar = ({ index }: { index: number }) => {
  // Use random values for a more dynamic and natural look
  const randomHeight = `${60 + Math.random() * 40}%`;
  const randomDuration = `${0.8 + Math.random() * 0.4}s`;
  const randomDelay = `${index * 0.1}s`;

  return (
    <div
      className="w-1.5 bg-[#FF9900] rounded-full animate-waveform"
      style={{
        // Using inline styles for dynamic/randomized values - cast to any to allow CSS custom properties
        '--start-height': `${20 + Math.random() * 30}%`,
        '--end-height': randomHeight,
        animationDuration: randomDuration,
        animationDelay: randomDelay,
      } as React.CSSProperties & { [key: string]: string }}
    ></div>
  );
};

const AudioInput: React.FC<AudioInputProps> = ({ visible }) => {
  return (
    <>
      {/* We need to define the animation keyframes. 
        The easiest way for a self-contained component is to add a style tag.
        You can also move this into your global index.css file.
      */}
      <style>{`
        @keyframes waveform {
          0%, 100% {
            height: var(--start-height);
          }
          50% {
            height: var(--end-height);
          }
        }
        .animate-waveform {
          animation-name: waveform;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }
      `}</style>

      <div
        className={`fixed top-10 right-10 z-50 transition-all duration-300 ease-in-out transform ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        {/* Increased padding and overall size */}
        <div className="bg-gradient-to-r from-[#146EB4] to-[#45ACCB] p-2 rounded-full flex items-center shadow-2xl">
          <div className="bg-black/90 rounded-full px-6 py-4 flex items-center space-x-4">
            {/* Made the icon larger */}
            <Mic className="text-[#FF9900] w-8 h-8" />
            
            {/* Made the waveform container taller and wider */}
            <div className="flex items-center justify-center h-16 w-32 space-x-1.5">
              {/* Increased the number of bars for a richer effect */}
              {[...Array(12)].map((_, i) => (
                <WaveformBar key={i} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AudioInput;
