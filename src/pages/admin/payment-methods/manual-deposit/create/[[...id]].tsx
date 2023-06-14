import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import {
  RHFHiddenInput,
  RHFProvider,
  RHFSelect,
  RHFTextField,
  RHFUploadAvatar,
} from "@/components/hook-form";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { ADMIN_PATH } from "@/route";
import { ManualDepositDeleteRecord } from "@/sections/admin/payment-methods/manual-deposit";
import ManualDepositDetailFields from "@/sections/admin/payment-methods/manual-deposit/ManualDepositDetailFields";
import manualDepositMethodSchema from "@/server/admin/payment-methods/manual-deposit/schema";
import { adminApi, useAdminUtils, type AdminApiInputs } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  LinearProgress,
  MenuItem,
  Stack,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

type FormValues = AdminApiInputs["paymentMethod"]["manualDeposit"]["create"];

const Create: NextPageWithLayout = () => {
  const router = useRouter();
  const utils = useAdminUtils();

  const { id: idText } = router.query;
  const id = Array.isArray(idText) ? idText[0] : undefined;
  const isEdit = !!id;

  const defaultValues: FormValues = {
    id,
    logo: "",
    name: "",
    processingTime: "",
    minDeposit: "",
    maxDeposit: "",
    charge: "",
    chargeType: "" as FormValues["chargeType"],
    status: "" as FormValues["status"],
    details: [],
  };

  const { data, isLoading } =
    adminApi.paymentMethod.manualDeposit.getRecord.useQuery(id!, {
      enabled: !!id,
    });

  const methods = useForm({
    defaultValues,
    resolver: zodResolver(manualDepositMethodSchema.create),
  });
  const { reset, setValue, handleSubmit } = methods;

  const { mutate, isLoading: isMutating } =
    adminApi.paymentMethod.manualDeposit.create.useMutation();
  const onSubmit: SubmitHandler<FormValues> = (data) =>
    mutate(data, {
      onSuccess() {
        void utils.paymentMethod.manualDeposit.getRecords.invalidate();
        if (id) void utils.paymentMethod.manualDeposit.getRecord.invalidate(id);
        void router.push(ADMIN_PATH.paymentMethods.manualDeposit.root);
      },
    });

  useEffect(() => {
    if (data) reset(data);
  }, [reset, data]);

  return (
    <Page title={isEdit ? "Update Manual Deposit" : "Create Manual Deposit"}>
      <HeaderBreadcrumbs
        heading={isEdit ? "Update Manual Deposit" : "Create Manual Deposit"}
        links={[
          { name: "Payment Gateways" },
          {
            name: "Manual Deposit Methods",
            href: ADMIN_PATH.paymentMethods.manualDeposit.root,
          },
        ]}
      />

      {isEdit && isLoading ? (
        <LinearProgress />
      ) : (
        <Box>
          <RHFProvider
            methods={methods}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid
              container
              spacing={4}
            >
              <Grid
                item
                xs={12}
                md={5}
              >
                <Card>
                  <CardHeader title="Method Details" />
                  <Divider />
                  <CardContent>
                    <Stack spacing={4}>
                      <RHFUploadAvatar
                        setValue={setValue}
                        name="logo"
                      />
                      <RHFTextField
                        name="name"
                        label="Gateway Name"
                      />
                      <RHFTextField
                        name="processingTime"
                        label="Processing Time"
                      />
                      <RHFTextField
                        maskCurrency
                        name="minDeposit"
                        label="Minimum Deposit"
                      />
                      <RHFTextField
                        maskCurrency
                        name="maxDeposit"
                        label="Maximum Deposit"
                      />
                      <RHFTextField
                        maskNumber
                        name="charge"
                        label="Deposit Charge"
                      />
                      <RHFSelect
                        name="chargeType"
                        label="Deposit Charge Type"
                      >
                        <MenuItem value="fixed">Fixed</MenuItem>
                        <MenuItem value="percent">Percent</MenuItem>
                      </RHFSelect>
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
              </Grid>
              <Grid
                item
                xs={12}
                md={7}
              >
                <Stack spacing={3}>
                  <ManualDepositDetailFields setValue={setValue} />
                  <RHFHiddenInput name="details" />
                </Stack>
              </Grid>
              <Grid
                display={"flex"}
                item
                xs={12}
              >
                {!!id && <ManualDepositDeleteRecord id={id} />}
                <LoadingButton
                  type="submit"
                  sx={{ ml: "auto" }}
                  variant="contained"
                  size="large"
                  loading={isMutating}
                >
                  Submit
                </LoadingButton>
              </Grid>
            </Grid>
          </RHFProvider>
        </Box>
      )}
    </Page>
  );
};
Create.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default Create;
