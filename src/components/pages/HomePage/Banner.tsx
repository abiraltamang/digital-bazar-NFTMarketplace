import Button from "../../common/Button/Button";
import Text from "../../common/Typography/Text";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className=" h-[91vh] bg-[url('/background.jpg')] bg-center bg-cover grid grid-cols-2 items-center">
      <div className="ml-[167px] mt-[146px] mb-[156px]">
        <Text
          main
          variant={1}
          weight="bold"
          className="text-gray-100 text-[48px]"
        >
          Buy, Sell And <br /> Collect NFTs
        </Text>
        <Text
          className=" text-white/60 leading-8"
          subtitle
          variant={2}
          weight="semibold"
        >
          The Worlds Largest Digital Marketplace For Crypto <br /> Collectibles
          And Non-Fungible Tokens
        </Text>
        <div className="grid grid-flow-col mt-[59px] gap-[24px] mr-[1458px]">
          <Link to="/create">
            <Button primary size="medium" rounded>
              <Text weight="bold" className="text-white">
                Upload
              </Text>
            </Button>
          </Link>
          <Link to="/explore">
            <Button
              secondary
              className="hover:bg-primary"
              size="medium"
              rounded
            >
              Explore
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
