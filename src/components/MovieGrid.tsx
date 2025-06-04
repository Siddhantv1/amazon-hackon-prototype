
import MoviePoster from "./MoviePoster";

const MovieGrid = () => {
  // Sample movie data - in a real app, this would come from an API
  const movies = [
    { title: "Action Hero", imageUrl: "https://images.unsplash.com/photo-1518715394611-bc04fb6e3a98?w=400&h=600&fit=crop" },
    { title: "Mystery Night", imageUrl: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=600&fit=crop" },
    { title: "Adventure Quest", imageUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop" },
    { title: "Drama Story", imageUrl: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=400&h=600&fit=crop" },
    { title: "Sci-Fi Future", imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop" },
    { title: "Romance Tale", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop" },
    { title: "Thriller Night", imageUrl: "https://images.unsplash.com/photo-1516681100942-77d8e7f9dd97?w=400&h=600&fit=crop" },
    { title: "Comedy Gold", imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop" },
    { title: "Horror House", imageUrl: "https://images.unsplash.com/photo-1509647924025-db6b44e44c14?w=400&h=600&fit=crop" },
    { title: "Fantasy World", imageUrl: "https://images.unsplash.com/photo-1500856056008-859079534e9e?w=400&h=600&fit=crop" }
  ];

  // Create columns with duplicated content for seamless scrolling
  const createColumn = (startIndex: number, direction: 'up' | 'down') => {
    const columnMovies = [];
    for (let i = 0; i < 12; i++) {
      columnMovies.push(movies[(startIndex + i) % movies.length]);
    }
    // Duplicate for seamless scrolling
    return [...columnMovies, ...columnMovies];
  };

  const columns = [
    { movies: createColumn(0, 'up'), direction: 'up' as const },
    { movies: createColumn(2, 'down'), direction: 'down' as const },
    { movies: createColumn(4, 'up'), direction: 'up' as const },
    { movies: createColumn(6, 'down'), direction: 'down' as const },
    { movies: createColumn(8, 'up'), direction: 'up' as const },
    { movies: createColumn(1, 'down'), direction: 'down' as const },
    { movies: createColumn(3, 'up'), direction: 'up' as const }
  ];

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-black/60 z-10" />
      <div className="flex gap-4 justify-center items-start h-full -translate-x-24">
        {columns.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className={`flex flex-col ${
              column.direction === 'up' ? 'animate-scroll-up' : 'animate-scroll-down'
            }`}
            style={{
              animationDelay: `${columnIndex * 0.5}s`,
              animationDuration: `${20 + columnIndex * 2}s`
            }}
          >
            {column.movies.map((movie, movieIndex) => (
              <MoviePoster
                key={`${columnIndex}-${movieIndex}`}
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
