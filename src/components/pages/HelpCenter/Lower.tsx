import CardComponent from "./CardComponent";
import { Link } from "react-router-dom";
const Lower = () => {
  return (
    <div className="grid grid-cols-4 my-16 px-20 gap-5">
      <Link to="/help/gettingstarted">
        <CardComponent
          imageSrc="/Gettingstarted.png"
          altText="gettingstarted-icon"
          title="Getting Started"
          content="First time in Digital Bazaar? Here are the basics!"
        />
      </Link>
      <Link to="/account">
        <CardComponent
          imageSrc="/yourprofile.png"
          altText="yourprofile-icon"
          title="Your Profile"
          content="Create your account and manage wallets, profile and NFTs."
        />
      </Link>
      <Link to="/help/buy">
        <CardComponent
          imageSrc="/cart.png"
          altText="cart-icon"
          title="Buying"
          content="How to buy NFTs"
        />
      </Link>
      <Link to={"/help/sell"}>
        <CardComponent
          imageSrc="/sell.png"
          altText="sell-icon"
          title="Selling"
          content="How to sell NFTs"
        />
      </Link>
      <Link to={"/help/create"}>
        <CardComponent
          imageSrc="/creating.png"
          altText="creating-icon"
          title="Creating"
          content="How to create NFTs"
        />
      </Link>
    </div>
  );
};

export default Lower;
