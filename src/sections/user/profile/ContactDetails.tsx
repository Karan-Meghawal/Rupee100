import IconifyIcons from "@/IconifyIcons";
import Iconify from "@/components/Iconify";
import useFormEdit from "@/hooks/useFormEdit";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
} from "@mui/material";
import ContactDetailsForm from "./ContactDetailsForm";

const ContactDetails = () => {
  const { isEditing, startEditing, stopEditing } = useFormEdit();
  return (
    <Card>
      <CardHeader
        title="Contact Details"
        sx={{ bgcolor: "background.neutral" }}
        action={
          !isEditing ? (
            <IconButton
              size="small"
              onClick={startEditing}
            >
              <Iconify icon={IconifyIcons.pencil} />
            </IconButton>
          ) : undefined
        }
      />
      <CardContent>
        <ContactDetailsForm
          disabled={!isEditing}
          onSuccess={stopEditing}
          action={(isSubmitting: boolean) => (
            <>
              {isEditing && (
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  spacing={2}
                >
                  <Button
                    size="small"
                    onClick={stopEditing}
                    color="error"
                  >
                    Cancel
                  </Button>
                  <LoadingButton
                    size="small"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                  >
                    Save Changes
                  </LoadingButton>
                </Stack>
              )}
            </>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default ContactDetails;
