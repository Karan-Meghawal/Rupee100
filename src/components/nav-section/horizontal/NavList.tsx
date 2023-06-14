import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { type NavItem } from "../vertical/NavItem";
import { NavItemRoot, NavItemSub } from "./NavItem";
import { PaperStyle } from "./style";

// ----------------------------------------------------------------------

const NavListSub = ({ list }: { list: NavItem }) => {
  const router = useRouter();
  const menuRef = useRef(null);
  const active = router.pathname.includes(list.path);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const hasChildren = list.children;
  if (hasChildren) {
    return (
      <>
        <NavItemSub
          ref={menuRef}
          open={open}
          item={list}
          active={active}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
        />

        <PaperStyle
          open={open}
          anchorEl={menuRef.current}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          PaperProps={{
            onMouseEnter: handleOpen,
            onMouseLeave: handleClose,
          }}
        >
          {(list.children || []).map((item) => (
            <NavListSub
              key={item.title}
              list={item}
            />
          ))}
        </PaperStyle>
      </>
    );
  }

  return (
    <NavItemSub
      item={list}
      active={active}
    />
  );
};

export const NavListRoot = ({ list }: { list: NavItem }) => {
  const router = useRouter();
  const menuRef = useRef(null);
  const { pathname } = router;
  const active = pathname.includes(list.path);
  const [open, setOpen] = useState(false);
  const hasChildren = list.children;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (hasChildren) {
    return (
      <>
        <NavItemRoot
          open={open}
          item={list}
          active={active}
          ref={menuRef}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
        />

        <PaperStyle
          open={open}
          anchorEl={menuRef.current}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          PaperProps={{
            onMouseEnter: handleOpen,
            onMouseLeave: handleClose,
          }}
        >
          {(list.children || []).map((item) => (
            <NavListSub
              key={item.title}
              list={item}
            />
          ))}
        </PaperStyle>
      </>
    );
  }

  return (
    <NavItemRoot
      item={list}
      active={active}
    />
  );
};
