import { createAppAsyncThunk } from "../../create-app-thunk";
import { arrengeMoviesFav } from "./movie.usecase";

export const searchMoviesUsecase = createAppAsyncThunk(
  "movie/search",
  async (
    { title, genre }: { title: string; genre: string },
    { extra: { movieGateway }, dispatch }
  ): Promise<void> => {
    const movies = await movieGateway.searchMovies({ title, genre: genre });
    console.log({
      genre,
      title,
    });

    await dispatch(arrengeMoviesFav({ movies }));
  }
);
