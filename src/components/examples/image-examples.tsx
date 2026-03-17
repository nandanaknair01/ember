"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ImageExamples() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-[#2d1f14] mb-6">Visual Image Examples</h1>
      
      {/* Hero Image with Overlay */}
      <Card className="overflow-hidden">
        <div className="relative h-64">
          <Image
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop"
            alt="Wellness hero"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2d1f14]/70 to-transparent flex items-end">
            <div className="p-6 text-white">
              <h2 className="text-2xl font-serif italic">Your Wellness Journey</h2>
              <p className="text-[#e8ddd4]">Find support and understanding</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Circular Profile Images */}
      <div className="grid grid-cols-3 gap-4">
        {['Parnika', 'Maria', 'Lisa'].map((name, index) => {
          const photoIds = ['1494790108755', '1494790108756', '1494790108757']
          return (
          <Card key={name} className="text-center p-4">
            <div className="relative w-20 h-20 mx-auto mb-3">
              <Image
                src={`https://images.unsplash.com/photo-${photoIds[index]}?w=80&h=80&fit=crop&crop=face`}
                alt={name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <h3 className="font-medium text-[#2d1f14]">{name}</h3>
            <p className="text-sm text-[#8a7060]">Community Member</p>
          </Card>
          )
        })}
      </div>

      {/* Illustration Cards */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="relative h-32 mb-4">
            <Image
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=150&fit=crop"
              alt="Meditation illustration"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <h3 className="font-semibold text-[#2d1f14] mb-2">Mindfulness</h3>
          <p className="text-[#8a7060] text-sm">Practice daily meditation for mental clarity</p>
          <Button variant="terracotta" className="mt-4 w-full">Start Practice</Button>
        </Card>

        <Card className="p-6">
          <div className="relative h-32 mb-4">
            <Image
              src="https://images.unsplash.com/photo-1490645915965-94de3d533603?w=300&h=150&fit=crop"
              alt="Nutrition illustration"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <h3 className="font-semibold text-[#2d1f14] mb-2">Nutrition</h3>
          <p className="text-[#8a7060] text-sm">Balanced diet for hormonal balance</p>
          <Button variant="terracotta" className="mt-4 w-full">Learn More</Button>
        </Card>
      </div>

      {/* Background Patterns */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop"
            alt="Background pattern"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative p-6">
          <h3 className="text-xl font-semibold text-[#2d1f14] mb-3">Subtle Backgrounds</h3>
          <p className="text-[#8a7060]">Use low-opacity images for elegant backgrounds</p>
        </div>
      </Card>
    </div>
  )
}
