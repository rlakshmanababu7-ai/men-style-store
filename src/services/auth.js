import { supabase } from './supabase'

export const signUp = async (email, password, username) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: username,
      },
    },
  })

  // If successfully signed up, Supabase Auth might trigger triggers to insert into 'profiles'
  // But if the user wants us to manually insert:
  if (data?.user && !error) {
    // Optionally create profile here if not using triggers
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{ id: data.user.id, username, email, created_at: new Date() }])
    
    if (profileError) {
      console.log('Error creating profile manually:', profileError)
    }
  }

  return { data, error }
}

export const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const logout = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return null

  // Fetch from profiles table
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return { ...user, ...profile }
}

export const forgotPassword = async (email) => {
  // You would typically set a redirectTo URL correctly based on your app's location
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  })
  return { data, error }
}

export const resetPassword = async (newPassword) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  })
  return { data, error }
}

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/dashboard`
    }
  })
  return { data, error }
}
