import Iconify from "@/components/Iconify";
import LoadingIconButton from "@/components/LoadingIconButton";
import { useUserUtils, userApi } from "@/utils/api";
import { useConfirm } from "material-ui-confirm";

type Props = {
  id: string;
};

const DeleteUserMethod = ({ id }: Props) => {
  const utils = useUserUtils();
  const confirm = useConfirm();
  const { mutate, isLoading } = userApi.withdraw.removeMethod.useMutation();

  const handleRemove = async () => {
    try {
      await confirm({
        description: "Are you sure want to delete this method?",
      });
      mutate(id, {
        onSuccess() {
          void utils.withdraw.getMethodRecords.invalidate();
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoadingIconButton
      loading={isLoading}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={handleRemove}
      color="error"
    >
      <Iconify icon="carbon:delete" />
    </LoadingIconButton>
  );
};

export default DeleteUserMethod;
