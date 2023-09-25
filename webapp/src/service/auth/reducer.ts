import { createReducer } from "@reduxjs/toolkit";
import { ActionsState } from "../create-store";
import { getAuth, loginUser } from "./usecases/auth.usecase.ts";

export type AuthState = {
  auth?: {
    id: string;
    name: string;
  };
  isLoading: boolean;
  isLogged: boolean;
};

export const reducer = createReducer<AuthState>(
  {
    isLoading: false,
    isLogged: false,
  },
  (builder) => {
    builder.addCase(getAuth.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(getAuth.fulfilled, (state, action) => {
      state.auth = { name: action.payload.email, id: action.payload.role };
      state.isLoading = false;
      state.isLogged = true;
    });
    builder.addCase(getAuth.rejected, (state, _) => {
      state.isLoading = false;
      state.isLogged = false;
    });
    builder.addCase(loginUser.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, _) => {
      state.isLoading = false;
      state.isLogged = true;
    });
    builder.addCase(loginUser.rejected, (state, _) => {
      state.isLoading = false;
      state.isLogged = false;
    });
  }
);

// selector vont chercher l'information dans le state
export const selectAuthCompany = (state: ActionsState) =>
  state.authCompany.auth;
export const selectAuthCompanyIsLoading = (state: ActionsState) =>
  state.authCompany.isLoading;
export const selectAuthCompanyIsLogged = (state: ActionsState) =>
  state.authCompany.isLogged;
