// Mock Supabase client for development without environment variables
export const mockSupabase = {
  auth: {
    getUser: async () => ({ data: { user: null }, error: null }),
    signInWithPassword: async () => ({ data: null, error: new Error('Mock: Not implemented') }),
    signInWithOAuth: async () => ({ data: null, error: new Error('Mock: Not implemented') }),
    signUp: async () => ({ data: null, error: new Error('Mock: Not implemented') }),
    signOut: async () => ({ error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: null, error: null }),
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
