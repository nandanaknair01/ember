"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Pill } from "@/components/ui/pill"
import { Search, Clock, BookOpen } from "lucide-react"

interface Article {
  id: string
  title: string
  summary: string
  content: string
  readTime: string
  category: string
  tags: string[]
  featured?: boolean
}

const articles: Article[] = [
  {
    id: "1",
    title: "Hot Flashes: Understanding & Finding Relief",
    summary: "That sudden rush of warmth, the flush creeping up your neck — you're not imagining it. Hot flashes are one of the most common experiences of menopause, and understanding what's behind them can make them feel a little less overwhelming.",
    content: `That sudden rush of warmth, the flush creeping up your neck — you're not imagining it.
      Hot flashes are one of the most common experiences of menopause, and understanding
      what's behind them can make them feel a little less overwhelming.

      75% of women experience hot flashes during menopause — sudden waves of heat most
      intense in the face, neck, and chest, sometimes followed by sweating or chills.

      What's actually happening in your body

      As estrogen levels decline, your body's internal thermostat — the hypothalamus —
      becomes hypersensitive to tiny shifts in temperature. Even a slight change can trigger
      an alarm response: blood vessels near the skin's surface dilate rapidly, your heart
      rate picks up, and your body rushes to cool itself down. That's the familiar wave of heat.

      This isn't a malfunction — it's your body adapting. And with the right strategies,
      the intensity and frequency can often be meaningfully reduced.

      Natural relief strategies

      Stay cool
      Keep your bedroom cool at night, use a fan during the day, and keep a cooling spray handy. Dress in breathable layers you can quickly remove.

      Mind-body practices
      Deep breathing when a flash starts, regular yoga, meditation, and progressive muscle relaxation all help reduce frequency and intensity over time.

      Adjust your diet
      Avoid spicy foods, caffeine, and alcohol. Try soy products, which contain estrogen-like compounds, and stay well hydrated throughout the day.

      Move regularly
      Regular exercise can reduce both the frequency and severity of hot flashes. Even a 20-minute daily walk makes a noticeable difference over time.

      Herbal remedies worth exploring

      Black cohosh
      One of the most studied herbal options — research suggests it may reduce how often hot flashes occur.

      Red clover
      Contains isoflavones that gently mimic estrogen, potentially easing the severity of symptoms.

      Evening primrose oil
      Some women find it helps with intensity of hot flashes, though evidence is still growing.

      Flaxseed
      Rich in lignans that may support hormone balance — easy to add to smoothies or oatmeal daily.

      Track your triggers
      Every woman's hot flashes are different. Keeping a simple log of when they happen,
      what you ate, and how you were feeling helps you spot your personal patterns.

      When to talk to your doctor

      Reach out if your hot flashes are:
      Disrupting your daily work or relationships
      Waking you up at night regularly (night sweats)
      Accompanied by fever or other unusual symptoms
      Not improving after trying lifestyle changes for several weeks

      "Every woman's journey through menopause is her own. What works beautifully for one person
      may not for another — and that's okay. Be patient with yourself, stay curious, and know
      that you have more options than you might think."`,
    readTime: "5 min read",
    category: "Symptoms",
    tags: ["hot flashes", "natural remedies", "symptoms"],
    featured: true
  },
  {
    id: "2",
    title: "Sleep Better During Menopause: A Complete Guide",
    summary: "Discover why sleep becomes challenging during menopause and learn practical strategies for improving your rest quality.",
    content: "Sleep disturbances affect up to 60% of women during perimenopause and menopause...",
    readTime: "7 min read",
    category: "Sleep",
    tags: ["sleep", "insomnia", "wellness"]
  },
  {
    id: "3",
    title: "Brain Fog: Clearing the Mental Cloud",
    summary: "Understand the cognitive changes during menopause and find techniques to maintain mental clarity and focus.",
    content: "Many women experience difficulty with memory and concentration during menopause...",
    readTime: "6 min read",
    category: "Cognitive",
    tags: ["brain fog", "memory", "focus"]
  },
  {
    id: "4",
    title: "Mood Swings: Finding Emotional Balance",
    summary: "Learn about the hormonal influences on mood during menopause and discover strategies for emotional stability.",
    content: "Mood changes are common during menopause due to fluctuating hormone levels...",
    readTime: "8 min read",
    category: "Emotional",
    tags: ["mood swings", "emotional health", "hormones"]
  },
  {
    id: "5",
    title: "Nutrition for Menopause: Foods That Help",
    summary: "Explore the dietary approaches that can help alleviate menopause symptoms and support overall health.",
    content: "Proper nutrition plays a crucial role in managing menopause symptoms...",
    readTime: "10 min read",
    category: "Nutrition",
    tags: ["nutrition", "diet", "food"]
  },
  {
    id: "6",
    title: "Exercise During Menopause: What Works Best",
    summary: "Find the most effective exercise routines for managing menopause symptoms and maintaining bone health.",
    content: "Regular exercise is one of the most effective ways to manage menopause symptoms...",
    readTime: "6 min read",
    category: "Fitness",
    tags: ["exercise", "fitness", "bone health"]
  }
]

const stageContent = {
  perimenopause: {
    title: "Perimenopause",
    description: "The transitional period before menopause when your ovaries gradually begin to make less estrogen.",
    symptoms: ["Irregular periods", "Hot flashes", "Sleep problems", "Mood changes"],
    strategies: [
      "Track your cycle to understand patterns",
      "Practice stress management techniques",
      "Maintain a consistent sleep schedule",
      "Consider natural supplements like magnesium"
    ],
    duration: "Average duration: 4 years, but can range from 2-8 years"
  },
  menopause: {
    title: "Menopause",
    description: "Defined as 12 consecutive months without a menstrual period. This is when your ovaries have stopped releasing eggs.",
    symptoms: ["No periods", "Hot flashes", "Vaginal dryness", "Sleep disturbances"],
    strategies: [
      "Focus on bone health with calcium and vitamin D",
      "Use lubricants for vaginal comfort",
      "Continue regular exercise",
      "Consider hormone therapy after consulting with your doctor"
    ],
    duration: "This is a point in time, followed by postmenopause"
  },
  postmenopause: {
    title: "Postmenopause",
    description: "The years after menopause. During this stage, menopausal symptoms may continue but often decrease in intensity.",
    symptoms: ["Continued hot flashes", "Bone density loss", "Heart health concerns", "Genitourinary symptoms"],
    strategies: [
      "Prioritize bone density screenings",
      "Focus on heart-healthy lifestyle choices",
      "Maintain pelvic floor health",
      "Stay socially connected and active"
    ],
    duration: "For the rest of your life"
  }
}

export default function LearnPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("stage")

  // Handle tab parameter from URL
  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab === 'today' || tab === 'library') {
      setActiveTab(tab)
    }
  }, [searchParams])

  const allTags = Array.from(new Set(articles.flatMap(article => article.tags)))

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => article.tags.includes(tag))
    return matchesSearch && matchesTags
  })

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const handleReadMore = (article: Article) => {
    router.push(`/learn/article/${article.id}`)
  }

  return (
    <div className="min-h-screen bg-[#fdf8f5] p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-serif text-4xl text-[#2d1f14] mb-8">Learn & Grow</h1>

        <Tabs defaultValue="stage" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="stage">Your Stage</TabsTrigger>
            <TabsTrigger value="today">Today's Read</TabsTrigger>
            <TabsTrigger value="library">Library</TabsTrigger>
          </TabsList>

          {/* Your Stage Tab */}
          <TabsContent value="stage" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {Object.entries(stageContent).map(([key, stage]) => (
                <Card key={key} className="border-[#e8ddd4]">
                  <CardHeader>
                    <CardTitle className="text-[#2d1f14] font-serif text-2xl">
                      {stage.title}
                    </CardTitle>
                    <p className="text-[#8a7060]">{stage.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-[#2d1f14] mb-3">Common Symptoms</h4>
                      <div className="space-y-2">
                        {stage.symptoms.map((symptom, index) => (
                          <div key={index} className="flex items-center">
                            <div className="w-2 h-2 bg-[#c47c50] rounded-full mr-3"></div>
                            <span className="text-[#2d1f14]">{symptom}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#2d1f14] mb-3">Calming Strategies</h4>
                      <div className="space-y-2">
                        {stage.strategies.map((strategy, index) => (
                          <div key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-[#c47c50] rounded-full mr-3 mt-2"></div>
                            <span className="text-[#2d1f14] text-sm">{strategy}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#e8ddd4]">
                      <p className="text-sm text-[#8a7060] italic">{stage.duration}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Today's Read Tab */}
          <TabsContent value="today" className="mt-8">
            <div className="max-w-4xl mx-auto">
              {articles.filter(article => article.featured).map(article => (
                <Card key={article.id} className="border-[#e8ddd4]">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-[#2d1f14] font-serif text-2xl">
                        {article.title}
                      </CardTitle>
                      <div className="flex items-center text-[#8a7060]">
                        <Clock className="w-4 h-4 mr-1" />
                        {article.readTime}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#8a7060] mb-6 text-lg">{article.summary}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {article.tags.map(tag => (
                        <Pill key={tag} selected={false}>
                          {tag}
                        </Pill>
                      ))}
                    </div>
                    <div className="prose prose-[#2d1f14] max-w-none mb-6">
                      <p className="text-[#2d1f14] leading-relaxed">
                        {article.content.split('\n').slice(0, 3).join('\n')}...
                      </p>
                    </div>
                    <Button variant="terracotta" onClick={() => handleReadMore(article)}>
                      Read more
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Library Tab */}
          <TabsContent value="library" className="mt-8">
            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8a7060] w-4 h-4" />
                  <Input
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-[#2d1f14] mb-3">Filter by tags</h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <Pill
                      key={tag}
                      selected={selectedTags.includes(tag)}
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Pill>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map(article => (
                <Card key={article.id} className="border-[#e8ddd4] hover:border-[#c47c50] transition-colors cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-[#8a7060]">{article.category}</span>
                      <div className="flex items-center text-[#8a7060]">
                        <Clock className="w-3 h-3 mr-1" />
                        {article.readTime}
                      </div>
                    </div>
                    <CardTitle className="text-[#2d1f14] text-lg">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#8a7060] text-sm mb-4">{article.summary}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {article.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 bg-[#e8ddd4] text-[#2d1f14] rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button variant="terracotta" className="w-full" onClick={() => handleReadMore(article)}>
                      Read more
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-[#8a7060]" />
                <p className="text-[#8a7060]">No articles found matching your criteria.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
