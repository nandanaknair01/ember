"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { supabase } from "@/lib/supabase"
import Navbar from "./navbar"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('onboarding_complete')
          .eq('id', user.id)
          .single()

        setProfile(profile)

        // Redirect to onboarding if not completed
        if (!profile?.onboarding_complete && pathname !== '/onboarding') {
          router.push('/onboarding')
        }
      } else if (pathname !== '/auth') {
        router.push('/auth')
      }

      setLoading(false)
    }

    checkAuth()

    const subscriptionResult = supabase.auth.onAuthStateChange((event: any, session: any) => {
      setUser(session?.user || null)
      if (!session && pathname !== '/auth') {
        router.push('/auth')
      }
    })

    return () => {
      if (subscriptionResult && subscriptionResult.data && subscriptionResult.data.subscription && subscriptionResult.data.subscription.unsubscribe) {
        subscriptionResult.data.subscription.unsubscribe()
      }
    }
  }, [])

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fdf8f5] flex items-center justify-center">
        <div className="text-[#8a7060]">Loading...</div>
      </div>
    )
  }

  // Don't show layout for auth and onboarding pages
  if (pathname === '/auth' || pathname === '/onboarding') {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen">
      <Navbar variant="desktop" isCollapsed={isCollapsed} onToggle={toggleSidebar} />
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}
