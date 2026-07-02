'use client';

import Link from 'next/link';
import { motion, type HTMLMotionProps, type Transition } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';
import { EASE_OUT } from '@/lib/motion';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  magnetic?: boolean;
  href?: string;
  className?: string;
  children: React.ReactNode;
}

type ButtonProps = BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps>;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-[colors,box-shadow] duration-300',
  secondary:
    'bg-card text-white border border-border hover:bg-surface hover:border-white/20 transition-colors duration-300',
  outline:
    'border border-white/20 text-white hover:bg-white/5 hover:border-white/30 backdrop-blur-sm transition-colors duration-300',
  ghost: 'text-muted hover:text-white hover:bg-white/5 transition-colors duration-300',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'min-h-11 px-4 py-2 text-sm rounded-xl',
  md: 'min-h-11 px-6 py-3 text-sm rounded-xl',
  lg: 'min-h-12 px-8 py-3.5 text-base rounded-xl',
};

const subtleHover = { scale: 1.015, y: -1 };
const primaryHover = { scale: 1.02, y: -2 };

const subtleHoverTransition: Transition = { duration: 0.22, ease: EASE_OUT };
const primaryHoverTransition: Transition = {
  type: 'spring',
  stiffness: 350,
  damping: 22,
};

export function Button({
  variant = 'primary',
  size = 'md',
  magnetic = false,
  href,
  className,
  children,
  type = 'button',
  disabled,
  onClick,
}: ButtonProps) {
  const baseStyles = cn(
    'relative inline-flex items-center justify-center gap-2 font-medium',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:opacity-50 disabled:pointer-events-none',
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  const hoverMotion =
    variant === 'primary'
      ? { whileHover: disabled ? undefined : primaryHover, transition: primaryHoverTransition }
      : {
          whileHover: disabled ? undefined : subtleHover,
          transition: subtleHoverTransition,
        };

  if (href) {
    return (
      <Link href={href} className={baseStyles}>
        {children}
      </Link>
    );
  }

  if (magnetic) {
    return (
      <MagneticButton className={baseStyles} type={type} disabled={disabled} onClick={onClick}>
        {children}
      </MagneticButton>
    );
  }

  return (
    <motion.button
      className={baseStyles}
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={hoverMotion.whileHover}
      transition={hoverMotion.transition}
      whileTap={disabled ? undefined : { scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}

function MagneticButton({
  children,
  className,
  type,
  disabled,
  onClick,
}: Pick<ButtonProps, 'children' | 'className' | 'type' | 'disabled' | 'onClick'>) {
  const { ref, x, y, handleMouseMove, handleMouseLeave } = useMagneticEffect(0.25);

  const motionProps: HTMLMotionProps<'button'> = {
    ref: ref as React.RefObject<HTMLButtonElement>,
    className,
    type,
    disabled,
    onClick,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: { x, y },
    whileTap: disabled ? undefined : { scale: 0.98 },
  };

  return <motion.button {...motionProps}>{children}</motion.button>;
}
