import classNames from "classnames";
import { Link } from "react-router-dom";

type LogoProps = {
  /**
   * Small size logo
   */
  small?: boolean;
  /**
   * Medium size logo
   */
  medium?: boolean;
  /**
   * Big size logo
   */
  big?: boolean;
  /**
   * Class name variable
   */
  className?: string;
};

export default function Logo({
  small,
  medium = true,
  big,
  className,
}: LogoProps) {
  return (
    <Link to="/">
      <img
        className={classNames(
          { "h-10 sm:h-12": medium, "h-14 sm:h-16": big, "h-8 sm:h-10": small },
          className
        )}
        src="/BrandLogo.png"
        alt=""
      />
    </Link>
  );
}
