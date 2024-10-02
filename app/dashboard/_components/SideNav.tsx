"use client";
import { FileClock, Home, Settings, Wallet } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import UsageTrack from "../content/_components/UsageTrack";

function SideNav() {
  const router = useRouter();
  const MenuList = [
    {
      name: "Dashboard",
      icon: Home,
      path: "/dashboard",
      iconColor: "text-primary",
    },
    {
      name: "History",
      icon: FileClock,
      path: "/dashboard/history",
      iconColor: "text-primary",
    },
    {
      name: "Billing",
      icon: Wallet,
      path: "/dashboard/billing",
      iconColor: "text-primary",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
      iconColor: "text-primary",
    },
  ];

  const path = usePathname();
  useEffect(() => {
    console.log(path)
  }, [path])

  const handleNavigation = (menuPath: string) => {
    router.push(menuPath);
  };

  return (
    <div className="h-screen p-5 shadow-sm border bg-white flex flex-col relative">
      <div className="flex justify-center mb-5">
        <Image src="/logo.svg" alt="logo" width={120} height={100} />
      </div>
      <hr className="border-gray-300 mb-5" />
      <nav className="flex-grow">
        {MenuList.map((menu, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 mb-4 p-3 hover:bg-blue-400 hover:text-white rounded-lg cursor-pointer transition-colors duration-200 ${
              path === menu.path ? "bg-red-400 text-white" : "text-gray-700"
            }`}
            onClick={() => handleNavigation(menu.path)}
          >
            <menu.icon className="h-6 w-6" />
            <h2>{menu.name}</h2>
          </div>
        ))}
      </nav>

      <div className="absolute bottom-10 left-0 w-full">
        <UsageTrack />
      </div>
    </div>
  );
}

export default SideNav;
