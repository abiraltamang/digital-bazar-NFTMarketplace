import React from "react";
import Upper from "./Upper";
const Selling = () => {
  return (
    <div>
      <Upper />
      <div className="flex gap-14 mt-20 mx-24">
        <div>
          <h1 className="font-bold">Digital Bazaar Help Center</h1>
          <ul className="text-md font-normal mt-4">
            <li className="hover:underline">Getting Started</li>
            <li className="hover:underline">Your Profile</li>
            <li className="hover:underline">Buying</li>
            <li className="hover:underline">Selling</li>
            <li className="hover:underline">Creating</li>
          </ul>
        </div>
        <div>
          <h1 className="text-2xl font-bold">Selling</h1>
          <div className="pt-7">
            <h1 className="text-2xl font-normal pb-5">How to sell an NFT?</h1>
            <p>
              On Digital Bazaar, you can sell NFT . If you know exactly how much
              you'd like to get for your NFT, you can sell it at a fixed price
              (your own determined price). Follow the steps below to find out
              how you can sell your NFT/s:
            </p>
          </div>
          <div className="pt-5 space-y-5 mb-10">
            <h1 className="text-xl font-medium">Steps to sell an NFT</h1>
            <h1>
              Step 1: Hover over the "Create" button on the top of Digital
              Bazaar home page and then click on "Create"
            </h1>
            <img src="/8.png" alt="img" className="w-[400px]" />
            <h1>
              Step 2: Upload all the details of the NFT that you want to create.
            </h1>
            <img src="/9.png" alt="img" className="w-[500px] h-[250px]" />
            <h1>
              Step 3: After placing all the details, click on the "Create NFT"
              button.
            </h1>
            <img src="/10.png" alt="img" className="w-[325px] h-[171px]" />
            <h1>Congratulations! You have just created your amazing NFT.</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Selling;
