import { env } from "@/env.mjs";
import { useConfiguration } from "@/redux/slices/configuration";
import { Card, Link, Typography } from "@mui/material";

const currentYear = new Date().getFullYear();

const Footer = () => {
  const { appName } = useConfiguration();
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        py: 2,
        px: { xs: 0, md: 4 },
        bgcolor: "background.paper",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        gap: 1,
        alignItems: "center",
        borderRadius: 0,
      }}
      component="footer"
    >
      <Typography
        variant="body2"
        sx={{
          fontSize: 13,
          textAlign: "center",
          margin: "auto",
        }}
      >
        ©{currentYear} - {appName}. All Rights Reserved
      </Typography>
      {env.NEXT_PUBLIC_BRANDING === "yes" && (
        <Typography
          component="div"
          variant="body2"
        >
          Created by{" "}
          <Link
            component="a"
            href="https://jamsrworld.com"
            target="_blank"
          >
            jamsrworld.com
          </Link>
        </Typography>
      )}
    </Card>
  );
};
export default Footer;
