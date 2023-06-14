import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import { RHFProvider, RHFSelect, RHFTextField } from "@/components/hook-form";
import { RESPONSIVE_GAP } from "@/config";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { ADMIN_PATH } from "@/route";
import { DeletePlanButton } from "@/sections/admin/plan-setting";
import planSchema from "@/server/admin/plan/schema";
import { adminApi, useAdminUtils, type AdminApiInputs } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  LinearProgress,
  MenuItem,
  Stack,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

type FormValues = AdminApiInputs["plan"]["create"];

const Create: NextPageWithLayout = () => {
  const router = useRouter();
  const utils = useAdminUtils();
  const { query } = router;
  const id = query.id?.[0];

  const defaultValues: FormValues = {
    description: "",
    name: "",
    maxInvestment: "",
    maxRoi: "",
    minInvestment: "",
    minRoi: "",
    referralIncome: "",
    validity: "",
    status: "" as FormValues["status"],
  };

  const methods = useForm({
    defaultValues,
    resolver: zodResolver(planSchema.create),
  });
  const { handleSubmit, reset } = methods;

  const { mutate, isLoading: isMutating } = adminApi.plan.create.useMutation();
  const onSubmit: SubmitHandler<FormValues> = (data) =>
    mutate(data, {
      onSuccess() {
        void router.push(ADMIN_PATH.plans.root);
        void utils.plan.getRecords.invalidate();
        if (id) void utils.plan.getRecord.invalidate(id);
      },
    });

  const { data, isLoading } = adminApi.plan.getRecord.useQuery(id!, {
    enabled: !!id && router.isReady,
  });

  useEffect(() => {
    if (data) reset(data);
  }, [reset, data]);

  const isEdit = !!id;

  return (
    <Page title="Create Plan">
      <HeaderBreadcrumbs
        heading="Plan Setting"
        links={[
          { name: "Settings" },
          { name: "Plan Setting", href: ADMIN_PATH.plans.root },
          { name: `${isEdit ? "Update Plan" : "Create Plan"}` },
        ]}
      />
      {id && isLoading && <LinearProgress />}
      <RHFProvider
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack spacing={RESPONSIVE_GAP}>
          <Card>
            <CardHeader title={isEdit ? "Update Plan" : "Create Plan"} />
            <Divider />
            <CardContent>
              <Stack spacing={3}>
                <RHFTextField
                  name="name"
                  label="Name"
                />
                <RHFTextField
                  name="description"
                  label="Description"
                  multiline
                  minRows={4}
                />
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={3}
                >
                  <RHFTextField
                    maskCurrency
                    name="minInvestment"
                    label="Min. Investment"
                  />
                  <RHFTextField
                    maskCurrency
                    name="maxInvestment"
                    label="Max. Investment"
                  />
                </Stack>

                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={3}
                >
                  <RHFTextField
                    maskPercent
                    name="minRoi"
                    label="Min. Roi"
                  />
                  <RHFTextField
                    maskPercent
                    name="maxRoi"
                    label="Max. Roi"
                  />
                </Stack>

                <RHFTextField
                  maskPercent
                  name="referralIncome"
                  label="Referral Income"
                />
                <RHFTextField
                  maskNumber
                  name="validity"
                  label="Validity"
                  InputProps={{
                    endAdornment: <Box>Days</Box>,
                  }}
                />
                <RHFSelect
                  name="status"
                  label="Status"
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </RHFSelect>
              </Stack>
            </CardContent>
          </Card>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="space-between"
          >
            {isEdit ? <DeletePlanButton id={id} /> : <div></div>}
            <LoadingButton
              type="submit"
              loading={isMutating}
              variant="contained"
              color="primary"
            >
              {isEdit ? "Update" : "Create"} Plan
            </LoadingButton>
          </Stack>
        </Stack>
      </RHFProvider>
    </Page>
  );
};
Create.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default Create;
