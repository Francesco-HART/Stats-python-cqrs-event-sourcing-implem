import { createReducer } from "@reduxjs/toolkit";
import { MovieEntity } from "./model/movie.entity.ts";
import { getMovieStats } from "./usecases/get-movie-stats.usecase.ts";
import { ActionsState } from "../create-store.ts";

export type MovieState = {
  isLoading: boolean;
  movie: MovieEntity;
  stats: any;
  isNotFetched: boolean;
};

export const reducer = createReducer<MovieState>(
  {
    movie: {} as MovieEntity,
    stats: {},
    isLoading: false,
    isNotFetched: true,
  },
  (builder) => {
    builder.addCase(getMovieStats.pending, (state, _) => {
      state.isNotFetched = false;
      state.isLoading = true;
    });

    builder.addCase(getMovieStats.fulfilled, (state, action) => {
      state.isLoading = false;
      state.stats = action.payload;
    });
    builder.addCase(getMovieStats.rejected, (state, _) => {
      state.isLoading = false;
    });
  }
);

export const selectStats = (state: ActionsState) => state.movie.stats;
const selectStatsIsNotFeteched = (state: { movie: MovieState }) =>
  state.movie.isNotFetched;
const selectStatsIsLoading = (state: { movie: MovieState }) =>
  state.movie.isLoading;
