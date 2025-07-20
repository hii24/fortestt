import React from 'react';
import clsx from 'clsx';
// import { useModalStore } from "@/store/useModalStore.ts";
import { HTMLMotionProps, motion } from 'framer-motion';
import TranslateYButton from '@/app/components/BlueButton/buttons/translate-y-button';

type ButtonSize = 'small' | 'large';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'size'> {
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  variant?: 'translateY';
  colorVariant?: 'primary' | 'secondary';
  icon?: boolean;
  iconColor?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  size = 'small',
  variant = '', // Default to painted if no variant is provided
  colorVariant = 'primary',
  icon = true,
  iconColor = '#010A20',
  children,
  className,
  onClick,
  disabled,
  ...props
}) => {
  // Added translation logic
  // const { i18n } = useTranslation();
  // const currentLang = i18n.language as keyof typeof inputTranslation;
  // const translations = getTranslatedButtonContent(currentLang);

  const buttonClasses = clsx(
    'flex justify-center items-center min-w-fit',
    'disabled:!bg-gray-500',
    'disabled:text-white',
    'transition-colors duration-300',
    colorVariant === 'primary' &&
      'text-[#FFF] bg-[#3460FD] hover:bg-[#DCDEE5] active:bg-[#B6BCCD] disabled:!bg-gray-500',
    colorVariant === 'secondary' &&
      'text-[#F2F3F4] bg-[#232E4D] active:bg-[#0D1936] border border-[#566280] ',
    {
      'rounded-[16px] w-full md:w-fit px-4 md:px-6 py-[6px] md:py-[8px] text-[12px] md:text-[14px] leading-[125%] md:leading-[114%] font-[300]':
        size === 'small',
      'rounded-[24px] w-full md:w-fit px-4 md:px-6 py-[10px] md:py-[12px] text-[14px] md:text-[16px] leading-[133%] md:leading-[150%] font-[300]':
        size === 'large',
    },
    className
  );

  const renderChildren = () => {
    return (
      <div className={'flex items-center justify-center'}>
        {icon ? (
          <div className={'flex gap-2 items-center'}>
            {children}
            <Icon iconColor={iconColor} />
          </div>
        ) : (
          children
        )}
      </div>
    );
  };

  // Determine which button style classes to apply based on variant
  const getButtonStyleClasses = () => {
    switch (variant) {
      case 'translateY':
        return `relative overflow-hidden`;
      default:
        return 'relative'; // Default classes for painted variant
    }
  };

  // Render the appropriate button component based on the variant
  const renderButtonVariant = () => {
    switch (variant) {
      case 'translateY':
        return <TranslateYButton renderChildren={renderChildren} />;
      default:
        return renderChildren();
    }
  };

  return (
    <motion.button
      className={clsx(
        buttonClasses,
        disabled && 'group', // Added group class for group-hover functionality
        getButtonStyleClasses() // Apply style classes based on variant
      )}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      initial="initial"
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      // variants={gradientVariants}
      transition={{
        duration: 0.2,
        ease: 'easeInOut',
      }}
      {...props}>
      {renderButtonVariant()}
    </motion.button>
  );
};

export default Button;

const Icon = ({ iconColor }: { iconColor: string }) => {
  return <p color={iconColor} />;
};
