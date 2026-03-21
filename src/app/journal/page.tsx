// "use client"

// import { useState, useRef, useEffect } from "react"
// import { supabase } from "@/lib/supabase"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
// import { Mic, MicOff, Send, MessageCircle, FileText } from "lucide-react"

// interface JournalEntry {
//   id: string
//   entry_type: 'voice' | 'chat' | 'text'
//   transcript?: string
//   ai_synthesis?: {
//     mood: string
//     intensity: number
//     likely_cause: string
//     next_steps: string[]
//     cycle_phase_context?: string
//   }
//   created_at: string
// }

// interface ChatMessage {
//   id: string
//   role: 'user' | 'assistant'
//   content: string
//   timestamp: Date
// }

// export default function JournalPage() {
//   const [isRecording, setIsRecording] = useState(false)
//   const [audioURL, setAudioURL] = useState<string | null>(null)
//   const [transcript, setTranscript] = useState("")
//   const [aiSynthesis, setAiSynthesis] = useState<any>(null)
//   const [textEntry, setTextEntry] = useState("")
//   const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
//   const [chatInput, setChatInput] = useState("")
//   const [isProcessing, setIsProcessing] = useState(false)
//   const mediaRecorderRef = useRef<MediaRecorder | null>(null)
//   const audioChunksRef = useRef<Blob[]>([])

  

//   useEffect(() => {

    
//     return () => {
//       if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
//         mediaRecorderRef.current.stop()
//       }
//     }
//   }, [])

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
//       const mediaRecorder = new MediaRecorder(stream)
//       mediaRecorderRef.current = mediaRecorder
//       audioChunksRef.current = []

//       mediaRecorder.ondataavailable = (event) => {
//         audioChunksRef.current.push(event.data)
//       }

//       // mediaRecorder.onstop = async () => {
//       //   const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
//       //   const url = URL.createObjectURL(audioBlob)
//       //   setAudioURL(url)
        
//       //   // Simulate transcription (in real app, would call speech-to-text API)
//       //   setTranscript("I've been feeling really overwhelmed lately with all the changes happening. The hot flashes are getting more frequent and it's affecting my sleep. I'm trying to stay positive but some days it's really challenging.")
        
//       //   stream.getTracks().forEach(track => track.stop())
//       // }

//        const saveToSupabase = async (text: string, analysis: any) => {
//     const today = new Date().toISOString().split('T')[0]

//     await supabase.from("reflections").insert({
//       date: today,
//       journalEntry: {
//         type: "voice",
//         content: text,
//         mood: analysis.mood,
//         aiInsight: analysis.likely_cause
//       },
//       aiSummary: analysis.likely_cause,
//       recommendations: analysis.next_steps,
//       overallMood: analysis.intensity
//     })
//   }

//      mediaRecorder.onstop = async () => {
//   const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })

//   const formData = new FormData()
//   formData.append("audio", audioBlob)

//   const res = await fetch("http://localhost:5000/process-audio", {
//     method: "POST",
//     body: formData
//   })

//   const data = await res.json()

//   setTranscript(data.transcript)

//   const analysis = JSON.parse(data.analysis)
//   setAiSynthesis(analysis)

//   // 👇 SAVE TO DATABASE
//   await saveToSupabase(data.transcript, analysis)
// }

//       mediaRecorder.start()
//       setIsRecording(true)
//     } catch (error) {
//       console.error('Error starting recording:', error)
//     }
//   }

//   const stopRecording = () => {
//     if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
//       mediaRecorderRef.current.stop()
//       setIsRecording(false)
//     }
//   }

//   const synthesizeJournal = async () => {
//     if (!transcript) return
    
//     setIsProcessing(true)
    
//     // Mock API call
//     setTimeout(() => {
//       setAiSynthesis({
//         mood: "Overwhelmed but hopeful",
//         intensity: 7,
//         likely_cause: "Increased hot flash frequency and sleep disruption are common during perimenopause due to hormonal fluctuations.",
//         next_steps: [
//           "Try cooling techniques before bed for better sleep",
//           "Practice deep breathing exercises during hot flashes",
//           "Consider discussing hormonal options with your healthcare provider"
//         ]
//       })
//       setIsProcessing(false)
//     }, 1500)
//   }

//   const saveTextEntry = async () => {
//     if (!textEntry.trim()) return
    
//     // Mock behavior
//     console.log("Saving text entry:", textEntry)
//     setTextEntry("")
//     alert("Entry saved!")
//   }

//   const sendChatMessage = async () => {
//     if (!chatInput.trim()) return
    
//     const userMessage: ChatMessage = {
//       id: Date.now().toString(),
//       role: 'user',
//       content: chatInput,
//       timestamp: new Date()
//     }
    
//     setChatMessages(prev => [...prev, userMessage])
//     setChatInput("")
    
//     // Simulate AI response (in real app, would call Claude API)
//     setTimeout(() => {
//       let response: string
      
//       // Check if user said "heyyy" or similar greeting
//       if (chatInput.toLowerCase().includes('heyyy') || 
//           chatInput.toLowerCase().includes('hey') || 
//           chatInput.toLowerCase().includes('hi') || 
//           chatInput.toLowerCase().includes('hello')) {
//         response = "heyyyy! So good to see you! How has your day been going? I'm here to listen and support you through whatever you're experiencing today."
//       } else {
//         response = "I hear you're going through a lot right now. What you're experiencing sounds very common during menopause. Many women find that keeping a regular routine and practicing self-care can make a big difference. Have you noticed any particular triggers for your symptoms?"
//       }
      
//       const assistantMessage: ChatMessage = {
//         id: (Date.now() + 1).toString(),
//         role: 'assistant',
//         content: response,
//         timestamp: new Date()
//       }
//       setChatMessages(prev => [...prev, assistantMessage])
//     }, 1000)
//   }

//   return (
//     <div className="min-h-screen bg-[#fdf8f5] p-8">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="font-serif text-4xl text-[#2d1f14] mb-4">Journal</h1>
//         <p className="text-lg text-[#8a7060] mb-8">Let's journal how you're feeling today...</p>

//         <Tabs defaultValue="voice" className="w-full">
//           <TabsList className="grid w-full grid-cols-3">
//             <TabsTrigger value="voice" className="flex items-center gap-2">
//               <Mic className="w-4 h-4" />
//               Voice
//             </TabsTrigger>
//             <TabsTrigger value="chat" className="flex items-center gap-2">
//               <MessageCircle className="w-4 h-4" />
//               Chat
//             </TabsTrigger>
//             <TabsTrigger value="text" className="flex items-center gap-2">
//               <FileText className="w-4 h-4" />
//               Text
//             </TabsTrigger>
//           </TabsList>

//           {/* Voice Mode */}
//           <TabsContent value="voice" className="mt-8">
//             <div className="text-center">
//               <div className="mb-8">
//                 <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-[#e8ddd4] flex items-center justify-center">
//                   <Button
//                     variant={isRecording ? "secondary" : "terracotta"}
//                     size="lg"
//                     className="w-24 h-24 rounded-full"
//                     onClick={isRecording ? stopRecording : startRecording}
//                   >
//                     {isRecording ? (
//                       <MicOff className="w-8 h-8" />
//                     ) : (
//                       <Mic className="w-8 h-8" />
//                     )}
//                   </Button>
//                 </div>
                
//                 {isRecording && (
//                   <div className="mb-4">
//                     <div className="inline-flex items-center space-x-1">
//                       {[...Array(5)].map((_, i) => (
//                         <div
//                           key={i}
//                           className="w-1 bg-[#c47c50] animate-pulse"
//                           style={{
//                             height: `${20 + Math.random() * 20}px`,
//                             animationDelay: `${i * 0.1}s`
//                           }}
//                         />
//                       ))}
//                     </div>
//                     <p className="text-[#8a7060] mt-2">Recording...</p>
//                   </div>
//                 )}
                
//                 {!isRecording && !transcript && (
//                   <p className="text-[#8a7060]">Tap the microphone to start recording</p>
//                 )}
//               </div>

//               {audioURL && (
//                 <audio controls className="w-full max-w-md mx-auto mb-6">
//                   <source src={audioURL} type="audio/wav" />
//                 </audio>
//               )}

//               {transcript && (
//                 <Card className="max-w-2xl mx-auto mb-6">
//                   <CardHeader>
//                     <CardTitle className="text-[#2d1f14]">Your voice note</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <p className="text-[#2d1f14] mb-4">{transcript}</p>
//                     <Button 
//                       variant="terracotta" 
//                       onClick={synthesizeJournal}
//                       disabled={isProcessing}
//                     >
//                       {isProcessing ? "Processing..." : "Analyze with AI"}
//                     </Button>
//                   </CardContent>
//                 </Card>
//               )}

//               {aiSynthesis && (
//                 <Card className="max-w-2xl mx-auto">
//                   <CardHeader>
//                     <CardTitle className="text-[#2d1f14]">AI Insights</CardTitle>
//                   </CardHeader>
//                   <CardContent className="text-left space-y-4">
//                     <div>
//                       <h4 className="font-semibold text-[#2d1f14] mb-2">What you felt</h4>
//                       <p className="text-[#8a7060]">{aiSynthesis.mood}</p>
//                       <div className="flex items-center mt-2">
//                         <span className="text-sm text-[#8a7060] mr-2">Intensity:</span>
//                         <div className="flex">
//                           {[...Array(10)].map((_, i) => (
//                             <div
//                               key={i}
//                               className={`w-2 h-4 mr-1 ${
//                                 i < aiSynthesis.intensity ? 'bg-[#c47c50]' : 'bg-[#e8ddd4]'
//                               }`}
//                             />
//                           ))}
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div>
//                       <h4 className="font-semibold text-[#2d1f14] mb-2">Why this may be</h4>
//                       <p className="text-[#8a7060]">{aiSynthesis.likely_cause}</p>
//                     </div>
                    
//                     <div>
//                       <h4 className="font-semibold text-[#2d1f14] mb-2">What you could try</h4>
//                       <ul className="list-disc list-inside text-[#8a7060] space-y-1">
//                         {aiSynthesis.next_steps.map((step: string, index: number) => (
//                           <li key={index}>{step}</li>
//                         ))}
//                       </ul>
//                     </div>
//                   </CardContent>
//                 </Card>
//               )}
//             </div>
//           </TabsContent>

//           {/* Chat Mode */}
//           <TabsContent value="chat" className="mt-8">
//             <Card className="h-96">
//               <CardContent className="p-0 h-full flex flex-col">
//                 <div className="flex-1 overflow-y-auto p-6 space-y-4">
//                   {chatMessages.length === 0 ? (
//                     <div className="text-center text-[#8a7060] mt-8">
//                       <MessageCircle className="w-12 h-12 mx-auto mb-4" />
//                       <p>Start a conversation with your menopause wellness companion</p>
//                     </div>
//                   ) : (
//                     chatMessages.map((message) => (
//                       <div
//                         key={message.id}
//                         className={`flex ${
//                           message.role === 'user' ? 'justify-end' : 'justify-start'
//                         }`}
//                       >
//                         <div
//                           className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl ${
//                             message.role === 'user'
//                               ? 'bg-[#c47c50] text-white'
//                               : 'bg-[#e8ddd4] text-[#2d1f14]'
//                           }`}
//                         >
//                           {message.content}
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>
                
//                 <div className="p-4 border-t border-[#e8ddd4]">
//                   <div className="flex space-x-2">
//                     <Input
//                       placeholder="Type your message..."
//                       value={chatInput}
//                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChatInput(e.target.value)}
//                       onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
//                     />
//                     <Button variant="terracotta" onClick={sendChatMessage}>
//                       <Send className="w-4 h-4" />
//                     </Button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Text Mode */}
//           <TabsContent value="text" className="mt-8">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-[#2d1f14]">Write your thoughts</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <textarea
//                   className="w-full h-64 p-4 border border-[#e8ddd4] rounded-xl bg-[#fdf8f5] text-[#2d1f14] placeholder:text-[#8a7060] resize-none focus:outline-none focus:ring-2 focus:ring-[#c47c50]"
//                   placeholder="How are you feeling today? What's on your mind? Take your time to express yourself..."
//                   value={textEntry}
//                   onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTextEntry(e.target.value)}
//                 />
//                 <div className="flex justify-end mt-4">
//                   <Button 
//                     variant="terracotta" 
//                     onClick={saveTextEntry}
//                     disabled={!textEntry.trim()}
//                   >
//                     Save Entry
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   )
// }



"use client"

import { useState, useRef, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Mic, MicOff } from "lucide-react"

export default function JournalPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [aiSynthesis, setAiSynthesis] = useState<any>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop()
      }
    }
  }, [])

  // const startRecording = async () => {
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  //     const mediaRecorder = new MediaRecorder(stream)
  //     mediaRecorderRef.current = mediaRecorder
  //     audioChunksRef.current = []

  //     mediaRecorder.ondataavailable = (event) => {
  //       audioChunksRef.current.push(event.data)
  //     }

  //     mediaRecorder.onstop = async () => {
  //       const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })

  //       const formData = new FormData()
  //       formData.append("audio", audioBlob)

  //       // Send audio to Python Whisper server
  //       const res = await fetch("http://localhost:5000/transcribe", {
  //         method: "POST",
  //         body: formData
  //       })

  //       const data = await res.json()
  //       console.log("TRANSCRIPT RETURNED:", data.transcript)
  //       setTranscript(data.transcript)
  //     }

  //     mediaRecorder.start()
  //     setIsRecording(true)
  //   } catch (error) {
  //     console.error('Error starting recording:', error)
  //   }
  // }

  const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: "audio/webm"
    })

    mediaRecorderRef.current = mediaRecorder
    audioChunksRef.current = []

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data)
      }
    }

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" })

      console.log("Audio blob size:", audioBlob.size)

      const formData = new FormData()
      formData.append("audio", audioBlob, "recording.webm")

      const res = await fetch("http://127.0.0.1:5000/transcribe", {
        method: "POST",
        body: formData
      })

      const data = await res.json()
      console.log("Transcript:", data.transcript)

      setTranscript(data.transcript)
    }

    mediaRecorder.start()
    setIsRecording(true)
  } catch (error) {
    console.error("Mic error:", error)
  }
}

  // const stopRecording = () => {
  //   if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
  //     mediaRecorderRef.current.stop()
  //     setIsRecording(false)
  //   }
  // }

  const stopRecording = () => {
  if (mediaRecorderRef.current) {
    mediaRecorderRef.current.stop()
    setIsRecording(false)
  }
}

  // const analyzeWithAI = async () => {
  //   if (!transcript) return

  //   setIsProcessing(true)

  //   const res = await fetch("http://localhost:11434/api/generate", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       model: "phi3:mini",
  //       prompt: `You are a mental wellness AI. Analyze the following journal entry and return JSON in this format:\n
  //       {\n          "mood": "...",\n          "intensity": 1-10,\n          "likely_cause": "...",\n          "next_steps": ["...", "..."]\n        }\n
  //       Journal Entry:\n${transcript}`,
  //       stream: false
  //     })
  //   })

  //   const data = await res.json()
    

  //   try {
  //     const analysis = JSON.parse(data.response)
  //     setAiSynthesis(analysis)
  //   } catch (e) {
  //     console.error("Failed to parse AI response", e)
  //   }

  //   setIsProcessing(false)
  // }

  const analyzeWithAI = async () => {
  if (!transcript) return
  setIsProcessing(true)

  try {
    const res = await fetch("http://127.0.0.1:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "phi3",
        stream: false,
        prompt: `
You are an AI that analyzes journal entries.

You must respond ONLY with valid JSON.
Do NOT write any text before or after the JSON.

Return this exact JSON format:
{
  "mood": "string",
  "intensity": number (whole number between 1 - 10),
  "likely_cause": "string",
  "next_steps": ["string", "string", "string"]
}

Journal entry:
${transcript}
`
      })
    })

    const data = await res.json()
    console.log("OLLAMA RESPONSE:", data.response)

    // Extract JSON from response safely
    const jsonMatch = data.response.match(/\{[\s\S]*\}/)

    if (!jsonMatch) {
      alert("AI did not return JSON. Check Ollama.")
      setIsProcessing(false)
      return
    }

    const analysis = JSON.parse(jsonMatch[0])
    setAiSynthesis(analysis)
    await saveReflection(transcript, analysis)

  } catch (err) {
    console.error("AI error:", err)
    alert("AI analysis failed")
  }

  setIsProcessing(false)
}

const saveReflection = async (transcript: string, analysis: any) => {
  const today = new Date().toISOString().split("T")[0]

  const { data, error } = await supabase.from("reflections").insert([
    {
      date: today,
      journal_entry: transcript,
      ai_summary: analysis
    }
  ])
  .select()

  if (error) {
    console.error("Supabase error FULL:", JSON.stringify(error, null, 2))
    alert("Failed to save to database")
  } else {
    console.log("Saved to Supabase:", data)
  }
}

  return (
    <div className="min-h-screen bg-[#fdf8f5] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl mb-6">Voice Journal</h1>

        <Tabs defaultValue="voice" className="w-full">
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="voice">Voice Journal</TabsTrigger>
          </TabsList>

          <TabsContent value="voice" className="mt-8">
            <div className="text-center">
              <div className="mb-8">
                <Button
                  size="lg"
                  className="w-24 h-24 rounded-full"
                  onClick={isRecording ? stopRecording : startRecording}
                >
                  {isRecording ? <MicOff /> : <Mic />}
                </Button>
                <p className="mt-4">{isRecording ? "Recording..." : "Tap to record"}</p>
              </div>

              {transcript !== "" && (
                <Card className="max-w-2xl mx-auto mb-6 text-left">
                  <CardHeader>
                    <CardTitle>Your Transcript</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap">{transcript}</p>
                    <Button className="mt-4" onClick={analyzeWithAI} disabled={isProcessing}>
                      {isProcessing ? "Analyzing..." : "Analyze with AI"}
                    </Button>
                  </CardContent>
                </Card>
              )}

              {aiSynthesis && (
                <Card className="max-w-2xl mx-auto text-left">
                  <CardHeader>
                    <CardTitle>AI Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold">Mood</h4>
                      <p>{aiSynthesis.mood}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold">Intensity</h4>
                      <p>{aiSynthesis.intensity}/10</p>
                    </div>

                    <div>
                      <h4 className="font-semibold">Likely Cause</h4>
                      <p>{aiSynthesis.likely_cause}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold">Next Steps</h4>
                      <ul className="list-disc ml-5">
                        {aiSynthesis.next_steps?.map((step: string, i: number) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
