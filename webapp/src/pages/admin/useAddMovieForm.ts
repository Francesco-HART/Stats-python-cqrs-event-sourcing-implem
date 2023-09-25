import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useFilePicker } from "../../common/useFilePicker";
import { MovieGenre } from "../../service/movies/model/movie.entity";
import { AppDispatch } from "../../service/create-store";
import { createMovie } from "../../service/movies/usecases/movie.usecase";
import { ca } from "date-fns/locale";
import { useToast } from "@chakra-ui/react";

export type AddMovieDTO = {
  title: string;
  genre: MovieGenre;
  date: Date;
  with_trailer: boolean;
  file: FileWithPreview | undefined;
  picture: string;
};

export const useAddMovieForm = ({ dispatch }: { dispatch: AppDispatch }) => {
  const defaultValues: AddMovieDTO = {
    title: "",
    picture: "",
    genre: MovieGenre.ACTION,
    date: new Date(),
    with_trailer: false,
    file: undefined,
  };

  const schema = yup
    .object()
    .shape({
      title: yup.string().required("title is required"),
      picture: yup.string().required("picture is required"),
      genre: yup.string().required("genre is required"),
      file: yup.mixed().required("file is required"),
      date: yup.date().required("date is required"),
      with_trailer: yup.boolean().required("with_trailer is required"),
    })
    .required();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<AddMovieDTO>({
    defaultValues,
    resolver: yupResolver(schema) as any,
  });

  const toast = useToast();

  const submitFormMovie = async (values: AddMovieDTO) => {
    try {
      await dispatch(createMovie({ ...values }));
      toast({
        title: "Movie added",
        description: "Movie added successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      reset();
      resetImageFileSelected();
    } catch (error) {}
  };

  const submit = handleSubmit(submitFormMovie);
  const handleChangeGenre = (event: any) => {
    setValue("genre", event.target?.value);
  };

  const handleSelectImageFile = (file: FileWithPreview) => {
    setValue("file", file);
  };

  const filePickerProps = useFilePicker({
    onSelectFile: handleSelectImageFile,
  });

  const resetImageFileSelected = () => {
    setValue("file", undefined);
  };

  return {
    submit,
    register,
    errors,
    offerTypeSelect: watch("genre"),
    handleSelectImageFile,
    resetImageFileSelected,
    setDate: (date: Date) => setValue("date", date),
    date: watch("date"),
    handleChangeGenre,
    selectedFile: watch("file"),
    setWithTrailer: (withTrailer: string) => {
      console.log({ withTrailer });
      setValue("with_trailer", withTrailer === "true" ? true : false);
    },
    withTrailer: watch("with_trailer"),
    filePickerProps,
  };
};

export class FileWithPreview extends File {
  preview: string;

  constructor(file: File[], preview: Blob | MediaSource, filename: string) {
    super(file, filename);
    new MediaSource();
    this.preview = URL.createObjectURL(preview);
  }

  static fileToFileWithPreview(file: File): FileWithPreview {
    return Object.assign(file, {
      preview: URL.createObjectURL(file),
    }) as FileWithPreview;
  }
}
