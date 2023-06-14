import PlansPage from "@/pages/plans";
import { Box, Container } from "@mui/material";
import { type Plan } from "@prisma/client";

type Props = {
  plans: Plan[];
};

const PlansSection = ({ plans }: Props) => (
  <Box
    component="section"
    py={4}
    position="relative"
  >
    <Container>
      <PlansPage
        head={false}
        plans={plans}
      />
    </Container>
  </Box>
);

export default PlansSection;
