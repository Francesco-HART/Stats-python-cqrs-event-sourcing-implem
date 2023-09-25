import {
  Box,
  Image,
  Text,
  Button,
  VStack,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import { MovieFavEntity } from "../service/movies/model/movie.entity";

const MovieCard = ({
  movie,
  onClick,
}: {
  movie: MovieFavEntity;
  onClick: (id: number) => void;
}) => {
  return (
    <Box
      bg="black"
      color="white"
      borderRadius="md"
      boxShadow="lg"
      rounded={25}
      p={4}
      maxW="300px"
      transition="transform 0.2s"
      _hover={{ transform: "scale(1.05)" }}
    >
      <Image src={movie.picture} alt={movie.title} borderRadius="md" />
      <Text fontSize="lg" mt={2}>
        {movie.title}
      </Text>
      <HStack spacing={2} mt={2}>
        <Text fontSize="sm">{movie.genre}</Text>
        <Spacer />
        {/* <Text fontSize="sm">{`${movie.duration} min`}</Text> */}
      </HStack>
      <VStack mt={4}>
        <Button
          colorScheme="red"
          variant="solid"
          size="sm"
          onClick={() => {
            onClick(movie.id);
          }}
        >
          Watch Now
        </Button>
      </VStack>
    </Box>
  );
};

export default MovieCard;
