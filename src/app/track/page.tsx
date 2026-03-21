"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pill } from "@/components/ui/pill"
import { Calendar, Thermometer, Moon, Pill as PillIcon } from "lucide-react"

interface CycleLog {
  start_date: string
  end_date?: string
  flow: 'light' | 'medium' | 'heavy'
  notes: string
}

interface SymptomLog {
  symptom_type: string
  severity: 1 | 2 | 3
}

interface SleepLog {
  sleep_hours: number
  sleep_quality: 1 | 2 | 3 | 4 | 5
}

interface SupplementLog {
  supplements: string[]
}

const symptoms = [
  { name: "Hot flashes", icon: "🔥" },
  { name: "Night sweats", icon: "💧" },
  { name: "Brain fog", icon: "🌫️" },
  { name: "Mood swings", icon: "🎭" },
  { name: "Fatigue", icon: "😴" },
  { name: "Insomnia", icon: "🌙" },
  { name: "Joint pain", icon: "🦴" },
  { name: "Anxiety", icon: "😰" },
  { name: "Irregular periods", icon: "📅" },
  { name: "Weight changes", icon: "⚖️" },
  { name: "Heart palpitations", icon: "💓" },
  { name: "Irritability", icon: "😤" }
]

const commonSupplements = [
  "Magnesium", "Calcium", "Vitamin D", "Omega-3", "Black Cohosh", 
  "Evening Primrose Oil", "Vitamin B Complex", "Iron", "Probiotics",
  "Melatonin", "Ashwagandha", "Turmeric"
]

export default function TrackPage() {
  const [activeTab, setActiveTab] = useState('cycle')
  const [cycleLog, setCycleLog] = useState<CycleLog>({
    start_date: '',
    flow: 'medium',
    notes: ''
  })
  const [symptomLogs, setSymptomLogs] = useState<SymptomLog[]>([])
  const [sleepLog, setSleepLog] = useState<SleepLog>({
    sleep_hours: 7,
    sleep_quality: 3
  })
  const [supplementLog, setSupplementLog] = useState<SupplementLog>({
    supplements: []
  })
  const [newSupplement, setNewSupplement] = useState('')
  const [loading, setLoading] = useState(false)

  const saveCycleLog = async () => {
    setLoading(true)
    
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) {
        alert('Please sign in to save data')
        setLoading(false)
        return
      }

      // Save to daily_logs table
      const { error } = await supabase
        .from('daily_logs')
        .insert({
          user_id: session.user.id,
          date: new Date().toISOString().split('T')[0],
          cycle_start: cycleLog.start_date,
          flow: cycleLog.flow,
          notes: cycleLog.notes
        })

      if (error) {
        console.error('Cycle log error:', error)
        alert('Error saving cycle log')
      } else {
        setCycleLog({ start_date: '', flow: 'medium', notes: '' })
        alert('Cycle log saved!')
      }
    } catch (error) {
      console.error('Error saving cycle log:', error)
      alert('Error saving cycle log')
    } finally {
      setLoading(false)
    }
  }

  const saveSymptomLog = async () => {
    setLoading(true)
    
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) {
        alert('Please sign in to save data')
        setLoading(false)
        return
      }

      // Save to daily_logs table
      const { error } = await supabase
        .from('daily_logs')
        .insert({
          user_id: session.user.id,
          date: new Date().toISOString().split('T')[0],
          symptoms: symptomLogs
        })

      if (error) {
        console.error('Symptom log error:', error)
        alert('Error saving symptom log')
      } else {
        setSymptomLogs([])
        alert(`${symptomLogs.length} symptoms saved!`)
      }
    } catch (error) {
      console.error('Error saving symptom log:', error)
      alert('Error saving symptom log')
    } finally {
      setLoading(false)
    }
  }

  const saveSupplementLog = async () => {
    setLoading(true)
    
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) {
        alert('Please sign in to save data')
        setLoading(false)
        return
      }

      // Save to daily_logs table
      const { error } = await supabase
        .from('daily_logs')
        .insert({
          user_id: session.user.id,
          date: new Date().toISOString().split('T')[0],
          supplement_log: supplementLog.supplements
        })

      if (error) {
        console.error('Supplement log error:', error)
        alert('Error saving supplement log')
      } else {
        setSupplementLog({ supplements: [] })
        alert('Supplement log saved!')
      }
    } catch (error) {
      console.error('Error saving supplement log:', error)
      alert('Error saving supplement log')
    } finally {
      setLoading(false)
    }
  }

  const saveSleepLog = async () => {
    setLoading(true)
    
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) {
        alert('Please sign in to save data')
        setLoading(false)
        return
      }

      // Save to daily_logs table
      const { error } = await supabase
        .from('daily_logs')
        .insert({
          user_id: session.user.id,
          date: new Date().toISOString().split('T')[0],
          sleep_hours: parseInt(sleepLog.hours.toString()) || 0
        })

      if (error) {
        console.error('Sleep log error:', error)
        alert('Error saving sleep log')
      } else {
        setSleepLog({ sleep_hours: 0, sleep_quality: 3 })
        alert('Sleep log saved!')
      }
    } catch (error) {
      console.error('Error saving sleep log:', error)
      alert('Error saving sleep log')
    } finally {
      setLoading(false)
    }
  }

  const toggleSymptom = (symptomName: string, severity: 1 | 2 | 3) => {
    setSymptomLogs(prev => {
      const existing = prev.find(log => log.symptom_type === symptomName)
      if (existing) {
        if (existing.severity === severity) {
          return prev.filter(log => log.symptom_type !== symptomName)
        } else {
          return prev.map(log => 
            log.symptom_type === symptomName 
              ? { ...log, severity }
              : log
          )
        }
      } else {
        return [...prev, { symptom_type: symptomName, severity }]
      }
    })
  }

  const addSupplement = () => {
    if (newSupplement.trim() && !supplementLog.supplements.includes(newSupplement.trim())) {
      setSupplementLog(prev => ({
        ...prev,
        supplements: [...prev.supplements, newSupplement.trim()]
      }))
      setNewSupplement('')
    }
  }

  const removeSupplement = (supplement: string) => {
    setSupplementLog(prev => ({
      ...prev,
      supplements: prev.supplements.filter(s => s !== supplement)
    }))
  }

  const getSymptomSeverity = (symptomName: string) => {
    const log = symptomLogs.find(log => log.symptom_type === symptomName)
    return log?.severity
  }

  return (
    <div className="min-h-screen bg-[#fdf8f5] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-4xl text-[#2d1f14] mb-8">Track Your Journey</h1>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'cycle', label: 'Cycle Log', icon: Calendar },
            { id: 'symptoms', label: 'Symptom Log', icon: Thermometer },
            { id: 'sleep', label: 'Sleep', icon: Moon },
            { id: 'supplements', label: 'Supplements', icon: PillIcon }
          ].map(tab => (
            <Pill
              key={tab.id}
              selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </Pill>
          ))}
        </div>

        {/* Cycle Log */}
        {activeTab === 'cycle' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-[#2d1f14] flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-[#c47c50]" />
                Cycle Log
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#2d1f14] mb-2">
                    Start Date
                  </label>
                  <Input
                    type="date"
                    value={cycleLog.start_date}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                      setCycleLog(prev => ({ ...prev, start_date: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2d1f14] mb-2">
                    End Date (optional)
                  </label>
                  <Input
                    type="date"
                    value={cycleLog.end_date || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                      setCycleLog(prev => ({ ...prev, end_date: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2d1f14] mb-3">
                  Flow
                </label>
                <div className="flex gap-2">
                  {(['light', 'medium', 'heavy'] as const).map(flow => (
                    <Pill
                      key={flow}
                      selected={cycleLog.flow === flow}
                      onClick={() => setCycleLog(prev => ({ ...prev, flow }))}
                    >
                      {flow.charAt(0).toUpperCase() + flow.slice(1)}
                    </Pill>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2d1f14] mb-2">
                  Notes
                </label>
                <textarea
                  className="w-full h-24 p-3 border border-[#e8ddd4] rounded-xl bg-[#fdf8f5] text-[#2d1f14] placeholder:text-[#8a7060] resize-none focus:outline-none focus:ring-2 focus:ring-[#c47c50]"
                  placeholder="Any additional notes about this cycle..."
                  value={cycleLog.notes}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => 
                    setCycleLog(prev => ({ ...prev, notes: e.target.value }))
                  }
                />
              </div>

              <Button 
                variant="terracotta" 
                onClick={saveCycleLog}
                disabled={loading || !cycleLog.start_date}
                className="w-full"
              >
                {loading ? "Saving..." : "Save Cycle Log"}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Symptom Log */}
        {activeTab === 'symptoms' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-[#2d1f14] flex items-center">
                <Thermometer className="w-5 h-5 mr-2 text-[#c47c50]" />
                Symptom Log
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {symptoms.map(symptom => {
                  const severity = getSymptomSeverity(symptom.name)
                  return (
                    <div key={symptom.name} className="text-center">
                      <div className="text-3xl mb-2">{symptom.icon}</div>
                      <div className="text-sm text-[#2d1f14] mb-2">{symptom.name}</div>
                      <div className="flex justify-center gap-1">
                        {[1, 2, 3].map(level => (
                          <button
                            key={level}
                            onClick={() => toggleSymptom(symptom.name, level as 1 | 2 | 3)}
                            className={`w-6 h-6 rounded-full text-xs transition-all ${
                              severity === level
                                ? 'bg-[#c47c50] text-white'
                                : 'bg-[#e8ddd4] text-[#2d1f14] hover:bg-[#d4c5bc]'
                            }`}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>

              <Button 
                variant="terracotta" 
                onClick={saveSymptomLog}
                disabled={loading || symptomLogs.length === 0}
                className="w-full"
              >
                {loading ? "Saving..." : "Save Symptoms"}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Sleep */}
        {activeTab === 'sleep' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-[#2d1f14] flex items-center">
                <Moon className="w-5 h-5 mr-2 text-[#c47c50]" />
                Sleep Tracker
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#2d1f14] mb-2">
                  Hours of Sleep
                </label>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    min="0"
                    max="24"
                    step="0.5"
                    value={sleepLog.sleep_hours}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                      setSleepLog(prev => ({ ...prev, sleep_hours: parseFloat(e.target.value) || 0 }))
                    }
                    className="w-24"
                  />
                  <span className="text-sm text-[#8a7060]">hours</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2d1f14] mb-3">
                  Sleep Quality
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(quality => (
                    <button
                      key={quality}
                      className={`w-12 h-12 rounded-full text-sm font-medium transition-all transform hover:scale-110 ${
                        sleepLog.sleep_quality === quality
                          ? 'bg-[#c47c50] text-white scale-125'
                          : 'bg-[#e8ddd4] text-[#2d1f14] hover:bg-[#d4c5bc] opacity-50 hover:opacity-100'
                      }`}
                      onClick={() => setSleepLog(prev => ({ ...prev, sleep_quality: quality as 1 | 2 | 3 | 4 | 5 }))}
                    >
                      {quality}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-[#8a7060] mt-2">
                  <span>Poor</span>
                  <span>Excellent</span>
                </div>
              </div>

              <div className="bg-[#faf7f4] rounded-xl p-4">
                <h4 className="font-medium text-[#2d1f14] mb-2">Sleep Tips</h4>
                <ul className="text-sm text-[#8a7060] space-y-1">
                  <li>• Keep your bedroom cool and dark</li>
                  <li>• Avoid screens 1 hour before bed</li>
                  <li>• Try relaxation techniques like deep breathing</li>
                  <li>• Maintain a consistent sleep schedule</li>
                </ul>
              </div>

              <Button 
                variant="terracotta" 
                onClick={saveSleepLog}
                disabled={loading}
                className="w-full"
              >
                {loading ? "Saving..." : "Save Sleep Log"}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Supplements */}
        {activeTab === 'supplements' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-[#2d1f14] flex items-center">
                <PillIcon className="w-5 h-5 mr-2 text-[#c47c50]" />
                Supplements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#2d1f14] mb-2">
                  Add Supplements
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter supplement name"
                    value={newSupplement}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewSupplement(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSupplement()}
                  />
                  <Button onClick={addSupplement} disabled={!newSupplement.trim()}>
                    Add
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2d1f14] mb-3">
                  Common Supplements
                </label>
                <div className="flex flex-wrap gap-2">
                  {commonSupplements.map(supplement => (
                    <Pill
                      key={supplement}
                      selected={supplementLog.supplements.includes(supplement)}
                      onClick={() => {
                        if (supplementLog.supplements.includes(supplement)) {
                          removeSupplement(supplement)
                        } else {
                          setSupplementLog(prev => ({
                            ...prev,
                            supplements: [...prev.supplements, supplement]
                          }))
                        }
                      }}
                    >
                      {supplement}
                    </Pill>
                  ))}
                </div>
              </div>

              {supplementLog.supplements.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-[#2d1f14] mb-3">
                    Today's Supplements ({supplementLog.supplements.length})
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {supplementLog.supplements.map(supplement => (
                      <div
                        key={supplement}
                        className="px-3 py-1 bg-[#c47c50] text-white rounded-full text-sm flex items-center"
                      >
                        {supplement}
                        <button
                          onClick={() => removeSupplement(supplement)}
                          className="ml-2 text-white hover:text-[#e8ddd4] transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button 
                variant="terracotta" 
                onClick={saveSupplementLog}
                disabled={loading || supplementLog.supplements.length === 0}
                className="w-full"
              >
                {loading ? "Saving..." : `Save ${supplementLog.supplements.length} Supplement${supplementLog.supplements.length !== 1 ? 's' : ''}`}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
