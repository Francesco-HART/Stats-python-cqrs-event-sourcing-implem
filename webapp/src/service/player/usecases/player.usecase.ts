import { createAppAsyncThunk } from "../../create-app-thunk";

// cette usecase est une action avec des états (pending, fullfild...) en fonction des etats de l'action le reducer met à jour le store
export const getCurrentPlayerState = createAppAsyncThunk(
  "player/getCurrentState",
  async ({ movieID }: { movieID: number }, { extra: { playerGateway } }) => {
    return await playerGateway.getCurrentState({ movieID });
  }
);

export const pausePlayer = createAppAsyncThunk(
  "player/pause",
  async (
    params: { movieID: number },
    { extra: { playerGateway, authGateway } }
  ) => {
    return await playerGateway.pause({
      movieID: params.movieID,
    });
  }
);

export const playPlayer = createAppAsyncThunk(
  "player/play",
  async (
    params: { movieID: number },
    { extra: { playerGateway, authGateway } }
  ) => {
    return await playerGateway.play({
      movieID: params.movieID,
    });
  }
);

export const stopPlayer = createAppAsyncThunk(
  "player/stop",
  async (
    params: { movieID: number },
    { extra: { playerGateway, authGateway } }
  ) => {
    return await playerGateway.stop({
      movieID: params.movieID,
    });
  }
);
