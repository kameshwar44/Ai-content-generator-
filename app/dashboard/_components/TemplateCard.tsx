import React from "react";
import { TEMPLATE } from "./TemplateListSection";
import Image from "next/image";
import Link from "next/link";

function TemplateCard(item: TEMPLATE) {
  return (
    <Link href={`/dashboard/content/${item.slug}`}>
    <div className="p-14 flex shadow-sm border rounded-lg flex-col items-center gap-3 cursor-pointer hover:scale-105 transition-all h-full w-full hover:border-blue-900 hover:shadow-lg hover:shadow-blue-200">
         
      <Image src={item.icon} alt="icon" width={50} height={50} />
      <h2 className="font-medium text-lg">{item.name}</h2>
    
    
    </div>
    </Link>
  );
}

export default TemplateCard;
