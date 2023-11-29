import classNames from "classnames";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * Is this the secondary call to action on the page?
   */
  secondary?: boolean;
  /**
   * Is this the secondary call to action on the page?
   */
  action?: boolean;
  /**
   * Outline button
   */
  outline?: boolean;
  /**
   * Rounded button
   */
  rounded?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";
  /**
   * Button contents
   */
  children?: ReactNode;
  /**
   * Text to show in button
   * Text has high priority over children props
   */
  text?: string;
  /**
   * Full width button
   */
  fullWidth?: boolean;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * Class name
   */
  className?: string;
}

/**
 * Primary UI component for user interaction
 */
export default function Button({
  primary = false,
  secondary = false,
  action = false,
  outline = false,
  rounded = false,
  size = "medium",
  backgroundColor,
  children,
  text,
  className,
  fullWidth,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={classNames(
        "border-[1px]",
        {
          "px-2 py-1 text-xs": size == "small",
          "px-3 py-2 text-base": size == "medium",
          "px-5 py-[10px] font-semibold text-lg": size == "large",
          "bg-primary text-white": primary && !outline,
          "bg-warning text-white": secondary && !outline,
          "bg-danger text-white": action && !outline,
          "border-primary  text-primary": (primary && outline) || outline,
          "border-warning text-warning": secondary && outline,
          "border-danger text-danger": action && outline,
          shadow: !primary && !secondary && !action,
          "w-full rounded": fullWidth,
          "rounded-full px-5": rounded,
          "rounded px-5": !rounded,
        },
        className
      )}
      style={{ backgroundColor }}
      {...props}
    >
      {text || children}
    </button>
  );
}
