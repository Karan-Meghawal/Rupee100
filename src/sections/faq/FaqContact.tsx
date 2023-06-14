import Iconify from "@/components/Iconify";
import { varFade } from "@/components/animate";
import { Box, Card, Grid, Typography, alpha, styled } from "@mui/material";
import { m } from "framer-motion";

const Icon = styled(Box)(({ theme }) => ({
  width: 50,
  height: 50,
  borderRadius: theme.spacing(1),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: 32,
  padding: theme.spacing(1),
  background: alpha(theme.palette.primary.main, 0.1),
}));

const FaqContact = ({
  whatsapp,
  email,
}: {
  whatsapp: string;
  email: string;
}) => (
  <Grid
    container
    marginTop={4}
    spacing={4}
  >
    <Grid
      item
      xs={12}
      md={6}
    >
      <Card
        variants={varFade().inDown}
        component={m.div}
        transition={{
          duration: 0.5,
        }}
        whileHover={{
          scale: 1.04,
        }}
        sx={{
          p: 6,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Icon>
          <Iconify
            color="primary.main"
            icon={"ic:baseline-whatsapp"}
          />
        </Icon>
        <Typography variant="h5">{whatsapp}</Typography>
        <Typography color="text.secondary">
          Best way to get answer faster!
        </Typography>
      </Card>
    </Grid>
    <Grid
      item
      xs={12}
      md={6}
    >
      <Card
        variants={varFade().inDown}
        component={m.div}
        transition={{
          duration: 0.5,
        }}
        whileHover={{
          scale: 1.04,
        }}
        sx={{
          p: 6,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Icon>
          <Iconify
            color="primary.main"
            icon={"carbon:email"}
          />
        </Icon>
        <Typography variant="h5">{email}</Typography>
        <Typography color="text.secondary">
          We are always happy to help!
        </Typography>
      </Card>
    </Grid>
  </Grid>
);
export default FaqContact;
