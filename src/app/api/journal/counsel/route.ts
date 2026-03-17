import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json()

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // In production, this would call Claude API for streaming
    // For demo purposes, returning mock response
    const mockResponse = {
      role: 'assistant',
      content: "I hear you're going through a lot right now. What you're experiencing sounds very common during menopause. Many women find that keeping a regular routine and practicing self-care can make a big difference. Have you noticed any particular triggers for your symptoms?"
    }

    // Uncomment and implement this when you have Claude API access
    /*
    const anthropic = require('@anthropic-ai/sdk')
    const client = new anthropic.Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })

    const messages = [
      {
        role: 'user',
        content: message
      }
    ]

    // Add conversation history if provided
    if (history && Array.isArray(history)) {
      messages.unshift(...history.slice(-10)) // Keep last 10 messages for context
    }

    const stream = await client.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 1000,
      temperature: 0.7,
      system: `You are a warm, knowledgeable menopause wellness companion. You provide empathetic support and practical guidance for women experiencing menopause symptoms. Be encouraging, never clinical, and always suggest consulting healthcare providers for medical advice. Focus on emotional support, lifestyle strategies, and community resources.`,
      messages,
      stream: true
    })

    return new Response(
      new ReadableStream({
        async start(controller) {
          for await (const chunk of stream) {
            if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
              controller.enqueue(`data: ${JSON.stringify({ content: chunk.delta.text })}\n\n`)
            }
          }
          controller.close()
        }
      }),
      {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      }
    )
    */

    return NextResponse.json(mockResponse)
  } catch (error) {
    console.error('Journal counsel error:', error)
    return NextResponse.json(
      { error: 'Failed to process counseling request' },
      { status: 500 }
    )
  }
}
