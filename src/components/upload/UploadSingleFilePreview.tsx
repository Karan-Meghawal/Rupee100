import { Card } from "@mui/material";
import Image from "../Image";

const UploadSingleFilePreview = ({ file }: { file: string }) => (
  <Card
    sx={{
      width: 1,
      height: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      flexDirection: "column",
      top: 0,
      left: 0,
    }}
  >
    <Image
      alt="file preview"
      objectFit="contain"
      src={file}
    />
  </Card>
);
export default UploadSingleFilePreview;
