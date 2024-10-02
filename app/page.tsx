import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

function Page() {
  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center justify-center text-white relative">
      <Image
        src={'https://ai-previews.123rf.com/ai-variation/preview/wm/olegganko/olegganko2302/olegganko230202840_0.jpg'}
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="opacity-70" // Increased opacity from 30 to 70
      />
     
      <div className="absolute inset-0 bg-black opacity-20"></div> // Reduced opacity from 30 to 20
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
      <div className="absolute inset-0 bg-transparent backdrop-blur-[2px]"></div> // Reduced blur effect
      <header className="absolute top-0 left-0 right-0 p-5 flex justify-between items-center z-20">
        <Image src="/logo.svg" alt="AI Generator Logo" width={120} height={40} />
        <nav>
          <Button variant="ghost" className="text-white hover:text-emerald-200">Login</Button>
          <Button variant="outline" className="ml-4 text-white border-white hover:bg-white hover:text-emerald-600">Sign Up</Button>
        </nav>
      </header>

      <main className="text-center px-4 z-10">
        <h1 className="text-5xl font-bold mb-6">AI-Powered Content Generation</h1>
        <p className="text-xl mb-8 max-w-2xl">Create stunning content in seconds with our advanced AI technology. From images to text, unleash your creativity effortlessly.</p>
        <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-100">Get Started for Free</Button>
      </main>

      <footer className="mt-16 text-center z-10">
        <p className="text-sm opacity-75">Powered by cutting-edge AI | © 2023 AI Generator</p>
      </footer>
    </div>
  )
}

export default Page