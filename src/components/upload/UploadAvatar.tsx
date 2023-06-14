import { type FileExtensions } from "@/hooks/useUploadFile";
import { CircularProgress, Typography, type SxProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDropzone, type DropzoneProps } from "react-dropzone";
import Iconify from "../Iconify";
import Image from "../Image";
import RejectionFiles from "./RejectionFiles";

const RootStyle = styled("div")(({ theme }) => ({
  width: 144,
  height: 144,
  margin: "auto",
  borderRadius: "50%",
  padding: theme.spacing(1),
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  position: "relative",
}));

const DropZoneStyle = styled("div")({
  zIndex: 0,
  width: "100%",
  height: "100%",
  outline: "none",
  display: "flex",
  overflow: "hidden",
  borderRadius: "50%",
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  "& > *": { width: "100%", height: "100%" },
  "&:hover": {
    cursor: "pointer",
    "& .placeholder": {
      zIndex: 9,
    },
  },
});

const PlaceholderStyle = styled("div")(({ theme }) => ({
  display: "flex",
  position: "absolute",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.neutral,
  transition: theme.transitions.create("opacity", {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&:hover": { opacity: 0.72 },
}));

// ----------------------------------------------------------------------

export default function UploadAvatar({
  error,
  accept,
  progress = 0,
  file,
  helperText,
  sx,
  ...other
}: Omit<DropzoneProps, "accept"> & {
  accept?: FileExtensions;
  error?: boolean;
  progress: number;
  file: string;
  helperText?: React.ReactNode;
  sx?: SxProps;
}) {
  const inputAccept = Array.isArray(accept)
    ? accept.map((val) => `.${val}`).join(",")
    : "";

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

  return (
    <>
      <RootStyle
        sx={{
          ...((isDragReject || error) && {
            borderColor: "error.light",
          }),
          ...sx,
        }}
      >
        {!!progress && (
          <CircularProgress
            sx={{
              width: "100% !important",
              height: "100% !important",
              position: "absolute",
              top: 0,
              left: 0,
              "& circle": {
                strokeWidth: "1px !important",
              },
            }}
            variant="determinate"
            value={progress}
          />
        )}
        <DropZoneStyle
          {...getRootProps()}
          sx={{
            ...(isDragActive && { opacity: 0.72 }),
          }}
        >
          <input
            {...getInputProps()}
            accept={inputAccept}
          />

          {file && (
            <Image
              alt="avatar"
              src={file}
              sx={{ zIndex: 8 }}
            />
          )}

          <PlaceholderStyle
            className="placeholder"
            sx={{
              ...(file && {
                opacity: 0,
                color: "common.white",
                bgcolor: "grey.900",
                "&:hover": { opacity: 0.72 },
              }),
              ...((isDragReject || error) && {
                bgcolor: "error.lighter",
              }),
            }}
          >
            <Iconify
              icon={"ic:round-add-a-photo"}
              sx={{ width: 24, height: 24, mb: 1 }}
            />
            <Typography variant="caption">
              {file ? "Update photo" : "Upload photo"}
            </Typography>
          </PlaceholderStyle>
        </DropZoneStyle>
      </RootStyle>

      {helperText && helperText}

      {fileRejections.length > 0 && (
        <RejectionFiles fileRejections={fileRejections} />
      )}
    </>
  );
}
