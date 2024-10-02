"use client";
import React, { useState } from 'react';
import SearchSection from './_components/SearchSection';
import TemplateListSection from './_components/TemplateListSection';

function Page({ onSearchInput }: { onSearchInput: (value: string) => void }) {
  const [userSearchInput, setUserSearchInput] = useState<string>('');

  return (
    <div className='p-3'>
      <SearchSection onSearchInput={(value: string) => {
        setUserSearchInput(value);
        onSearchInput(value); // Call the parent handler if necessary
      }} />
      <TemplateListSection userSearchInput={userSearchInput} />
    </div>
  );
}

export default Page;
