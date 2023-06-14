import { api } from "@/utils/api";
import { Box, Button, Link, Skeleton, Stack, Tooltip } from "@mui/material";
import { type SxProps } from "@mui/material/styles";
import { m } from "framer-motion";
import IconifyIcons from "../IconifyIcons";
import Iconify from "./Iconify";

// ----------------------------------------------------------------------

interface Props {
  initialColor?: boolean;
  simple?: boolean;
  sx?: SxProps;
}

export default function SocialsButton({
  initialColor = false,
  simple = true,
  sx,
  ...other
}: Props) {
  const { data, isLoading } = api.socialLinks.useQuery();

  const links = data! ?? {
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    telegram: "",
    youtube: "",
    discord: "",
  };

  const SOCIALS = [
    {
      name: "facebook",
      label: "Facebook",
      path: links.facebook,
    },
    {
      name: "instagram",
      label: "Instagram",
      path: links.instagram,
    },
    {
      name: "linkedin",
      label: "Linkedin",
      path: links.linkedin,
    },
    {
      name: "twitter",
      label: "Twitter",
      path: links.twitter,
    },
    {
      name: "telegram",
      label: "Telegram",
      path: links.telegram,
    },
    {
      name: "youtube",
      label: "Youtube",
      path: links.youtube,
    },
    {
      name: "discord",
      label: "Discord",
      path: links.discord,
    },
  ];

  const socialLinks = SOCIALS.filter((link) => !!link.path);

  if (isLoading) {
    return (
      <Stack
        direction="row"
        flexWrap="wrap"
        alignItems="center"
        gap={1}
        justifyContent="center"
      >
        {...Array(6)
          .fill(null)
          .map((_, index) => (
            <Skeleton
              key={index}
              sx={{
                bgcolor: "grey.800",
                width: 48,
                height: 48,
                borderRadius: 999,
              }}
              variant="rectangular"
            />
          ))}
      </Stack>
    );
  }

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      alignItems="center"
      gap={1}
      justifyContent="center"
    >
      {socialLinks.map((social) => {
        const { name, label, path } = social;
        return simple ? (
          <Link
            component={m.a}
            key={name}
            href={path ?? undefined}
            target="_blank"
            whileHover={{
              scale: 1.1,
            }}
          >
            <Tooltip
              title={label}
              placement="top"
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: (theme) => theme.palette.grey[50012],
                  borderRadius: 999,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#fff",
                  "&:hover": {
                    color: (theme) => theme.palette.primary.light,
                  },
                }}
              >
                <Iconify
                  color="inherit"
                  icon={
                    IconifyIcons.social[
                      name as keyof typeof IconifyIcons.social
                    ]
                  }
                  sx={{ width: 24 }}
                />
              </Box>
            </Tooltip>
          </Link>
        ) : (
          <Button
            key={name}
            href={path ?? undefined}
            color="inherit"
            variant="outlined"
            size="small"
            sx={{
              m: 0.5,
              flexShrink: 0,
              ...(initialColor && {
                "&:hover": {},
              }),
              ...sx,
            }}
            {...other}
          >
            {label}
          </Button>
        );
      })}
    </Stack>
  );
}
