import Logo from "@/components/Logo";
import { Stack, styled } from "@mui/material";

const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(3),
  justifyContent: "space-between",
  [theme.breakpoints.up("md")]: {
    position: "absolute",
    alignItems: "flex-start",
  },
}));

type Props = {
  children: React.ReactNode;
};
const LogoLayout = ({ children }: Props) => (
  <Stack component="main">
    <HeaderStyle>
      <Logo />
    </HeaderStyle>
    <>{children}</>
  </Stack>
);
export default LogoLayout;
