import { AddMovieDTO } from "../../../pages/admin/useAddMovieForm.ts";
import { createAppAsyncThunk } from "../../create-app-thunk.ts";
import {
  MovieEntity,
  MovieFavEntity,
  UploadMovieInterface,
} from "../model/movie.entity.ts";
import { selectMovie } from "../slices/movies.slice.ts";

export const getMovies = createAppAsyncThunk(
  "movie/getMovies",
  async (_, { extra: { movieGateway }, dispatch }): Promise<void> => {
    const movies = await movieGateway.getMovies();

    await dispatch(arrengeMoviesFav({ movies }));
  }
);

export const arrengeMoviesFav = createAppAsyncThunk(
  "movie/arrengeMoviesFav",
  async (
    params: { movies: MovieEntity[] },
    { extra: { movieGateway, authGateway } }
  ): Promise<MovieFavEntity[]> => {
    const currentAuthUser = await authGateway.getCurrentAuth();
    const moviesFav: MovieEntity[] = await movieGateway.getFavMovies({
      email: currentAuthUser.email,
    });

    const arrengeMoviesFav = params.movies.map((movie) => {
      let isInFav = moviesFav.find((m) => m.id === movie.id) ? true : false;
      return {
        ...movie,
        isInFav,
      };
    });
    return arrengeMoviesFav;
  }
);

export const getMovie = createAppAsyncThunk(
  "movie/getMovie",
  async ({ movieID }: { movieID: number }, { getState }) => {
    return selectMovie(getState(), movieID);
  }
);

export const createMovie = createAppAsyncThunk(
  "movie/create",
  async (dto: AddMovieDTO, { extra: { movieGateway } }) => {
    return await movieGateway.create(dto);
  }
);

export const updateMovie = createAppAsyncThunk(
  "movie/update",
  async (movie: MovieEntity, { extra: { movieGateway } }) => {
    return await movieGateway.updateMovie(movie);
  }
);

export const uploadMovie = createAppAsyncThunk(
  "movie/upload",
  async (upload: UploadMovieInterface, { extra: { movieGateway } }) => {
    return await movieGateway.upload(upload);
  }
);

export const deleteMovie = createAppAsyncThunk(
  "movie/delete",
  async ({ movie_id }: { movie_id: number }, { extra: { movieGateway } }) => {
    return await movieGateway.deleteMovie(movie_id);
  }
);
