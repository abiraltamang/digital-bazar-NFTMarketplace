import { Tab } from "@headlessui/react";
import { useState } from "react";
import { NFT } from "../../../pages/Home";
import NFTCard from "../../common/Cards/NFTCard";
import SectionWrapper from "../../common/SectionWrapper";
import { Link } from "react-router-dom";

interface TabNavigationProps {
  nftsListed: NFT[];
  myownNfts: NFT[];
  loadingState: "not-loaded" | "loaded";
}

const tabs = ["Owned", "Created", "Latest", "Collections"];
const TabNavigation: React.FC<TabNavigationProps> = ({
  nftsListed,
  myownNfts,
}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <Tab.Group>
      <Tab.List className={"flex items-center justify-center gap-6 "}>
        {tabs.map((tab, index) => (
          <Tab
            key={`${tab}-${index}`}
            className={`font-bold text-primary text-lg focus:outline-none ${
              selectedTab === index ? "border-b-2 border-primary" : ""
            }`}
            onClick={() => setSelectedTab(index)}
          >
            {tab}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <SectionWrapper>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 py-6">
              {myownNfts.map((nft, i) => (
                <Link to="/account/my-nfts">
                  <NFTCard key={i} nft={nft} />
                </Link>
              ))}
            </div>
          </SectionWrapper>
        </Tab.Panel>
        <Tab.Panel>
          <SectionWrapper>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-4">
              {nftsListed.map((nft, i) => (
                <NFTCard key={i} nft={nft} />
              ))}
            </div>
          </SectionWrapper>
        </Tab.Panel>
        <Tab.Panel>
          <div className="h-[150px] w-full flex justify-center items-center">
            <p>Latest NFTs here</p>
          </div>
        </Tab.Panel>
        <Tab.Panel>
          <div className="h-[150px] w-full flex justify-center items-center">
            <p>Colection NFTs here</p>
          </div>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default TabNavigation;
