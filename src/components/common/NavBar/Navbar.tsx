import { useState, useEffect } from "react";
import Button from "../Button/Button";
import { FaSearch } from "react-icons/fa";
import Logo from "../Logo/Logo";
import Text from "../Typography/Text";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { MdOutlineAccountCircle } from "react-icons/md";
import { MdLocalGroceryStore } from "react-icons/md";

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll: EventListenerOrEventListenerObject = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={classNames(
        "px-6 py-2 sticky bg-primary top-0 z-50 transition-all delay-100 ease-in-out",
        {
          shadow: scrolled,
        }
      )}
    >
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo />
          <div className="bg-slate-200 flex items-center rounded-lg px-6 gap-4">
            <FaSearch color="gray" />
            <input
              type="text"
              placeholder="Search"
              className=" py-2 border-none focus:outline-none bg-slate-200"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-6">
            <Link
              to={"/"}
              className={classNames(
                "font-bold hover:text-gray-500 whitespace-nowrap pb-2",
                {
                  "text-white/80 ": location?.pathname !== "/",
                  "text-white border-primary": location?.pathname == "/",
                }
              )}
            >
              <Text weight="bold">Home</Text>
            </Link>
            <Link
              to={"/explore"}
              className={classNames(
                "font-bold hover:text-gray-500 whitespace-nowrap pb-2",
                {
                  "text-white/80 ": location?.pathname !== "/explore",
                  "text-white border-primary": location?.pathname == "/explore",
                }
              )}
            >
              <Text weight="bold">Explore</Text>
            </Link>
            <Link
              to={"/create"}
              className={classNames(
                "font-bold hover:text-gray-500 whitespace-nowrap pb-2",
                {
                  "text-white/80 ": location?.pathname !== "/create",
                  "text-white border-primary": location?.pathname == "/create",
                }
              )}
            >
              <Text weight="bold">Create</Text>
            </Link>
          </div>
          <Button backgroundColor="secondary" primary size="medium" rounded>
            Connect Wallet
          </Button>
          <Link to="/account">
            <MdOutlineAccountCircle color="white" size="30" />
          </Link>
          <MdLocalGroceryStore color="white" size="30" />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
