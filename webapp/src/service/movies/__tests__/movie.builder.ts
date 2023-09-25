import { MovieEntity, MovieGenre } from "../model/movie.entity";

export const buildMovie = ({
  id = 1,
  genre = MovieGenre.ACTION,
  title = "",
  picture = "",
  path = "",
  path_trailer = "",
  date = "",
  duration = 120,
}): MovieEntity => ({
  id,
  genre,
  title,
  picture,
  path,
  path_trailer,
  date,
  duration,
});
