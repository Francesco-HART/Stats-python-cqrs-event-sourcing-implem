import { ActionsState, AppDispatch } from "../../service/create-store";
import {
  MovieEntity,
  MovieFavEntity,
} from "../../service/movies/model/movie.entity";
import {
  selectMovies,
  selectMoviesIsError,
  selectMoviesIsLoading,
} from "../../service/movies/slices/movies.slice";
import { searchMoviesUsecase } from "../../service/movies/usecases/search-movies.usecase";

export enum MoviesViewModelType {
  MoviesLoading = "MoviesLoading",
  MoviesFailed = "MoviesFailed",
  MoviesLoaded = "MoviesLoaded",
}

const createViewModel = <T extends MoviesViewModelType>({
  type,
  isLoading = false,
  isError = false,
  isLoaded = false,
}: {
  type: T;
  isLoading?: boolean;
  isError?: boolean;
  isLoaded?: boolean;
}): MoviesViewModel =>
  ({
    type,
    isLoading,
    isError,
    isLoaded,
  } as MoviesViewModel);

export type MoviesViewModel = {
  isLoading?: boolean;
  isError?: boolean;
  isLoaded?: boolean;
} & (
  | {
      type: MoviesViewModelType.MoviesLoading;
    }
  | {
      type: MoviesViewModelType.MoviesFailed;
      message: string;
    }
  | {
      type: MoviesViewModelType.MoviesLoaded;
      movies: MovieFavEntity[];
      onMovieClick: (movie: MovieFavEntity) => void;
      onSearchMovie: (search: { title: string; genre: string }) => void;
    }
);

export const useHomeViewModel =
  ({ dispatch }: { dispatch: AppDispatch }) =>
  (state: ActionsState): MoviesViewModel => {
    const isErrorLoadingMovies = selectMoviesIsError(state);
    const isLoadingMovies = selectMoviesIsLoading(state);

    if (isErrorLoadingMovies)
      return createViewModel({
        type: MoviesViewModelType.MoviesFailed,
        isError: true,
      });

    if (isLoadingMovies)
      return createViewModel({
        type: MoviesViewModelType.MoviesLoading,
        isLoading: true,
      });

    return {
      movies: selectMovies(state),
      onMovieClick: (movie: MovieFavEntity) => {
        dispatch({ type: "movie/setMovie", payload: movie });
      },
      onSearchMovie: ({ title, genre }: { title: string; genre: string }) => {
        console.log({
          title,
          genre,
        });

        dispatch(searchMoviesUsecase({ title: title, genre }));
      },
      type: MoviesViewModelType.MoviesLoaded,
    };
  };
