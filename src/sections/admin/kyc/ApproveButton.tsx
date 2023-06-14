import IconifyIcons from "@/IconifyIcons";
import Iconify from "@/components/Iconify";
import { ADMIN_PATH } from "@/route";
import { adminApi, useAdminUtils } from "@/utils/api";
import { LoadingButton } from "@mui/lab";
import { useConfirm } from "material-ui-confirm";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  id: string;
};

const ApproveButton = ({ id }: Props) => {
  const router = useRouter();
  const utils = useAdminUtils();
  const confirm = useConfirm();

  const { mutate, isLoading: isMutating } = adminApi.kyc.approve.useMutation();

  const handleApprove = async () => {
    try {
      await confirm({
        description: "Are you sure want to approve?",
      });
      mutate(id, {
        onSuccess() {
          void utils.kyc.getRecords.invalidate();
          void utils.kyc.getRecord.invalidate(id);
          void router.push(ADMIN_PATH.kyc.pending);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoadingButton
      loading={isMutating}
      variant="contained"
      color="success"
      size="large"
      startIcon={<Iconify icon={IconifyIcons.check} />}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={handleApprove}
    >
      Approve
    </LoadingButton>
  );
};

export default ApproveButton;
