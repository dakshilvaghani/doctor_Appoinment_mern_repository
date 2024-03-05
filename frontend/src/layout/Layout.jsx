import React from "react";
import Header from "../Components/header/Header";
import Footer from "../Components/footer/Footer";
// import Home from "../pages/Home";

import Routers from "../routes/Routers";

const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Routers />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
