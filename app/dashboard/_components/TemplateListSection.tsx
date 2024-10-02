import React, { useEffect, useState } from "react";
import Templates from "@/app/(data)/Templates"; // Importing the data
import TemplateCard from "./TemplateCard";

// TEMPLATE interface
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

function TemplateListSection({ userSearchInput }: { userSearchInput?: string }) {
  const [templatesList, setTemplatesList] = useState<TEMPLATE[]>([]);

  // Mapping Templates to the correct structure
  useEffect(() => {
    const typedTemplates: TEMPLATE[] = Templates.map(template => ({
      ...template,
      description: template.desc || "", // Map 'desc' to 'description'
      image: template.image || ""       // Ensure 'image' is present
    }));

    setTemplatesList(typedTemplates);
  }, []);

  // Filter templates based on user input
  useEffect(() => {
    if (userSearchInput) {
      const filteredList = templatesList.filter((item: TEMPLATE) =>
        item.name.toLowerCase().includes(userSearchInput.toLowerCase())
      );
      setTemplatesList(filteredList);
    } else {
      // Reset to original list when no search input
      const typedTemplates: TEMPLATE[] = Templates.map(template => ({
        ...template,
        description: template.desc || "", // Map 'desc' to 'description'
        image: template.image || ""       // Ensure 'image' is present
      }));
      setTemplatesList(typedTemplates);
    }
  }, [userSearchInput]);

  // Render the list of templates
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 m-5 p-5 gap-5">
      {templatesList.map((item, index) => (
        <TemplateCard key={index} {...item} />
      ))}
    </div>
  );
}

export default TemplateListSection;
