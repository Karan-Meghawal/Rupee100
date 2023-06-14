import { getFileSrc } from "@/utils/fns";
import { getFileThumb } from "@/utils/getFileFormat";
import { Box, type SxProps, Link } from "@mui/material";
import NextImage, { type ImageLoaderProps, type ImageProps } from "next/image";
import NextLink from "next/link";

const imageLoader = ({ src, width, quality }: ImageLoaderProps) =>
  `${getFileSrc(src)!}?w=${width}&q=${quality || 75}`;

const getBlurDataURL = (src: ImageProps["src"]) =>
  typeof src === "string" && src.startsWith("/uploads/")
    ? `/api${src}?w=${7}`
    : "data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxyYWRpYWxHcmFkaWVudCBpZD0iYSIgY3g9IjUwJSIgY3k9IjQ2LjgwMTEwMiUiIHI9Ijk1LjQ5NzExMiUiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZmZiIgc3RvcC1vcGFjaXR5PSIwIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjOTE5ZWFiIiBzdG9wLW9wYWNpdHk9Ii40OCIvPjwvcmFkaWFsR3JhZGllbnQ+PHBhdGggZD0ibTg4IDg2aDUxMnY1MTJoLTUxMnoiIGZpbGw9InVybCgjYSkiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTg4IC04NikiLz48L3N2Zz4=";

type Props = ImageProps & {
  openOnClick?: boolean;
  sx?: SxProps;
};

const Image = ({
  src,
  width,
  height,
  style,
  sx,
  openOnClick,
  objectFit = "cover",
  ...restProps
}: Props & {
  objectFit?: "cover" | "contain";
}) => {
  const Img = !src ? null : (
    <Box
      sx={{
        position: "relative",
        width: width ?? 1,
        height: height ?? 1,
        objectFit,
        overflow: "hidden",
        ...sx,
      }}
    >
      <NextImage
        loader={imageLoader}
        loading="lazy"
        sizes="100vw"
        width={0}
        height={0}
        placeholder="blur"
        blurDataURL={getBlurDataURL(src)}
        src={typeof src === "string" ? getFileThumb(src) : src}
        style={{
          width: "100%",
          height: "100%",
          objectFit,
          ...style,
        }}
        {...restProps}
      />
    </Box>
  );

  return openOnClick && typeof src === "string" ? (
    <Link
      target="_blank"
      href={getFileSrc(src)}
      sx={{ width: 1, height: 1 }}
      component={NextLink}
    >
      {Img}
    </Link>
  ) : (
    Img
  );
};

export default Image;
