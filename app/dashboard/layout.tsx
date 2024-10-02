"use client";
import React, { useState } from "react";
import SideNav from "./_components/SideNav";
import Header from "./_components/Header";
import { TotalUsageContext } from "../(context)/TotalUsageContext";
import UpdateCreditUsageContext from "../(context)/UpdateCreditUsageContext";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [totalUsage, setTotalUsage] = useState<number>(0);
  const [updateCreditUsage, setUpdateCreditUsage] = useState<number>(0);

  return (
    <TotalUsageContext.Provider value={{ totalUsage, setTotalUsage }}>
      <UpdateCreditUsageContext.Provider value={{ updateCreditUsage, setUpdateCreditUsage }}>


      <div className="min-h-screen">
        <div className="md:w-64 hidden md:block fixed">
          <SideNav />
        </div>

        <div className="md:ml-64">
          <Header />
          {children}
        </div>
      </div>

      </UpdateCreditUsageContext.Provider>
    </TotalUsageContext.Provider>
  );
}

export default layout;
