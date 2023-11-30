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
