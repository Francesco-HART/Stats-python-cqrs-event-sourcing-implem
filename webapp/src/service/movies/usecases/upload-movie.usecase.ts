import { AddMovieDTO } from "../../../pages/admin/useAddMovieForm";
import { createAppAsyncThunk } from "../../create-app-thunk";
import { getMovies } from "./movie.usecase";

export const getMovie = createAppAsyncThunk(
  "movie/getMovie",
  async (
    { dto }: { dto: AddMovieDTO },
    { extra: { movieGateway }, dispatch }
  ) => {
    await movieGateway.create(dto);
    dispatch(getMovies());
  }
);
