export interface BookMarkGatewayInterface {
  addToFavorites(arg0: { email: string; movieID: number }): Promise<void>;
  removeFromFavorites(arg0: { email: string; movieID: number }): Promise<void>;
}
