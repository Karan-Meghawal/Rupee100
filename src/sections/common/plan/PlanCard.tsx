import GradientText from "@/components/GradientText";
import Iconify from "@/components/Iconify";
import { varSlide } from "@/components/animate";
import { useUserAuth } from "@/redux/slices/userAuth";
import { type ApiOutputs } from "@/utils/api";
import { fCurrency, fPercent } from "@/utils/formatNumber";
import {
  Box,
  CardContent,
  Stack,
  Typography,
  alpha,
  keyframes,
  styled,
} from "@mui/material";
import { m } from "framer-motion";
import PlanPurchaseButton from "./PlanPurchaseButton";

export type PlanCardType = ApiOutputs["plan"][number];
type Props = {
  index: number;
  plan: PlanCardType;
};

const PlanRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <Stack
    direction="row"
    justifyContent={"space-between"}
    alignItems="center"
  >
    <Stack
      direction="row"
      gap={1}
      alignItems="center"
    >
      <Iconify
        icon={"icon-park-solid:correct"}
        sx={{ color: "primary.main", width: 20, height: 20 }}
      />
      <Typography variant="subtitle1">{label}</Typography>
    </Stack>
    <Typography variant="subtitle1">{value}</Typography>
  </Stack>
);

const animatedGradient = keyframes(`0% {
  background-position: 0% 50%;
}
50% {
  background-position: 100% 50%;
}
100% {
  background-position: 0% 50%;
}`);

const StyleCard = styled(Box)(({ theme }) => ({
  "--borderWidth": "4px",
  position: "relative",
  borderRadius: "var(--borderWidth)",
  background: theme.palette.background.paper,
  "&:after": {
    content: "''",
    position: "absolute",
    top: "calc(-1 * var(--borderWidth))",
    left: "calc(-1 * var(--borderWidth))",
    height: "calc(100% + var(--borderWidth) * 2)",
    width: "calc(100% + var(--borderWidth) * 2)",
    background:
      "linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82)",
    zIndex: -1,
    borderRadius: "calc(2 * var(--borderWidth))",
    animation: `${animatedGradient} 3s ease alternate infinite`,
    backgroundSize: "300% 300%",
  },
}));

const PlanCard = ({ plan, index }: Props) => {
  const { user } = useUserAuth();
  const activePlanId = user?.planId;
  const isActive = activePlanId === plan.id;

  const {
    maxInvestment,
    maxRoi,
    minInvestment,
    minRoi,
    name,
    referralIncome,
    validity,
    isPopular,
    description,
  } = plan;
  return (
    <m.div
      variants={varSlide().inDown}
      whileHover={{
        scale: 1.04,
      }}
      transition={{
        duration: 0.3,
      }}
    >
      <StyleCard>
        <CardContent>
          <Stack
            sx={{ p: 1 }}
            spacing={3}
          >
            <Stack
              direction="row"
              alignItems="center"
              gap={1}
            >
              <Typography variant="h4">
                <GradientText text={`[[${name}]]`} />
              </Typography>
              {isPopular && (
                <Box
                  sx={{
                    display: "inline",
                    background: (theme) => theme.palette.secondary.main,
                    borderRadius: 0.6,
                    boxShadow: (theme) =>
                      `0px 0px 70px 0px ${theme.palette.secondary.main}`,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      px: 1,
                      py: 0.5,
                      fontSize: 14,
                      background: (theme) =>
                        theme.palette.mode === "light" && !isActive
                          ? alpha(theme.palette.grey[200], 0.1)
                          : alpha(theme.palette.grey[100], 0.1),
                      fontWeight: 500,
                      color: "#fff",
                    }}
                  >
                    <Iconify
                      sx={{ mr: 0.5, fontSize: 18 }}
                      icon="humbleicons:crown"
                    />{" "}
                    Popular
                  </Box>
                </Box>
              )}
            </Stack>

            <Typography color="text.secondary">{description} </Typography>

            <Typography variant="h4">
              {`${fCurrency(minInvestment)} - ${fCurrency(maxInvestment)}`}
            </Typography>
            <Box>
              <Stack spacing={3}>
                <PlanRow
                  label="Referral Income"
                  value={fPercent(referralIncome)}
                />
                <PlanRow
                  label="Roi"
                  value={`${fPercent(minRoi)} - ${fPercent(maxRoi)}`}
                />
                <PlanRow
                  label="Validity"
                  value={`${validity} ${validity === 1 ? "day" : "days"}`}
                />
              </Stack>
            </Box>
            <PlanPurchaseButton
              index={index}
              plan={plan}
            />
          </Stack>
        </CardContent>
      </StyleCard>
    </m.div>
  );
};

export default PlanCard;
