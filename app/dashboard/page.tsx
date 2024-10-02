"use client";
import React, { useState } from 'react'
import SearchSection from './_components/SearchSection'
import TemplateListSection from './_components/TemplateListSection'



function page({onSearchInput}:any) {
  const [userSearchInput, setUserSearchInput] = useState<string>()
  return (
    <div className='p-3'>
    <SearchSection onSearchInput={(value:string) => setUserSearchInput(value)} />
    <TemplateListSection  userSearchInput={userSearchInput}/>
    </div>
  )
}

export default page