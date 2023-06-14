import Iconify from "@/components/Iconify";
import Image from "@/components/Image";
import { Box, Card, Typography, alpha, styled } from "@mui/material";
import { type InstantDepositMethod } from "@prisma/client";
import { type Dispatch, type SetStateAction } from "react";

const DepositCardStyle = styled(Card)<{ className: string }>(
  ({ theme, className }) => {
    const commonStyles = {
      display: "grid",
      placeItems: "center",
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      gap: theme.spacing(1),
      cursor: "pointer",
      border: "1px solid transparent",
    };
    const isActive = className.split(" ").includes("active");
    if (isActive)
      return {
        ...commonStyles,
        boxShadow: `2px 7px 7px 2px ${alpha(theme.palette.primary.main, 0.4)}`,
        borderWidth: 1,
        borderColor: theme.palette.primary.main,
        borderStyle: "solid",
      };
    return {
      ...commonStyles,
    };
  },
);

type Props = {
  selectedId?: string;
  setSelectedId: Dispatch<SetStateAction<string | undefined>>;
  data: InstantDepositMethod[];
};

const InstantDepositCard = ({ selectedId, setSelectedId, data }: Props) => (
  <>
    {data.map((method) => (
      <DepositCardStyle
        className={method.id === selectedId ? "active" : ""}
        onClick={() => setSelectedId(method.id)}
        key={method.id}
      >
        {method.id === selectedId && (
          <Box
            sx={{
              position: "absolute",
              right: 6,
              top: 6,
              color: "primary.main",
              fontSize: 22,
            }}
          >
            <Iconify icon="ic:baseline-check-circle" />
          </Box>
        )}
        <Image
          sx={{ height: 40 }}
          alt={method.name}
          src={method.fullLogo}
          objectFit="contain"
        />
        <Typography color="text.secondary">{method.name}</Typography>
      </DepositCardStyle>
    ))}
  </>
);

export default InstantDepositCard;
