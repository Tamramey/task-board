import { createClient } from '@supabase/supabase-js'

// Supabaseの接続情報は .env で管理する(.env は .gitignore 対象)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error(
    'Supabaseの接続情報が設定されていません。.env.example を参考に .env を作成してください。',
  )
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey)
