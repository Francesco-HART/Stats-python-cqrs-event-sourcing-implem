import { createReducer } from "@reduxjs/toolkit";
import { ActionsState } from "../create-store";
import {
  getCurrentPlayerState,
  pausePlayer,
  playPlayer,
  stopPlayer,
} from "./usecases/player.usecase.ts";
import { s } from "vitest/dist/reporters-5f784f42.js";

export type PlayerState = {
  player: {
    state: "started" | "stopped" | "paused";
    url: string;
  };
  isLoading: boolean;
  isNotFetched: boolean;
};

export const reducer = createReducer<PlayerState>(
  {
    player: {
      state: "started",
      url: "",
    },
    isLoading: false,
    isNotFetched: true,
  },
  (builder) => {
    builder.addCase(getCurrentPlayerState.pending, (state, _) => {
      state.isLoading = true;
      state.isNotFetched = false;
    });

    builder.addCase(getCurrentPlayerState.fulfilled, (state, action) => {
      state.isLoading = false;

      state.player = action.payload;
    });
    builder.addCase(getCurrentPlayerState.rejected, (state, _) => {
      state.isLoading = false;
    });

    builder.addCase(playPlayer.fulfilled, (state, action) => {
      state.isLoading = false;
      state.player.state = "started";
    });
    builder.addCase(playPlayer.rejected, (state, _) => {
      state.isLoading = false;
      state.player.state = "paused";
    });

    builder.addCase(pausePlayer.fulfilled, (state, action) => {
      state.isLoading = false;
      state.player.state = "paused";
    });
    builder.addCase(pausePlayer.rejected, (state, _) => {
      state.isLoading = false;
      state.player.state = "paused";
    });

    builder.addCase(stopPlayer.fulfilled, (state, action) => {
      state.isLoading = false;
      state.player.state = "stopped";
    });
    builder.addCase(stopPlayer.rejected, (state, _) => {
      state.isLoading = false;
      state.player.state = "stopped";
    });
  }
);

// selector vont chercher l'information dans le state
export const selectPlayer = (state: ActionsState) => state.player.player;
export const selectPlayedLoading = (state: ActionsState) =>
  state.player.isLoading;
export const selectPlayerIsNotFetched = (state: ActionsState) =>
  state.player.isNotFetched;
