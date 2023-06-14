import IconifyIcons from "@/IconifyIcons";
import Iconify from "@/components/Iconify";
import LoadingIconButton from "@/components/LoadingIconButton";
import { adminApi, useAdminUtils } from "@/utils/api";
import { useConfirm } from "material-ui-confirm";

type Props = {
  id: string;
};

const RemoveButton = ({ id }: Props) => {
  const utils = useAdminUtils();
  const confirm = useConfirm();

  const { mutate, isLoading } = adminApi.setting.kyc.remove.useMutation();
  const handleDelete = async () => {
    try {
      await confirm({ description: "Are you sure you want to delete?" });
      mutate(id, {
        onSuccess() {
          utils.setting.kyc.records.setData(undefined, (lists) =>
            lists?.filter((list) => list.id !== id),
          );
        },
      });
    } catch (error) {
      if (error) console.log(error);
    }
  };

  return (
    <LoadingIconButton
      loading={isLoading}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={handleDelete}
    >
      <Iconify icon={IconifyIcons.delete} />
    </LoadingIconButton>
  );
};

export default RemoveButton;
