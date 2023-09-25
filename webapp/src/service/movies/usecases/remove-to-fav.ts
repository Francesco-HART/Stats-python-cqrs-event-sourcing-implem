import { createAppAsyncThunk } from "../../create-app-thunk";

export const removeMovieToFavorites = createAppAsyncThunk(
  "movie/removeToFavorites",
  async (
    { movieID }: { movieID: number },
    { extra: { bookMarkGateway, authGateway } }
  ): Promise<void> => {
    const currentAuthUser = await authGateway.getCurrentAuth();
    await bookMarkGateway.removeFromFavorites({
      email: currentAuthUser.email,
      movieID,
    });
  }
);
