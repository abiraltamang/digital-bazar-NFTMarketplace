import {Link} from "react-router-dom"
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import Logo from "../Logo/Logo";


const Footer = () => {
  return (
    <div className="bg-primary text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-4 gap-4 pt-[40px] pb-10">
          <div>
            <div className="pb-5">
              <Logo medium />
              <p className="text-sm ">
               The World Largest Marketplace <br /> For Digital Assets
              </p>
            </div>
            <div className="flex gap-2">
              <FaFacebook />
              <FaInstagram />
              <FaTwitter/>
            </div>
          </div>
          <div>
            <h4 className="font-bold pb-3">Discover</h4>
            <ul className="font-light">
              <Link to ="/search">
              <li>Search</li>
              </Link>
              <Link to ="/account">
              <li>Author Profile</li>
              </Link>
              <Link to ="/explore">
              <li>Explore</li>
              </Link>
              <Link to="/create">
              <li>Create</li>
              </Link>
              <Link to="/account/my-nfts">
                <li>Sell</li>
              </Link>
              
            </ul>
          </div>
          <div>
            <h4 className="font-bold pb-3">Help Center</h4>
            <ul className="font-light">
              <li>About</li>
              <li>Contact Us</li>
              <li>Sign Up</li>
              <li>Login</li>
              <li>Subscription</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold pb-8">Subscribe</h4>
            <input
              type="text"
              placeholder="Enter your email*"
              className="px-2 py-2 pl-10 rounded-3xl border-none focus:outline-none  text-gray-800 pb-2"
            />
            <p className="pt-4 font-light"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
