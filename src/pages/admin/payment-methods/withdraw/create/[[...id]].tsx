import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import {
  RHFProvider,
  RHFSelect,
  RHFTextField,
  RHFUploadAvatar,
} from "@/components/hook-form";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { ADMIN_PATH } from "@/route";
import { WithdrawCreateTable } from "@/sections/admin/payment-methods/withdraw";
import RemoveButton from "@/sections/admin/payment-methods/withdraw/RemoveButton";
import withdrawSchema from "@/server/admin/payment-methods/withdraw/schema";
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
import { useForm } from "react-hook-form";

type FormValues = AdminApiInputs["paymentMethod"]["withdraw"]["create"];

const Create: NextPageWithLayout = () => {
  const utils = useAdminUtils();
  const router = useRouter();
  const { id: idText } = router.query;
  const id = Array.isArray(idText) ? idText[0] : undefined;

  const isEdit = !!id;
  const defaultValues: FormValues = {
    id: undefined,
    logo: "",
    name: "",
    processingTime: "",
    minWithdraw: "",
    maxWithdraw: "",
    charge: "",
    chargeType: "" as FormValues["chargeType"],
    status: "" as FormValues["status"],
    details: [],
  };

  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(withdrawSchema.create),
  });
  const { reset, setValue, watch, handleSubmit } = methods;

  const { mutate, isLoading: isMutating } =
    adminApi.paymentMethod.withdraw.create.useMutation();
  const onSubmit = (formData: FormValues) =>
    mutate(formData, {
      onSuccess() {
        void router.push(ADMIN_PATH.paymentMethods.withdraw.root);
        void utils.paymentMethod.withdraw.getRecords.invalidate();
        if (id) void utils.paymentMethod.withdraw.getRecord.invalidate(id);
      },
    });

  const details = watch("details");

  const { data, isLoading } =
    adminApi.paymentMethod.withdraw.getRecord.useQuery(id!, {
      enabled: !!id,
    });

  useEffect(() => {
    if (data) reset(data);
  }, [data, reset]);

  return (
    <Page title="Create">
      {id && isLoading && <LinearProgress />}
      <HeaderBreadcrumbs
        heading={isEdit ? "Update Withdraw Gateway" : "Create Withdraw Gateway"}
        links={[
          { name: "Payment Gateways" },
          { name: "Withdraw", href: ADMIN_PATH.paymentMethods.withdraw.root },
        ]}
      />

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
                <CardHeader title="Details" />
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
                      name="minWithdraw"
                      label="Minimum Withdraw"
                    />
                    <RHFTextField
                      maskCurrency
                      name="maxWithdraw"
                      label="Maximum Withdraw"
                    />
                    <RHFTextField
                      maskNumber
                      name="charge"
                      label="Withdraw Charge"
                    />
                    <RHFSelect
                      name="chargeType"
                      label="Withdraw Charge Type"
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
              <WithdrawCreateTable
                name="details"
                details={details}
                setValue={setValue}
              />
            </Grid>
            <Grid
              display={"flex"}
              item
              xs={12}
            >
              {isEdit && <RemoveButton id={id} />}
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
    </Page>
  );
};
Create.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default Create;
