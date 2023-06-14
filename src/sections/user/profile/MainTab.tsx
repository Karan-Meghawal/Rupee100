import { RESPONSIVE_GAP } from "@/config";
import { Grid } from "@mui/material";
import ContactDetails from "./ContactDetails";
import LoginSessions from "./LoginSessions";
import MyProfile from "./MyProfile";
import ProfileAbout from "./ProfileAbout";

const MainTab = () => (
  <Grid
    container
    spacing={RESPONSIVE_GAP}
  >
    <Grid
      item
      xs={12}
      md={4}
    >
      <ProfileAbout />
    </Grid>
    <Grid
      item
      xs={12}
      md={8}
    >
      <MyProfile />
    </Grid>
    <Grid
      item
      xs={12}
      md={12}
    >
      <ContactDetails />
    </Grid>
    <Grid
      item
      xs={12}
      md={12}
    >
      <LoginSessions />
    </Grid>
  </Grid>
);

export default MainTab;
