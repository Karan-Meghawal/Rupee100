import { type FileExtensions } from "@/hooks/useUploadFile";
import { Box, LinearProgress } from "@mui/material";
import { styled, type SxProps } from "@mui/material/styles";
import { useDropzone, type DropzoneOptions } from "react-dropzone";
import BlockContent from "./BlockContent";
import RejectionFiles from "./RejectionFiles";
import UploadSingleFilePreview from "./UploadSingleFilePreview";

const DropZoneStyle = styled("div")(({ theme }) => ({
  outline: "none",
  overflow: "hidden",
  position: "relative",
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create("padding"),
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  "&:hover": { opacity: 0.72, cursor: "pointer" },
}));

export default function UploadSingleFile({
  error = false,
  progress = 0,
  file,
  accept,
  helperText,
  sx,
  ...other
}: Omit<DropzoneOptions, "accept"> & {
  sx?: SxProps;
  error?: boolean;
  progress?: number;
  file: string;
  helperText?: React.ReactNode;
  accept?: FileExtensions;
}) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    multiple: false,
    ...other,
  });

  const inputAccept = Array.isArray(accept)
    ? accept.map((val) => `.${val}`).join(",")
    : "";

  return (
    <Box sx={{ width: "100%", ...sx }}>
      {!!progress && (
        <LinearProgress
          variant="determinate"
          value={progress}
        />
      )}
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: "error.main",
            borderColor: "error.light",
            bgcolor: "error.lighter",
          }),
          ...(file && {
            padding: "12% 0",
          }),
        }}
      >
        <input
          {...getInputProps()}
          accept={inputAccept}
        />
        <BlockContent />
        {file && <UploadSingleFilePreview file={file} />}
      </DropZoneStyle>

      {fileRejections.length > 0 && (
        <RejectionFiles fileRejections={fileRejections} />
      )}

      {helperText && helperText}
    </Box>
  );
}
