import { createAppAsyncThunk } from "../../create-app-thunk";

export const getMovieStats = createAppAsyncThunk(
  "movie/stats",
  async (
    { movieID }: { movieID: number },
    { extra: { movieGateway, authGateway } }
  ) => {
    const currentAuth = await authGateway.getCurrentAuth();

    if (currentAuth.role === "admin")
      return await movieGateway.getStats({ movieID });
  }
);
