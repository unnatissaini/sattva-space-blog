import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { LoginForm } from '@/components/auth/LoginForm'
import { AdminDashboard } from '@/components/admin/AdminDashboard'
import { Loader2 } from 'lucide-react'

const Admin = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <LoginForm />
      </div>
    )
  }

  return <AdminDashboard />
}

export default Admin