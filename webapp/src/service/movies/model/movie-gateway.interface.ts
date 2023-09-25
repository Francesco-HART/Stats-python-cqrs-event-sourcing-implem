import { AddMovieDTO } from "../../../pages/admin/useAddMovieForm.ts";
import { MovieEntity, UploadMovieInterface } from "./movie.entity.ts";

export type Stats = {
  movie_id: number;
  total_book_mark: number;
  number_of_watch: number;
  number_of_pause: number;
  number_of_stop: number;
};

export interface MovieGatewayInterface {
  getStats(arg0: { movieID: number }): Promise<Stats>;
  getFavMovies({ email }: { email: string }): Promise<MovieEntity[]>;
  searchMovies({
    title,
    genre,
  }: {
    title: string;
    genre: string;
  }): Promise<MovieEntity[]>;
  getMovies(): Promise<MovieEntity[]>;
  getMovie(movie_id: number): Promise<MovieEntity>;
  create(movie: AddMovieDTO): Promise<void>;
  updateMovie(movie: MovieEntity): Promise<MovieEntity>;
  deleteMovie(movie_id: number): Promise<number>;
  upload(upload: UploadMovieInterface): Promise<void>;
}
