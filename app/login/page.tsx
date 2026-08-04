'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createBrowserClient } from '@supabase/ssr'

export default function LoginUI() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-slate-900 rounded-lg">
      <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
    </div>
  )
}
