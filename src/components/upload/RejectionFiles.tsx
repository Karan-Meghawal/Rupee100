import { Box, Paper, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { type FileRejection } from "react-dropzone";
import { fData } from "../../utils/formatNumber";

export default function RejectionFiles({
  fileRejections,
}: {
  fileRejections: FileRejection[];
}) {
  return (
    <Paper
      variant="outlined"
      sx={{
        py: 1,
        px: 2,
        mt: 3,
        borderColor: "error.light",
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
      }}
    >
      {fileRejections.map(({ file, errors }) => {
        const { name, size } = file;
        return (
          <Box
            key={name}
            sx={{ my: 1 }}
          >
            <Typography
              variant="subtitle2"
              noWrap
            >
              {name} - {fData(size)}
            </Typography>
            {errors.map((error) => (
              <Typography
                key={error.code}
                variant="caption"
                component="p"
              >
                - {error.message}
              </Typography>
            ))}
          </Box>
        );
      })}
    </Paper>
  );
}
