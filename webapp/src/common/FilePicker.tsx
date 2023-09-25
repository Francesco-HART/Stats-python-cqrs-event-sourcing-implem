import { Box, VStack, Text, CloseButton, HStack } from "@chakra-ui/react";
import { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { FileWithPreview } from "../pages/admin/useAddMovieForm";

type Props = {
  height: string;
  width: string;
  onSelectFile: (f: File[]) => void;
  onResetFile: () => void;
  fileSelect: FileWithPreview | undefined;
};

export const FilePicker = ({
  height,
  width,
  onSelectFile,
  onResetFile,
  fileSelect,
    picture
}: Props) => {
  const baseline = {
    backgroundColor: "#F6F6F6",
    borderRadius: "7px",
    padding: 3,
    justifyContent: "center",
    cursor: "pointer",
    border: "1px dashed #C6D0E4",
    width,
    height,
  };

  const acceptStyle = {
    border: "1px dashed #3e78ed",
    backgroundColor: "#F6F6F6",
  };

  const rejectStyle = {
    border: "1px dashed #E86161",
    backgroundColor: "#F6F6F6",
  };

  const focusedStyle = {
    border: "1px dashed #7C5BFC",
    backgroundColor: "#F6F6F6",
  };

  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
  };

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: { "video/*": [] },
      onDropAccepted: (files, event) => {},
      onDrop: (acceptedFiles: File[]) => {
        onSelectFile(acceptedFiles);
      },
    });

  const style = useMemo(
    () => ({
      ...baseline,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const thumbs = fileSelect && (
    <Box
      onClick={onResetFile}
      style={thumbInner}
      w={width}
      h={height}
      border={"1px solid #C6D0E4"}
      borderRadius={"7px"}
    >
      {fileSelect && (
        <img
          alt="img-preview"
          src={fileSelect.preview}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onLoad={() => {
            URL.revokeObjectURL(fileSelect.preview);
          }}
        />
      )}
    </Box>
  );
  return (
    <HStack spacing={1} alignItems={"start"}>
      {thumbs ? (
        <>
          {thumbs}
          <CloseButton onClick={onResetFile} />
        </>
      ) : (
        <VStack {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <Text fontSize={"12px"} textAlign={"center"} color={"neutral.500"}>
            Déposez ou cliquez pour ajouter un fichier
          </Text>
        </VStack>
      )}
    </HStack>
  );
};

export default FilePicker;
