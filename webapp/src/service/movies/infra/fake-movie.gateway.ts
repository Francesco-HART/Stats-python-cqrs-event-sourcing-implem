import { AddMovieDTO } from "../../../pages/admin/useAddMovieForm";
import { buildMovie } from "../__tests__/movie.builder";
import { MovieGatewayInterface } from "../model/movie-gateway.interface";
import {
  MovieEntity,
  MovieGenre,
  UploadMovieInterface,
} from "../model/movie.entity";

export class FakeMovieGateway implements MovieGatewayInterface {
  getStats(arg0: { movieID: number }): Promise<{
    movie_id: number;
    total_book_mark: number;
    number_of_watch: number;
    number_of_pause: number;
    number_of_stop: number;
  }> {
    throw new Error("Method not implemented.");
  }
  upload(upload: UploadMovieInterface): Promise<void> {
    throw new Error("Method not implemented.");
  }
  movies: MovieEntity[] = [
    buildMovie({
      id: 1,
      genre: MovieGenre.ACTION,
      title: "Star Wars",
      picture: "star-wars.jpg",
      path: "star-wars.mp4",
      path_trailer: "star-wars-trailer.mp4",
      date: "2020-01-01",
      duration: 120,
    }),
    buildMovie({
      id: 2,
      genre: MovieGenre.ACTION,
      title: "Star A",
      picture: "star-wars.jpg",
      path: "star-wars.mp4",
      path_trailer: "star-wars-trailer.mp4",
      date: "2020-01-01",
      duration: 120,
    }),
    buildMovie({
      id: 3,
      genre: MovieGenre.ACTION,
      title: "Star S",
      picture: "star-wars.jpg",
      path: "star-wars.mp4",
      path_trailer: "star-wars-trailer.mp4",
      date: "2020-01-01",
      duration: 120,
    }),
    buildMovie({
      id: 4,
      genre: MovieGenre.ACTION,
      title: " Wars",
      picture: "star-wars.jpg",
      path: "star-wars.mp4",
      path_trailer: "star-wars-trailer.mp4",
      date: "2020-01-01",
      duration: 120,
    }),
  ];

  uploadPath: string = "";
  moviesInFav = [this.movies[0], this.movies[1]];

  getFavMovies({ email }: { email: string }): Promise<MovieEntity[]> {
    return Promise.resolve(this.moviesInFav);
  }

  getMovies(): Promise<MovieEntity[]> {
    return Promise.resolve(this.movies);
  }

  searchMovies({
    title,
    genre,
  }: {
    title: string;
    genre: string;
  }): Promise<MovieEntity[]> {
    return Promise.resolve(
      this.movies.filter((movie) => movie.title.includes(title))
    );
  }

  getMovie(movie_id: number): Promise<MovieEntity> {
    return Promise.resolve(this.movies.find((movie) => movie.id === movie_id)!);
  }
  async create(movie: AddMovieDTO): Promise<void> {
    this.movies.push(
      buildMovie({
        id: this.movies.length + 1,
        genre: movie.genre,
        title: movie.title,
        picture: "star-wars.jpg",
        path: "star-wars.mp4",
        path_trailer: "star-wars-trailer.mp4",
        date: "2020-01-01",
        duration: 120,
      })
    );
  }
  updateMovie(movie: MovieEntity): Promise<MovieEntity> {
    let index = this.movies.findIndex((movie) => movie.id === movie.id);
    this.movies[index] = movie;
    return Promise.resolve(movie);
  }
  deleteMovie(movie_id: number): Promise<number> {
    this.movies.filter((movie) => movie.id !== movie_id);
    return Promise.resolve(movie_id);
  }

  addToFavorites(arg0: { movieID: number }): Promise<void> {
    this.moviesInFav.push(
      this.movies.find((movie) => movie.id === arg0.movieID)!
    );
    return Promise.resolve();
  }

  removeFromFavorites(arg0: { movieID: number }): Promise<void> {
    this.moviesInFav.filter((movie) => movie.id !== arg0.movieID);
    return Promise.resolve();
  }
}
