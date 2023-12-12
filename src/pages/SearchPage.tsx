import SectionWrapper from "../components/common/SectionWrapper";
import Text from "../components/common/Typography/Text";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { NFT } from "./Home";
import NFTCard from "../components/common/Cards/NFTCard";

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState<NFT[]>([]);
  const [params] = useSearchParams();
  const searchParam = params.get("q");

  useEffect(() => {
    if (searchParam) {
      // Fetch NFTs based on the search parameter
      //stor the fetched NFTs to searchResults
    }
  }, [searchParam]);
  return (
    <SectionWrapper>
      <div className="">
        <Text title weight="bold" className="text-primary text-center">
          Search Results
        </Text>
        <Text className="text-center text-black/50">
          searched keyword: {searchParam}
        </Text>
        {searchResults.length != 0 ? (
          <div className="grid grid-cols-5 gap-3">
            {/* <NFTCard nft={} /> */}
          </div>
        ) : (
          <div className="flex items-center justify-center h-[40vh]">
            <Text>Sorry, No items found</Text>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
