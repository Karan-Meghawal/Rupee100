import Iconify from "@/components/Iconify";
import { RHFTextField } from "@/components/hook-form";
import { Autocomplete, Checkbox } from "@mui/material";
import { type KycForm_FileExtensions } from "@prisma/client";

type Props = {
  name: string;
  fileExtensions: KycForm_FileExtensions[];
  setFileExtensions: (value: KycForm_FileExtensions[]) => void;
};

const fileExtensionsArr: KycForm_FileExtensions[] = [
  "JPG",
  "JPEG",
  "PNG",
  "WEBP",
  "PDF",
  "DOC",
  "DOCX",
  "TXT",
  "XLS",
  "XLSX",
  "CSV",
];
const icon = <Iconify icon="material-symbols:check-box-outline-blank" />;
const checkedIcon = <Iconify icon="material-symbols:check-box-rounded" />;

const FileExtensionsInput = ({
  name,
  fileExtensions,
  setFileExtensions,
}: Props) => (
  <Autocomplete
    value={fileExtensions}
    multiple
    options={fileExtensionsArr}
    disableCloseOnSelect
    getOptionLabel={(option) => option}
    renderOption={(props, option, { selected }) => (
      <li {...props}>
        <Checkbox
          icon={icon}
          checkedIcon={checkedIcon}
          style={{ marginRight: 8 }}
          checked={selected}
        />
        {option}
      </li>
    )}
    onChange={(event, value: KycForm_FileExtensions[]) =>
      setFileExtensions(value)
    }
    style={{ width: 500 }}
    renderInput={(params) => (
      <RHFTextField
        name={name}
        label="File Extensions"
        variant="standard"
        {...params}
      />
    )}
  />
);

export default FileExtensionsInput;
