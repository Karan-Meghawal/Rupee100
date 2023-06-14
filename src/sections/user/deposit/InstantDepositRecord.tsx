import EmptyContent from "@/components/EmptyContent";
import { RESPONSIVE_GAP } from "@/config";
import { userApi } from "@/utils/api";
import { Box, Card, Grid, LinearProgress, Stack } from "@mui/material";
import { useState } from "react";
import InstantDepositCard from "./InstandDepositCard";
import InstantDepositPaySection from "./InstantDepositPaySection";

const InstantDepositRecord = () => {
  const { data, isLoading } =
    userApi.deposit.instantDeposit.getRecords.useQuery();
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const methods = data! ?? [];
  const selectedMethod = methods.find((method) => method.id === selectedId);

  return isLoading ? (
    <LinearProgress />
  ) : (
    <Grid
      container
      spacing={RESPONSIVE_GAP}
    >
      <Grid
        item
        flexGrow={8}
      >
        <Stack spacing={RESPONSIVE_GAP}>
          <Box>
            <Box
              sx={{
                ...(methods.length && {
                  display: "grid",
                  gap: RESPONSIVE_GAP,
                  gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                    ...(!selectedId && { lg: "repeat(4, 1fr)" }),
                  },
                }),
              }}
            >
              {!methods.length ? (
                <Card
                  sx={{ height: 600 }}
                  className="here"
                >
                  <EmptyContent
                    title="No data available"
                    description="Currently no instant deposits are available"
                  />
                </Card>
              ) : (
                <InstantDepositCard
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                  data={methods}
                />
              )}
            </Box>
          </Box>
        </Stack>
      </Grid>
      {selectedId && selectedMethod && (
        <InstantDepositPaySection
          id={selectedId}
          method={selectedMethod}
        />
      )}
    </Grid>
  );
};

export default InstantDepositRecord;
