import React from "react";
import Upper from "./Upper";

const GettingStarted = () => {
  return (
    <div>
      <Upper />
      <div className="flex gap-14 mt-20 mx-24">
        <div>
          <h1 className="font-bold">Digital Bazaar Help Center</h1>
          <ul className="text-md font-normal mt-4">
            <li>Getting Started</li>
            <li>Your Profile</li>
            <li>Buying</li>
            <li>Selling</li>
            <li>Creating</li>
          </ul>
        </div>
        <div>
          <h1 className="font-bold text-2xl">Getting Started</h1>
          <div className="mt-6">
            <p className="hover:underline">What is an NFT?</p>
            <p className="hover:underline">What is a wallet?</p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GettingStarted;
