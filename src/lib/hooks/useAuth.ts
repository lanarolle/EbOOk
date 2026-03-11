import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()
  const router = useRouter()

  const login = async (data: any) => {
    setIsLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword(data)
    if (error) {
      setError(error.message)
      setIsLoading(false)
      return false
    }
    router.push('/dashboard')
    router.refresh()
    return true
  }

  const register = async (data: any, metadata: any) => {
    setIsLoading(true)
    setError(null)
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: metadata
      }
    })
    if (error) {
      setError(error.message)
      setIsLoading(false)
      return false
    }
    router.push('/dashboard')
    router.refresh()
    return true
  }

  const logout = async () => {
    setIsLoading(true)
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return { login, register, logout, isLoading, error }
}
