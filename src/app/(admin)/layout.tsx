import React from "react";
import Header from "@/components/header/dashboard-header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="py-10">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
