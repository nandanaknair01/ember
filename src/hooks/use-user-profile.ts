import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export interface UserProfile {
  name: string
  email?: string
  age?: string
  stage: string
  symptoms: string[]
  interests: string[]
  goals: string[]
  location?: {
    locality: string
    city: string
    India_state: string
  }
}

export function useUserProfile() {
  const router = useRouter()
  const pathname = usePathname()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
        
        if (user) {
          // Fetch user profile to get their data
          const { data: profileData, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()
          
          if (error) {
            console.error('Profile fetch error:', error)
            if (error.code === 'PGRST116') {
              // No profile found, redirect to onboarding
              router.push('/onboarding')
            }
            return
          }

          setProfile({
            name: profileData.name,
            email: user.email,
            age: profileData.age?.toString(),
            stage: profileData.stage,
            symptoms: profileData.symptoms || [],
            interests: profileData.interests || [],
            goals: profileData.goals || [],
            location: {
              locality: profileData.locality || '',
              city: profileData.city || '',
              India_state: profileData.India_state || ''
            }
          })
        } else {
          router.push('/auth')
        }
      } catch (error) {
        console.error('Profile fetch error:', error)
        router.push('/auth')
      } finally {
        setLoading(false)
      }
    }
    getUser()

    const subscriptionResult = supabase.auth.onAuthStateChange(async (event: any, session: any) => {
      setUser(session?.user || null)
      
      if (session?.user) {
        // Fetch user profile to get their data
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
        
        if (error) {
          console.error('Profile fetch error:', error)
          if (error.code === 'PGRST116') {
            // No profile found, redirect to onboarding
            router.push('/onboarding')
          }
          return
        }

        setProfile({
          name: profileData.name,
          email: session.user.email,
          age: profileData.age?.toString(),
          stage: profileData.stage,
          symptoms: profileData.symptoms || [],
          interests: profileData.interests || [],
          goals: profileData.goals || [],
          location: {
            locality: profileData.locality || '',
            city: profileData.city || '',
            India_state: profileData.India_state || ''
          }
        })
      } else {
        setProfile(null)
        if (pathname !== '/auth') {
          router.push('/auth')
        }
      }
    })

    return () => {
      if (subscriptionResult && subscriptionResult.data && subscriptionResult.data.subscription && subscriptionResult.data.subscription.unsubscribe) {
        subscriptionResult.data.subscription.unsubscribe()
      }
    }
  }, [])

  return { profile, user, loading }
}
