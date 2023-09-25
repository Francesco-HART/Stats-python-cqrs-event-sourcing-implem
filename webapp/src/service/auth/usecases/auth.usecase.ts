import {createAppAsyncThunk} from "../../create-app-thunk";

// cette usecase est une action avec des états (pending, fullfild...) en fonction des etats de l'action le reducer met à jour le store
export const getAuth = createAppAsyncThunk(
  "companies/getAuthCompany",
  async (_, { extra: { authGateway } }) => {
      return await authGateway.getCurrentAuth();
  }
);

export const loginUser = createAppAsyncThunk(
    "auth/loginUser",
    async ({ email, password }: { email: string; password: string }, { extra: { authGateway } }) => {
        return await authGateway.login(email, password);
    }
);
