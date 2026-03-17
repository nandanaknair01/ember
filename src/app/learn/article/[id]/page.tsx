"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pill } from "@/components/ui/pill"
import { Clock, ArrowLeft } from "lucide-react"

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

// Mock data - in real app this would be fetched from API
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
  }
]

export default function ArticlePage() {
  const params = useParams()
  const router = useRouter()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    // fetch(`/api/articles/${params.id}`)
    const foundArticle = articles.find(a => a.id === params.id)
    setArticle(foundArticle || null)
    setLoading(false)
  }, [params.id])

  const handleBack = () => {
    router.push('/learn?tab=library')
  }

  const handleTrackTriggers = () => {
    router.push('/track')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f0eb] flex items-center justify-center">
        <div className="text-[#9e7560]">Loading article...</div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-[#f5f0eb] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-[#1e0f06] mb-4">Article not found</h1>
          <Button variant="terracotta" onClick={handleBack}>
            Back to Learn
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f0eb]" style={{ fontFamily: "'Lato', system-ui, sans-serif" }}>
      {/* Navigation */}
      <nav className="bg-[#3d2113] px-8 py-4 flex items-center gap-2">
        <span className="font-serif italic text-[#e8b99a] text-xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>ember</span>
        <button 
          onClick={handleBack}
          className="ml-auto text-[#c9a489] text-sm hover:text-[#e8b99a] transition-colors"
        >
          ← Back to library
        </button>
      </nav>

      {/* Article Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Tag Pill */}
            <span className="inline-block bg-[#3d2113] text-[#e8b99a] text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full mb-4">
              Symptoms & Relief
            </span>

            {/* Title */}
            <h1 className="font-serif text-4xl md:text-6xl font-normal text-[#1e0f06] leading-tight mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Hot Flashes: Understanding & Finding Relief
            </h1>

            {/* Lead Paragraph */}
            <p className="text-xl font-light text-[#6b4530] leading-relaxed mb-10 max-w-none">
              That sudden rush of warmth, the flush creeping up your neck — you're not imagining it.
              Hot flashes are one of the most common experiences of menopause, and understanding
              what's behind them can make them feel a little less overwhelming.
            </p>

            {/* Stat Callout */}
            <div className="bg-[#3d2113] rounded-2xl p-8 mb-12 flex items-center gap-8">
              <div className="font-serif text-6xl font-medium text-[#e8a87c]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>75%</div>
              <div className="text-base font-light text-[#c9a489] leading-relaxed">
                of women experience hot flashes during menopause — sudden waves of heat most
                intense in the face, neck, and chest, sometimes followed by sweating or chills.
              </div>
            </div>

            {/* What's happening section */}
            <h2 className="font-serif text-3xl font-normal text-[#1e0f06] mt-16 mb-6 pb-3 border-b border-[rgba(90,55,30,0.12)]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              What's actually happening in your body
            </h2>
            <p className="text-base font-light text-[#6b4530] leading-relaxed mb-8">
              As estrogen levels decline, your body's internal thermostat — the hypothalamus —
              becomes hypersensitive to tiny shifts in temperature. Even a slight change can trigger
              an alarm response: blood vessels near the skin's surface dilate rapidly, your heart
              rate picks up, and your body rushes to cool itself down. That's the familiar wave of heat.
            </p>
            <p className="text-base font-light text-[#6b4530] leading-relaxed mb-12">
              This isn't a malfunction — it's your body adapting. And with the right strategies,
              the intensity and frequency can often be meaningfully reduced.
            </p>

            {/* Relief strategies section */}
            <h2 className="font-serif text-3xl font-normal text-[#1e0f06] mt-16 mb-6 pb-3 border-b border-[rgba(90,55,30,0.12)]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Natural relief strategies
            </h2>

            {/* Tip Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-10">
              <div className="bg-white border border-[rgba(90,55,30,0.12)] rounded-xl p-6 hover:border-[rgba(200,121,65,0.35)] hover:-translate-y-1 transition-all">
                <div className="text-3xl mb-3">🌬️</div>
                <div className="font-bold text-base text-[#1e0f06] mb-2">Stay cool</div>
                <div className="text-sm font-light text-[#9e7560] leading-relaxed">Keep your bedroom cool at night, use a fan during the day, and keep a cooling spray handy. Dress in breathable layers you can quickly remove.</div>
              </div>
              <div className="bg-white border border-[rgba(90,55,30,0.12)] rounded-xl p-6 hover:border-[rgba(200,121,65,0.35)] hover:-translate-y-1 transition-all">
                <div className="text-3xl mb-3">🧘</div>
                <div className="font-bold text-base text-[#1e0f06] mb-2">Mind-body practices</div>
                <div className="text-sm font-light text-[#9e7560] leading-relaxed">Deep breathing when a flash starts, regular yoga, meditation, and progressive muscle relaxation all help reduce frequency and intensity over time.</div>
              </div>
              <div className="bg-white border border-[rgba(90,55,30,0.12)] rounded-xl p-6 hover:border-[rgba(200,121,65,0.35)] hover:-translate-y-1 transition-all">
                <div className="text-3xl mb-3">🥗</div>
                <div className="font-bold text-base text-[#1e0f06] mb-2">Adjust your diet</div>
                <div className="text-sm font-light text-[#9e7560] leading-relaxed">Avoid spicy foods, caffeine, and alcohol. Try soy products, which contain estrogen-like compounds, and stay well hydrated throughout the day.</div>
              </div>
              <div className="bg-white border border-[rgba(90,55,30,0.12)] rounded-xl p-6 hover:border-[rgba(200,121,65,0.35)] hover:-translate-y-1 transition-all">
                <div className="text-3xl mb-3">🏃</div>
                <div className="font-bold text-base text-[#1e0f06] mb-2">Move regularly</div>
                <div className="text-sm font-light text-[#9e7560] leading-relaxed">Regular exercise can reduce both the frequency and severity of hot flashes. Even a 20-minute daily walk makes a noticeable difference over time.</div>
              </div>
            </div>

            {/* Herbal remedies section */}
            <h2 className="font-serif text-3xl font-normal text-[#1e0f06] mt-16 mb-6 pb-3 border-b border-[rgba(90,55,30,0.12)]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Herbal remedies worth exploring
            </h2>
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start py-4 border-b border-[rgba(90,55,30,0.12)]">
                <div className="w-3 h-3 bg-[#c87941] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-bold text-base text-[#1e0f06] mb-2">Black cohosh</div>
                  <div className="text-sm font-light text-[#9e7560] leading-relaxed">One of the most studied herbal options — research suggests it may reduce how often hot flashes occur.</div>
                </div>
              </div>
              <div className="flex gap-4 items-start py-4 border-b border-[rgba(90,55,30,0.12)]">
                <div className="w-3 h-3 bg-[#c87941] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-bold text-base text-[#1e0f06] mb-2">Red clover</div>
                  <div className="text-sm font-light text-[#9e7560] leading-relaxed">Contains isoflavones that gently mimic estrogen, potentially easing the severity of symptoms.</div>
                </div>
              </div>
              <div className="flex gap-4 items-start py-4 border-b border-[rgba(90,55,30,0.12)]">
                <div className="w-3 h-3 bg-[#c87941] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-bold text-base text-[#1e0f06] mb-2">Evening primrose oil</div>
                  <div className="text-sm font-light text-[#9e7560] leading-relaxed">Some women find it helps with intensity of hot flashes, though evidence is still growing.</div>
                </div>
              </div>
              <div className="flex gap-4 items-start py-4">
                <div className="w-3 h-3 bg-[#c87941] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-bold text-base text-[#1e0f06] mb-2">Flaxseed</div>
                  <div className="text-sm font-light text-[#9e7560] leading-relaxed">Rich in lignans that may support hormone balance — easy to add to smoothies or oatmeal daily.</div>
                </div>
              </div>
            </div>

            {/* Tracker CTA */}
            <div className="bg-[#3d2113] rounded-2xl p-10 my-16 flex items-center justify-between gap-8 flex-wrap">
              <div>
                <div className="font-serif text-2xl text-[#e8b99a] mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Track your triggers</div>
                <div className="text-base font-light text-[#c9a489] leading-relaxed max-w-lg">
                  Every woman's hot flashes are different. Keeping a simple log of when they happen,
                  what you ate, and how you were feeling helps you spot your personal patterns.
                </div>
              </div>
              <button 
                onClick={handleTrackTriggers}
                className="bg-[#c87941] text-white text-base font-bold px-8 py-3 rounded-full hover:bg-[#b56b35] hover:-translate-y-1 transition-all whitespace-nowrap"
              >
                Start tracking →
              </button>
            </div>

            {/* When to see doctor */}
            <h2 className="font-serif text-3xl font-normal text-[#1e0f06] mt-16 mb-6 pb-3 border-b border-[rgba(90,55,30,0.12)]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              When to talk to your doctor
            </h2>
            <div className="bg-[#faf7f4] border border-[rgba(90,55,30,0.12)] border-l-4 border-l-[#c87941] rounded-xl p-8 my-10">
              <div className="font-bold text-base text-[#1e0f06] mb-4">Reach out if your hot flashes are:</div>
              <div className="flex gap-3 text-base font-light text-[#6b4530] leading-relaxed mb-2">
                <span className="text-[#c87941] font-bold">—</span>
                <span>Disrupting your daily work or relationships</span>
              </div>
              <div className="flex gap-3 text-base font-light text-[#6b4530] leading-relaxed mb-2">
                <span className="text-[#c87941] font-bold">—</span>
                <span>Waking you up at night regularly (night sweats)</span>
              </div>
              <div className="flex gap-3 text-base font-light text-[#6b4530] leading-relaxed mb-2">
                <span className="text-[#c87941] font-bold">—</span>
                <span>Accompanied by fever or other unusual symptoms</span>
              </div>
              <div className="flex gap-3 text-base font-light text-[#6b4530] leading-relaxed">
                <span className="text-[#c87941] font-bold">—</span>
                <span>Not improving after trying lifestyle changes for several weeks</span>
              </div>
            </div>

            {/* Closing quote */}
            <blockquote className="font-serif italic text-2xl text-[#9e7560] leading-relaxed mt-16 pt-10 border-t border-[rgba(90,55,30,0.12)]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              "Every woman's journey through menopause is her own. What works beautifully for one person
              may not for another — and that's okay. Be patient with yourself, stay curious, and know
              that you have more options than you might think."
            </blockquote>
          </div>

          {/* Right Sidebar - Table of Contents */}
          <div className="lg:col-span-4">
            <div className="sticky top-8">
              <div className="bg-[#faf7f4] rounded-xl p-6 border border-[rgba(90,55,30,0.12)]">
                <h3 className="font-serif text-lg font-medium text-[#1e0f06] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Contents</h3>
                <nav className="space-y-3">
                  <a href="#what-happening" className="block text-sm font-light text-[#6b4530] hover:text-[#c87941] transition-colors">What's actually happening</a>
                  <a href="#relief-strategies" className="block text-sm font-light text-[#6b4530] hover:text-[#c87941] transition-colors">Natural relief strategies</a>
                  <a href="#herbal-remedies" className="block text-sm font-light text-[#6b4530] hover:text-[#c87941] transition-colors">Herbal remedies</a>
                  <a href="#when-doctor" className="block text-sm font-light text-[#6b4530] hover:text-[#c87941] transition-colors">When to talk to your doctor</a>
                </nav>
              </div>

              {/* Related Articles */}
              <div className="bg-[#faf7f4] rounded-xl p-6 border border-[rgba(90,55,30,0.12)] mt-6">
                <h3 className="font-serif text-lg font-medium text-[#1e0f06] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Related Articles</h3>
                <div className="space-y-4">
                  <div className="pb-4 border-b border-[rgba(90,55,30,0.12)]">
                    <h4 className="font-bold text-sm text-[#1e0f06] mb-2">Sleep Better During Menopause</h4>
                    <p className="text-xs font-light text-[#9e7560]">Discover strategies for improving rest quality during menopause.</p>
                  </div>
                  <div className="pb-4 border-b border-[rgba(90,55,30,0.12)]">
                    <h4 className="font-bold text-sm text-[#1e0f06] mb-2">Mood Swings: Finding Balance</h4>
                    <p className="text-xs font-light text-[#9e7560]">Learn about hormonal influences on mood and emotional stability.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#1e0f06] mb-2">Nutrition for Menopause</h4>
                    <p className="text-xs font-light text-[#9e7560]">Explore dietary approaches to alleviate menopause symptoms.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
