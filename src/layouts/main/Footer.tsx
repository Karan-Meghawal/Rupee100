import Iconify from "@/components/Iconify";
import Logo from "@/components/Logo";
import SocialsButton from "@/components/SocialsButton";
import TitleText from "@/components/TitleText";
import { env } from "@/env.mjs";
import { useConfiguration } from "@/redux/slices/configuration";
import APP_PATH from "@/route";
import { api } from "@/utils/api";
import {
  Container,
  Divider,
  Grid,
  Link,
  Skeleton,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { m } from "framer-motion";
import NextLink from "next/link";

const RootStyle = styled("footer")(({ theme }) => ({
  position: "relative",
  backgroundColor: theme.palette.grey[900],
  color: "#fff",
}));

const currentYear = new Date().getFullYear();

const Footer = () => {
  const { data } = api.sections.useQuery();
  const { contactUs } = data! ?? { contactUs: {}, about: "" };
  const { email, whatsapp, location } = contactUs;
  const { appName } = useConfiguration();

  // about
  const { data: aboutUsData, isLoading: isAboutLoading } =
    api.pageAboutUs.useQuery();

  const LINKS = [
    {
      headline: "Company",
      children: [
        {
          name: "About us",
          href: APP_PATH.aboutUs,
          icon: "uil:arrow-right",
          color: "primary.main",
        },
        {
          name: "Contact us",
          href: APP_PATH.contactUs,
          icon: "uil:arrow-right",
          color: "primary.main",
        },
        {
          name: "FAQs",
          href: APP_PATH.faq,
          icon: "uil:arrow-right",
          color: "primary.main",
        },
        {
          name: "Plans",
          href: APP_PATH.plans,
          icon: "uil:arrow-right",
          color: "primary.main",
        },
      ],
    },
    {
      headline: "Legal Links",
      children: [
        {
          name: "Terms and Conditions",
          href: APP_PATH.termsAndConditions,
          icon: "uil:arrow-right",
          color: "primary.main",
        },
        {
          name: "Privacy Policy",
          href: APP_PATH.privacyPolicy,
          icon: "uil:arrow-right",
          color: "primary.main",
        },
        {
          name: "Refund Policy",
          href: APP_PATH.refundPolicy,
          icon: "uil:arrow-right",
          color: "primary.main",
        },
        {
          name: "Commission Policy",
          href: APP_PATH.commissionPolicy,
          icon: "uil:arrow-right",
          color: "primary.main",
        },
      ],
    },
    {
      headline: "Get In Touch",
      children: [
        { name: email, icon: "ic:round-email", color: "info.main" },
        {
          name: whatsapp,
          icon: "ri:whatsapp-fill",
          color: "#25D366",
        },
        {
          name: location,
          icon: "material-symbols:location-on",
          color: "error.main",
        },
      ],
    },
  ];

  return (
    <RootStyle>
      <Divider />
      <Container sx={{ pt: 10 }}>
        <Grid
          container
          justifyContent={"space-between"}
          sx={{ textAlign: { md: "left" } }}
        >
          <Grid
            item
            xs={12}
            sx={{ mb: 3 }}
          >
            <Logo sx={{ mx: { xs: "auto", md: "inherit" } }} />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
          >
            <Typography
              variant="body2"
              sx={{ pr: { md: 5 } }}
            >
              {isAboutLoading || !aboutUsData?.footer ? (
                <>
                  <Skeleton
                    sx={{ bgcolor: "grey.800" }}
                    variant="text"
                  />
                  <Skeleton
                    sx={{ bgcolor: "grey.800" }}
                    variant="text"
                  />
                  <Skeleton
                    sx={{ bgcolor: "grey.800" }}
                    variant="text"
                  />
                  <Skeleton
                    sx={{ bgcolor: "grey.800" }}
                    variant="text"
                  />
                </>
              ) : (
                <TitleText text={aboutUsData?.footer} />
              )}
            </Typography>

            <Stack
              direction="row"
              justifyContent={{ xs: "center", md: "flex-start" }}
              sx={{ mt: 5, mb: { xs: 5, md: 0 } }}
            >
              <SocialsButton sx={{ mx: 0.5 }} />
            </Stack>
          </Grid>

          <Grid
            item
            xs={12}
            md={7}
          >
            <Stack
              spacing={5}
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
            >
              {LINKS.map((list, index) => (
                <Stack
                  key={index}
                  spacing={2}
                >
                  <Typography
                    ml={1}
                    component="p"
                    textTransform={"uppercase"}
                    color="grey.500"
                    variant="subtitle2"
                  >
                    {list.headline}
                  </Typography>
                  {list.children.map((link, index2) => (
                    <Stack
                      component={m.div}
                      whileHover={{
                        marginLeft: 4,
                      }}
                      key={index2}
                      alignItems="center"
                      direction="row"
                      gap={1}
                    >
                      {"icon" in link && (
                        <Iconify
                          color={"color" in link ? link.color : undefined}
                          icon={link.icon}
                        />
                      )}
                      {"href" in link ? (
                        <Link
                          href={link.href}
                          color="inherit"
                          variant="body2"
                          component={NextLink}
                        >
                          {link.name}
                        </Link>
                      ) : (
                        <Link
                          color="inherit"
                          variant="body2"
                          underline="none"
                        >
                          {link.name}
                        </Link>
                      )}
                    </Stack>
                  ))}
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Divider
          sx={{
            my: 2,
          }}
        />
        <Stack
          direction="row"
          justifyContent="space-between"
        >
          <Typography
            variant="body2"
            sx={{
              pb: 2,
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
        </Stack>
      </Container>
    </RootStyle>
  );
};
export default Footer;
