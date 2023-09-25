import { AuthGatewayInterface } from "./auth/model/authGatewayInterface.ts";
import { BookMarkGatewayInterface } from "./movies/model/book-mark.gateway.ts";
import { MovieGatewayInterface } from "./movies/model/movie-gateway.interface.ts";
import { PlayerGatewayInterface } from "./player/model/player.gateway.ts";
import { rootReducer } from "./rootReducer";
import { AnyAction, ThunkDispatch, configureStore } from "@reduxjs/toolkit";

export type Dependencies = {
  authGateway: AuthGatewayInterface;
  movieGateway: MovieGatewayInterface;
  playerGateway: PlayerGatewayInterface;
  bookMarkGateway: BookMarkGatewayInterface;
};

// Creation du store avec les différentes dependences
export const createStore = (dependencies: Dependencies) =>
  configureStore({
    reducer: rootReducer,
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware({
        thunk: {
          extraArgument: dependencies,
        },
      });
    },
  });

export type AppStore = ReturnType<typeof createStore>;
export type ActionsState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<ActionsState, Dependencies, AnyAction>;
