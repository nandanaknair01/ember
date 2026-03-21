"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Book, MessageCircle, TrendingUp, Calendar, Users, FileText, User } from "lucide-react"

interface Profile {
  name: string
  menopause_stage: string
}

interface DailyLog {
  mood_score?: number
  sleep_hours?: number
}

export default function DashboardPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [todayLog, setTodayLog] = useState<DailyLog>({})
  const [streak, setStreak] = useState(0)
  const [loading, setLoading] = useState(true)

  const affirmations = [
    "You are strong and capable of navigating this journey.",
    "Your body is wise and knows what it needs.",
    "Every day brings new opportunities for growth and understanding.",
    "You deserve care, compassion, and support.",
    "This phase is a transition, not an ending."
  ]

  const todayRead = {
    title: "Understanding Hot Flashes: Natural Relief Strategies",
    summary: "Learn about the science behind hot flashes and discover evidence-based natural approaches to manage frequency and intensity.",
    readTime: "5 min read"
  }

  useEffect(() => {
    fetchProfile()
    fetchTodayLog()
    fetchStreak()
  }, [])

  const fetchProfile = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) {
        router.push('/auth')
        return
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('name, stage, age')
        .eq('id', session.user.id)
        .single()

      if (error) {
        console.error('Profile fetch error:', error)
        router.push('/onboarding')
        return
      }

      setProfile({
        name: profile.name,
        menopause_stage: profile.stage
      })
    } catch (error) {
      console.error('Profile fetch error:', error)
      router.push('/auth')
    } finally {
      setLoading(false)
    }
  }

  const fetchTodayLog = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) return

      const today = new Date().toISOString().split('T')[0]
      const { data: logData, error } = await supabase
        .from('daily_logs')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('date', today)
        .single()

      if (error) {
        console.error('Today log fetch error:', error)
        return
      }

      if (logData) {
        setTodayLog({
          mood_score: logData.mood_score,
          sleep_hours: logData.sleep_hours
        })
      }
    } catch (error) {
      console.error('Error fetching today log:', error)
    }
  }

  const fetchStreak = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) return

      // Calculate streak from daily logs
      const { data: logs, error } = await supabase
        .from('daily_logs')
        .select('date')
        .eq('user_id', session.user.id)
        .order('date', { ascending: false })
        .limit(30)

      if (error) {
        console.error('Streak fetch error:', error)
        return
      }

      if (logs && logs.length > 0) {
        let streak = 0
        let currentDate = new Date()
        
        for (const log of logs) {
          const logDate = new Date(log.date)
          const diffDays = Math.floor((currentDate.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24))
          
          if (diffDays <= 1) {
            streak++
            currentDate = logDate
          } else {
            break
          }
        }
        
        setStreak(streak)
      }
    } catch (error) {
      console.error('Error calculating streak:', error)
    }
  }

  const logMood = async (mood: number) => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) return

      const today = new Date().toISOString().split('T')[0]
      
      // Update or insert today's log
      const { error } = await supabase
        .from('daily_logs')
        .upsert({
          user_id: session.user.id,
          date: today,
          mood_score: mood,
          sleep_hours: todayLog.sleep_hours
        })

      if (error) {
        console.error('Mood log error:', error)
        return
      }

      setTodayLog(prev => ({ ...prev, mood_score: mood }))
    } catch (error) {
      console.error('Error logging mood:', error)
    }
  }

  const logSleep = async (hours: number) => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) return

      const today = new Date().toISOString().split('T')[0]
      
      // Update or insert today's log
      const { error } = await supabase
        .from('daily_logs')
        .upsert({
          user_id: session.user.id,
          date: today,
          mood_score: todayLog.mood_score,
          sleep_hours: hours
        })

      if (error) {
        console.error('Sleep log error:', error)
        return
      }

      setTodayLog(prev => ({ ...prev, sleep_hours: hours }))
    } catch (error) {
      console.error('Error logging sleep:', error)
    }
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 17) return "Good afternoon"
    return "Good evening"
  }

  const getRandomAffirmation = () => {
    return affirmations[Math.floor(Math.random() * affirmations.length)]
  }

  if (loading) {
    return <div className="min-h-screen bg-[#fdf8f5] flex items-center justify-center">
      <div className="text-[#8a7060]">Loading...</div>
    </div>
  }

  return (
    <div className="min-h-screen bg-[#fdf8f5]">
      {/* Header */}
      <div className="p-8">
        <h1 className="font-serif text-4xl text-[#2d1f14] mb-2">
          {getGreeting()}, {profile?.name || "there"}
        </h1>
        <p className="text-[#8a7060]">How are you feeling today?</p>
      </div>

      <div className="px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Daily Affirmation */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-[#2d1f14]">Today's Affirmation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-[#2d1f14] italic font-serif">
                "{getRandomAffirmation()}"
              </p>
            </CardContent>
          </Card>

          {/* Streak Counter */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#2d1f14] flex items-center">
                <Heart className="w-5 h-5 mr-2 text-[#c47c50]" />
                Journal Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#c47c50]">{streak}</div>
              <div className="text-sm text-[#8a7060]">days in a row</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Log */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-[#2d1f14]">Quick Log</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Mood */}
              <div>
                <label className="block text-sm font-medium text-[#2d1f14] mb-3">
                  Mood
                </label>
                <div className="flex justify-between">
                  {[1, 2, 3, 4, 5].map((mood) => (
                    <button
                      key={mood}
                      onClick={() => logMood(mood)}
                      className={`text-2xl transition-all transform hover:scale-110 ${
                        todayLog.mood_score === mood
                          ? 'scale-125'
                          : 'opacity-50 hover:opacity-100'
                      }`}
                    >
                      {mood === 1 && '😔'}
                      {mood === 2 && '😐'}
                      {mood === 3 && '🙂'}
                      {mood === 4 && '😊'}
                      {mood === 5 && '😄'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Symptom */}
              <div>
                <label className="block text-sm font-medium text-[#2d1f14] mb-3">
                  Symptoms
                </label>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => router.push('/track')}
                >
                  Log symptoms
                </Button>
              </div>

              {/* Sleep */}
              <div>
                <label className="block text-sm font-medium text-[#2d1f14] mb-3">
                  Sleep
                </label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    placeholder="Hours"
                    value={todayLog.sleep_hours || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => logSleep(parseInt(e.target.value) || 0)}
                    className="w-20"
                  />
                  <span className="text-sm text-[#8a7060]">hours</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Read */}
        <Card className="mt-6 overflow-hidden">
          <div className="relative h-48">
            <Image
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=200&fit=crop"
              alt="Wellness article"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2d1f14]/80 to-transparent flex items-end">
              <div className="p-6 text-white">
                <CardTitle className="text-white mb-2">Today's Read</CardTitle>
                <p className="text-[#e8ddd4] mb-4">{todayRead.summary}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#e8ddd4]">{todayRead.readTime}</span>
                  <Button variant="terracotta" onClick={() => router.push('/learn?tab=today')}>
                    Read now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
