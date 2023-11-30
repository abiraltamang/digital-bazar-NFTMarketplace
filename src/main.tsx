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

// Set the Sepolia test network details
const sepoliaTestnet = {
  chainId: 11155111,
  name: "Sepolia Testnet",
  currency: "ETH",
  explorerUrl: "https://sepolia.etherscan.io/",
  rpcUrl: "https://eth-sepolia.g.alchemy.com/v2/",
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
        path: "/product",
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
