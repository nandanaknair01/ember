"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Mail, Calendar, Heart, Settings } from "lucide-react"

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "Parnika",
    email: "parnika@example.com",
    age: 45,
    menopause_stage: "Perimenopause",
    symptoms: ["Hot flashes", "Sleep disruption", "Mood swings"],
    interests: ["Yoga", "Meditation", "Reading"],
    goals: ["Better sleep", "Stress management"]
  })

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
