import { AppDispatch, ActionsState } from "../../service/create-store";
import { MovieFavEntity } from "../../service/movies/model/movie.entity";
import {
  selectMovie,
  selectMoviesIsLoading,
} from "../../service/movies/slices/movies.slice";
import { addMovieToFavorites } from "../../service/movies/usecases/add-to-fav.usecase";
import { getMovieStats } from "../../service/movies/usecases/get-movie-stats.usecase";
import { removeMovieToFavorites } from "../../service/movies/usecases/remove-to-fav";
import { selectPlayerIsNotFetched } from "../../service/player/reducer";

export enum MovieViewModelType {
  MovieLoading = "MovieLoading",
  MovieFailed = "MovieFailed",
  MovieLoaded = "MovieLoaded",
}

const createViewModel = <T extends MovieViewModelType>({
  type,
  isLoading = false,
  isError = false,
  isLoaded = false,
}: {
  type: T;
  isLoading?: boolean;
  isError?: boolean;
  isLoaded?: boolean;
}): MovieViewModel =>
  ({
    type,
    isLoading,
    isError,
    isLoaded,
  } as MovieViewModel);

export type MovieViewModel = {
  isLoading?: boolean;
  isError?: boolean;
  isLoaded?: boolean;
} & (
  | {
      type: MovieViewModelType.MovieLoading;
    }
  | {
      type: MovieViewModelType.MovieFailed;
      message: string;
    }
  | {
      type: MovieViewModelType.MovieLoaded;
      movie: MovieFavEntity;
      addToFavorites: () => void;
      removeFromFavorites: () => void;
    }
);

const loader = ({
  dispatch,
  movieID,
}: {
  movieID: number;
  dispatch: AppDispatch;
}) => {
  dispatch(
    getMovieStats({
      movieID,
    })
  );
  return createViewModel({
    type: MovieViewModelType.MovieLoading,
    isError: true,
  });
};

export const useMovieViewModel =
  ({ dispatch, movieID }: { dispatch: AppDispatch; movieID: string }) =>
  (state: ActionsState): MovieViewModel => {
    const movie = selectMovie(state, +movieID);
    const isLoading = selectMoviesIsLoading(state);

    const isNotFetched = selectPlayerIsNotFetched(state);

    if (isNotFetched) loader({ dispatch, movieID: +movieID });

    if (isLoading) {
      return createViewModel({
        type: MovieViewModelType.MovieLoading,
        isLoading: true,
      });
    }

    if (movie === undefined) {
      return createViewModel({
        type: MovieViewModelType.MovieFailed,
        isError: true,
      });
    }

    return {
      type: MovieViewModelType.MovieLoaded,
      movie: movie as MovieFavEntity,
      addToFavorites: () =>
        dispatch(addMovieToFavorites({ movieID: movie.id })),
      removeFromFavorites: () =>
        dispatch(removeMovieToFavorites({ movieID: movie.id })),
    };
  };
