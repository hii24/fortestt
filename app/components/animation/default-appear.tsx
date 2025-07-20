// Memoized animated section component to prevent re-renders
import { memo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { clsx } from 'clsx';

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  position?: 'left' | 'right' | 'top' | 'bottom';
  inView?: boolean;
  classNameParent?: string;
  classNameChild?: string;
}

// eslint-disable-next-line react/display-name
const DefaultAppear = memo(
  ({ children, delay = 0, position, inView, classNameParent, classNameChild }: AnimatedSectionProps) => {
    const ref = useRef(null);
    const autoInView = useInView(ref, { once: true, amount: 0.2 });
    const isInView = inView !== undefined ? inView : autoInView;

    // Define animation initial values based on position prop
    const getInitialAnimation = () => {
      switch (position) {
        case 'left':
          return { opacity: 0, x: -100, filter: 'blur(50px)' };
        case 'right':
          return { opacity: 0, x: 100, filter: 'blur(50px)' };
        case 'top':
          return { opacity: 0, y: -60, filter: 'blur(50px)' };
        case 'bottom':
          return { opacity: 0, y: 60, filter: 'blur(50px)' };
        default:
          return { opacity: 0, y: 60, filter: 'blur(50px)' };
      }
    };

    // Define animation values when in view
    const getInViewAnimation = () => {
      return { opacity: 1, x: 0, y: 0, filter: 'blur(0px)' };
    };

    return (
      <div ref={ref} className={clsx('w-full', classNameParent)}>
        <motion.div
          className={clsx('w-full', classNameChild)}
          initial={getInitialAnimation()}
          animate={isInView ? getInViewAnimation() : getInitialAnimation()}
          transition={{ duration: 0.4, delay }}>
          {children}
        </motion.div>
      </div>
    );
  }
);

export default DefaultAppear;
