import Label from "@/components/Label";
import Page from "@/components/Page";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { userApi } from "@/utils/api";
import { capitalCase } from "@/utils/case";
import { fCurrency } from "@/utils/formatNumber";
import { fDateTime } from "@/utils/formatTime";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";

const CardContentRow = ({
  label,
  value,
  loading,
}: {
  label: string;
  value?: React.ReactNode | string | number;
  loading: boolean;
}) => (
  <Stack
    direction={"row"}
    justifyContent={"space-between"}
  >
    <Typography color={"text.secondary"}>
      {loading ? <Skeleton width={100} /> : label}
    </Typography>
    <Typography variant="subtitle1">
      {loading ? <Skeleton width={100} /> : value}
    </Typography>
  </Stack>
);

const PlanTransaction: NextPageWithLayout = () => {
  const router = useRouter();
  const { query } = router;
  const id = query.id as string;
  const { data, isLoading } = userApi.plan.getTransaction.useQuery(id, {
    enabled: router.isReady,
  });

  const rows: {
    label: string;
    value?: React.ReactNode | string | number;
    loading: boolean;
  }[] = [
    {
      label: "Plan Name",
      value: data?.planName,
      loading: isLoading,
    },
    {
      label: "Referral Income",
      value: fCurrency(data?.referralIncome ?? 0),
      loading: isLoading,
    },
    {
      label: "Roi Income",
      value: fCurrency(data?.roiIncome ?? 0),
      loading: isLoading,
    },
    {
      label: "Investment",
      value: fCurrency(data?.investment ?? 0),
      loading: isLoading,
    },
    {
      label: "Invested At",
      value: data?.createdAt ? fDateTime(data.createdAt) : undefined,
      loading: isLoading,
    },
    {
      label: "Valid Till",
      value: data?.validTill ? fDateTime(data.validTill) : undefined,
      loading: isLoading,
    },
    {
      label: "Expired At",
      value: data?.expiredAt ? fDateTime(data.expiredAt) : "-",
      loading: isLoading,
    },
    {
      label: "Validity",
      value: `${data?.validity ?? 0} day(s)`,
      loading: isLoading,
    },
    {
      label: "Status",
      value: (
        <Label color={data?.status === "active" ? "success" : "error"}>
          {capitalCase(data?.status)}
        </Label>
      ),
      loading: isLoading,
    },
  ];

  return (
    <Page title={`Plan Transaction #${id}`}>
      <Grid
        container
        justifyContent="center"
      >
        <Grid
          item
          xs={6}
        >
          <Card sx={{ marginInline: "auto" }}>
            <CardHeader
              sx={{ bgcolor: "background.neutral" }}
              title={`Plan Details - ${id}`}
            />
            <CardContent>
              <Stack spacing={3}>
                {rows.map(({ label, value }, index) => (
                  <CardContentRow
                    key={index}
                    label={label}
                    value={value}
                    loading={isLoading}
                  />
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Page>
  );
};
PlanTransaction.getLayout = (page) => (
  <Layout variant="dashboard">{page}</Layout>
);

export default PlanTransaction;
