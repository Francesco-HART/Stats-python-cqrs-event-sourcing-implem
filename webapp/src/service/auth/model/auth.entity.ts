import { createEntityAdapter } from "@reduxjs/toolkit";

export type Auth = {
  id: string;
  email: string;
  role: string;
};

export const authAdapter = createEntityAdapter<Auth>();
