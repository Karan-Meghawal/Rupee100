import EmptyContent from "@/components/EmptyContent";
import Image from "@/components/Image";
import { userApi } from "@/utils/api";
import { fCurrency, fPercent } from "@/utils/formatNumber";
import {
  Box,
  Card,
  Divider,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ManualDepositDialog from "./ManualDepositDialog";

const ManualDepositRecord = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const { data, isLoading } =
    userApi.deposit.manualDeposit.getRecords.useQuery();
  const methods = data! ?? [];
  const methodData = methods.find((method) => method.id === selectedId);

  const onSelect = (id: string) => {
    setOpen(true);
    setSelectedId(id);
  };
  const handleDialogClose = () => {
    setOpen(false);
    setSelectedId(null);
  };

  return isLoading ? (
    <LinearProgress />
  ) : (
    <Box
      sx={{
        ...(methods.length && {
          display: "grid",
          gap: 3,
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
        }),
      }}
    >
      {open && methodData && selectedId && (
        <ManualDepositDialog
          method={methodData}
          id={selectedId}
          open={open}
          onClose={handleDialogClose}
        />
      )}

      {!methods.length ? (
        <Card
          sx={{ height: 600 }}
          className="here"
        >
          <EmptyContent
            title="No data available"
            description="Currently no manual deposits are available"
          />
        </Card>
      ) : (
        methods.map(
          ({
            id,
            name,
            logo,
            processingTime,
            minDeposit,
            maxDeposit,
            charge,
            chargeType,
          }) => (
            <Card key={id}>
              <Box sx={{ position: "relative" }}>
                <Image
                  alt={name}
                  src={logo}
                />
              </Box>
              <Stack
                spacing={2}
                sx={{ p: 3 }}
              >
                <Typography
                  sx={{
                    color: "inherit",
                    cursor: "pointer",
                    textTransform: "uppercase",
                  }}
                  textAlign={"center"}
                  variant="subtitle2"
                  noWrap
                  onClick={() => onSelect(id)}
                >
                  <Typography
                    sx={{ textDecoration: "underline", fontWeight: "bold" }}
                    component={"span"}
                    color="primary.main"
                  >
                    {name}
                  </Typography>
                </Typography>
                <Stack
                  sx={{ color: "text.secondary" }}
                  spacing={1}
                >
                  <Stack
                    justifyContent={"space-between"}
                    direction="row"
                  >
                    <Typography variant="subtitle2">Charge</Typography>
                    <Typography variant="subtitle2">
                      {chargeType === "fixed"
                        ? fCurrency(charge)
                        : fPercent(charge)}
                    </Typography>
                  </Stack>
                  <Divider />
                  <Stack
                    justifyContent={"space-between"}
                    direction="row"
                  >
                    <Typography variant="subtitle2">Limit</Typography>
                    <Typography variant="subtitle2">
                      {fCurrency(minDeposit)}{" "}
                      <Box
                        component={"span"}
                        mx={0.3}
                      >
                        -
                      </Box>{" "}
                      {fCurrency(maxDeposit)}
                    </Typography>
                  </Stack>
                  <Divider />
                  <Stack
                    justifyContent={"space-between"}
                    direction="row"
                  >
                    <Typography variant="subtitle2">Processing Time</Typography>
                    <Typography variant="subtitle2">
                      {processingTime}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Card>
          ),
        )
      )}
    </Box>
  );
};

export default ManualDepositRecord;
