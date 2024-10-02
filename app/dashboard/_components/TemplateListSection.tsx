import React, { useEffect, useState } from "react";
import Templates from "@/app/(data)/Templates";
import TemplateCard from "./TemplateCard";

export interface TEMPLATE {
  name: string;
  description: string;
  image: string;
  icon: string;
  category: string;
  slug: string;
  aiPrompt: string;
  form?: FORM[];
}

export interface FORM {
  label: string;
  field: string;
  name: string;
  required?: boolean;
}

function TemplateListSection({userSearchInput}:any) {


  const [templatesList, setTemplatesList] = useState(Templates)

// useEffect(() => {
//   console.log(templatesList)
//   if(userSearchInput){
//     const filteredList = Templates.filter((item:TEMPLATE) => item.name.toLowerCase().includes(userSearchInput.toLowerCase()))
//     setTemplatesList(filteredList)
//   }
//   else{
//     setTemplatesList(Templates)
//   }

// }, [userSearchInput])

  return (
    
    <div className="  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 m-5 p-5 gap-5">
      {templatesList.map((item: TEMPLATE, index: number) => (
        <TemplateCard key={index} {...item} /> ))}
    </div>
  );
}

export default TemplateListSection;
