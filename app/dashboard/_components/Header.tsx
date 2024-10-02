import { UserButton } from "@clerk/nextjs";
import { Search } from "lucide-react";
import React from "react";

function Header() {
  return (
    <div className="p-5 shadow-sm border-b-2 flex justify-between items-center">
      <div className="flex gap-2 items-center p-2 border rounded-md max-w-lg bg-white">
        <Search />
        <input
          type="text"
          name=""
          id=""
          placeholder="Search"
          className="outline-none"
        />
      </div>

      <div className="flex items-center gap-2">
        <h1 className="bg-blue-500 p-2 rounded-md text-l font-sm text-white">Join MemberShip for $9.99/Month </h1>
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
