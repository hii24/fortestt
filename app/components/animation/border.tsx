import { motion } from "framer-motion";
import { clsx } from "clsx";

interface BorderAnimateProps {
  color?: string;
  height?: string;
  delay?: number;
  duration?: number;
  useInView: boolean;
  className?: string;
}

export const BorderAnimate = ({
  color = "#e5e7eb",
  height = "1px",
  delay = 0.2,
  duration = 1.4,
  useInView,
  className,
}: BorderAnimateProps) => {
  return (
    <div
      className={clsx(
        "w-full flex justify-center items-center absolute left-0",
        className
      )}
    >
      <motion.div
        initial={{ scaleX: 0 }}
        animate={
          useInView && {
            scaleX: 1,
            transition: {
              duration,
              ease: "easeInOut",
              delay,
            },
          }
        }
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "50%",
          height,
          backgroundColor: color,
          transformOrigin: "left",
        }}
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={
          useInView && {
            scaleX: 1,
            transition: {
              duration,
              ease: "easeInOut",
              delay,
            },
          }
        }
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "50%",
          height,
          backgroundColor: color,
          transformOrigin: "right",
        }}
      />
    </div>
  );
};
