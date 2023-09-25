export interface AuthGatewayInterface {
  getCurrentAuth(): Promise<{
    email: string;
    role: string;
  }>;

  login(email: string, password: string): Promise<{}>
}
