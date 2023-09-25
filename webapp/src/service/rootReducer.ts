import { combineReducers } from "@reduxjs/toolkit";
import { reducer as companyAuthReducer } from "./auth/reducer";
import { reducer as movieReducer } from "./movies/reducer";

import { reducer as playerReducer } from "./player/reducer.ts";
import { moviesSlice } from "./movies/slices/movies.slice.ts";

// Les state global à plusieurs actions qui sont dispaches par ces reducers
export const rootReducer = combineReducers({
  // [authCompanySlice.name] :  authCompanySlice.reducer,
  authCompany: companyAuthReducer,
  [moviesSlice.name]: moviesSlice.reducer,
  player: playerReducer,
  ["movie"]: movieReducer,
});

/* Les slice sont des  forme de data plus complexe et rangé de data

   [id] : {
      messages : []
      name : string
   }

   createReducer est principalement utilisé lorsque vous avez besoin de créer des réducteurs personnalisés sans utiliser la syntaxe automatique de création de tranche (createSlice)
   Il vous donne un contrôle plus fin sur la définition de vos réducteurs.
*/
