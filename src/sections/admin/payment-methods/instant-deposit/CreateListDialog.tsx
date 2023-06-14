import Iconify from "@/components/Iconify";
import Image from "@/components/Image";
import { type InstantDepositMethodsType } from "@/server/api/instant-deposits";
import { adminApi } from "@/utils/api";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  LinearProgress,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import { useCallback, useState } from "react";

const DepositCard = styled(Card)<{ className: string }>(
  ({ theme, className }) => {
    const commonStyles = {
      cursor: "pointer",
      border: "1px solid transparent",
    };
    const isActive = className.split(" ").includes("active");
    if (isActive)
      return {
        ...commonStyles,
        boxShadow: `2px 7px 7px 2px ${alpha(theme.palette.primary.main, 0.4)}`,
        borderWidth: 1,
        borderColor: theme.palette.primary.main,
      };
    return {
      ...commonStyles,
    };
  },
);

type Props = {
  open: boolean;
  onClose: () => void;
  onNext: (data: InstantDepositMethodsType) => void;
};

const CreateListDialog = ({ open, onClose, onNext }: Props) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { data, isLoading } =
    adminApi.paymentMethod.instantDeposit.getCreateRecords.useQuery();

  const handleActiveCard = (id: string) => setActiveId(id);
  const handleClose = useCallback(() => {
    onClose();
    setActiveId(null);
  }, [onClose]);

  const handleOnClick = () => {
    const createData = data?.find((method) => method.uniqueId === activeId);
    onNext(createData!);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      {isLoading && <LinearProgress />}
      <DialogTitle>Create a new automatic deposit</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "grid",
            gap: 3,
            mt: 4,
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
          }}
        >
          {data?.map(({ uniqueId, fullLogo, name }) => {
            const isActive = activeId === uniqueId;
            let className = "";
            if (isActive) className += " active";

            return (
              <DepositCard
                onClick={() => handleActiveCard(uniqueId)}
                className={className}
                key={uniqueId}
                sx={{
                  display: "grid",
                  placeItems: "center",
                  py: 3,
                  gap: 4,
                }}
              >
                {isActive && (
                  <Box
                    sx={{
                      position: "absolute",
                      right: 6,
                      top: 6,
                      color: "primary.main",
                      fontSize: 22,
                    }}
                  >
                    <Iconify icon="ic:baseline-check-circle" />
                  </Box>
                )}
                <Image
                  sx={{ height: 30 }}
                  alt={name}
                  src={fullLogo}
                  objectFit="contain"
                />
                <Typography color="text.secondary">{name}</Typography>
              </DepositCard>
            );
          })}
        </Box>
        {activeId && (
          <Box
            onClick={handleOnClick}
            sx={{ mt: 4, textAlign: "right" }}
          >
            <Button endIcon={<Iconify icon="ic:sharp-keyboard-arrow-right" />}>
              Create
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateListDialog;
