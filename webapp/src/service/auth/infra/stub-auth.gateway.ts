import { AuthGatewayInterface } from "../model/authGatewayInterface.js";
import axios, { AxiosInstance } from "axios";

export class StubAuthGateway implements AuthGatewayInterface {
  public authUser: { email: string; role: string } | undefined;

  async getCurrentAuth(): Promise<{
    email: string;
    role: string;
  }> {
    const auth = this.authUser as { email: string; role: string };
    return Promise.resolve(auth);
  }

  async login(email: string, password: string): Promise<{}> {
    return Promise.resolve({});
  }
}
