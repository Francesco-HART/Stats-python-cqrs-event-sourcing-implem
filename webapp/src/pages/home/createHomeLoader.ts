import { LoaderFunction } from "react-router-dom";
import { AppStore } from "../../service/create-store";
import { getMovies } from "../../service/movies/usecases/movie.usecase";

export const createHomeLoader =
  ({ store }: { store: AppStore }): LoaderFunction =>
  () => {
    store.dispatch(getMovies());
    return null;
  };
