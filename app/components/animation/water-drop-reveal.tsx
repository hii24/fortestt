import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { clsx } from "clsx";

interface WaterDropRevealProps {
  children: React.ReactNode;
  color?: string;
  delay?: number;
  inView?: boolean;
  duration?: number;
  className?: string;
  classNameFill?: string;
}

const WaterDropReveal = ({
  children,
  delay = 0.25,
  duration = 0.7,
  color = "#2D55F8",
  className,
  classNameFill,
  inView: providedInView,
}: WaterDropRevealProps) => {
  const ref = useRef(null);
  const isComponentInView = useInView(ref, { once: true });

  // Use the provided inView prop if available, otherwise use the result from useInView
  const isInView =
    providedInView !== undefined ? providedInView : isComponentInView;

  const mainControls = useAnimation();
  const slideControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
      slideControls.start("visible");
    }
  }, [isInView, mainControls, slideControls]);

  // Logo animation variants
  const logoVariants = {
    hidden: {
      x: "-100%",
      opacity: 0,
      filter: "blur(50px)",
    },
    visible: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: delay - 0.1,
        duration: duration + 0.1,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={logoVariants}
      ref={ref}
      className={clsx("relative w-fit overflow-hidden", className)}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 16,
          mass: 1,
          delay: delay + (duration - 0.05),
        }}
      >
        {children}
      </motion.div>
      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        style={{ backgroundColor: color }}
        initial="hidden"
        animate={slideControls}
        transition={{ duration: duration, ease: "easeIn", delay }}
        className={clsx(
          "rounded-full absolute bottom-1 left-0 right-0 top-1 z-20",
          classNameFill
        )}
      />
    </motion.div>
  );
};

export default WaterDropReveal;
