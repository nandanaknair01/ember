import { supabase } from './supabase'

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

export async function getCurrentUserProfile(): Promise<UserProfile | null> {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) {
      return null
    }

    const { data: profileData, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single()

    if (error) {
      console.error('Profile fetch error:', error)
      return null
    }

    return {
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
    }
  } catch (error) {
    console.error('Profile fetch error:', error)
    return null
  }
}

export async function getCurrentUserName(): Promise<string | null> {
  const profile = await getCurrentUserProfile()
  return profile?.name || null
}
