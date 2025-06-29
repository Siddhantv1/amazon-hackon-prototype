import React, { useEffect, useState } from 'react';
import { X, Film, AlertTriangle } from 'lucide-react';

// TYPE DEFINITIONS
interface ContentModalProps {
  id: number;
  mediaType: 'movie' | 'tv';
  onClose: () => void;
}

interface Provider {
  provider_name: string;
  logo_path: string;
}

interface ContentData {
  title: string;
  overview: string;
  trailerKey: string | null;
  providers: Provider[];
}

// API HELPER
const API_BASE_URL = 'http://localhost:5000'; 

async function fetchContentDetails(
  mediaType: 'movie' | 'tv',
  id: number,
  signal: AbortSignal
): Promise<ContentData> {
  const response = await fetch(`${API_BASE_URL}/api/content/${mediaType}/${id}`, { signal });
  if (!response.ok) {
    const errorInfo = await response.json();
    throw new Error(errorInfo.error || 'Failed to fetch details.');
  }
  return response.json();
}

//load component
const ModalSkeleton = () => (
  <div className="animate-pulse">
    {/* TRAILER */}
    <div className="bg-neutral-800 h-56 md:h-96 w-full" />
    <div className="p-4 md:p-6">
      {/* TITLE */}
      <div className="h-8 w-3/4 bg-neutral-700 rounded-md mb-4" />
      {/* OVERVIEW */}
      <div className="h-4 w-full bg-neutral-700 rounded-md mb-2" />
      <div className="h-4 w-full bg-neutral-700 rounded-md mb-2" />
      <div className="h-4 w-5/6 bg-neutral-700 rounded-md mb-6" />
      {/* OTTs */}
      <div className="h-6 w-1/3 bg-neutral-700 rounded-md mb-3" />
      <div className="flex space-x-4">
        <div className="h-10 w-32 bg-neutral-700 rounded-lg" />
        <div className="h-10 w-32 bg-neutral-700 rounded-lg" />
      </div>
    </div>
  </div>
);

// MAIN COMPONENT
const ContentModal: React.FC<ContentModalProps> = ({ id, mediaType, onClose }) => {
  
  // STATE MANAGEMENT
  const [content, setContent] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // DATA FETCHING EFFECT
  useEffect(() => {
    // for cleaning up fetches if the component unmounts
    const abortController = new AbortController();

    const loadContent = async () => {
      // Reset state for new content
      setLoading(true);
      setError(null);
      setContent(null);

      try {
        const data = await fetchContentDetails(mediaType, id, abortController.signal);
        setContent(data);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('Error fetching content details:', err);
          setError(err.message || 'An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    loadContent();

    // Cleanup function to abort the fetch on unmount
    return () => {
      abortController.abort();
    };
  }, [id, mediaType]);


  // close component using Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  //rendering
  const renderContent = () => {
    if (loading) {
      return <ModalSkeleton />;
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
          <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Could Not Load Content</h3>
          <p className="text-neutral-400">{error}</p>
        </div>
      );
    }
    
    if (!content) {
        return null; //for insurance
    }

    const { trailerKey, title, overview, providers } = content;

    return (
      <>
        {/* TRAILER SECTION */}
        <div className="relative w-full bg-black aspect-video">
          {trailerKey ? (
            <iframe
              title="Trailer"
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0&modestbranding=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-neutral-500 bg-neutral-900">
              <Film size={48} className="mb-2"/>
              <p>Trailer not available</p>
            </div>
          )}
        </div>

        {/* CONTENT INFO SECTION */}
        <div className="p-4 md:p-6 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{title}</h2>
          <p className="text-sm text-neutral-300 leading-relaxed">{overview || "No overview available."}</p>

          {/* WATCH OPTIONS */}
          {providers && providers.length > 0 && (
             <div>
                <h3 className="text-lg font-bold text-white mb-3">Watch Options:</h3>
                <div className="flex flex-wrap gap-3">
                  {providers.map((prov) => (
                    
                    //streaming opts
                    <a
                      key={prov.provider_name}
                      href={`https://www.google.com/search?q=${encodeURIComponent(title)} ${encodeURIComponent(prov.provider_name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-neutral-800 hover:bg-neutral-700 transition-colors text-white px-3 py-1.5 rounded-lg text-sm"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w45${prov.logo_path}`}
                        alt={`${prov.provider_name} logo`}
                        className="h-6 w-6 rounded-md"
                      />
                      <span>{prov.provider_name}</span>
                    </a>
                  ))}
                </div>
              </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onClose} // Close if clicked outside
    >
      <div
        className="bg-neutral-900 rounded-lg shadow-2xl overflow-hidden w-full max-w-3xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()} // dont close if inside
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-2 right-2 text-white bg-black/50 hover:bg-black/80 transition-colors rounded-full p-1 z-10"
        >
          <X size={20} />
        </button>
        
        <div className="overflow-y-auto custom-scrollbar">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ContentModal;
