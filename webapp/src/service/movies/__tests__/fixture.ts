import { StubAuthGateway } from "../../auth/infra/stub-auth.gateway";
import { createStore } from "../../create-store";
import { FakeMovieGateway } from "../infra/fake-movie.gateway";
import { MovieEntity } from "../model/movie.entity";

const createMovieFixture = () => {
  const fakeMovieGateway = new FakeMovieGateway();
  const stubAuthGateway = new StubAuthGateway();
  const store = createStore({
    authGateway: stubAuthGateway,
    movieGateway: fakeMovieGateway,
  });

  return {
    givenAuthUserIs: ({ email, role }: { email: string; role: string }) => {
      stubAuthGateway.authUser = { email, role };
    },
    givenExistingsMovies: (movies: MovieEntity[]) => {
      fakeMovieGateway.movies = movies;
    },
    whenSearchMovies: async (username: string) => {
      store.dispatch(getMoviesUsecase());
    },
    thenMoviesReceivedShouldBe: (movies: MovieEntity[]) => {},
    thenMoviesSearchLoadingShouldBe: (loading: boolean) => {
      // const isSearchMoviesLoading = selectIsMoviesSearchLoading(
      //   user,
      //   store.getState()
      // );
      // expect(isUserTimelineLoading).toBe(true);
      // expect(store.getState().movies.search.loading).toBe(loading);
    },
  };
};

export type MovieFixture = ReturnType<typeof createMovieFixture>;
function getMoviesUsecase(): any {
  throw new Error("Function not implemented.");
}
