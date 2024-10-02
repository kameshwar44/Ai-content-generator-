"use client"
import { Button } from '@/components/ui/button'
import React, { useContext, useEffect, useState } from 'react'
import { db } from '@/utils/db'
import { AIOutput } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext'
import { toast } from 'react-toastify'
import UpdateCreditUsageContext from '@/app/(context)/UpdateCreditUsageContext'

function UsageTrack() {
  const { user } = useUser()
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext)
  const [maxCredits] = useState(10000)
  const { updateCreditUsage, setUpdateCreditUsage } = useContext(UpdateCreditUsageContext)

  const fetchUsage = async () => {
    if (user?.primaryEmailAddress?.emailAddress) {
      try {
        const result = await db.select()
          .from(AIOutput)
          .where(eq(AIOutput.createdBy, user.primaryEmailAddress.emailAddress))

        const total = result.reduce((acc, item) => {
          return acc + (item.aiResponse?.length || 0)
        }, 0)

        setTotalUsage(total)
      } catch (error) {
        console.error('Error fetching usage:', error)
      }
    }
  }

  useEffect(() => {
    fetchUsage()
  }, [user, setTotalUsage])

  useEffect(() => {
    if (updateCreditUsage) {
      fetchUsage()
    }
  }, [updateCreditUsage])

  useEffect(() => {
    if (totalUsage >= maxCredits) {
      toast.error("You have exhausted your credits. Please upgrade to continue generating AI responses.")
    }
  }, [totalUsage, maxCredits])

  const usagePercentage = Math.min((totalUsage / maxCredits) * 100, 100)
  const remainingCredits = Math.max(maxCredits - totalUsage, 0)

  return (
    <div className="m-5">
      <div className="bg-blue-500 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-white font-semibold">Credits</h1>
          <span className="text-white">{usagePercentage.toFixed(1)}%</span>
        </div>
        <div className="h-2 bg-blue-600 rounded-full overflow-hidden">
          <div className="h-full bg-white" style={{ width: `${usagePercentage}%` }}></div>
        </div>

        <h2 className='text-white my-2'>{remainingCredits}/{maxCredits} credits left</h2>
      </div>

      <Button variant={'secondary'} className='w-full mt-5 border-blue-500 text-blue-500 text-bold font-bold border-2 border-dotted'>
        Upgrade
      </Button>
    </div>
  )
}

export default UsageTrack
