import appData from "@/appData.json";
import { useConfiguration } from "@/redux/slices/configuration";
import APP_PATH from "@/route";
import { Link, type SxProps } from "@mui/material";
import NextLink from "next/link";
import Image from "./Image";

export default function Logo({
  isCollapsed = false,
  disabledLink = false,
  mini,
}: {
  isCollapsed?: boolean;
  disabledLink?: boolean;
  mini?: boolean;
  sx?: SxProps;
}) {
  const { logo, fullLogo } = useConfiguration();
  return (
    <Link
      component={NextLink}
      href={!disabledLink ? APP_PATH.home : undefined}
    >
      <Image
        src={isCollapsed ? logo || appData.logo : fullLogo || appData.fullLogo}
        alt="logo"
        style={{
          height: "unset",
          width: "unset",
          maxHeight: 40,
        }}
      />
    </Link>
  );
}
