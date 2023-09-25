import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Select,
  NumberInput,
  NumberInputField,
  InputRightElement,
  Button,
  Stack,
} from "@chakra-ui/react";
import FilePicker from "../../common/FilePicker";
import { useAddMovieForm } from "./useAddMovieForm";
import { MovieGenre } from "../../service/movies/model/movie.entity";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { DatePicker, Stack as DateStack } from "rsuite";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../service/create-store";

const DashboardAmin = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    submit,
    register,
    errors,
    offerTypeSelect,
    handleSelectImageFile,
    handleChangeGenre,
    resetImageFileSelected,
    selectedFile,
    filePickerProps,
    setDate,
    date,
    setWithTrailer,
    withTrailer,
  } = useAddMovieForm({
    dispatch,
  });

  return (
    <Stack
      direction="column"
      bg="black" // Background color
      color="white" // Text color
      p={8} // Padding
      borderRadius="md" // Border radius
      boxShadow="lg" // Box shadow
      maxW="500px" // Maximum width
      mx="auto" // Center align horizontally
    >
      <FormControl>
        <FormLabel fontSize="lg">Nom du produit</FormLabel>
        <Input {...register("title")} placeholder="Chose title" />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel fontSize="lg">Image du produit</FormLabel>
        <Input {...register("picture")} placeholder="SET URL image" />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel fontSize="lg">Vidéo du produit</FormLabel>
        <FilePicker
            onSelectFile={filePickerProps.setSelectedFile}
            onResetFile={resetImageFileSelected}
            fileSelect={selectedFile}
            width="120px"
            height="150px"
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel fontSize="lg">Type d’offre</FormLabel>
        <InputGroup gap={3} {...register("genre")} onChange={handleChangeGenre}>
          <Select
            placeholder="Choisir une option"
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
          {false && (
            <NumberInput>
              <NumberInputField placeholder="0" />
              <InputRightElement
                children="%"
                width="auto"
                pr={2}
                color="navy.500"
              />
            </NumberInput>
          )}
        </InputGroup>
      </FormControl>
      <FormControl mt={4}>
        <FormLabel fontSize="lg">Date d'envoie</FormLabel>
        <DateStack direction="column" alignItems="flex-start" spacing={6}>
          <DatePicker
            format="yyyy-MM-dd"
            value={date}
            onChange={(date) => setDate(date as Date)}
          />
        </DateStack>

        <RadioGroup
          defaultValue="2"
          value={withTrailer.toString()}
          onChange={setWithTrailer}
        >
          <Stack spacing={5} direction="row">
            <Radio colorScheme="green" value="true">
              With Trailer
            </Radio>
            <Radio colorScheme="red" value="false">
              Without Trailer
            </Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
      <Button
        onClick={submit}
        bg="red" // Button background color
        color="white" // Button text color
        _hover={{ bg: "black" }} // Button background color on hover
      >
        Enregistrer
      </Button>
    </Stack>
  );
};

export default DashboardAmin;
