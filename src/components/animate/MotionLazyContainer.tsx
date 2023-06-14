import { LazyMotion, domMax } from "framer-motion";

// ----------------------------------------------------------------------

export default function MotionLazyContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LazyMotion
      strict
      features={domMax}
    >
      {children}
    </LazyMotion>
  );
}
