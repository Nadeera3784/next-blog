import React from "react";
import Footer from "@/components/footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white2">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
