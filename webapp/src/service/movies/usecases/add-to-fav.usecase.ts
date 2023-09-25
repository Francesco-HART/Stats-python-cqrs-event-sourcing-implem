import { createAppAsyncThunk } from "../../create-app-thunk";

export const addMovieToFavorites = createAppAsyncThunk(
  "movie/addToFavorites",
  async (
    { movieID }: { movieID: number },
    { extra: { bookMarkGateway, authGateway } }
  ): Promise<void> => {
    const currentAuthUser = await authGateway.getCurrentAuth();
    await bookMarkGateway.addToFavorites({
      email: currentAuthUser.email,
      movieID,
    });
  }
);
