import {
  Box,
  type BreadcrumbsProps,
  Link,
  Breadcrumbs as MUIBreadcrumbs,
  Typography,
} from "@mui/material";
import NextLink from "next/link";

function LinkItem({
  link,
}: {
  link: { href?: string; icon?: string; name: string };
}) {
  const { href, name, icon } = link;
  return (
    <Link
      key={name}
      variant="body2"
      component={NextLink}
      href={href || "#"}
      sx={{
        lineHeight: 2,
        display: "flex",
        alignItems: "center",
        color: "text.primary",
        "& > div": { display: "inherit" },
      }}
      underline="none"
    >
      {icon && (
        <Box sx={{ mr: 1, "& svg": { width: 20, height: 20 } }}>{icon}</Box>
      )}
      {name}
    </Link>
  );
}

export default function Breadcrumbs({
  links,
  activeLast = false,
  ...other
}: BreadcrumbsProps & {
  links: { href?: string; icon?: string; name: string }[];
  activeLast?: boolean;
}) {
  const currentLink = links[links.length - 1]?.name;

  const listDefault = links.map((link) => (
    <LinkItem
      key={link.name}
      link={link}
    />
  ));

  const listActiveLast = links.map((link) => (
    <div key={link.name}>
      {link.name !== currentLink ? (
        <LinkItem link={link} />
      ) : (
        <Typography
          variant="body2"
          sx={{
            maxWidth: 260,
            overflow: "hidden",
            whiteSpace: "nowrap",
            color: "text.disabled",
            textOverflow: "ellipsis",
          }}
        >
          {currentLink}
        </Typography>
      )}
    </div>
  ));

  return (
    <MUIBreadcrumbs
      separator={
        <Box
          component="span"
          sx={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            bgcolor: "text.disabled",
          }}
        />
      }
      {...other}
    >
      {activeLast ? listDefault : listActiveLast}
    </MUIBreadcrumbs>
  );
}
