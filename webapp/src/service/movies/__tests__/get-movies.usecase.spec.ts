import { describe, expect, beforeEach, it } from "vitest";
import { MovieFixture } from "./fixture";
import { MovieGenre } from "../model/movie.entity";
import { buildMovie } from "./movie.builder";

describe("GetMoviesUsecase", () => {
  let fixture: MovieFixture;

  beforeEach(() => {
    fixture = createMovieFixture();
  });

  it("Excpect Bob Auth should be see his movies", ({ expect }) => {
    fixture.givenAuthUserIs({
      email: "bob@bob.fr",
      role: "admin",
    });
    fixture.whenSearchMovies("Bob");
    fixture.thenMoviesReceivedShouldBe([
      buildMovie({
        id: 1,
        title: "Lord of the Ring",
        genre: MovieGenre.ACTION,
        path: "https://www.youtube.com/watch?v=V75dMMIW2B4",
        path_trailer: "https://www.youtube.com/watch?v=V75dMMIW2B4",
        date: "2021-01-01",
        duration: 120,
      }),
      buildMovie({
        id: 1234,
        title: "Fast And Fuirous",
        genre: MovieGenre.ACTION,
        path: "https://www.youtube.com/watch?v=V75dMMIW2B4",
        path_trailer: "https://www.youtube.com/watch?v=V75dMMIW2B4",
        date: "2021-01-01",
        duration: 120,
      }),
    ]);
  });
});
function createMovieFixture(): {
  givenAuthUserIs: ({ email, role }: { email: string; role: string }) => void;
  whenSearchMovies: (username: string) => void;
  thenMoviesReceivedShouldBe: (
    movies: import("../model/movie.entity").MovieEntity[]
  ) => void;
} {
  throw new Error("Function not implemented.");
}
