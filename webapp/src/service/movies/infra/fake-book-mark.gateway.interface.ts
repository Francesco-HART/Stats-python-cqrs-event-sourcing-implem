import { BookMarkGatewayInterface } from "../model/book-mark.gateway";
import { FakeMovieGateway } from "./fake-movie.gateway";

export class FakeBookMarkGateway implements BookMarkGatewayInterface {
  movieGateway: FakeMovieGateway;
  constructor(movieGateway: FakeMovieGateway) {
    this.movieGateway = movieGateway;
  }

  async addToFavorites({
    email,
    movieID,
  }: {
    email: string;
    movieID: number;
  }): Promise<void> {
    //throw new Error("Method not implemented.");
    await this.movieGateway.addToFavorites({ movieID });
    return Promise.resolve();
  }
  async removeFromFavorites({
    email,
    movieID,
  }: {
    email: string;
    movieID: number;
  }): Promise<void> {
    //throw new Error("Method not implemented.");
    await this.movieGateway.removeFromFavorites({ movieID });

    return Promise.resolve();
  }
}
