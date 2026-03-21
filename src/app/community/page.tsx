"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { MessageCircle, Users, MapPin, Send, User } from "lucide-react"

interface CommunityPost {
  id: string
  content: string
  created_at: string
  user: {
    name: string
  }
  channel?: string
}

interface BuddyProfile {
  id: string
  name: string
  menopause_stage: string
  interests: string[]
  location: string
}

const chatChannels = [
  { id: 'general', name: 'General', color: 'bg-[#c47c50]' },
  { id: 'sleep', name: 'Sleep & rest', color: 'bg-[#8a7060]' },
  { id: 'hotflashes', name: 'Hot flashes', color: 'bg-[#d4a574]' },
  { id: 'hrt', name: 'HRT experiences', color: 'bg-[#b56b35]' }
]

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

const getAvatarColor = (name: string) => {
  const colors = [
    'bg-[#c47c50]', 'bg-[#d4a574]', 'bg-[#8a7060]', 'bg-[#b56b35]'
  ]
  const index = name.charCodeAt(0) % colors.length
  return colors[index]
}

export default function CommunityPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<{ name: string } | null>(null)
  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: '1',
      content: "Anyone else experiencing brain fog? Would love to hear what's working for you.",
      created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      user: { name: "Parnika" },
      channel: 'general'
    },
    {
      id: '2',
      content: "Just wanted to share that I found magnesium supplements really helpful for sleep!",
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      user: { name: "Priya" },
      channel: 'sleep'
    },
    {
      id: '3',
      content: "The night sweats have been so intense lately. I'm waking up completely soaked. Anyone have tips for staying cool at night?",
      created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      user: { name: "Deepa" },
      channel: 'hotflashes'
    },
    {
      id: '4',
      content: "I've been doing yoga for 30 minutes every morning and it's helped with my mood swings so much. Highly recommend trying it!",
      created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      user: { name: "Meera" },
      channel: 'general'
    },
    {
      id: '5',
      content: "My doctor suggested black cohosh for hot flashes. Has anyone tried it? I'm a bit nervous about herbal remedies.",
      created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      user: { name: "Sunita" },
      channel: 'hotflashes'
    },
    {
      id: '6',
      content: "Sleep has been terrible lately. I'm up 3-4 times per night. Melatonin helps me fall back asleep but doesn't prevent the waking up.",
      created_at: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
      user: { name: "Rashmi" },
      channel: 'sleep'
    },
    {
      id: '7',
      content: "Started HRT last month and the difference is incredible. Hot flashes reduced by 80%! But the mood swings are still there.",
      created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      user: { name: "Kavita" },
      channel: 'hrt'
    },
    {
      id: '8',
      content: "Does anyone else get heart palpitations? They scare me so much, especially when I'm trying to sleep.",
      created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      user: { name: "Anita" },
      channel: 'general'
    },
    {
      id: '9',
      content: "Keeping a symptom diary has been a game-changer. I can see patterns now - chocolate triggers my hot flashes every time!",
      created_at: new Date(Date.now() - 2.5 * 60 * 60 * 1000).toISOString(),
      user: { name: "Pooja" },
      channel: 'hotflashes'
    },
    {
      id: '10',
      content: "Weight gain is so frustrating! I haven't changed my diet or exercise but gained 8 pounds in 3 months. Is this normal?",
      created_at: new Date(Date.now() - 4.5 * 60 * 60 * 1000).toISOString(),
      user: { name: "Divya" },
      channel: 'general'
    },
    {
      id: '11',
      content: "Evening primrose oil has helped with my joint pain. I take it in the morning and evening.",
      created_at: new Date(Date.now() - 3.5 * 60 * 60 * 1000).toISOString(),
      user: { name: "Lakshmi" },
      channel: 'general'
    },
    {
      id: '12',
      content: "The anxiety is the worst part for me. Sometimes I feel like I'm going crazy. Glad to have this space to share.",
      created_at: new Date(Date.now() - 5.5 * 60 * 60 * 1000).toISOString(),
      user: { name: "Neha" },
      channel: 'general'
    }
  ])
  const [buddyProfiles, setBuddyProfiles] = useState<BuddyProfile[]>([
    {
      id: '1',
      name: "Nandana Nair",
      menopause_stage: "Perimenopause",
      interests: ["Art", "Music", "Travel"],
      location: "Indiranagar, Bengaluru"
    },
    {
      id: '2',
      name: "Priya Sharma",
      menopause_stage: "Perimenopause",
      interests: ["Yoga", "Meditation", "Reading"],
      location: "Indiranagar, Bengaluru"
    },
    {
      id: '3',
      name: "Anjali Nair",
      menopause_stage: "Menopause",
      interests: ["Walking", "Cooking", "Gardening"],
      location: "Jayanagar, Bengaluru"
    },
    {
      id: '4',
      name: "Deepa Patel",
      menopause_stage: "Postmenopause",
      interests: ["Swimming", "Art", "Travel"],
      location: "Koramangala, Bengaluru"
    },
    {
      id: '5',
      name: "Meera Reddy",
      menopause_stage: "Perimenopause",
      interests: ["Dance", "Music", "Shopping"],
      location: "Whitefield, Bengaluru"
    },
    {
      id: '6',
      name: "Sunita Gupta",
      menopause_stage: "Menopause",
      interests: ["Cycling", "Photography", "Food"],
      location: "HSR Layout, Bengaluru"
    }
  ])

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      
      if (user) {
        // Fetch user profile to get their name
        const { data: profileData } = await supabase
          .from('profiles')
          .select('name')
          .eq('id', user.id)
          .single()
        
        if (profileData) {
          setProfile(profileData)
        }
      }
    }
    getUser()

    const subscriptionResult = supabase.auth.onAuthStateChange(async (event: any, session: any) => {
      setUser(session?.user || null)
      
      if (session?.user) {
        // Fetch user profile to get their name
        const { data: profileData } = await supabase
          .from('profiles')
          .select('name')
          .eq('id', session.user.id)
          .single()
        
        if (profileData) {
          setProfile(profileData)
        }
      }
      
      if (!session) {
        router.push('/auth')
      }
    })

    return () => {
      if (subscriptionResult && subscriptionResult.data && subscriptionResult.data.subscription && subscriptionResult.data.subscription.unsubscribe) {
        subscriptionResult.data.subscription.unsubscribe()
      }
    }
  }, [])

  const [newPost, setNewPost] = useState("")
  const [activeChannel, setActiveChannel] = useState('general')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [posts])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const sendPost = async () => {
    if (!newPost.trim() || !profile) return

    const newPostObj: CommunityPost = {
      id: Date.now().toString(),
      content: newPost.trim(),
      created_at: new Date().toISOString(),
      user: { name: profile.name },
      channel: activeChannel
    }

    setPosts(prev => [...prev, newPostObj])
    setNewPost("")
    setTimeout(scrollToBottom, 100)
  }

  const getFilteredPosts = () => {
    if (activeChannel === 'general') {
      return posts
    }
    return posts.filter(post => post.channel === activeChannel)
  }

  const connectWithBuddy = async (buddyId: string) => {
    alert("Connection request sent!")
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendPost()
    }
  }

  return (
    <div className="min-h-screen bg-[#fdf8f5] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-4xl text-[#2d1f14] mb-8">Community</h1>

        <Tabs defaultValue="buddy" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buddy" className="flex items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-[#c47c50] data-[state=active]:font-semibold">
              <Users className="w-4 h-4" />
              Find a Buddy
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-[#c47c50] data-[state=active]:font-semibold">
              <MessageCircle className="w-4 h-4" />
              Community Chat
            </TabsTrigger>
          </TabsList>

          {/* Find a Buddy - Full Width Grid Layout */}
          <TabsContent value="buddy" className="mt-8">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-[#2d1f14] mb-2">
                Connect with others on similar journeys
              </h3>
              <p className="text-[#8a7060]">
                Find support partners who understand what you're going through
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {buddyProfiles.map(profile => (
                <Card key={profile.id} className="border-[#e8ddd4] hover:border-[#c47c50] hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 ${getAvatarColor(profile.name)} rounded-full flex items-center justify-center ring-2 ring-white shadow-sm`}>
                        <span className="text-white text-sm font-medium">
                          {getInitials(profile.name)}
                        </span>
                      </div>
                      <div>
                        <CardTitle className="text-[#2d1f14] text-lg">
                          {profile.name}
                        </CardTitle>
                        <div className="flex items-center text-sm text-[#8a7060]">
                          <MapPin className="w-3 h-3 mr-1" />
                          {profile.location || 'Location not specified'}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-[#2d1f14] mb-2">Stage</h4>
                      <div className="px-3 py-1 bg-[#c47c50] text-white rounded-full text-sm inline-block">
                        {profile.menopause_stage || 'Not specified'}
                      </div>
                    </div>

                    {profile.interests && profile.interests.length > 0 && (
                      <div>
                        <h4 className="font-medium text-[#2d1f14] chat:mb-2">Interests</h4>
                        <div className="flex flex-wrap gap-1">
                          {profile.interests.slice(0, 4).map((interest, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-[#e8ddd4] text-[#2d1f14] rounded-full text-xs"
                            >
                              {interest}
                            </span>
                          ))}
                          {profile.interests.length > 4 && (
                            <span className="px-2 py-1 bg-[#e8ddd4] text-[#8a7060] rounded-full text-xs">
                              +{profile.interests.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <Button
                      variant="terracotta"
                      className="w-full"
                      onClick={() => connectWithBuddy(profile.id)}
                    >
                      Connect
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Community Chat - Dedicated Messaging Layout */}
          <TabsContent value="chat" className="mt-8">
            <Card className="h-[600px] flex flex-col">
              {/* Channel Pills */}
              <div className="p-4 border-b border-[#e8ddd4]">
                <div className="flex gap-2 flex-wrap">
                  {chatChannels.map(channel => (
                    <button
                      key={channel.id}
                      onClick={() => setActiveChannel(channel.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                        activeChannel === channel.id
                          ? `${channel.color} text-white`
                          : 'bg-[#f5f0eb] text-[#8a7060] hover:bg-[#e8ddd4]'
                      }`}
                    >
                      {channel.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-end">
                {getFilteredPosts().length === 0 ? (
                  <div className="text-center text-[#8a7060] mt-8">
                    <MessageCircle className="w-12 h-12 mx-auto mb-4" />
                    <p>No messages in this channel yet. Start the conversation!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {getFilteredPosts().map(post => (
                      <div key={post.id} className="flex items-start space-x-3">
                        {/* Avatar with initials */}
                        <div className={`w-10 h-10 ${getAvatarColor(post.user.name)} rounded-full flex items-center justify-center ring-2 ring-white shadow-sm`}>
                          <span className="text-white text-sm font-medium">
                            {getInitials(post.user.name)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-semibold text-[#2d1f14]">
                              {post.user?.name || 'Anonymous'}
                            </span>
                            <span className="text-xs text-[#c9a489]">
                              · {formatTime(post.created_at)}
                            </span>
                          </div>
                          {/* Message bubble with better contrast */}
                          <div className="inline-block max-w-lg">
                            <div className="bg-[#e0d5ca] border border-[#d4c5bc] rounded-2xl rounded-tl-sm px-4 py-2 shadow-sm">
                              <p className="text-[#2d1f14] text-sm leading-relaxed">
                                {post.content}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {/* Integrated Input Area */}
              <div className="p-4 bg-[#faf7f4]">
                <div className="flex space-x-3">
                  <Input
                    ref={inputRef}
                    placeholder="Type your message..."
                    value={newPost}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPost(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 bg-white border-[#e8ddd4] focus:border-[#c47c50] focus:ring-[#c47c50]/20"
                  />
                  <Button 
                    onClick={sendPost} 
                    disabled={!newPost.trim()}
                    className="bg-[#c47c50] hover:bg-[#b56b35] text-white px-4 py-2 shadow-md hover:shadow-lg transition-all"
                    size="sm"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
