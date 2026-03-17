"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pill } from "@/components/ui/pill"

export default function AuthPage() {
  const router = useRouter()
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleGoogleAuth = async () => {
    setLoading(true)
    // For demo purposes, directly navigate to dashboard
    router.push('/dashboard')
    setLoading(false)
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // For demo purposes, directly navigate to dashboard
    router.push('/dashboard')
    setLoading(false)
  }

  const stages = ["Perimenopause", "Menopause", "Postmenopause", "Unsure"]

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="w-1/2 bg-[#2d1f14] relative flex items-center justify-center">
        {/* Radial glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(196,124,80,0.12)_0%,transparent_70%)] pointer-events-none z-0"></div>
        
        {/* Decorative botanical illustration */}
        <div className="absolute top-8 right-8 z-0 opacity-40">
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 100 Q75 50, 100 75 T150 100 Q125 150, 100 125 T50 100" stroke="#c47c50" strokeWidth="1" fill="none" opacity="0.6"/>
            <circle cx="80" cy="60" r="8" fill="#c47c50" opacity="0.4"/>
            <circle cx="120" cy="80" r="6" fill="#c47c50" opacity="0.3"/>
            <circle cx="100" cy="120" r="10" fill="#c47c50" opacity="0.5"/>
            <path d="M60 80 Q80 60, 100 80" stroke="#c47c50" strokeWidth="0.5" fill="none" opacity="0.4"/>
            <path d="M100 120 Q120 140, 140 120" stroke="#c47c50" strokeWidth="0.5" fill="none" opacity="0.4"/>
          </svg>
        </div>

        {/* Centered content */}
        <div className="px-14 z-10 text-center">
          {/* Label */}
          <div className="text-[#c47c50] text-xs tracking-[0.12em] uppercase mb-4 font-medium">
            YOUR WELLNESS COMPANION
          </div>
          
          {/* Main headline */}
          <h1 className="text-white text-[64px] leading-[1.1] mb-6 italic" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            Find your footing.
          </h1>
          
          {/* Subline */}
          <p className="text-[#a8917e] text-[15px] font-light leading-[1.7] max-w-[340px] mx-auto mb-8" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: "300" }}>
            Support, understanding, and guidance through your menopause journey.
          </p>
          
          {/* Stage pills */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {stages.map((stage) => (
              <button
                key={stage}
                className="border border-[rgba(196,124,80,0.4)] text-[#c47c50] bg-transparent rounded-full px-[18px] py-[8px] text-[12px] hover:bg-[rgba(196,124,80,0.1)] transition-colors"
              >
                {stage}
              </button>
            ))}
          </div>
          
          {/* Testimonial */}
          <div className="border-t border-[rgba(196,124,80,0.2)] pt-6">
            <blockquote className="text-[#6b5444] text-[14px] italic leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              "For the first time, I felt like someone understood what I was going through."
            </blockquote>
            <cite className="text-[#6b5444] text-[12px] not-italic mt-2 block">
              — Priya, 47 · Perimenopause
            </cite>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 bg-[#fdf8f5] p-12 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <h2 className="font-serif text-3xl mb-8 text-[#2d1f14] italic">
            {isSignUp ? "Welcome" : "Welcome back"}
          </h2>

          {/* Google OAuth */}
          <Button
            variant="outline"
            className="w-full mb-4 h-12"
            onClick={handleGoogleAuth}
            disabled={loading}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#c47c50] opacity-30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#fdf8f5] text-[#8a7060] font-medium">Or</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="focus:ring-2 focus:ring-[#c47c50] focus:border-[#c47c50] transition-all duration-200"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="focus:ring-2 focus:ring-[#c47c50] focus:border-[#c47c50] transition-all duration-200"
            />
            <Button
              variant="terracotta"
              className="w-full h-12 hover:bg-[#a66543] hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              type="submit"
              disabled={loading}
            >
              {isSignUp ? "Sign up" : "Sign in"}
            </Button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[#8a7060] hover:text-[#2d1f14] text-sm"
            >
              {isSignUp
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
