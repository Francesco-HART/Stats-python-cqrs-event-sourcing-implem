import { AxiosInstance } from "axios";
import { instance } from "../../api/api-instance";
import { BookMarkGatewayInterface } from "../model/book-mark.gateway";

export class ApiBookMarkGateway implements BookMarkGatewayInterface {
  axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = instance;
  }

  async addToFavorites(arg0: { movieID: number }): Promise<void> {
    await this.axiosInstance.post("/bookmark?movie_id=" + arg0.movieID);
  }

  async removeFromFavorites(arg0: { movieID: number }): Promise<void> {
    await this.axiosInstance.delete("/bookmark?movie_id=" + arg0.movieID);
  }
}
