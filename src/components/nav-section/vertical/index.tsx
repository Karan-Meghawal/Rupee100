import { Box, List, ListSubheader } from "@mui/material";
import { styled } from "@mui/material/styles";
import { type NavItem } from "./NavItem";
import { NavListRoot } from "./NavList";

export const ListSubheaderStyle = styled(ListSubheader)(({ theme }) => ({
  ...theme.typography.overline,
  paddingTop: theme.spacing(3),
  paddingLeft: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  color: theme.palette.text.primary,
  transition: theme.transitions.create("opacity", {
    duration: theme.transitions.duration.shorter,
  }),
}));

export default function NavSectionVertical({
  navConfig,
  isCollapse = false,
  ...other
}: {
  navConfig: { subheader: string; items: NavItem[] }[];
  isCollapse?: boolean;
  [x: string]: unknown;
}) {
  return (
    <Box {...other}>
      {navConfig.map((group) => (
        <List
          key={group.subheader}
          disablePadding
          sx={{ px: 2 }}
        >
          <ListSubheaderStyle
            disableSticky
            disableGutters
            sx={{
              ...(isCollapse && {
                opacity: 0,
              }),
            }}
          >
            {group.subheader}
          </ListSubheaderStyle>

          {group.items.map((list) => (
            <NavListRoot
              key={list.title}
              list={list}
              isCollapse={isCollapse}
            />
          ))}
        </List>
      ))}
    </Box>
  );
}
