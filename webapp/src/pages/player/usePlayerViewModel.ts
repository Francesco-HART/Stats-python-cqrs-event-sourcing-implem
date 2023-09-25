import { selectAuthCompany } from "../../service/auth/reducer";
import { AppDispatch, ActionsState } from "../../service/create-store";
import { Stats } from "../../service/movies/model/movie-gateway.interface";
import { selectStats } from "../../service/movies/reducer";
import { selectMovie } from "../../service/movies/slices/movies.slice";
import {
  selectPlayedLoading,
  selectPlayer,
  selectPlayerIsNotFetched,
} from "../../service/player/reducer";
import {
  getCurrentPlayerState,
  pausePlayer,
  playPlayer,
  stopPlayer,
} from "../../service/player/usecases/player.usecase";

export enum PlayerViewModelType {
  PlayerLoading = "PlayerLoading",
  PlayerFailed = "PlayerFailed",
  PlayerLoaded = "PlayerLoaded",
}

const createViewModel = <T extends PlayerViewModelType>({
  type,
  isLoading = false,
  isError = false,
  isLoaded = false,
}: {
  type: T;
  isLoading?: boolean;
  isError?: boolean;
  isLoaded?: boolean;
}): PlayersViewModel =>
  ({
    type,
    isLoading,
    isError,
    isLoaded,
  } as PlayersViewModel);

export type PlayersViewModel = {
  isLoading?: boolean;

  isError?: boolean;
  isLoaded?: boolean;
} & (
  | {
      type: PlayerViewModelType.PlayerLoading;
    }
  | {
      type: PlayerViewModelType.PlayerFailed;
      message: string;
    }
  | {
      type: PlayerViewModelType.PlayerLoaded;
      player: {
        status: "paused" | "stopped" | "started";
        url: string;
      };
      stats: Stats;
      onPausePlayer: () => void;
      onPlayPlayer: () => void;
      onStopPlayer: () => void;
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
    getCurrentPlayerState({
      movieID,
    })
  );
  return createViewModel({
    type: PlayerViewModelType.PlayerLoading,
    isError: true,
  });
};

export const usePlayerViewModel =
  ({ dispatch, movieID }: { dispatch: AppDispatch; movieID: string }) =>
  (state: ActionsState): PlayersViewModel => {
    const movie = selectMovie(state, +movieID);
    const playerIsNotFetched = selectPlayerIsNotFetched(state);
    const player = selectPlayer(state);
    const authUser = selectAuthCompany(state);
    const movieStats = selectStats(state);

    if (playerIsNotFetched) {
      loader({ dispatch, movieID: +movieID });
    }

    if (movie === undefined) {
      return createViewModel({
        type: PlayerViewModelType.PlayerLoading,
        isError: true,
      });
    }

    return {
      type: PlayerViewModelType.PlayerLoaded,
      player: {
        status: player.state,
        url: player.url,
      },
      stats: authUser?.id === "admin" ? movieStats : {},
      onPausePlayer: () => {
        dispatch(
          pausePlayer({
            movieID: +movieID,
          })
        );
      },
      onPlayPlayer: () => {
        dispatch(playPlayer({ movieID: +movieID }));
      },
      onStopPlayer: () => {
        dispatch(
          stopPlayer({
            movieID: +movieID,
          })
        );
      },
    };
  };
