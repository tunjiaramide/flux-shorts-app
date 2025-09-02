import { Movie } from '@/types/movie';

const API_BASE_URL = 'https://d15h87wcd8.execute-api.us-east-1.amazonaws.com/prod';

export const movieService = {
  async getAllMovies(): Promise<Movie[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/movies`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        mode: 'cors',
      });
      
      if (!response.ok) {
        console.error('API Response not ok:', response.status, response.statusText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const movies: Movie[] = await response.json();
      console.log('Movies loaded successfully:', movies.length);
      return movies;
    } catch (error) {
      console.error('Error fetching movies:', error);
      console.error('Full error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      // Return empty array instead of throwing to prevent app crashes
      return [];
    }
  },

  async getMovieById(id: string): Promise<Movie | null> {
    try {
      const movies = await this.getAllMovies();
      return movies.find(movie => movie.id === id) || null;
    } catch (error) {
      console.error('Error fetching movie by ID:', error);
      return null;
    }
  },

  async getFeaturedMovies(): Promise<Movie[]> {
    try {
      const movies = await this.getAllMovies();
      return movies.slice(0, 3);
    } catch (error) {
      console.error('Error fetching featured movies:', error);
      return [];
    }
  },

  async getRecentMovies(): Promise<Movie[]> {
    try {
      const movies = await this.getAllMovies();
      return movies.slice(3);
    } catch (error) {
      console.error('Error fetching recent movies:', error);
      return [];
    }
  },

  async getMoviesByGenre(genre: string, excludeId?: string): Promise<Movie[]> {
    try {
      const movies = await this.getAllMovies();
      return movies.filter(movie => 
        movie.metadata.genre === genre && movie.id !== excludeId
      );
    } catch (error) {
      console.error('Error fetching movies by genre:', error);
      return [];
    }
  }
};