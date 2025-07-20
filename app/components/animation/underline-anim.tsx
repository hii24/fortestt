import { clsx } from "clsx";

const UnderlineAnim = ({
  children,
  className,
  href,
  target,
  textColor = "#2B1463",
  color = "#7132F5",
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
  target?: string;
  color?: string;
  textColor?: string;
}) => {
  // Create a style object for dynamic colors instead of trying to use them in Tailwind classes
  const customStyle = {
    // Will be used for the hover text color
    "--hover-color": color,
    // Will be used for the underline color
    "--underline-color": color,
    "--text-color": textColor,
  } as React.CSSProperties;

  return (
    <a
      target={target}
      rel="noopener noreferrer"
      href={href}
      style={customStyle}
      className={clsx(
        "relative cursor-pointer w-fit transition-colors",
        "after:absolute after:h-[1px] after:w-0 after:bottom-[-1px] after:left-0",
        "hover:after:w-full after:transition-all after:duration-300",
        "after:bg-[color:var(--underline-color)]",
        "hover:text-[color:var(--hover-color)]",
        "text-[color:var(--text-color)]",
        className
      )}
    >
      {children}
    </a>
  );
};

export default UnderlineAnim;
