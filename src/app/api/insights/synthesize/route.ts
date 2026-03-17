import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    // Mock response for demo purposes
    const mockResponse = {
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
    }

    return NextResponse.json(mockResponse)
  } catch (error) {
    console.error('Insights synthesis error:', error)
    return NextResponse.json(
      { error: 'Failed to generate insights' },
      { status: 500 }
    )
  }
}
