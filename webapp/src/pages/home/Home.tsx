import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Grid,
  GridItem,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { MoviesViewModelType, useHomeViewModel } from "./useHomeViewModel";
import { AppDispatch } from "../../service/create-store";
import { exhaustiveGuard } from "../../utils/switch-check";
import { useNavigate, useNavigation } from "react-router-dom";
import MovieCard from "../../common/MovieCard";
import { MovieGenre } from "../../service/movies/model/movie.entity";
import { useState } from "react";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const viewModel = useSelector(useHomeViewModel({ dispatch }));
  const [title, setTitle] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const navigate = useNavigate();
  let handleSearchMovie: (e: any) => void;
  let handleSearchMovieByGenre: (e: any) => void;
  let onClickMovie: (param: number) => void;

  switch (viewModel.type) {
    case MoviesViewModelType.MoviesFailed:
      return <Text>Failed to load movies</Text>;
    case MoviesViewModelType.MoviesLoading:
      return <Text>Loading movies...</Text>;
    case MoviesViewModelType.MoviesLoaded:
      handleSearchMovie = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
        const titleState = event.target.value;
        viewModel.onSearchMovie({
          title: titleState,
          genre: "",
        });
        setGenre("");

        setTitle(titleState);
      };
      handleSearchMovieByGenre = (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        const genreState = event.target.value;
        setGenre(genreState);

        viewModel.onSearchMovie({
          title: "",
          genre: genreState,
        });
        setTitle("");
      };
      onClickMovie = (movieID: number) => {
        navigate("/player/" + movieID);
      };
      break;
    default:
      exhaustiveGuard(viewModel);
  }

  return (
    <Box p={4}>
      <Input
        type="text"
        placeholder="Search for a movie..."
        onChange={(e) => handleSearchMovie(e)}
        mb={4}
        value={title}
      />
      <Select
        value={genre}
        onChange={(e) => handleSearchMovieByGenre(e)}
        placeholder="Choisir un genre"
        color="black" // Text color for the select box
        bg="white" // Background color for the select box
        borderRadius="md" // Border radius for the select box
      >
        {Object.values(MovieGenre).map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </Select>

      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={4}>
        {viewModel.movies.map((movie) => (
          <GridItem key={movie.id}>
            <MovieCard onClick={onClickMovie} movie={movie} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
