import React from "react";

interface TranslateYButtonProps {
  renderChildren: () => React.ReactNode;
}

const TranslateYButton: React.FC<TranslateYButtonProps> = ({
  renderChildren,
}) => {
  return (
    <>
      {/* Text that slides in from above on hover */}
      <span
        className={`absolute inset-0 flex h-full w-full -translate-y-full items-center justify-center transition-transform duration-300 group-hover:translate-y-0`}
      >
        {renderChildren()}
      </span>

      {/* Text that slides down and out on hover */}
      <span
        className={`absolute inset-0 flex h-full w-full translate-y-0 items-center justify-center transition-transform duration-300 group-hover:translate-y-full`}
      >
        {renderChildren()}
      </span>

      {/* Invisible text to maintain proper sizing */}
      <span className="opacity-0">{renderChildren()}</span>
    </>
  );
};

export default TranslateYButton;
