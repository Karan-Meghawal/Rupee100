import Iconify from "@/components/Iconify";
import LoadingIconButton from "@/components/LoadingIconButton";
import { adminApi, useAdminUtils } from "@/utils/api";
import { Tooltip } from "@mui/material";

type Props = {
  isPopular: boolean;
  id: string;
};

const MarkPopular = ({ isPopular, id }: Props) => {
  const utils = useAdminUtils();
  const { mutate, isLoading: isMutating } =
    adminApi.plan.markPopular.useMutation();
  const handleClick = () =>
    mutate(id, {
      onSuccess() {
        utils.plan.getRecords.setData(undefined, (data) =>
          !data
            ? undefined
            : data.map((record) =>
                record.id === id
                  ? { ...record, isPopular: true }
                  : { ...record, isPopular: false },
              ),
        );
      },
    });

  return isPopular ? null : (
    <Tooltip title="Mark As Popular">
      <LoadingIconButton
        onClick={handleClick}
        loading={isMutating}
      >
        <Iconify icon="humbleicons:crown" />
      </LoadingIconButton>
    </Tooltip>
  );
};

export default MarkPopular;
