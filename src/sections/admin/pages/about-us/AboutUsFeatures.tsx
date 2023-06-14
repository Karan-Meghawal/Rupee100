import IconifyIcons from "@/IconifyIcons";
import FormLabel from "@/components/FormLabel";
import Iconify from "@/components/Iconify";
import { RHFTextField } from "@/components/hook-form";
import useFormRepeater from "@/hooks/useFormRepeater";
import { Box, IconButton, Stack } from "@mui/material";

type Props = {
  disabled: boolean;
};

const AboutUsFeatures = ({ disabled }: Props) => {
  const { fields, onAddField, onRemoveField } = useFormRepeater({
    name: "features",
    append: { feature: "" },
  });

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        mb={2}
      >
        <FormLabel label="Features" />
        <IconButton
          disabled={disabled}
          onClick={() => onAddField()}
        >
          <Iconify icon={IconifyIcons.add} />
        </IconButton>
      </Stack>
      <Stack spacing={2}>
        {fields.map(({}, index) => (
          <Stack
            direction="row"
            key={index}
            spacing={1}
            alignItems="center"
          >
            <RHFTextField
              disabled={disabled}
              name={`features.${index}.feature`}
              label="Feature"
            />

            <IconButton
              disabled={disabled || fields.length < 3}
              onClick={() => onRemoveField(index)}
            >
              <Iconify icon={IconifyIcons.delete} />
            </IconButton>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};

export default AboutUsFeatures;
