import { Typography } from "@mui/material";

const FormLabel = ({ label }: { label: string }) => (
    <Typography
      component="div"
      variant="subtitle2"
      sx={{ mb: 1, textAlign: "left" }}
    >
      {label}
    </Typography>
  );

export default FormLabel;
