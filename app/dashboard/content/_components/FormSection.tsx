"use client";
import React, { useState } from "react";
import { TEMPLATE } from "../../_components/TemplateListSection";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

interface PROPS {
  selectedTemplate?: TEMPLATE;
  userFormInput: (formData: any) => Promise<void>;
  loading: boolean;
}

function FormSection({ selectedTemplate, userFormInput, loading }: PROPS) {
  const [formData, setFormData] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await userFormInput(formData);
  };

  return (
    <div className="p-5 shadow-sm bg-white">
      <Image
        src={selectedTemplate?.icon || ""}
        alt={selectedTemplate?.name || ""}
        width={100}
        height={100}
      />

      <h2 className="text-2xl font-bold "> {selectedTemplate?.name}</h2>
      <p className="text-sm text-gray-500 "> {selectedTemplate?.description}</p>

      <form className="mt-5" onSubmit={onSubmit}>
        {selectedTemplate?.form?.map((item, index) => (
          <div className="my-2 flex flex-col gap-2 mb-7" key={index}>
            <label className="text-sm font-bold" htmlFor={item.name}>
              {item.label}
            </label>
            {item.field === "input" ? (
              <Input
                name={item.name}
                required={item.required}
                onChange={handleChange}
              />
            ) : item.field === "textarea" ? (
              <Textarea
                name={item.name}
                required={item.required}
                onChange={handleChange}
              />
            ) : null}
          </div>
        ))}
        <Button
          type="submit"
          disabled={loading}
          className="w-full mt-5 bg-blue-500 text-white"
        >
          {loading ? <Loader2Icon className="animate-spin" /> : "Generate Content"}
        </Button>
      </form>
    </div>
  );
}

export default FormSection;
