"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Heart, Book, MessageCircle, TrendingUp, Calendar, Users, Home, LogOut, FileText } from "lucide-react"

interface NavItem {
  id: string
  label: string
  icon: any
  path: string
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home, path: '/dashboard' },
  { id: 'learn', label: 'Learn', icon: Book, path: '/learn' },
  { id: 'journal', label: 'Journal', icon: MessageCircle, path: '/journal' },
  { id: 'track', label: 'Track', icon: TrendingUp, path: '/track' },
  { id: 'insights', label: 'Insights', icon: Calendar, path: '/insights' },
  { id: 'diary', label: 'Diary', icon: FileText, path: '/diary' },
  { id: 'community', label: 'Community', icon: Users, path: '/community' },
]

interface NavbarProps {
  variant?: 'desktop' | 'mobile'
  isCollapsed?: boolean
  onToggle?: () => void
}

export default function Navbar({ variant = 'desktop', isCollapsed = false, onToggle }: NavbarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<{ name: string } | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      
      if (user) {
        // Fetch user profile to get their name
        const { data: profileData } = await supabase
          .from('profiles')
          .select('name')
          .eq('id', user.id)
          .single()
        
        if (profileData) {
          setProfile(profileData)
        }
      }
    }
    getUser()

    const subscriptionResult = supabase.auth.onAuthStateChange(async (event: any, session: any) => {
      setUser(session?.user || null)
      
      if (session?.user) {
        // Fetch user profile to get their name
        const { data: profileData } = await supabase
          .from('profiles')
          .select('name')
          .eq('id', session.user.id)
          .single()
        
        if (profileData) {
          setProfile(profileData)
        }
      }
      
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

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/auth')
  }

  if (variant === 'mobile') {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-[#fdf8f5] border-t border-[#e8ddd4] z-50">
        <div className="grid grid-cols-6 gap-1 p-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path
            return (
              <button
                key={item.id}
                onClick={() => router.push(item.path)}
                className={`flex flex-col items-center py-2 px-1 rounded-lg transition-colors ${
                  isActive
                    ? 'text-[#c47c50]'
                    : 'text-[#8a7060] hover:text-[#2d1f14]'
                }`}
              >
                <item.icon className="w-5 h-5 mb-1" />
                <span className="text-xs">{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className={`w-64 bg-[#2d1f14] min-h-screen p-6 flex flex-col transition-all duration-300 ${
      isCollapsed ? 'w-20' : 'w-64'
    }`}>
      <div className="mb-8">
        <h1 className="font-serif text-2xl text-white mb-2">
          {isCollapsed ? 'E' : 'Ember'}
        </h1>
        <p className="text-[#e8ddd4] text-sm">
          {isCollapsed ? '' : 'Your menopause wellness companion'}
        </p>
      </div>

      <nav className="flex-1">
        <div className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path
            return (
              <button
                key={item.id}
                onClick={() => router.push(item.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-[#c47c50] text-white'
                    : 'text-[#e8ddd4] hover:bg-[#e8ddd4] hover:text-[#2d1f14]'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {!isCollapsed && <span className="font-medium">{item.label}</span>}
              </button>
            )
          })}
        </div>
      </nav>

      {user && (
        <div className="border-t border-[#e8ddd4] pt-6 mt-auto">
          <div className="mb-4">
            <p className="text-white text-sm font-medium">
              {isCollapsed ? (profile?.name?.charAt(0).toUpperCase() || 'U') : (profile?.name || user.email)}
            </p>
            <p className="text-[#e8ddd4] text-xs">Member</p>
          </div>
          <Button
            variant="outline"
            className="w-full border-[#e8ddd4] text-[#e8ddd4] hover:bg-[#e8ddd4] hover:text-[#2d1f14]"
            onClick={handleSignOut}
          >
            <LogOut className="w-4 h-4 mr-2" />
            {!isCollapsed && 'Sign Out'}
          </Button>
        </div>
      )}

      {/* Collapse Toggle Button */}
      {onToggle && (
        <button
          onClick={onToggle}
          className="mt-4 p-2 text-[#e8ddd4] hover:text-white hover:bg-[#e8ddd4] rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isCollapsed ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7M15 5l-7 7 7" />
            )}
          </svg>
        </button>
      )}
    </div>
  )
}
