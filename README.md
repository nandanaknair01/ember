# ember 🔥

> An AI-powered wellness companion for women navigating menopause.
> Voice journalling, emotional AI synthesis, cycle and symptom tracking,
> personalised weekly insights, and a location-aware community

## What is Ember?

Menopause affects every woman. Yet most navigate it without adequate 
support, reliable information, or a community that truly understands 
what they're going through.

Ember is built to change that.

It combines voice-based emotional journalling, conversational AI 
counselling, physical health tracking, and AI-generated insights into 
a single platform — designed with warmth, not clinical distance.

Features

**🎙️ Voice Journal**  
Speak freely. Ember transcribes your voice, detects emotional tone, 
and produces a structured journal entry — what you felt, why it may 
be happening given your cycle phase, and what you could try.

**💬 AI Counsellor**  
A conversational journalling mode. Talk through your day with a warm, 
menopause-aware AI companion and arrive at your own clarity.

**📊 Cross-data Insights**  
Weekly AI synthesis that correlates mood, cycle phase, sleep quality, 
and symptoms into one narrative. Patterns you'd never spot alone.

**🩺 Health Tracking**  
Log your cycle, symptoms (12 indicators, severity 1–3), sleep quality, 
and supplements — all feeding the insights engine.

**📖 Learn & Grow**  
Editorial content across perimenopause, menopause, and postmenopause. 
Stage guides, daily reads, and a searchable library — evidence-based 
and written with care.

**📅 Daily Diary**  
A complete longitudinal record of every journal entry, daily log, 
and AI insight — searchable, expandable, and yours.

**👯 Community**  
Find women near you at the same stage, with shared interests. 
Topic-threaded community chat and location-based buddy matching 
with activity suggestions.

---

## Tech Stack

| Frontend - Next.js 14 (App Router), TypeScript, Tailwind CSS |
| Database & Auth - Supabase (PostgreSQL + RLS) |
| File Storage - Supabase Storage |
| Realtime Chat - Supabase Realtime |
| Speech-to-Text - Web Speech API / Whisper (open source) - yet to be built
| AI / LLM -  Groq API — Llama 3.3 70B (open source, free tier) - yet to be built
| Charts - Recharts |
| Deployment | Vercel (free tier) - yet to be built


Getting Started

### Prerequisites

- Node.js 18+
- A Supabase account (free tier)
- A Groq API key (free tier — [console.groq.com](https://console.groq.com))

### Installation
```bash
git clone https://github.com/yourusername/ember.git
cd ember
npm install
```

### Environment Variables

Create a `.env.local` file in the root:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GROQ_API_KEY=your_groq_api_key
```

### Database Setup

Run the schema in your Supabase SQL editor:
```bash
# File located at:
supabase/schema.sql
```

### Run Locally
```bash
npm run dev
# Visit http://localhost:3000
```

---

## App Structure
```
ember/
├── app/
│   ├── auth/               # Login + signup
│   ├── onboarding/         # 4-step intake flow
│   ├── dashboard/          # Home hub
│   ├── learn/              # Stage guide, articles, library
│   ├── journal/            # Voice, chat, and text journalling
│   ├── track/              # Cycle, symptoms, sleep, supplements
│   ├── insights/           # AI weekly summary + charts
│   ├── diary/              # Daily reflections feed
│   ├── community/          # Chat + buddy matching
│   └── api/                # AI synthesis endpoints
├── lib/
│   └── supabase.ts         # Supabase client
├── components/             # Shared UI components
└── supabase/
    └── schema.sql          # Full database schema
```

---

## Database Schema
```sql
profiles          -- user profile, stage, symptoms, interests, goals
journal_entries   -- voice/chat/text entries + AI synthesis (JSONB)
cycle_logs        -- menstrual cycle tracking
symptom_logs      -- daily symptom severity (1–3)
daily_logs        -- sleep, mood score, supplements
community_posts   -- chat messages
buddy_matches     -- location + interest-based connections
```

## AI Endpoints

| Route | Purpose |
|---|---|
| `POST /api/journal/synthesise` | Voice transcript → mood, cause, next steps |
| `POST /api/journal/counsel` | Streaming conversational counsellor |
| `POST /api/insights/synthesise` | 30-day data → weekly narrative summary |

Roadmap - next steps

- [ ] Hume AI integration for voice emotion analysis
- [ ] pgvector semantic search across journal entries  
- [ ] Doctor export — styled PDF health summary
- [ ] Push notification reminders
- [ ] Mobile app (React Native)
- [ ] Wearable integration (sleep + heart rate data)


Why Ember?

1.2 billion women will be in menopause or postmenopause by 2030.  
They are underserved, digitally engaged, and waiting for something  
built with them — not just for them.

Built With

This project was built in 48 hours as part of a hackathon, by Nandana and Parnika
