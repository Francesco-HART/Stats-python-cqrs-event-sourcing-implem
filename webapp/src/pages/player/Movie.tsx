import { Text, IconButton } from "@chakra-ui/react";
import { MovieViewModel, MovieViewModelType } from "./useMovieViewModel.ts";
import { exhaustiveGuard } from "../../utils/switch-check.ts";
import {
  AddIcon, // Chakra UI Icon for "add to favorites"
  DeleteIcon, // Chakra UI Icon for "remove from favorites"
} from "@chakra-ui/icons";
import { selectAuthCompany } from "../../service/auth/reducer.ts";
type Props = {
  viewModel: MovieViewModel;
};
const Movie = ({ viewModel }: Props) => {
  let addToFavorites: () => void;
  let removeFromFavorites: () => void;
  switch (viewModel.type) {
    case MovieViewModelType.MovieFailed:
      return <Text>Failed to load movies</Text>;
    case MovieViewModelType.MovieLoading:
      return <Text>Loading movies...</Text>;
    case MovieViewModelType.MovieLoaded:
      addToFavorites = viewModel.addToFavorites;
      removeFromFavorites = viewModel.removeFromFavorites;
      return (
        <>
          <Text>{viewModel.movie.title}</Text>

          {/* Add to Favorites */}
          {viewModel.movie.isInFav ? (
            <IconButton
              icon={<DeleteIcon />}
              aria-label="Remove from Favorites"
              colorScheme="red"
              onClick={removeFromFavorites}
            />
          ) : (
            <IconButton
              icon={<AddIcon />}
              aria-label="Add to Favorites"
              colorScheme="red"
              onClick={addToFavorites}
            />
          )}
        </>
      );

    default:
      exhaustiveGuard(viewModel);
  }
};

export default Movie;
