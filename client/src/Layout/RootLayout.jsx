import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

import Header from "../Components/Header/Header";

const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Toaster />
    </>
  );
};

export default RootLayout;
