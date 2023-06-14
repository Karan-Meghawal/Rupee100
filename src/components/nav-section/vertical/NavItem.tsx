import { isExternalLink } from "@/utils/fns";
import { Box, ListItemText } from "@mui/material";
import NextLink from "next/link";
import Iconify from "../../Iconify";
import { ListItemIconStyle, ListItemStyle, ListItemTextStyle } from "./style";

// ----------------------------------------------------------------------

export const DotIcon = ({ active }: { active: boolean }) => (
  <ListItemIconStyle>
    <Box
      component="span"
      sx={{
        width: 4,
        height: 4,
        borderRadius: "50%",
        bgcolor: "text.disabled",
        transition: (theme) =>
          theme.transitions.create("transform", {
            duration: theme.transitions.duration.shorter,
          }),
        ...(active && {
          transform: "scale(2)",
          bgcolor: "primary.main",
        }),
      }}
    />
  </ListItemIconStyle>
);

export const ArrowIcon = ({ open }: { open: boolean }) => (
  <Iconify
    icon={open ? "eva:arrow-ios-downward-fill" : "eva:arrow-ios-forward-fill"}
    sx={{ width: 16, height: 16, ml: 1 }}
  />
);

export type NavItem = {
  title: string;
  path: string;
  target?: string;
  icon?: JSX.Element | string;
  children?: NavItem[];
};

export const NavItemRoot = ({
  item,
  isCollapse,
  open = false,
  active,
  onOpen,
}: {
  active: boolean;
  open?: boolean;
  isCollapse: boolean;
  onOpen?: () => void;
  item: NavItem;
}) => {
  const { title, path, icon, children, target } = item;

  const renderContent = (
    <>
      {icon && <ListItemIconStyle>{icon}</ListItemIconStyle>}
      <ListItemTextStyle
        disableTypography
        primary={title}
        isCollapse={isCollapse}
      />
      {!isCollapse && <>{children && <ArrowIcon open={open} />}</>}
    </>
  );

  if (children) {
    return (
      <ListItemStyle
        // @ts-ignore
        href={null}
        onClick={onOpen}
        activeRoot={active}
      >
        {renderContent}
      </ListItemStyle>
    );
  }

  return target === "_blank" || isExternalLink(path) ? (
    <ListItemStyle
      LinkComponent={NextLink}
      href={path}
      // @ts-ignore
      target="_blank"
      rel="noopener"
    >
      {renderContent}
    </ListItemStyle>
  ) : (
    <ListItemStyle
      LinkComponent={NextLink}
      href={path}
      activeRoot={active}
    >
      {renderContent}
    </ListItemStyle>
  );
};

export const NavItemSub = ({
  item,
  open = false,
  active = false,
  onOpen,
}: {
  open?: boolean;
  active?: boolean;
  onOpen?: () => void;
  item: NavItem;
}) => {
  const { title, path, children } = item;

  const renderContent = (
    <>
      <DotIcon active={active} />
      <ListItemText
        disableTypography
        primary={title}
      />
      {children && <ArrowIcon open={open} />}
    </>
  );

  if (children) {
    return (
      <ListItemStyle
        // @ts-ignore
        href={undefined}
        onClick={onOpen}
        activeSub={active}
        subItem
      >
        {renderContent}
      </ListItemStyle>
    );
  }

  return isExternalLink(path) ? (
    <ListItemStyle
      LinkComponent={NextLink}
      href={path}
      // @ts-ignore
      target="_blank"
      rel="noopener"
      subItem
    >
      {renderContent}
    </ListItemStyle>
  ) : (
    <ListItemStyle
      LinkComponent={NextLink}
      href={path}
      activeSub={active}
      subItem
    >
      {renderContent}
    </ListItemStyle>
  );
};
