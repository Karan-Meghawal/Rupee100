import { Button, keyframes, styled, type ButtonProps } from "@mui/material";

const animate1 = keyframes(`
0%{
    left: -100%;
}
50%,100%{
    left: 100%;
}`);

const animate2 = keyframes(`
0%{
    top: -100%;
}
50%,100%{
    top: 100%;
}`);

const animate3 = keyframes(`
0%{
    right: -100%;
}
50%,100%{
    right: 100%;
}`);

const animate4 = keyframes(`
0%{
    bottom: -100%;
}
50%,100%{
    bottom: 100%;
}`);

const StyledButton = styled(Button)(({ theme, color: propColor, variant }) => {
  const { main: color, contrastText: textColor } =
    propColor === "inherit"
      ? { main: propColor, contrastText: propColor }
      : theme.palette[propColor ?? "primary"];

  return {
    position: "relative",
    color: variant === "contained" ? textColor : color,
    transition: "0.5s",
    letterSpacing: "4px",
    overflow: "hidden",
    borderRadius: variant === "contained" ? 48 : undefined,
    "&:hover": {
      borderRadius: 48,
      background: color,
      color: textColor,
      boxShadow: `0 0 5px ${color},0 0 25px ${color},0 0 50px ${color},0 0 200px ${color}`,
      WebkitBoxReflect: "below 1px linear-gradient(transparent, #0005)",
    },
    "& span": {
      position: "absolute",
      display: "block",
    },
    "& .top": {
      top: "0",
      left: "0",
      width: "100%",
      height: "2px",
      background: `linear-gradient(90deg,transparent,${color})`,
      animation: `${animate1} 1s linear infinite`,
    },
    "& .right": {
      top: "-100%",
      right: "0",
      width: "2px",
      height: "100%",
      background: `linear-gradient(180deg,transparent,${color})`,
      animation: `${animate2} 1s linear infinite`,
      animationDelay: "0.25s",
    },
    "& .bottom": {
      bottom: "0",
      right: "0",
      width: "100%",
      height: "2px",
      background: `linear-gradient(270deg,transparent,${color})`,
      animation: `${animate3} 1s linear infinite`,
      animationDelay: "1.50s",
    },
    "& .left": {
      bottom: "-100%",
      left: "0",
      width: "2px",
      height: "100%",
      background: `linear-gradient(360deg,transparent,${color})`,
      animation: `${animate4} 1s linear infinite`,
      animationDelay: "0.75s",
    },
  };
});

const NeonButton = ({ children, ...props }: ButtonProps) => (
  <StyledButton {...props}>
    <span className="top"></span>
    <span className="right"></span>
    <span className="bottom"></span>
    <span className="left"></span>
    {children}
  </StyledButton>
);

export default NeonButton;
