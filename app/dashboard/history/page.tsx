"use client";

import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/db'
import { AIOutput } from '@/utils/schema'
import { desc, eq } from 'drizzle-orm'
import { Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'react-toastify';


export interface HISTORY {
    id: number,
    formData: string,
    aiResponse: string | null,
    templateSlug: string,   
    createdBy: string,
    createdAt: string
}

function History() {
  const [historyData, setHistoryData] = useState<HISTORY[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useUser()

  useEffect(() => {
    const fetchHistory = async () => {  
      if (user?.primaryEmailAddress?.emailAddress) {
        try {
          const userEmail = user.primaryEmailAddress.emailAddress;
          const result = await db.select()
            .from(AIOutput)
            .where(eq(AIOutput.createdBy, userEmail))
            .orderBy(desc(AIOutput.createdAt));

          console.log('Raw result:', result);
          setHistoryData(result as HISTORY[]);
        } catch (error) {
          console.error('Error fetching history:', error);
          setHistoryData([]);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchHistory();
  }, [user]);

  useEffect(() => {
    console.log('History Data:', historyData);
  }, [historyData]);

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );

  const handleCopy = (text: string | null) => {
    if (text) {
      navigator.clipboard.writeText(text)
        .then(() => toast({ title: "Copied to clipboard" }))
        .catch((err) => console.error('Failed to copy: ', err));
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">History</h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : historyData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600">ID</th>
                <th className="px-4 py-2 text-left text-gray-600">Form Data</th>
                <th className="px-4 py-2 text-left text-gray-600">AI Response</th>
                <th className="px-4 py-2 text-left text-gray-600">Template Slug</th>
                <th className="px-4 py-2 text-left text-gray-600">Created By</th>
                <th className="px-4 py-2 text-left text-gray-600">Created At</th>
                <th className="px-4 py-2 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {historyData.map((item) => (
                <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-2">{item.id}</td>
                  <td className="px-4 py-2">{item.formData}</td>
                  <td className="px-4 py-2">{item.aiResponse}</td>
                  <td className="px-4 py-2">{item.templateSlug}</td>
                  <td className="px-4 py-2">{item.createdBy}</td>
                  <td className="px-4 py-2">{item.createdAt}</td>
                  <td className="px-4 py-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(item.aiResponse)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No history available.</p>
      )}
    </div>
  )
}

export default History
