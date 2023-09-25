import { Button, Text, VStack, HStack } from "@chakra-ui/react";
import Movie from "./Movie.tsx";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { LoaderFunction, useNavigate, useParams } from "react-router-dom";
import { exhaustiveGuard } from "../../utils/switch-check.ts";
import { useMovieViewModel } from "./useMovieViewModel.ts";
import { AppDispatch, AppStore } from "../../service/create-store.ts";
import {
  PlayerViewModelType,
  usePlayerViewModel,
} from "./usePlayerViewModel.ts";

const Player = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const movieID = params.movieID as string;
  const navigate = useNavigate();

  const movieViewModel = useSelector(useMovieViewModel({ dispatch, movieID }));

  const viewModel = useSelector(usePlayerViewModel({ dispatch, movieID }));

  let onPlay: () => void;
  let onPause: () => void;
  let onStop: () => void;

  switch (viewModel.type) {
    case PlayerViewModelType.PlayerFailed:
      return <Text>Failed to load player</Text>;

    case PlayerViewModelType.PlayerLoading:
      return <Text>Loading player...</Text>;

    case PlayerViewModelType.PlayerLoaded:
      onPlay = viewModel.onPlayPlayer;
      onPause = viewModel.onPausePlayer;
      onStop = () => {
        viewModel.onStopPlayer();
        navigate("/");
      };

      return (
        <VStack
          align="center"
          spacing={4}
          bg="#141414"
          color="white"
          padding="2rem"
        >
          {/* Statistics */}
          <Movie viewModel={movieViewModel} />
          <VStack
            spacing={4}
            bg="#333333"
            padding="1rem"
            borderRadius="md"
            boxShadow="md"
          >
            <Text fontSize="xl" fontWeight="bold">
              Statistics
            </Text>
            <HStack justifyContent="space-between">
              <Text>Nombre de Pause:</Text>
              <Text>{viewModel.stats.number_of_pause}</Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text>Nombre de Stop:</Text>
              <Text>{viewModel.stats.number_of_stop}</Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text>Nombre de Watch:</Text>
              <Text>{viewModel.stats.number_of_watch}</Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text>Nombre de Total Book:</Text>
              <Text>{viewModel.stats.total_book_mark}</Text>
            </HStack>
          </VStack>

          {/* Video Player */}
          <ReactPlayer
            url={viewModel.player.url}
            width="100%"
            height="auto"
            controls // Display video controls
          />

          {/* Playback Controls */}
          <HStack spacing={4}>
            <Button onClick={onPlay} colorScheme="red" variant="solid">
              Play
            </Button>
            <Button onClick={onPause} colorScheme="red" variant="solid">
              Pause
            </Button>
            <Button onClick={onStop} colorScheme="red" variant="solid">
              Stop
            </Button>
          </HStack>
        </VStack>
      );

    default:
      exhaustiveGuard(viewModel);
  }
};

export default Player;
