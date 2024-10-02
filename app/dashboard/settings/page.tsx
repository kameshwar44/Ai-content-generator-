import { UserProfile } from '@clerk/nextjs'
import React from 'react'

function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <UserProfile routing="hash" />
    </div>
  )
}

export default Page
