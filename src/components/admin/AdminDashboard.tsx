import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/integrations/supabase/client'
import { BlogPost, ContactMessage } from '@/lib/supabase'
import { BlogPostForm } from './BlogPostForm'
import { toast } from 'sonner'
import { 
  Plus, 
  Edit, 
  Trash2, 
  LogOut, 
  FileText, 
  Users, 
  Mail,
  Eye,
  Calendar
} from 'lucide-react'
import { format } from 'date-fns'

export const AdminDashboard = () => {
  const { signOut, user } = useAuth()
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchBlogPosts()
    fetchContactMessages()
  }, [])

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setBlogPosts(data || [])
    } catch (error) {
      console.error('Error fetching blog posts:', error)
      toast.error('Failed to fetch blog posts')
    }
  }

  const fetchContactMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setContactMessages(data || [])
    } catch (error) {
      console.error('Error fetching contact messages:', error)
      toast.error('Failed to fetch contact messages')
    }
  }

  const handleCreatePost = async (postData: any) => {
    setIsLoading(true)
    try {
      const slug = postData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
      
      const { error } = await supabase
        .from('blog_posts')
        .insert([{
          ...postData,
          slug,
          published_at: new Date().toISOString(),
        }])

      if (error) throw error

      toast.success('Blog post created successfully!')
      setShowCreateForm(false)
      fetchBlogPosts()
    } catch (error) {
      console.error('Error creating blog post:', error)
      toast.error('Failed to create blog post')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdatePost = async (postData: any) => {
    if (!editingPost) return

    setIsLoading(true)
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({
          ...postData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', editingPost.id)

      if (error) throw error

      toast.success('Blog post updated successfully!')
      setEditingPost(null)
      fetchBlogPosts()
    } catch (error) {
      console.error('Error updating blog post:', error)
      toast.error('Failed to update blog post')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id)

      if (error) throw error

      toast.success('Blog post deleted successfully!')
      fetchBlogPosts()
    } catch (error) {
      console.error('Error deleting blog post:', error)
      toast.error('Failed to delete blog post')
    }
  }

  const handleLogout = () => {
    signOut()
    toast.success('Logged out successfully!')
  }

  if (showCreateForm) {
    return (
      <div className="container mx-auto py-8">
        <BlogPostForm
          onSubmit={handleCreatePost}
          onCancel={() => setShowCreateForm(false)}
          isLoading={isLoading}
        />
      </div>
    )
  }

  if (editingPost) {
    return (
      <div className="container mx-auto py-8">
        <BlogPostForm
          initialData={editingPost}
          onSubmit={handleUpdatePost}
          onCancel={() => setEditingPost(null)}
          isLoading={isLoading}
        />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.email}</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      <Tabs defaultValue="posts" className="space-y-6">
        <TabsList>
          <TabsTrigger value="posts">Blog Posts</TabsTrigger>
          <TabsTrigger value="messages">Contact Messages</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Blog Posts</h2>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create New Post
            </Button>
          </div>

          <div className="grid gap-4">
            {blogPosts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <CardTitle className="text-lg">{post.title}</CardTitle>
                      <CardDescription>{post.excerpt}</CardDescription>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{post.category}</Badge>
                        <span className="text-sm text-muted-foreground">
                          by {post.author}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {format(new Date(post.published_at), 'MMM dd, yyyy')}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingPost(post)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeletePost(post.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="messages" className="space-y-6">
          <h2 className="text-2xl font-semibold">Contact Messages</h2>
          
          <div className="grid gap-4">
            {contactMessages.map((message) => (
              <Card key={message.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <CardTitle className="text-lg">{message.name}</CardTitle>
                      <CardDescription>{message.email}</CardDescription>
                      <p className="text-sm">{message.message}</p>
                      <span className="text-sm text-muted-foreground">
                        {format(new Date(message.created_at), 'MMM dd, yyyy HH:mm')}
                      </span>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <h2 className="text-2xl font-semibold">Analytics Overview</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{blogPosts.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Contact Messages</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{contactMessages.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Month</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {blogPosts.filter(post => 
                    new Date(post.created_at).getMonth() === new Date().getMonth()
                  ).length}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}