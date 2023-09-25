
import {createAsyncThunk} from "@reduxjs/toolkit"
import { ActionsState, AppDispatch, Dependencies } from "./create-store"


// Utiliser pour créer une nouvelle action (pour nous une action est un usecase)
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: ActionsState,
    dispatch : AppDispatch,
    extra: Dependencies
}>()