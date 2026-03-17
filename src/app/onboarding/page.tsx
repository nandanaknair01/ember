"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pill } from "@/components/ui/pill"
import { Card, CardContent } from "@/components/ui/card"

interface OnboardingData {
  name: string
  age: string
  menopauseStage: string
  symptoms: string[]
  interests: string[]
  goals: string[]
}

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<OnboardingData>({
    name: "",
    age: "",
    menopauseStage: "",
    symptoms: [],
    interests: [],
    goals: []
  })

  const symptoms = [
    "Hot flashes", "Brain fog", "Night sweats", "Mood swings", 
    "Fatigue", "Insomnia", "Joint pain", "Anxiety", 
    "Irregular periods", "Weight changes", "Heart palpitations", "Irritability"
  ]

  const interests = [
    "Yoga", "Walking", "Meditation", "Cooking", "Reading", 
    "Gardening", "Swimming", "Journaling", "Art", "Music", 
    "Travel", "Dancing"
  ]

  const goals = [
    "Understand symptoms", "Track cycle", "Mental wellbeing", 
    "Connect with community", "Expert guidance", "Holistic health"
  ]

  const menopauseStages = [
    { id: "Perimenopause", title: "Perimenopause", desc: "The transition period before menopause" },
    { id: "Menopause", title: "Menopause", desc: "12 months after your final period" },
    { id: "Postmenopause", title: "Postmenopause", desc: "The years after menopause" },
    { id: "Unsure", title: "Unsure", desc: "I'm not sure which stage I'm in" }
  ]

  const handleMultiSelect = (item: string, field: 'symptoms' | 'interests' | 'goals') => {
    setData(prev => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter(i => i !== item)
        : [...prev[field], item]
    }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    
    // Mock behavior
    console.log("Saving onboarding data:", data)
    setTimeout(() => {
      setLoading(false)
      alert("Onboarding complete! (This is a demo)")
      // In real app, would redirect to dashboard
    }, 1000)
  }

  const nextStep = () => {
    if (step < 4) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <div className="min-h-screen bg-[#fdf8f5] flex">
      {/* Sidebar */}
      <div className="w-80 bg-[#2d1f14] p-8 text-white">
        <h2 className="font-serif text-2xl mb-8">Getting to know you</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                s <= step ? 'bg-[#c47c50]' : 'bg-[#e8ddd4] text-[#2d1f14]'
              }`}>
                {s}
              </div>
              <span className={s <= step ? 'text-white' : 'text-[#8a7060]'}>
                {s === 1 && 'Basic info'}
                {s === 2 && 'Your stage'}
                {s === 3 && 'Symptoms & interests'}
                {s === 4 && 'Your goals'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-12">
        <div className="max-w-2xl mx-auto">
          {/* Step 1: Name & Age */}
          {step === 1 && (
            <div>
              <h1 className="font-serif text-3xl mb-2 text-[#2d1f14]">
                Welcome! Let's start with the basics
              </h1>
              <p className="text-[#8a7060] mb-8">This helps us personalize your experience</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#2d1f14] mb-2">
                    Your name
                  </label>
                  <Input
                    placeholder="Enter your name"
                    value={data.name}
                    onChange={(e) => setData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#2d1f14] mb-2">
                    Your age
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter your age"
                    value={data.age}
                    onChange={(e) => setData(prev => ({ ...prev, age: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Menopause Stage */}
          {step === 2 && (
            <div>
              <h1 className="font-serif text-3xl mb-2 text-[#2d1f14]">
                Where are you in your journey?
              </h1>
              <p className="text-[#8a7060] mb-8">Select the stage that best describes your current experience</p>
              
              <div className="grid grid-cols-2 gap-4">
                {menopauseStages.map((stage) => (
                  <Card
                    key={stage.id}
                    className={`cursor-pointer transition-all ${
                      data.menopauseStage === stage.id
                        ? 'border-[#c47c50] bg-[#fdf8f5]'
                        : 'hover:border-[#8a7060]'
                    }`}
                    onClick={() => setData(prev => ({ ...prev, menopauseStage: stage.id }))}
                  >
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-[#2d1f14] mb-2">{stage.title}</h3>
                      <p className="text-sm text-[#8a7060]">{stage.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Symptoms & Interests */}
          {step === 3 && (
            <div>
              <h1 className="font-serif text-3xl mb-2 text-[#2d1f14]">
                What are you experiencing?
              </h1>
              <p className="text-[#8a7060] mb-8">Select all that apply to you</p>
              
              <div className="mb-8">
                <h3 className="font-semibold text-[#2d1f14] mb-4">Symptoms</h3>
                <div className="flex flex-wrap gap-2">
                  {symptoms.map((symptom) => (
                    <Pill
                      key={symptom}
                      selected={data.symptoms.includes(symptom)}
                      onClick={() => handleMultiSelect(symptom, 'symptoms')}
                    >
                      {symptom}
                    </Pill>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-[#2d1f14] mb-4">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <Pill
                      key={interest}
                      selected={data.interests.includes(interest)}
                      onClick={() => handleMultiSelect(interest, 'interests')}
                    >
                      {interest}
                    </Pill>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Goals */}
          {step === 4 && (
            <div>
              <h1 className="font-serif text-3xl mb-2 text-[#2d1f14]">
                What would you like to achieve?
              </h1>
              <p className="text-[#8a7060] mb-8">Select your goals for using Ember</p>
              
              <div className="space-y-3">
                {goals.map((goal) => (
                  <div
                    key={goal}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      data.goals.includes(goal)
                        ? 'border-[#c47c50] bg-[#fdf8f5]'
                        : 'border-[#e8ddd4] hover:border-[#8a7060]'
                    }`}
                    onClick={() => handleMultiSelect(goal, 'goals')}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full border-2 mr-3 ${
                        data.goals.includes(goal)
                          ? 'border-[#c47c50] bg-[#c47c50]'
                          : 'border-[#8a7060]'
                      }`}>
                        {data.goals.includes(goal) && (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                      <span className="text-[#2d1f14]">{goal}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-12">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={step === 1}
            >
              Previous
            </Button>
            
            {step < 4 ? (
              <Button
                variant="terracotta"
                onClick={nextStep}
                disabled={
                  (step === 1 && (!data.name || !data.age)) ||
                  (step === 2 && !data.menopauseStage)
                }
              >
                Next
              </Button>
            ) : (
              <Button
                variant="terracotta"
                onClick={handleSubmit}
                disabled={loading || data.goals.length === 0}
              >
                {loading ? "Saving..." : "Complete setup"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
