import { Search } from "lucide-react";
import React, { useState } from "react";

function SearchSection() {
  const [searchTerm, setSearchTerm] = useState('');

  const onSearchInput = (value: string) => {
    setSearchTerm(value);
    // Add any additional search logic here
  };

  return (
    <div className=" rounded-lg flex-col p-10 bg-blue-700  flex justify-center items-center  ">
      <h2 className="text-3xl font-bold text-white ">Browse All Templates</h2>
      <p className="text-lg text-white mt-3">
        What template are you looking for ?
      </p>

      <div>
        <div className="flex gap-2 items-center p-2 border-dashed rounded-md bg-white mt-3 mr-3">
          <Search />
          <input
            onChange={(e) => onSearchInput(e.target.value)}
            className="bg-transparent outline-none"
            type="text"
            value={searchTerm}
            placeholder="Search"
          />
        </div>
      </div>
    </div>
  );
}

export default SearchSection;
