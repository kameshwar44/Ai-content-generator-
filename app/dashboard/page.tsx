"use client";
import React, { useState } from 'react';
import SearchSection from './_components/SearchSection';
import TemplateListSection from './_components/TemplateListSection';

function Page() {
  const [userSearchInput, setUserSearchInput] = useState<string>('');

  const handleSearchInput = (value: string) => {
    setUserSearchInput(value);
  };

  return (
    <div className='p-3'>
      <SearchSection onSearchInput={handleSearchInput} />
      <TemplateListSection userSearchInput={userSearchInput} />
    </div>
  );
}

export default Page;
