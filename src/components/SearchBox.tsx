import React, { useState, useEffect, useRef } from 'react';

// --- TYPE DEFINITIONS ---
// Defines the structure of a single search result from the API.
interface SearchResult {
  id: number;
  media_type: 'movie' | 'tv';
  title?: string; // Movies have 'title'
  name?: string; // TV shows have 'name'
  poster_path: string | null;
  release_date?: string; // Movies have 'release_date'
  first_air_date?: string; // TV shows have 'first_air_date'
  overview: string;
}

// Defines the props for the main SearchBox component.
interface SearchBoxProps {
  onSelect: (item: { id: number; media_type: 'movie' | 'tv' }) => void;
  onClose: () => void;
}

// Defines the props for each individual result item in the list.
interface ResultItemProps {
  item: SearchResult;
  onSelect: (item: { id: number; media_type: 'movie' | 'tv' }) => void;
}

// --- CUSTOM HOOKS ---
/**
 * Custom hook to debounce a value.
 * @param value The value to debounce.
 * @param delay The debounce delay in milliseconds.
 * @returns The debounced value.
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function to cancel the timeout if the value changes.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Custom hook to handle the search logic, including fetching, state, and aborting requests.
 * @param query The search query.
 * @returns An object with the current search state (loading, results, error).
 */
function useSearch(query: string) {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<SearchResult[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Use AbortController to cancel previous fetch requests.
        const controller = new AbortController();
        const { signal } = controller;

        const runSearch = async () => {
            if (!query) {
                setResults([]);
                setError(null);
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                // The URL to your backend API endpoint.
                const res = await fetch(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}`, { signal });
                
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                
                const data = await res.json();

                if (Array.isArray(data.results)) {
                    // Filter for only movies and TV shows and sort them by popularity.
                    const filteredResults = data.results
                        .filter((item: any) => (item.media_type === 'movie' || item.media_type === 'tv') && item.poster_path)
                        .sort((a: any, b: any) => b.popularity - a.popularity);
                    setResults(filteredResults);
                } else {
                    setResults([]);
                }
            } catch (err: any) {
                // Don't set an error state if the request was aborted.
                if (err.name !== 'AbortError') {
                    console.error(err);
                    setError('Search failed. Please try again.');
                    setResults([]);
                }
            } finally {
                setLoading(false);
            }
        };

        runSearch();

        // Cleanup function to abort the fetch request if the component unmounts or the query changes.
        return () => {
            controller.abort();
        };
    }, [query]); // This effect re-runs whenever the debounced query changes.

    return { loading, results, error };
}


// --- UI COMPONENTS ---

// A skeleton loader component
const SkeletonLoader: React.FC = () => (
  <div className="flex items-center p-3 space-x-4 animate-pulse">
    <div className="w-12 h-16 bg-neutral-700 rounded-md"></div>
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-neutral-700 rounded w-3/4"></div>
      <div className="h-3 bg-neutral-700 rounded w-1/2"></div>
    </div>
  </div>
);

//Renders a single search result item with a poster, title, and year.
const ResultItem: React.FC<ResultItemProps> = ({ item, onSelect }) => {
  const title = item.title || item.name;
  const year = item.release_date?.substring(0, 4) || item.first_air_date?.substring(0, 4);
  const posterUrl = `https://image.tmdb.org/t/p/w92${item.poster_path}`;

  return (
    <li
      className="flex items-center p-3 space-x-4 hover:bg-neutral-800 cursor-pointer rounded-lg transition-colors duration-200"
      onClick={() => onSelect({ id: item.id, media_type: item.media_type })}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect({ id: item.id, media_type: item.media_type })}
    >
      <img 
        src={posterUrl} 
        alt={`Poster for ${title}`} 
        className="w-12 h-16 object-cover rounded-md bg-neutral-700 flex-shrink-0"
        loading="lazy"
        onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/92x138/171717/666666?text=N/A'; }}
      />
      <div className="overflow-hidden">
        <p className="text-white font-semibold truncate">{title}</p>
        <p className="text-neutral-400 text-sm">{year}</p>
      </div>
    </li>
  );
};


// --- MAIN COMPONENT ---
export default function SearchBox({ onSelect, onClose }: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 350); // Debounce user input
  const { loading, results, error } = useSearch(debouncedQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input when the component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const renderContent = () => {
    if (loading) {
      return Array.from({ length: 5 }).map((_, index) => <SkeletonLoader key={index} />);
    }
    if (error) {
      return <p className="p-4 text-center text-red-400">{error}</p>;
    }
    if (results.length > 0) {
      return results.map(item => (
        <ResultItem key={`${item.media_type}-${item.id}`} item={item} onSelect={onSelect} />
      ));
    }
    if (debouncedQuery && !loading) {
      return (
         <div className="text-center p-10 text-neutral-500">
            <p className="font-semibold">No results for "{debouncedQuery}"</p>
            <p className="text-sm">Try searching for something else.</p>
        </div>
      );
    }
    return (
        <div className="text-center p-10 text-neutral-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <p className="mt-2 font-semibold">Search for a movie or TV show</p>
            <p className="text-sm">Find literally anything to watch.</p>
        </div>
    );
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-start justify-center pt-16 md:pt-24 px-4"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-neutral-900 rounded-xl shadow-2xl flex flex-col overflow-hidden transform transition-all duration-300 ease-out animate-fade-in-down"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Area */}
        <div className="flex items-center p-4 border-b border-neutral-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-neutral-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input
                ref={inputRef}
                autoComplete="off"
                type="text"
                placeholder=" The Matrix, Breaking Bad..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full text-lg bg-transparent text-white placeholder-neutral-500 outline-none"
            />
            <button 
                className="ml-4 text-neutral-400 hover:text-white transition-colors text-2xl" 
                onClick={onClose}
                aria-label="Close search"
            >
                &times;
            </button>
        </div>

        {/* Results Area */}
        <ul className="overflow-y-auto max-h-[60vh]">
          {renderContent()}
        </ul>
      </div>
       <style>{`
            @keyframes fade-in-down {
                0% {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            .animate-fade-in-down {
                animation: fade-in-down 0.3s ease-out forwards;
            }
        `}</style>
    </div>
  );
}
