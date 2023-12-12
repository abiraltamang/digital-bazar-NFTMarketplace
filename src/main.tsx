import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Homepage from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./components/layout/Layout";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import Collection from "./pages/Collection";
import { CreateNFT } from "./pages/CreateNFT";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import Explore from "./pages/Explore";
import Signin from "./pages/Signin";
import EditProfile from "./pages/EditProfile";
import MyNFTs from "./pages/MyNFTs";
import ResellNFT from "./pages/ResellNFT";
import HelpCenter from "./pages/HelpCenter";
import GettingStarted from "./components/pages/HelpCenter/GettingStarted";
import Buying from "./components/pages/HelpCenter/Buying";
import Creating from "./components/pages/HelpCenter/Creating";
import Selling from "./components/pages/HelpCenter/Selling";
import SearchPage from "./pages/SearchPage";

// Set the Sepolia test network details
const sepoliaTestnet = {
  chainId: 11155111,
  name: "Sepolia Testnet",
  currency: "ETH",
  explorerUrl: "https://sepolia.etherscan.io/",
  rpcUrl: "https://sepolia.infura.io/v3/eb69522e52ba4c3babe2118a59a0b301",
};

// Create modal
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com",
  icons: ["https://avatars.mywebsite.com/"],
};

// Use the default MetaMask provider if available
const enableMetaMask = window.ethereum ? true : false;

createWeb3Modal({
  ethersConfig: defaultConfig({
    metadata,
    defaultChainId: 11155111,
    enableEIP6963: true,
    enableInjected: enableMetaMask, // Enable MetaMask if available
    enableCoinbase: true,
  }),
  chains: [sepoliaTestnet],
  projectId: "8646805965d235cdc32fc551fec7dfdf4ba8315fbb664682256a0b89bd3c1de4",
});

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/account",
        element: <Profile />,
      },
      {
        path: "/product/:tokenId",
        element: <Product />,
      },
      {
        path: "/collection",
        element: <Collection />,
      },
      {
        path: "/create",
        element: <CreateNFT />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/editprofile",
        element: <EditProfile />,
      },
      {
        path: "/account/my-nfts",
        element: <MyNFTs />,
      },
      {
        path: "/resell-nft",
        element: <ResellNFT />,
      },
      {
        path: "/helpcenter",
        element: <HelpCenter />,
      },
      {
        path: "/helpcenter/gettingstarted",
        element: <GettingStarted />,
      },
      {
        path: "/helpcenter/buying",
        element: <Buying />,
      },
      {
        path: "/helpcenter/creating",
        element: <Creating />,
      },
      {
        path: "/helpcenter/selling",
        element: <Selling />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
