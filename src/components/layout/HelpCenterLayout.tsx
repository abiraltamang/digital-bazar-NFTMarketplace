import { ReactNode, useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import Text from "../common/Typography/Text";
import { Link, useLocation } from "react-router-dom";
import classnames from "classnames";
import SectionWrapper from "../common/SectionWrapper";
interface HelpCenterLayoutProps {
  /**
   * Children of layout
   */
  children?: ReactNode;
}

const HelpCenterLayout = ({ children }: HelpCenterLayoutProps) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll: EventListenerOrEventListenerObject = () => {
      setScrolled(window.pageYOffset > 260);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <div className="bg-primary flex flex-col justify-center text-center">
        <h1 className="text-4xl font-bold mt-10 text-secondary">
          Hey, how can we help you?
        </h1>
        <div className="bg-slate-200 flex items-center rounded-lg px-6 gap-4 mx-[400px] mt-7 mb-14">
          <FaSearch color="gray" />
          <input
            type="text"
            placeholder="Search"
            className=" py-2 border-none focus:outline-none bg-slate-200"
          />
        </div>
      </div>
      <SectionWrapper className="flex justify-start gap-4">
        <div
          className={classnames("w-80", {
            "fixed top-20 w-64": scrolled,
          })}
        >
          <Text title variant={2} weight="bold">
            Digital Bazaar Help Center
          </Text>
          <div className="text-md font-normal mt-4">
            <Link to="/help/gettingstarted">
              <Text>Getting Started</Text>
            </Link>
            <Link
              to="/help/buy"
              className={classnames({
                "text-black": location.pathname == "/help/buy",
              })}
            >
              <Text>Buying</Text>
            </Link>
            <Link to="/help/sell">
              <Text>Selling</Text>
            </Link>
            <Link to="/help/create">
              <Text>Creating</Text>
            </Link>
          </div>
        </div>
        <main
          className={classnames(" w-full", {
            "ml-72": scrolled,
          })}
        >
          {children}
          <Outlet />
        </main>
      </SectionWrapper>
    </>
  );
};

export default HelpCenterLayout;
