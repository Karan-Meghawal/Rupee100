import Iconify from "@/components/Iconify";
import { RHFTextField } from "@/components/hook-form";
import useFormRepeater from "@/hooks/useFormRepeater";
import { Box, IconButton, Stack, Typography } from "@mui/material";

function Input({
  onRemoveField,
  index,
}: {
  onRemoveField: (index: number) => void;
  index: number;
}) {
  return (
    <Box
      key={index}
      sx={{ display: "flex", alignItems: "center", gap: 2 }}
    >
      <RHFTextField
        name={`dropdownOptions.${index}.option`}
        label="Add Label"
        variant="standard"
      />
      <IconButton
        onClick={() => onRemoveField(index)}
        color="error"
      >
        <Iconify icon={"ri:close-fill"} />
      </IconButton>
    </Box>
  );
}

const DropDownOptionFields = () => {
  const { fields, onAddField, onRemoveField } = useFormRepeater({
    name: "dropdownOptions",
    append: { option: "" },
  });

  return (
    <>
      <Stack
        direction={"row"}
        justifyContent="space-between"
        alignItems={"center"}
      >
        <Typography>Options</Typography>
        <IconButton
          onClick={() => onAddField()}
          color="success"
        >
          <Iconify icon={"material-symbols:add"} />
        </IconButton>
      </Stack>
      {fields.map((field, index) => (
        <Input
          key={field.id}
          onRemoveField={onRemoveField}
          index={index}
        />
      ))}
    </>
  );
};

export default DropDownOptionFields;
