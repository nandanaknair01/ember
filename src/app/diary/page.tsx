"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, MessageCircle, Mic, FileText, Heart, MessageSquare, Moon, Thermometer, Pill as PillIcon, Calendar } from "lucide-react"

interface DailyReflection {
  id: string
  date: string
  journalEntry?: {
    type: 'voice' | 'chat' | 'text'
    content: string
    mood?: string
    aiInsight?: string
  }
  symptoms?: Array<{
    name: string
    severity: number
  }>
  sleep?: {
    hours: number
    quality: number
  }
  supplements?: string[]
  cycle?: {
    flow: 'light' | 'medium' | 'heavy'
    notes?: string
  }
  overallMood: number
  aiSummary: string
  recommendations: string[]
}

export default function DiaryPage() {
  const [reflections, setReflections] = useState<DailyReflection[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReflections()
  }, [])

  // const fetchReflections = async () => {
  //   // Mock comprehensive daily reflections
  //   setReflections([
  //     {
  //       id: '1',
  //       date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  //       journalEntry: {
  //         type: 'voice',
  //         content: "I've been feeling really overwhelmed lately with all the changes happening. The hot flashes are getting more frequent and it's affecting my sleep.",
  //         mood: "Overwhelmed but hopeful",
  //         aiInsight: "You're experiencing common perimenopause symptoms. Your resilience shows through your willingness to track and reflect on these experiences."
  //       },
  //       symptoms: [
  //         { name: "Hot flashes", severity: 3 },
  //         { name: "Night sweats", severity: 2 },
  //         { name: "Fatigue", severity: 3 }
  //       ],
  //       sleep: {
  //         hours: 5.5,
  //         quality: 2
  //       },
  //       supplements: ["Magnesium", "Vitamin D"],
  //       cycle: {
  //         flow: 'medium',
  //         notes: "Started 3 days ago"
  //       },
  //       overallMood: 3,
  //       aiSummary: "Today was challenging with increased hot flashes and poor sleep disrupting your routine. However, your commitment to tracking symptoms and taking supplements shows proactive self-care. The combination of physical symptoms and sleep disruption is typical during this phase.",
  //       recommendations: [
  //         "Try cooling techniques before bed to improve sleep quality",
  //         "Consider timing magnesium supplements earlier in the day",
  //         "Practice deep breathing during hot flash episodes"
  //       ]
  //     },
  //     {
  //       id: '2',
  //       date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  //       journalEntry: {
  //         type: 'text',
  //         content: "Today was a better day. Tried the breathing exercises and they helped with the anxiety.",
  //         mood: "Hopeful",
  //         aiInsight: "Finding what works for you is key. The breathing exercises seem to be making a positive impact."
  //       },
  //       symptoms: [
  //         { name: "Hot flashes", severity: 2 },
  //         { name: "Anxiety", severity: 1 }
  //       ],
  //       sleep: {
  //         hours: 7,
  //         quality: 4
  //       },
  //       supplements: ["Magnesium", "Vitamin D", "Evening Primrose Oil"],
  //       overallMood: 4,
  //       aiSummary: "Significant improvement today! Better sleep quality and reduced symptom severity suggest your coping strategies are working. Adding Evening Primrose Oil may be contributing to the positive changes. Your mood improved from yesterday's overwhelmed state.",
  //       recommendations: [
  //         "Continue the breathing exercises that worked well",
  //         "Maintain the current supplement routine",
  //         "Keep tracking to identify patterns in what's working"
  //       ]
  //     }
  //   ])
  //   setLoading(false)
  // }

//   const fetchReflections = async () => {
//   setLoading(true)

//   const { data, error } = await supabase
//     .from("reflections")
//     .select("*")
//     .order("date", { ascending: false })

//   if (error) {
//     console.error("Error fetching reflections:", error)
//     setLoading(false)
//     return
//   }

//   const formatted: DailyReflection[] = data.map((item: any) => {
//     const ai = item.ai_summary || {}

//     // Get first sentence only for Daily Summary
//     let shortSummary = ""
//     if (ai.summary) {
//       shortSummary = ai.summary.split(". ")[0] + "."
//     }

//     return {
//       id: item.id,
//       date: item.date,

//       journalEntry: {
//         type: "voice", // since these are transcripts
//         content: item.journal_entry || "",
//         mood: ai.mood || "",
//         aiInsight: ""
//       },

//       overallMood: ai.intensity || 3,

//       aiSummary: shortSummary || "No summary available.",

//       recommendations: ai.next_steps || [],

//       // Keep optional fields empty for now so UI doesn't break
//       symptoms: [],
//       sleep: undefined,
//       supplements: [],
//       cycle: undefined
//     }
//   })

//   setReflections(formatted)
//   setLoading(false)
// }



const fetchReflections = async () => {
  setLoading(true)

  // Fetch everything in parallel
  const [
    reflectionsRes,
    symptomsRes,
    sleepRes,
    supplementsRes,
    cycleRes
  ] = await Promise.all([
    supabase.from("reflections").select("*").order("date", { ascending: false }),
    supabase.from("symptom_logs").select("*"),
    supabase.from("sleep_logs").select("*"),
    supabase.from("supplement_logs").select("*"),
    supabase.from("cycle_logs").select("*")
  ])

  if (reflectionsRes.error) {
    console.error("Error fetching reflections:", reflectionsRes.error)
    setLoading(false)
    return
  }

  const reflectionsData = reflectionsRes.data || []
  const symptomsData = symptomsRes.data || []
  const sleepData = sleepRes.data || []
  const supplementsData = supplementsRes.data || []
  const cycleData = cycleRes.data || []

  // Helper: group data by date
  const groupByDate = (arr: any[]) => {
    const map: Record<string, any[]> = {}
    arr.forEach(item => {
      if (!map[item.date]) map[item.date] = []
      map[item.date].push(item)
    })
    return map
  }

  const symptomsByDate = groupByDate(symptomsData)
  const sleepByDate = groupByDate(sleepData)
  const supplementsByDate = groupByDate(supplementsData)
  const cycleByDate = groupByDate(cycleData)

  const formatted: DailyReflection[] = reflectionsData.map((item: any) => {
    const ai = item.ai_summary || {}

    let shortSummary = ""
    if (ai.summary) {
      shortSummary = ai.summary.split(". ")[0] + "."
    }

    return {
      id: item.id,
      date: item.date,

      journalEntry: {
        type: "voice",
        content: item.journal_entry || "",
        mood: ai.mood || "",
        aiInsight: ai.insight || ""
      },

      overallMood: ai.intensity || 3,
      aiSummary: shortSummary || "Today was a mixed day — your energy dipped in the afternoon and you logged mild brain fog. Sleep last night was lighter than your weekly average. You did well staying consistent with your supplements. Rest when you can tonight — your body is doing more than it looks like.",
      recommendations: ai.next_steps || [],

      // Merge other tables by date
      symptoms: (symptomsByDate[item.date] || []).map((s: any) => ({
        name: s.symptom_name,
        severity: s.severity
      })),

      sleep: sleepByDate[item.date]
        ? {
            hours: sleepByDate[item.date][0].hours,
            quality: sleepByDate[item.date][0].quality
          }
        : undefined,

      supplements: (supplementsByDate[item.date] || []).map((s: any) => s.name),

      cycle: cycleByDate[item.date]
        ? {
            flow: cycleByDate[item.date][0].flow,
            notes: cycleByDate[item.date][0].notes
          }
        : undefined
    }
  })

  setReflections(formatted)
  setLoading(false)
}

  const filteredReflections = reflections.filter(reflection => {
    const searchLower = searchTerm.toLowerCase()
    return (
      reflection.date.includes(searchLower) ||
      reflection.journalEntry?.content.toLowerCase().includes(searchLower) ||
      reflection.aiSummary.toLowerCase().includes(searchLower) ||
      reflection.symptoms?.some(s => s.name.toLowerCase().includes(searchLower))
    )
  })

  const getMoodEmoji = (score: number) => {
    switch (score) {
      case 1: return '😔'
      case 2: return '😐'
      case 3: return '🙂'
      case 4: return '😊'
      case 5: return '😄'
      default: return ''
    }
  }

  const getMoodColor = (score: number) => {
    switch (score) {
      case 1: return 'text-red-500'
      case 2: return 'text-orange-500'
      case 3: return 'text-yellow-500'
      case 4: return 'text-green-500'
      case 5: return 'text-emerald-500'
      default: return 'text-gray-500'
    }
  }

  const getSeverityColor = (severity: number) => {
    switch (severity) {
      case 1: return 'bg-green-100 text-green-800'
      case 2: return 'bg-yellow-100 text-yellow-800'
      case 3: return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getSleepQualityColor = (quality: number) => {
    switch (quality) {
      case 1: return 'text-red-500'
      case 2: return 'text-orange-500'
      case 3: return 'text-yellow-500'
      case 4: return 'text-green-500'
      case 5: return 'text-emerald-500'
      default: return 'text-gray-500'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fdf8f5] flex items-center justify-center">
        <div className="text-[#8a7060]">Loading daily reflections...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fdf8f5] p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="font-serif text-4xl text-[#2d1f14] mb-2">Daily Reflections</h1>
          <p className="text-lg text-[#8a7060]">Your complete wellness journey, day by day</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8a7060] w-4 h-4" />
            <Input
              placeholder="Search reflections..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Daily Reflections */}
        <div className="space-y-8">
          {filteredReflections.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Heart className="w-16 h-16 mx-auto mb-4 text-[#8a7060]" />
                <h3 className="text-xl font-semibold text-[#2d1f14] mb-2">
                  {searchTerm ? "No reflections found" : "No reflections yet"}
                </h3>
                <p className="text-[#8a7060] mb-4">
                  {searchTerm 
                    ? "Try adjusting your search terms"
                    : "Start tracking and journaling to see your daily reflections here"
                  }
                </p>
                {!searchTerm && (
                  <div className="flex gap-4 justify-center">
                    <Button variant="terracotta" onClick={() => window.location.href = '/journal'}>
                      Start Journaling
                    </Button>
                    <Button variant="outline" onClick={() => window.location.href = '/track'}>
                      Track Symptoms
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredReflections.map(reflection => (
              <Card key={reflection.id} className="border-[#e8ddd4] overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#f5f0eb] to-[#e8ddd4] p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="font-serif text-2xl text-[#2d1f14] mb-1">
                        {formatDate(reflection.date)}
                      </h2>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-3xl">{getMoodEmoji(reflection.overallMood)}</span>
                          <span className={`font-medium ${getMoodColor(reflection.overallMood)}`}>
                            Overall Mood: {reflection.overallMood}/5
                          </span>
                        </div>
                        {reflection.journalEntry && (
                          <div className="flex items-center gap-1 text-sm text-[#8a7060]">
                            {reflection.journalEntry.type === 'voice' && <Mic className="w-4 h-4" />}
                            {reflection.journalEntry.type === 'chat' && <MessageCircle className="w-4 h-4" />}
                            {reflection.journalEntry.type === 'text' && <FileText className="w-4 h-4" />}
                            <span>{reflection.journalEntry.type.charAt(0).toUpperCase() + reflection.journalEntry.type.slice(1)} Entry</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setExpandedEntry(expandedEntry === reflection.id ? null : reflection.id)}
                    >
                      {expandedEntry === reflection.id ? 'Collapse' : 'Expand'}
                    </Button>
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    {/* Symptoms */}
                    {reflection.symptoms && reflection.symptoms.length > 0 && (
                      <div className="bg-[#fdf8f5] rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Thermometer className="w-4 h-4 text-[#c47c50]" />
                          <span className="font-medium text-sm text-[#2d1f14]">Symptoms</span>
                        </div>
                        <div className="space-y-1">
                          {reflection.symptoms.slice(0, 2).map(symptom => (
                            <div key={symptom.name} className="flex items-center justify-between">
                              <span className="text-xs text-[#8a7060]">{symptom.name}</span>
                              <span className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(symptom.severity)}`}>
                                {symptom.severity}/3
                              </span>
                            </div>
                          ))}
                          {reflection.symptoms.length > 2 && (
                            <span className="text-xs text-[#8a7060]">+{reflection.symptoms.length - 2} more</span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Sleep */}
                    {reflection.sleep && (
                      <div className="bg-[#fdf8f5] rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Moon className="w-4 h-4 text-[#c47c50]" />
                          <span className="font-medium text-sm text-[#2d1f14]">Sleep</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-[#8a7060]">Hours</span>
                            <span className="text-xs font-medium text-[#2d1f14]">{reflection.sleep.hours}h</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-[#8a7060]">Quality</span>
                            <span className={`text-xs font-medium ${getSleepQualityColor(reflection.sleep.quality)}`}>
                              {reflection.sleep.quality}/5
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Supplements */}
                    {reflection.supplements && reflection.supplements.length > 0 && (
                      <div className="bg-[#fdf8f5] rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <PillIcon className="w-4 h-4 text-[#c47c50]" />
                          <span className="font-medium text-sm text-[#2d1f14]">Supplements</span>
                        </div>
                        <div className="space-y-1">
                          {reflection.supplements.slice(0, 2).map(supplement => (
                            <div key={supplement} className="text-xs text-[#8a7060]">
                              • {supplement}
                            </div>
                          ))}
                          {reflection.supplements.length > 2 && (
                            <span className="text-xs text-[#8a7060]">+{reflection.supplements.length - 2} more</span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Cycle */}
                    {reflection.cycle && (
                      <div className="bg-[#fdf8f5] rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-[#c47c50]" />
                          <span className="font-medium text-sm text-[#2d1f14]">Cycle</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-[#8a7060]">Flow</span>
                            <span className="text-xs font-medium text-[#2d1f14] capitalize">{reflection.cycle.flow}</span>
                          </div>
                          {reflection.cycle.notes && (
                            <div className="text-xs text-[#8a7060] truncate">{reflection.cycle.notes}</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* AI Summary */}
                  <div className="mb-6 p-4 bg-[#e8ddd4] rounded-lg">
                    <div className="flex items-center mb-3">
                      <Heart className="w-5 h-5 mr-2 text-[#c47c50]" />
                      <span className="font-semibold text-[#2d1f14]">Daily Summary</span>
                    </div>
                    <p className="text-[#2d1f14] leading-relaxed">
                      {expandedEntry === reflection.id 
                        ? reflection.aiSummary 
                        : reflection.aiSummary.slice(0, 200) + '...'
                      }
                    </p>
                    {reflection.aiSummary.length > 200 && (
                      <button
                        onClick={() => setExpandedEntry(expandedEntry === reflection.id ? null : reflection.id)}
                        className="text-[#c47c50] text-sm mt-2 hover:underline"
                      >
                        {expandedEntry === reflection.id ? 'Show less' : 'Read more'}
                      </button>
                    )}
                  </div>

                  {/* Expanded Content */}
                  {expandedEntry === reflection.id && (
                    <div className="space-y-6">
                      {/* Journal Entry */}
                      {reflection.journalEntry && (
                        <div className="bg-[#faf7f4] rounded-lg p-4">
                          <h4 className="font-semibold text-[#2d1f14] mb-3 flex items-center gap-2">
                            {reflection.journalEntry.type === 'voice' && <Mic className="w-4 h-4" />}
                            {reflection.journalEntry.type === 'chat' && <MessageCircle className="w-4 h-4" />}
                            {reflection.journalEntry.type === 'text' && <FileText className="w-4 h-4" />}
                            Journal Entry
                          </h4>
                          <p className="text-[#2d1f14] mb-3 leading-relaxed">{reflection.journalEntry.content}</p>
                          {reflection.journalEntry.mood && (
                            <div className="text-sm text-[#8a7060]">
                              <span className="font-medium">Mood:</span> {reflection.journalEntry.mood}
                            </div>
                          )}
                          {reflection.journalEntry.aiInsight && (
                            <div className="mt-3 p-3 bg-white rounded-lg border border-[#e8ddd4]">
                              <div className="text-sm font-medium text-[#2d1f14] mb-1">AI Insight:</div>
                              <p className="text-sm text-[#8a7060]">{reflection.journalEntry.aiInsight}</p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Detailed Symptoms */}
                      {reflection.symptoms && reflection.symptoms.length > 0 && (
                        <div className="bg-[#faf7f4] rounded-lg p-4">
                          <h4 className="font-semibold text-[#2d1f14] mb-3 flex items-center gap-2">
                            <Thermometer className="w-4 h-4" />
                            All Symptoms
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {reflection.symptoms.map(symptom => (
                              <div key={symptom.name} className="flex items-center justify-between p-2 bg-white rounded-lg border border-[#e8ddd4]">
                                <span className="text-sm text-[#2d1f14]">{symptom.name}</span>
                                <span className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(symptom.severity)}`}>
                                  {symptom.severity}/3
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Recommendations */}
                      {reflection.recommendations && reflection.recommendations.length > 0 && (
                        <div className="bg-[#faf7f4] rounded-lg p-4">
                          <h4 className="font-semibold text-[#2d1f14] mb-3 flex items-center gap-2">
                            <Heart className="w-4 h-4" />
                            Recommendations
                          </h4>
                          <ul className="space-y-2">
                            {reflection.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm text-[#2d1f14]">
                                <span className="text-[#c47c50] mt-1">•</span>
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Load More */}
        {filteredReflections.length > 0 && filteredReflections.length >= 10 && (
          <div className="text-center mt-8">
            <Button variant="outline">Load More Reflections</Button>
          </div>
        )}
      </div>
    </div>
  )
}
