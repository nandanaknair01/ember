"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the session after OAuth callback
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error("Auth callback error:", error)
          router.push("/auth?error=authentication_failed")
          return
        }

        if (!session?.user) {
          console.error("No user session found")
          router.push("/auth?error=no_session")
          return
        }

        // Extract user data from Google metadata
        const { user } = session
        const googleName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || 'User'
        const googleEmail = user?.email

        // Check if user exists in profiles table
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (profileError && profileError.code === 'PGRST116') {
          // New user - create initial profile with Google data
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: user.id,
              name: googleName,
              email: googleEmail,
              age: null,
              stage: null,
              symptoms: [],
              interests: [],
              goals: [],
              locality: '',
              city: '',
              states: '',
              onboarding_complete: false,
              created_at: new Date().toISOString()
            })

          if (insertError) {
            console.error("Profile creation error:", insertError)
            router.push("/auth?error=profile_creation_failed")
            return
          }

          // Redirect to onboarding for new user
          router.push('/onboarding')
        } else if (profileError) {
          console.error("Profile fetch error:", profileError)
          router.push("/auth?error=profile_error")
        } else if (profile?.onboarding_complete) {
          // Returning user with completed onboarding
          router.push('/dashboard')
        } else {
          // User exists but hasn't completed onboarding
          router.push('/onboarding')
        }
      } catch (error) {
        console.error("Auth callback error:", error)
        router.push("/auth?error=unknown_error")
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c47c50] mx-auto mb-4"></div>
        <p className="text-[#8a7060]">Completing authentication...</p>
      </div>
    </div>
  )
}
