<<<<<<< HEAD
# Ember - Menopause Wellness Companion

A supportive wellness web app for women 40+ navigating menopause, offering tracking, insights, and community support.

## Features

- **Authentication**: Google OAuth and email/password sign-in
- **Personalized Onboarding**: 4-step flow to understand your journey
- **Dashboard**: Daily affirmations, quick logging, and personalized content
- **Learning Hub**: Educational content about menopause stages and symptoms
- **Journal**: Voice, chat, and text modes with AI-powered insights
- **Tracking**: Monitor cycles, symptoms, sleep, and supplements
- **Insights**: AI-generated summaries and data visualizations
- **Community**: Chat with others and find wellness buddies
- **Diary**: Chronological feed of all journal entries

## Design System

- **Fonts**: Cormorant Garamond (headings) + DM Sans (body)
- **Colors**: Warm, organic palette
  - Background: `#fdf8f5`
  - Dark brown: `#2d1f14`
  - Terracotta accent: `#c47c50`
  - Muted text: `#8a7060`
  - Borders: `#e8ddd4`

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Supabase (auth + database + realtime)
- **Charts**: Recharts
- **AI**: Claude API integration (ready for implementation)
- **Deployment**: Vercel

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```
   Fill in your Supabase and Claude API credentials.

4. Set up Supabase database:
   - Run the SQL schema from `src/lib/database.ts` in your Supabase SQL editor
   - Enable Google OAuth in Supabase Auth settings

5. Run the development server:
   ```bash
   npm run dev
   ```

## Database Schema

The app uses the following main tables:

- `profiles`: User information and onboarding data
- `journal_entries`: Voice, chat, and text journal entries
- `cycle_logs`: Menstrual cycle tracking
- `symptom_logs`: Daily symptom logging
- `daily_logs`: Sleep, supplements, and mood tracking
- `community_posts`: Community chat messages
- `buddy_matches`: User connections

## Authentication & Security

- Supabase Auth for user management
- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- OAuth integration with Google

## AI Integration

The app is ready for Claude API integration:

- `/api/journal/synthesize` - Analyzes journal entries
- `/api/journal/counsel` - Provides chat-based counseling
- `/api/insights/synthesize` - Generates weekly summaries

Currently using mock responses for demo purposes.

## Responsive Design

- Mobile-first approach
- Bottom navigation on mobile
- Left sidebar on desktop
- Consistent warm, editorial aesthetic

## Deployment

1. Push to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

## Contributing

This is a demo project showcasing modern web development practices for women's health tech.

## License

MIT License - feel free to use this as a starting point for your own projects.
=======
# ember
>>>>>>> fa0058921e6470bb803a03fededb863910d883b7
