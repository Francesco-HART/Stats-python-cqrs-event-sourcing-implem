import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createRouter } from "./navigation/router.tsx";
import { createStore } from "./service/create-store.ts";
import { AuthGateway } from "./service/auth/infra/auth.gateway.ts";
import { ApiMovieGateway } from "./service/movies/infra/api-movie.gateway.ts";
import { ApiBookMarkGateway } from "./service/movies/infra/api-book-mark.gateway.ts";
import { ApiPlayerGateway } from "./service/player/infra/api-player-api.gateway.ts";
import { instance } from "./service/api/api-instance.ts";
const authGateway = new AuthGateway();
//authGateway.authUser = { email: "bob@bob.fr", role: "admin" };

const movieGateway = new ApiMovieGateway();
const bookMarkGateway = new ApiBookMarkGateway();
const playerGateway = new ApiPlayerGateway(instance);
const store = createStore({
  authGateway: authGateway,
  movieGateway: movieGateway,
  bookMarkGateway: bookMarkGateway,
  playerGateway: playerGateway,
});

const router = createRouter({ store });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App store={store} router={router} />
  </React.StrictMode>
);
