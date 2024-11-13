import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://qxeluulysbotzhnzuvyi.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4ZWx1dWx5c2JvdHpobnp1dnlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk0OTA0NjcsImV4cCI6MjA0NTA2NjQ2N30.aEkzu8YAUH4WWZJnWQ5CUMfpoU34kaRx_4LtLYpqrr0"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})