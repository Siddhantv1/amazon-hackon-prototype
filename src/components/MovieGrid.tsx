import React from 'react';
import MoviePoster from "./MoviePoster";

// --- SUGGESTION FOR MORE POSTERS ---
// To add more variety, move this array into a separate file (e.g., `src/data/movies.ts`)
// and import it here. Then you can easily add or remove movies without
// changing the component's code. More posters will improve the randomness.
const movies = [
  { title: "Prestige", imageUrl: "https://i.pinimg.com/736x/4f/4d/fa/4f4dfabe5c46358c8d821bd2716e8186.jpg" },
  { title: "John Wick 4", imageUrl: "https://cosmicbook.news/wp-content/uploads/2022/11/john-wick-4-poster.jpg" },
  { title: "Breaking Bad", imageUrl: "https://m.media-amazon.com/images/M/MV5BMzU5ZGYzNmQtMTdhYy00OGRiLTg0NmQtYjVjNzliZTg1ZGE4XkEyXkFqcGc@._V1_.jpg" },
  { title: "Into The Wild", imageUrl: "https://image.tmdb.org/t/p/original/aeisAaf2JVhJuCAQqIJN9vRdtGg.jpg" },
  { title: "Inglourious Basterds", imageUrl: "https://image.tmdb.org/t/p/original/7TdTYRPKf0FlYSbRCZmCoD6jDNX.jpg" },
  { title: "Matrix", imageUrl: "https://movieposterhub.com/cdn/shop/files/japanese_b2_matrix.jpg?v=1707461762" },
  { title: "Interstellar", imageUrl: "https://m.media-amazon.com/images/I/81kz06oSUeL.jpg" },
  { title: "Fight Club", imageUrl: "https://www.tallengestore.com/cdn/shop/products/Fight_Club_-_Brad_Pitt_-_Ed_Norton_-_Hollywood_Cult_Classic_English_Movie_Poster_9a97cd80-ac93-4b18-9952-eb37b636a1c2.jpg?v=1591602945" },
  { title: "Mr Robot", imageUrl: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p14461667_b_v8_aa.jpg" },
  { title: "Flow", imageUrl: "https://image.tmdb.org/t/p/original/imKSymKBK7o73sajciEmndJoVkR.jpg" },
  { title: "Oppenheimer", imageUrl: "https://www.themoviedb.org/t/p/original/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg" },
];

// Utility function to shuffle an array (Fisher-Yates shuffle algorithm)
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Swap elements
  }
  return newArray;
};

const MovieGrid = () => {
  // We use React.useMemo to create and shuffle the columns only once.
  // This prevents the order from changing on every component re-render.
  const columns = React.useMemo(() => {
    const numColumns = 7;
    
    // Function to create a single column with a unique random order
    const createColumn = () => {
      const shuffled = shuffleArray(movies);
      // Duplicate the shuffled array to ensure seamless looping
      return [...shuffled, ...shuffled];
    };

    return Array.from({ length: numColumns }).map((_, index) => ({
      movies: createColumn(),
      // Alternate scrolling direction for visual interest
      direction: index % 2 === 0 ? 'up' as const : 'down' as const,
    }));
  }, []); // The empty dependency array [] means this runs only on the initial render.

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-black/70 z-10" />
      <div className="flex gap-4 justify-center items-start h-full -translate-x-24">
        {columns.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className={`flex flex-col gap-4 ${ // Added gap between posters
              column.direction === 'up' ? 'animate-scroll-up' : 'animate-scroll-down'
            }`}
            style={{
              // MODIFICATION: Increased animation duration to make it much slower.
              // We use a base duration and add a variable amount to make each
              // column scroll at a slightly different speed.
              animationDuration: `${60 + columnIndex * 15}s`,
            }}
          >
            {column.movies.map((movie, movieIndex) => (
              <MoviePoster
                key={`${columnIndex}-${movie.title}-${movieIndex}`}
                title={movie.title}
                imageUrl={movie.imageUrl}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;