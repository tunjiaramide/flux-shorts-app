export interface Movie {
  id: string;
  thumbnailUrl: string;
  title: string;
  metadata: {
    genre: string;
    year: number;
  };
  videoUrl: string;
}