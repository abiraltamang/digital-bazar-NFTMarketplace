import classNames from "classnames";
import { ReactNode } from "react";

interface TextProps {
  /**
   * Main text
   * it has 3 variant 1,2,3
   * default variant is 1
   */
  main?: boolean;
  /**
   * Title text
   * it has 2 variant 1, 2
   * default variant is 1
   */
  title?: boolean;
  /**
   * Sub title text
   */
  subtitle?: boolean;
  /**
   * Body text
   */
  body?: boolean;
  /**
   * Detail text
   */
  detail?: boolean;
  /**
   * Smallest text
   */
  smallest?: boolean;
  /**
   * Variation of text
   */
  variant?: 1 | 2 | 3;
  /**
   * Class Name
   */
  className?: string;
  /**
   * Children of text component
   */
  children?: ReactNode;
  /**
   * Text to show
   */
  text?: string;
  /**
   * Font weight of text
   */
  weight?:
    | "thin"
    | "extralight"
    | "light"
    | "normal"
    | "medium"
    | "semibold"
    | "bold"
    | "extrabold"
    | "black";
}

export default function Text({
  body,
  detail,
  main,
  smallest,
  subtitle,
  title,
  variant = 1,
  className,
  weight = "normal",
  children,
  text,
}: TextProps) {
  return (
    <p
      className={classNames(
        "font-sans",
        {
          "text-[42px]": main && variant == 1,
          "text-[38px]": main && variant == 2,
          "text-[32px]": main && variant == 3,
          "text-[28px]": title && variant == 1,
          "text-[24px]": title && variant == 2,
          "text-[18px]": subtitle,
          "text-[16px]": body,
          "text-[14px]": detail,
          "text-[12px]": smallest,
          "font-thin": weight == "thin",
          "font-extralight": weight == "extralight",
          "font-light": weight == "light",
          "font-normal": weight == "normal",
          "font-medium": weight == "medium",
          "font-semibold": weight == "semibold",
          "font-bold": weight == "bold",
          "font-extrabold": weight == "extrabold",
          "font-black": weight == "black",
        },
        className
      )}
    >
      {text || children}
    </p>
  );
}
