// import { createClient } from '@supabase/supabase-js'
// import { mockSupabase } from './supabase-mock'

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// export const supabase = supabaseUrl && supabaseAnonKey 
//   ? createClient(supabaseUrl, supabaseAnonKey)
//   : mockSupabase

// Mock supabase for UI demo
export const supabase = {
  auth: {
    getUser: async () => ({ data: { user: { id: 'demo-user' } }, error: null }),
    signInWithPassword: async () => ({ data: { user: { id: 'demo-user' } }, error: null }),
    signInWithOAuth: async () => ({ data: { user: { id: 'demo-user' } }, error: null }),
    signUp: async () => ({ data: { user: { id: 'demo-user' } }, error: null }),
    signOut: async () => ({ error: null }),
    onAuthStateChange: (callback: any) => ({ 
      data: { 
        subscription: { 
          unsubscribe: () => {} 
        } 
      } 
    })
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: { onboarding_complete: true }, error: null }),
        then: async (resolve: any) => resolve({ data: [], error: null })
      }),
      gte: () => ({
        order: () => ({
          then: async (resolve: any) => resolve({ data: [], error: null })
        })
      }),
      order: () => ({
        then: async (resolve: any) => resolve({ data: [], error: null })
      }),
      then: async (resolve: any) => resolve({ data: [], error: null })
    }),
    insert: () => ({
      then: async (resolve: any) => resolve({ data: null, error: null })
    }),
    upsert: () => ({
      then: async (resolve: any) => resolve({ data: null, error: null })
    })
  })
}
