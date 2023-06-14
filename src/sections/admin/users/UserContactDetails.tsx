import { Card, CardContent, CardHeader, Grid, TextField } from "@mui/material";
import { type User_Contact } from "@prisma/client";

const UserContactDetails = ({ contact }: { contact: User_Contact }) => {
  const { address, country, state, city, pinCode, mobileNumber } = contact;
  return (
    <Card>
      <CardHeader
        title="Contact Details"
        sx={{ bgcolor: "background.neutral" }}
      />
      <CardContent>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={12}
            md={6}
          >
            <TextField
              disabled
              type="text"
              label="Address"
              value={address}
              fullWidth
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
          >
            <TextField
              disabled
              type="text"
              label="Country"
              value={country}
              fullWidth
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
          >
            <TextField
              disabled
              type="text"
              label="State/Region"
              value={state}
              fullWidth
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
          >
            <TextField
              disabled
              type="text"
              label="City"
              value={city}
              fullWidth
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
          >
            <TextField
              disabled
              name="pinCode"
              type="text"
              label="Pin Code/Zip Code"
              value={pinCode}
              fullWidth
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
          >
            <TextField
              disabled
              label="Mobile Number"
              value={mobileNumber}
              fullWidth
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default UserContactDetails;
