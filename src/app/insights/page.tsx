"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { TrendingUp, FileText, Brain, Download } from "lucide-react"

interface MoodData {
  date: string
  mood: number
}

interface SymptomData {
  symptom: string
  frequency: number
}

interface WeeklySummary {
  summary: string
  key_insights: string[]
  recommendations: string[]
  correlations: string[]
}

export default function InsightsPage() {
  const [moodData, setMoodData] = useState<MoodData[]>([])
  const [symptomData, setSymptomData] = useState<SymptomData[]>([])
  const [weeklySummary, setWeeklySummary] = useState<WeeklySummary | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInsightsData()
  }, [])

  const fetchInsightsData = async () => {
    // Mock data for demo
    setMoodData([
      { date: "Nov 1", mood: 3 },
      { date: "Nov 2", mood: 4 },
      { date: "Nov 3", mood: 3 },
      { date: "Nov 4", mood: 5 },
      { date: "Nov 5", mood: 4 },
      { date: "Nov 6", mood: 3 },
      { date: "Nov 7", mood: 4 }
    ])

    setSymptomData([
      { symptom: "Hot flashes", frequency: 12 },
      { symptom: "Night sweats", frequency: 8 },
      { symptom: "Brain fog", frequency: 6 },
      { symptom: "Fatigue", frequency: 10 },
      { symptom: "Mood swings", frequency: 7 }
    ])

    setWeeklySummary({
      summary: "This week you've shown remarkable resilience in managing your symptoms. Your mood has been relatively stable with some fluctuations around mid-week, which is completely normal. I notice you've been consistent with tracking, which shows great self-awareness.",
      key_insights: [
        "Your sleep quality has improved by 20% compared to last month",
        "Hot flash frequency decreased during days with better sleep",
        "Mood scores tend to be higher after yoga sessions"
      ],
      recommendations: [
        "Continue your current sleep routine as it's showing positive results",
        "Consider scheduling yoga on days when you typically feel lower energy",
        "Stay hydrated and keep cool during warmer parts of the day"
      ],
      correlations: [
        "You logged more brain fog on days with under 6hrs sleep",
        "Mood scores tend to be higher after meditation sessions",
        "Hot flash intensity correlates with stress levels"
      ]
    })

    setLoading(false)
  }

  const generateDoctorSummary = () => {
    if (!weeklySummary) return
    
    const summary = `
Menopause Health Summary - ${new Date().toLocaleDateString()}

Mood Trends: ${weeklySummary.summary}

Key Insights:
${weeklySummary.key_insights.map(insight => `• ${insight}`).join('\n')}

Recommendations:
${weeklySummary.recommendations.map(rec => `• ${rec}`).join('\n')}

Notable Correlations:
${weeklySummary.correlations.map(corr => `• ${corr}`).join('\n')}

This data represents the last 30 days of tracking.
    `.trim()

    const blob = new Blob([summary], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `menopause-summary-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fdf8f5] flex items-center justify-center">
        <div className="text-[#8a7060]">Loading insights...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fdf8f5] p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-serif text-4xl text-[#2d1f14] mb-8">Your Insights</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly AI Summary */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-[#2d1f14] flex items-center">
                <Brain className="w-5 h-5 mr-2 text-[#c47c50]" />
                Weekly AI Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              {weeklySummary && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-[#2d1f14] mb-3">Overview</h4>
                    <p className="text-[#8a7060] leading-relaxed">{weeklySummary.summary}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-[#2d1f14] mb-3">Key Insights</h4>
                      <ul className="space-y-2">
                        {weeklySummary.key_insights.map((insight, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-[#c47c50] rounded-full mr-2 mt-2 flex-shrink-0"></div>
                            <span className="text-[#8a7060] text-sm">{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#2d1f14] mb-3">Recommendations</h4>
                      <ul className="space-y-2">
                        {weeklySummary.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-[#c47c50] rounded-full mr-2 mt-2 flex-shrink-0"></div>
                            <span className="text-[#8a7060] text-sm">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#2d1f14] mb-3">Correlations</h4>
                      <ul className="space-y-2">
                        {weeklySummary.correlations.map((corr, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-[#c47c50] rounded-full mr-2 mt-2 flex-shrink-0"></div>
                            <span className="text-[#8a7060] text-sm">{corr}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button variant="outline" onClick={generateDoctorSummary}>
                      <Download className="w-4 h-4 mr-2" />
                      Send to my doctor
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Mood Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#2d1f14] flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-[#c47c50]" />
                Mood Trend (30 days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={moodData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e8ddd4" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12, fill: '#8a7060' }}
                    interval="preserveStartEnd"
                  />
                  <YAxis 
                    domain={[0, 5]} 
                    ticks={[1, 2, 3, 4, 5]}
                    tick={{ fontSize: 12, fill: '#8a7060' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fdf8f5', 
                      border: '1px solid #e8ddd4',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="mood" 
                    stroke="#c47c50" 
                    strokeWidth={2}
                    dot={{ fill: '#c47c50', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="flex justify-center mt-4 text-xs text-[#8a7060]">
                Scale: 1 (😔) to 5 (😄)
              </div>
            </CardContent>
          </Card>

          {/* Symptom Frequency Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#2d1f14] flex items-center">
                <FileText className="w-5 h-5 mr-2 text-[#c47c50]" />
                Symptom Frequency (30 days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={symptomData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e8ddd4" />
                  <XAxis 
                    type="number" 
                    tick={{ fontSize: 12, fill: '#8a7060' }}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="symptom" 
                    tick={{ fontSize: 11, fill: '#8a7060' }}
                    width={80}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fdf8f5', 
                      border: '1px solid #e8ddd4',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar 
                    dataKey="frequency" 
                    fill="#c47c50" 
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex justify-center mt-4 text-xs text-[#8a7060]">
                Number of times logged
              </div>
            </CardContent>
          </Card>

          {/* Correlation Callout */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#2d1f14]">Notable Pattern</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-[#e8ddd4] rounded-xl">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-[#c47c50] rounded-full flex items-center justify-center text-white font-bold mr-3 flex-shrink-0">
                      !
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#2d1f14] mb-2">Sleep & Brain Fog Connection</h4>
                      <p className="text-[#8a7060] text-sm leading-relaxed">
                        You logged more brain fog on days with under 6 hours of sleep. Consider prioritizing sleep hygiene to improve cognitive clarity.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-[#2d1f14]">Quick Tips</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-[#c47c50] rounded-full mr-3"></div>
                      <span className="text-[#8a7060] text-sm">Maintain consistent sleep schedule</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-[#c47c50] rounded-full mr-3"></div>
                      <span className="text-[#8a7060] text-sm">Create a relaxing bedtime routine</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-[#c47c50] rounded-full mr-3"></div>
                      <span className="text-[#8a7060] text-sm">Keep bedroom cool and dark</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
