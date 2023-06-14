import Page from "@/components/Page";
import { InstallSetup } from "@/sections/admin/install";
import { Box, Link, Stack, Typography } from "@mui/material";
import Head from "next/head";

const text = `${"Jamsrmlm".split("").join(",")},:)`;
const texts = text.split(",");

const Install = () => (
  <Page title="">
    <Head>
      <title>Install | Jamsrworld</title>
    </Head>
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#ee5522",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='100' y1='33' x2='100' y2='-3'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='100' y1='135' x2='100' y2='97'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%23d23d09' fill-opacity='0.6'%3E%3Crect x='100' width='100' height='100'/%3E%3Crect y='100' width='100' height='100'/%3E%3C/g%3E%3Cg fill-opacity='0.5'%3E%3Cpolygon fill='url(%23a)' points='100 30 0 0 200 0'/%3E%3Cpolygon fill='url(%23b)' points='100 100 0 130 0 100 200 100 200 130'/%3E%3C/g%3E%3C/svg%3E")`,
      }}
      className="install-container"
    >
      <Stack
        spacing={3}
        justifyContent="center"
        alignItems="center"
      >
        <Box>
          <Stack direction={"row"}>
            {texts.map((txt, i) => (
              <Typography
                key={i}
                color="#fff"
                component={"h1"}
                variant="h1"
              >
                {txt}
              </Typography>
            ))}
          </Stack>
          <Typography
            sx={{ textAlign: "right" }}
            variant="body2"
          >
            Created by{" "}
            <Link
              target="_blank"
              href="https://jamsrworld.com"
            >
              jamsrworld.com
            </Link>
          </Typography>
        </Box>
        <Typography sx={{ color: "text.secondary" }}>Version 5.0</Typography>
        <InstallSetup />
      </Stack>
    </Box>
  </Page>
);

export default Install;
