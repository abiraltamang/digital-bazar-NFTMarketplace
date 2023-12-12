import CardComponent from "./CardComponent";
const Lower = () => {
  return (
    <div className="grid grid-cols-4 my-16 px-20 gap-5">
      <CardComponent
        imageSrc="/Gettingstarted.png"
        altText="gettingstarted-icon"
        title="Getting Started"
        content="First time in Digital Bazaar? Here are the basics!"
      />
      <CardComponent
        imageSrc="/yourprofile.png"
        altText="yourprofile-icon"
        title="Your Profile"
        content="Create your account and manage wallets, profile and NFTs."
      />
      <CardComponent
        imageSrc="/cart.png"
        altText="cart-icon"
        title="Buying"
        content="How to buy NFTs"
      />
      <CardComponent
        imageSrc="/sell.png"
        altText="sell-icon"
        title="Selling"
        content="How to sell NFTs"
      />
      <CardComponent
        imageSrc="/creating.png"
        altText="creating-icon"
        title="Creating"
        content="How to create NFTs"
      />
    </div>
  );
};

export default Lower;
