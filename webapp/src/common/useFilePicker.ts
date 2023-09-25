interface FileWithPreview extends File {
  preview: string;
}
type Props = {
  onSelectFile: (f: FileWithPreview) => void;
};

const useFilePicker = ({ onSelectFile }: Props) => {
  const setSelectedFile = (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    const newFiles = acceptedFiles.map(
      (file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }) as FileWithPreview
    );
    const file = newFiles[0];
    onSelectFile(file);
  };

  return {
    setSelectedFile,
  };
};

export { useFilePicker };
