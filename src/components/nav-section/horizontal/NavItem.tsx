import { isExternalLink } from "@/utils/fns";
import { Box } from "@mui/material";
import Link from "next/link";
import { forwardRef } from "react";
import { ICON } from "../../../config";
import Iconify from "../../Iconify";
import { type NavItem } from "../vertical/NavItem";
import { ListItemStyle } from "./style";

type NavItemContentType = Omit<NavItem, "path">;
const NavItemContent = ({
  icon,
  title,
  children,
  subItem,
}: NavItemContentType & { subItem?: boolean }) => (
  <>
    {icon && (
      <Box
        component="span"
        sx={{
          mr: 1,
          width: ICON.NAVBAR_ITEM_HORIZONTAL,
          height: ICON.NAVBAR_ITEM_HORIZONTAL,
          "& svg": { width: "100%", height: "100%" },
        }}
      >
        {icon}
      </Box>
    )}
    {title}
    {children && (
      <Iconify
        icon={subItem ? "eva:chevron-right-fill" : "eva:chevron-down-fill"}
        sx={{
          ml: 0.5,
          width: ICON.NAVBAR_ITEM_HORIZONTAL,
          height: ICON.NAVBAR_ITEM_HORIZONTAL,
        }}
      />
    )}
  </>
);

// ----------------------------------------------------------------------

interface Props {
  item: NavItem;
  active: boolean;
  open?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const NavItemRoot = forwardRef<HTMLButtonElement, Props>(
  ({ item, active, open, onMouseEnter, onMouseLeave }, ref) => {
    const { title, path, icon, children } = item;

    if (children) {
      return (
        <ListItemStyle
          ref={ref}
          open={open}
          activeRoot={active}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <NavItemContent
            icon={icon}
            title={title}
          >
            {children}
          </NavItemContent>
        </ListItemStyle>
      );
    }

    return isExternalLink(path) ? (
      <Link
        href={path}
        target="_blank"
        rel="noopener"
        passHref
      >
        <ListItemStyle>
          <NavItemContent
            icon={icon}
            title={title}
          >
            {children}
          </NavItemContent>
        </ListItemStyle>
      </Link>
    ) : (
      <ListItemStyle
        LinkComponent={Link}
        href={path}
        activeRoot={active}
      >
        <NavItemContent
          icon={icon}
          title={title}
        >
          {children}
        </NavItemContent>
      </ListItemStyle>
    );
  },
);
NavItemRoot.displayName = "NavItemRoot";

interface NavItemRootProps {
  active?: boolean;
  open?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  item: NavItem;
}

export const NavItemSub = forwardRef<HTMLButtonElement, NavItemRootProps>(
  ({ item, active, open, onMouseEnter, onMouseLeave }, ref) => {
    const { title, path, icon, children } = item;

    if (children) {
      return (
        <ListItemStyle
          ref={ref}
          subItem
          disableRipple
          open={open}
          activeSub={active}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <NavItemContent
            icon={icon}
            title={title}
            subItem
          >
            {children}
          </NavItemContent>
        </ListItemStyle>
      );
    }

    return isExternalLink(path) ? (
      <Link
        href={path}
        rel="noopener"
        target="_blank"
        passHref
      >
        <ListItemStyle
          subItem
          disableRipple
        >
          <NavItemContent
            icon={icon}
            title={title}
            subItem
          >
            {children}
          </NavItemContent>
        </ListItemStyle>
      </Link>
    ) : (
      <ListItemStyle
        disableRipple
        LinkComponent={Link}
        href={path}
        activeSub={active}
        subItem
      >
        <NavItemContent
          icon={icon}
          title={title}
          subItem
        >
          {children}
        </NavItemContent>
      </ListItemStyle>
    );
  },
);
NavItemSub.displayName = "NavItemSub";
