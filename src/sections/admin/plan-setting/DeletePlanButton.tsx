import { ADMIN_PATH } from "@/route";
import { adminApi, useAdminUtils } from "@/utils/api";
import { LoadingButton } from "@mui/lab";
import { useConfirm } from "material-ui-confirm";
import { useRouter } from "next/router";

type Props = {
  id: string;
};

const DeletePlanButton = ({ id }: Props) => {
  const confirm = useConfirm();
  const utils = useAdminUtils();
  const router = useRouter();
  const { mutate, isLoading: isMutating } = adminApi.plan.remove.useMutation();

  const handleDelete = async () => {
    try {
      await confirm({
        description: "Are you sure want to delete the plan?",
      });
      mutate(id, {
        onSuccess() {
          utils.plan.getRecords.setData(undefined, (data) =>
            !data ? undefined : data.filter((record) => record.id !== id),
          );
          void utils.plan.getRecord.invalidate(id);
          void router.push(ADMIN_PATH.plans.root);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <LoadingButton
      variant="contained"
      color="error"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={handleDelete}
      loading={isMutating}
    >
      Delete Plan
    </LoadingButton>
  );
};

export default DeletePlanButton;
