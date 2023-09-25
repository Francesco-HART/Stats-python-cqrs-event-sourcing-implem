import { createEntityAdapter } from "@reduxjs/toolkit";
import { FileWithPreview } from "../../../pages/admin/useAddMovieForm";

export interface UploadMovieInterface {
  movie_id: number;
  with_trailer: boolean;
  callback_url: string;
  file: FileWithPreview;
}
export enum MovieGenre {
  ACTION = "Action",
  THRILLER = "Thriller",
  HORROR = "Horreur",
  COMEDY = "Comedie",
  ADULT = "Adulte",
  DRAMA = "Drame",
  ANIMATION = "Animation",
}

export type MovieEntity = {
  id: number;
  title: string;
  genre: MovieGenre;
  picture: string;
  path: string;
  path_trailer: string;
  date: string;
  duration: number;
};

export type MovieFavEntity = {
  id: number;
  title: string;
  genre: MovieGenre;
  picture: string;
  path: string;
  path_trailer: string;
  date: string;
  duration: number;
  isInFav: boolean;
};

export const movieAdapter = createEntityAdapter<MovieEntity>();
