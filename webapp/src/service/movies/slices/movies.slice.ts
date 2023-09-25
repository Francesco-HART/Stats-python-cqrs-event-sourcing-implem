import { EntityState, createSlice } from "@reduxjs/toolkit";
import {
  MovieEntity,
  MovieFavEntity,
  movieAdapter,
} from "../model/movie.entity";
import {
  arrengeMoviesFav,
  createMovie,
  getMovies,
} from "../usecases/movie.usecase";
import { ActionsState } from "../../create-store";
import { addMovieToFavorites } from "../usecases/add-to-fav.usecase";
import { removeMovieToFavorites } from "../usecases/remove-to-fav";
import { getMovieStats } from "../usecases/get-movie-stats.usecase";

export type MoviesSliceState = EntityState<MovieEntity> & {
  movies: MovieFavEntity[];
  isLoading: boolean;
  isError: boolean;
  movieStats: any;
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState: movieAdapter.getInitialState() as MoviesSliceState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getMovies.pending, (state, _) => {
      setUserTimelineLoadingState(state, { loading: true });
    });

    builder.addCase(arrengeMoviesFav.fulfilled, (state, action) => {
      state.movies = action.payload;
      state.isLoading = false;
    });

    builder.addCase(addMovieToFavorites.pending, (state, action) => {
      addMovieToFavoritesState(state, action);
      state.isLoading = false;
    });

    builder.addCase(addMovieToFavorites.rejected, (state, action) => {
      removeMovieToFavoritesState(state, action);
      state.isLoading = false;
    });

    // Optimistic update
    builder.addCase(removeMovieToFavorites.pending, (state, action) => {
      removeMovieToFavoritesState(state, action);
      state.isLoading = false;
    });

    builder.addCase(removeMovieToFavorites.rejected, (state, action) => {
      addMovieToFavoritesState(state, action);
      state.isLoading = false;
    });
  },
});

const addMovieToFavoritesState = (state: MoviesSliceState, action: any) =>
  state.movies.map((movie) => {
    if (movie.id === action.meta.arg.movieID) {
      movie.isInFav = true;
    }
    return movie;
  });

const removeMovieToFavoritesState = (state: MoviesSliceState, action: any) =>
  state.movies.map((movie) => {
    if (movie.id === action.meta.arg.movieID) {
      movie.isInFav = false;
    }
    return movie;
  });

const setUserTimelineLoadingState = (
  state: MoviesSliceState,
  { loading }: { loading: boolean }
) => {
  state.isLoading = loading;
};

export const selectMoviesIsLoading = (state: ActionsState): boolean =>
  state.movies.isLoading;

export const selectMovies = (state: ActionsState) => state.movies.movies;

export const selectMoviesIsError = (state: ActionsState) =>
  state.movies.isError;

export const selectMovie = (
  state: ActionsState,
  movieID: number
): MovieFavEntity | undefined => {
  if (state.movies.movies !== undefined && state.movies.movies.length > 0)
    return state.movies.movies.find((movie) => movie.id === movieID);
};
