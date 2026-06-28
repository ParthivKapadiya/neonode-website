export const EASE_OUT = [0.21, 0.47, 0.32, 0.98] as const;

export const VIEWPORT_DEFAULT = { once: true, margin: '-60px' as const };

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const scaleUpVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
};

export const slideLeftVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0 },
};

export const slideRightVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0 },
};

export const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

export const defaultTransition = {
  duration: 0.45,
  ease: EASE_OUT,
};

export const hoverLift = {
  y: -4,
  transition: { duration: 0.22, ease: EASE_OUT },
};

export const cardHover = {
  y: -6,
  transition: { duration: 0.28, ease: EASE_OUT },
};
