import axios, { AxiosInstance } from "axios";
import {
  AddMovieDTO,
  FileWithPreview,
} from "../../../pages/admin/useAddMovieForm";
import { MovieGatewayInterface, Stats } from "../model/movie-gateway.interface";
import { MovieEntity, UploadMovieInterface } from "../model/movie.entity";
import { instance } from "../../api/api-instance";

export class ApiMovieGateway implements MovieGatewayInterface {
  axiosInstance: AxiosInstance;
  statsInstance: AxiosInstance;

  constructor() {
    const API_URL = "http://localhost:6969";

    this.statsInstance = axios.create({
      baseURL: API_URL,
      headers: { "Content-type": "application/json" },
      withCredentials: true,
    });
    this.axiosInstance = instance;
  }
  getMovie(movie_id: number): Promise<MovieEntity> {
    throw new Error("Method not implemented.");
  }

  async getStats(arg0: { movieID: number }): Promise<Stats> {
    const params = {
      movie_id: arg0.movieID.toString(),
    };
    const stats = (await this.statsInstance.post("/stats", params)).data;

    return stats.detail;
  }

  uploadPath: string = "";

  async getFavMovies({ email }: { email: string }): Promise<MovieEntity[]> {
    let responseData: {
      movie_id: string;
    }[];
    let movies: MovieEntity[] = [];
    try {
      const apiMovies = await this.getMovies();
      responseData = (await this.axiosInstance.get("/bookmark")).data;
      const book_movies_ids = responseData.map((movie: any) => movie.movie_id);
      movies = apiMovies.filter((movie) => book_movies_ids.includes(movie.id));
    } catch (error) {}

    return movies;
  }

  async getMovies(): Promise<MovieEntity[]> {
    const movies = (await this.axiosInstance.get("/movies")).data;
    return movies;
  }

  async searchMovies({
    title,
    genre,
  }: {
    title: string;
    genre: string;
  }): Promise<MovieEntity[]> {
    const moviesByTitle = (
      await this.axiosInstance.get("/search/?type_search=title&search=" + title)
    ).data;

    const moviesByGenre = (
      await this.axiosInstance.get("/search/?type_search=genre&search=" + genre)
    ).data;

    return genre ? moviesByGenre : moviesByTitle;
  }

  async create(movie: AddMovieDTO): Promise<void> {
    const params = {
      title: movie.title,
      genre: movie.genre,
      date: movie.date,
      picture: movie.picture,
    };

    const createdMovie: MovieEntity = (
      await this.axiosInstance.post("/movie", params)
    ).data;

    this.upload({
      movie_id: createdMovie.id,
      with_trailer: movie.with_trailer,
      callback_url: "http://localhost:3000",
      file: movie.file as FileWithPreview,
    });
  }
  updateMovie(movie: MovieEntity): Promise<MovieEntity> {
    return Promise.resolve(movie);
  }
  deleteMovie(movie_id: number): Promise<number> {
    return Promise.resolve(movie_id);
  }
  async upload(upload: UploadMovieInterface): Promise<void> {
    const formData = new FormData();
    formData.append("file", upload.file as File);
    await this.axiosInstance.post(
      "/upload?movie_id=" +
        +upload.movie_id +
        "&with_trailer=" +
        upload.with_trailer +
        "&callback_url=" +
        upload.callback_url,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }
}
