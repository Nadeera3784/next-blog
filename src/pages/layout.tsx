import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col mx-auto w-full min-h-screen bg-gray-100">
      {children}
    </div>
  );
};

export default Layout;
