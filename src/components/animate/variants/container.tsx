// ----------------------------------------------------------------------

interface Props {
  staggerIn?: number;
  delayIn?: number;
  staggerOut?: number;
}

export const varContainer = (props?: Props) => {
  const staggerIn = props?.staggerIn || 0.05;
  const delayIn = props?.delayIn || 0.1;
  const staggerOut = props?.staggerOut || 0.01;

  return {
    animate: {
      transition: {
        staggerChildren: staggerIn,
        delayChildren: delayIn,
      },
    },
    exit: {
      transition: {
        staggerChildren: staggerOut,
        staggerDirection: -1,
      },
    },
  };
};
