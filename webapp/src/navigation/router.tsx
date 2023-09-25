import { createBrowserRouter } from "react-router-dom";
import { ProtectedViewCompany } from "../pages/ProtectedRoute";
import routesNames from "./routes";
import Login from "../pages/login/Login.tsx";
import Player from "../pages/player/Player.tsx";
import { createHomeLoader } from "../pages/home/createHomeLoader.ts";
import { AppStore } from "../service/create-store.ts";
import Home from "../pages/home/Home.tsx";
import { createPlayerLoader } from "../pages/player/createPlayerLoader.ts";
import DashboardAmin from "../pages/admin/DashboardAdmin.tsx";
import { ProtectedAdminView } from "../pages/ProtectedAdminView.tsx";

export const createRouter = ({ store }: { store: AppStore }) =>
  createBrowserRouter([
    {
      path: "/",
      loader: createHomeLoader({ store }),
      children: [
        {
          index: true,
          element: <ProtectedViewCompany component={<Home />} />,
        },
      ],
    },
    {
      path: routesNames.PLAYER,
      loader: createPlayerLoader({ store }),
      children: [
        {
          index: true,
          element: <ProtectedViewCompany component={<Player />} />,
        },
      ],
    },
    {
      path: routesNames.ADMIN_DASHBOARD,
      children: [
        {
          index: true,
          element: <ProtectedAdminView component={<DashboardAmin />} />,
        },
      ],
    },
    {
      path: routesNames.LOGIN,
      children: [
        {
          index: true,
          element: <Login />,
        },
      ],
    },
  ]);

export type AppRouter = ReturnType<typeof createRouter>;
