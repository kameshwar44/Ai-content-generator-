"use client";
import React, { useContext, useState } from "react";
import OutputSection from "../_components/OutputSection";
import FormSection from "../_components/FormSection";
import Templates from "@/app/(data)/Templates";
import { TEMPLATE } from "../../_components/TemplateListSection";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { chatSession } from "@/utils/AiModel";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { toast } from "react-toastify";
import UpdateCreditUsageContext from "@/app/(context)/UpdateCreditUsageContext";

interface PROPS {
  params: {
    "template-slug": string;
  };
}

/**
 * generate ai content
 * 
 * @param props 
 * @returns 
 */

function CreateNewContent(props: PROPS) {
  const router = useRouter();
  const totalUsage = useContext(TotalUsageContext);
  const { updateCreditUsage, setUpdateCreditUsage } = useContext(UpdateCreditUsageContext);

  const selectedTemplate = Templates.find(
    (item) => item.slug === props.params["template-slug"]
  );
  const [loading, setLoading] = useState(false);
  
  const [aiOutput, setAiOutput] = useState<string>("");
  const { user } = useUser();

  const GenerateAIContent = async (formData: any) => {
    if (Number(totalUsage) >= 10000) {
      alert("You have reached your credit limit. Please upgrade your plan to continue.");
      return;
    }

    setLoading(true);

    try {
      const SelectedPrompt = selectedTemplate?.aiPrompt;
      const FinalAIPrompt = JSON.stringify(formData) + SelectedPrompt;
      const result = await chatSession.sendMessage(FinalAIPrompt);
      const generatedText = await result.response.text();
     
      setAiOutput(generatedText);
      console.log(generatedText);
      await SaveInDb(formData, selectedTemplate?.slug, generatedText);
    } catch (error) {
      console.error("Error generating AI content:", error);
      toast.error("An error occurred while generating content. Please try again.");
    } finally {
      setLoading(false);
      setUpdateCreditUsage(Date.now());
    }
  };

  const SaveInDb = async (formData: any, slug: string | undefined, aiResp: string) => {
    try {
      const result = await db.insert(AIOutput).values({
        formData: JSON.stringify(formData),
        templateSlug: slug || "",
        aiResponse: aiResp,
        createdBy: user?.primaryEmailAddress?.emailAddress || "",
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      });

      console.log("Database insert result:", result);
    } catch (error) {
      console.error("Error saving to database:", error);
      toast.error("Failed to save the generated content. Please try again.");
    }
  };

  return (
    <>
      <Link href="/dashboard" className="ml-8 mt-4 inline-block">
        <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
          <ArrowLeft className="mr-2" />
          Back
        </Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 bg-gray-100">
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <FormSection
            selectedTemplate={selectedTemplate}
            userFormInput={GenerateAIContent}
            loading={loading}
          />
        </div>
        <div className="col-span-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <OutputSection aiOutput={aiOutput} />
        </div>
      </div>
    </>
  );
}

export default CreateNewContent;
