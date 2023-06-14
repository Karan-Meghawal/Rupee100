import IconifyIcons from "@/IconifyIcons";
import Iconify from "@/components/Iconify";
import LoadingIconButton from "@/components/LoadingIconButton";
import { adminApi, useAdminUtils } from "@/utils/api";
import { useConfirm } from "material-ui-confirm";

type Props = {
  id: string;
};

const DeleteHowItWorkButton = ({ id }: Props) => {
  const confirm = useConfirm();
  const utils = useAdminUtils();
  const { mutate, isLoading: isMutating } =
    adminApi.pages.home.deleteHowItWork.useMutation();

  const handleClick = async () => {
    try {
      await confirm({ description: "Are you sure want to delete?" });
      mutate(id, {
        onSuccess() {
          utils.pages.home.getRecord.setData(undefined, (data) =>
            !data
              ? undefined
              : {
                  ...data,
                  howItWork: data.howItWork.filter((list) => list.id !== id),
                },
          );
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoadingIconButton
      loading={isMutating}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={handleClick}
      color="error"
    >
      <Iconify icon={IconifyIcons.delete} />
    </LoadingIconButton>
  );
};

export default DeleteHowItWorkButton;
