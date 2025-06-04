
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

  // Create diagonal rows with duplicated content for seamless scrolling
  const createDiagonalRow = (startIndex: number, direction: 1 | 2) => {
    const rowMovies = [];
    for (let i = 0; i < 15; i++) {
      rowMovies.push(movies[(startIndex + i) % movies.length]);
    }
    // Duplicate for seamless scrolling
    return [...rowMovies, ...rowMovies];
  };

  const diagonalRows = [
    { movies: createDiagonalRow(0, 1), direction: 1 as const },
    { movies: createDiagonalRow(2, 2), direction: 2 as const },
    { movies: createDiagonalRow(4, 1), direction: 1 as const },
    { movies: createDiagonalRow(6, 2), direction: 2 as const },
    { movies: createDiagonalRow(8, 1), direction: 1 as const },
    { movies: createDiagonalRow(1, 2), direction: 2 as const },
    { movies: createDiagonalRow(3, 1), direction: 1 as const },
    { movies: createDiagonalRow(5, 2), direction: 2 as const }
  ];

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-black/60 z-10" />
      <div className="absolute inset-0">
        {diagonalRows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`absolute flex gap-6 ${
              row.direction === 1 ? 'animate-scroll-diagonal-1' : 'animate-scroll-diagonal-2'
            }`}
            style={{
              animationDelay: `${rowIndex * 2}s`,
              animationDuration: `${40 + rowIndex * 5}s`,
              top: `${rowIndex * 15}%`,
              left: `${rowIndex * -10}%`,
              transform: 'rotate(-15deg)'
            }}
          >
            {row.movies.map((movie, movieIndex) => (
              <MoviePoster
                key={`${rowIndex}-${movieIndex}`}
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
