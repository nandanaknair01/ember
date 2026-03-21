"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Mail, Calendar, Heart, Settings } from "lucide-react"

interface Profile {
  name: string
  email?: string
  age?: string
  menopause_stage: string
  symptoms: string[]
  interests: string[]
  goals: string[]
  location?: {
    locality: string
    city: string
    India_state: string
  }
}

export default function ProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) {
        router.push('/auth')
        return
      }

      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()

      if (error) {
        console.error('Profile fetch error:', error)
        return
      }

      setProfile({
        name: profileData.name,
        email: session.user.email,
        age: profileData.age?.toString(),
        menopause_stage: profileData.stage,
        symptoms: profileData.symptoms || [],
        interests: profileData.interests || [],
        goals: profileData.goals || [],
        location: {
          locality: profileData.locality || '',
          city: profileData.city || '',
          India_state: profileData.India_state || ''
        }
      })
    } catch (error) {
      console.error('Profile fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="min-h-screen bg-[#fdf8f5] flex items-center justify-center">
      <div className="text-[#8a7060]">Loading profile...</div>
    </div>
  }

  if (!profile) {
    return <div className="min-h-screen bg-[#fdf8f5] flex items-center justify-center">
      <div className="text-[#8a7060]">Profile not found</div>
    </div>
  }

  return (
    <div className="min-h-screen bg-[#fdf8f5] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-4xl text-[#2d1f14] mb-8">Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <User className="w-5 h-5" />
                Profile Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="w-20 h-20 bg-[#e8ddd4] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="w-10 h-10 text-[#8a7060]" />
                </div>
                <h3 className="font-semibold text-[#2d1f14]">{profile.name}</h3>
                <p className="text-[#8a7060]">{profile.email}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#8a7060]">Age</span>
                  <span className="font-medium text-[#2d1f14]">{profile.age}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8a7060]">Stage</span>
                  <span className="px-3 py-1 bg-[#c47c50] text-white rounded-full text-sm">
                    {profile.menopause_stage}
                  </span>
                </div>
                {profile.location && (
                  <div className="flex justify-between">
                    <span className="text-[#8a7060]">Location</span>
                    <span className="font-medium text-[#2d1f14] text-sm">
                      {profile.location.locality && `${profile.location.locality}, `}
                      {profile.location.city && `${profile.location.city}, `}
                      {profile.location.India_state}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Health Journey */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Heart className="w-5 h-5" />
                Health Journey
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-[#2d1f14] mb-3">Current Symptoms</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.symptoms.map((symptom, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#e8ddd4] text-[#2d1f14] rounded-full text-sm"
                    >
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-[#2d1f14] mb-3">Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#c47c50] text-white rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-[#2d1f14] mb-3">Wellness Goals</h4>
                <ul className="space-y-2">
                  {profile.goals.map((goal, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#c47c50] rounded-full"></div>
                      <span className="text-[#8a7060]">{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Settings className="w-5 h-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                View Health History
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Mail className="w-4 h-4 mr-2" />
                Email Preferences
              </Button>
              <Button variant="terracotta" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
