import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const pathSegments = url.pathname.split('/')
  const width = pathSegments[pathSegments.length - 2] || '400'
  const height = pathSegments[pathSegments.length - 1] || '300'
  
  // Generate a placeholder image URL
  const imageUrl = `https://picsum.photos/${width}/${height}?random=${Math.random()}`
  
  return NextResponse.redirect(imageUrl)
}
