import { AuthGatewayInterface } from "../model/authGatewayInterface.ts";
import axios, { AxiosInstance } from "axios";

export class AuthGateway implements AuthGatewayInterface {
  async getCurrentAuth(): Promise<{
    email: string;
    role: string;
  }> {
    try {
      const response = await axios.get("http://localhost:8080/current_user", {
        withCredentials: true,
      });
      return {
        email: response.data.email,
        role: response.data.role,
      };
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de l'authentification:",
        error
      );
      throw error;
    }
  }

  async login(email: string, password: string): Promise<{}> {
    try {
      const response = await axios.post(
        `http://localhost:8080/user`,
        { email, password },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'authentification:", error);
      throw error;
    }
  }
}
