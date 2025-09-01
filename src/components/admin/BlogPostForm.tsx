import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RichTextEditor } from './RichTextEditor'
import { BlogPost } from '@/lib/supabase'
import { toast } from 'sonner'
import { Loader2, Upload, X } from 'lucide-react'

const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  title_hi: z.string().optional(),
  excerpt: z.string().min(1, 'Excerpt is required'),
  excerpt_hi: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  author: z.string().min(1, 'Author is required'),
  image_url: z.string().optional(),
  video_url: z.string().optional(),
})

type BlogPostFormData = z.infer<typeof blogPostSchema>

interface BlogPostFormProps {
  initialData?: Partial<BlogPost>
  onSubmit: (data: BlogPostFormData & { content: string; content_hi?: string }) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

const categories = ['Health', 'Fitness', 'Remedies', 'Lifestyle']

export const BlogPostForm = ({ 
  initialData, 
  onSubmit, 
  onCancel, 
  isLoading = false 
}: BlogPostFormProps) => {
  const [content, setContent] = useState(initialData?.content || '')
  const [contentHi, setContentHi] = useState(initialData?.content_hi || '')
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image_url || null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogPostFormData>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: initialData?.title || '',
      title_hi: initialData?.title_hi || '',
      excerpt: initialData?.excerpt || '',
      excerpt_hi: initialData?.excerpt_hi || '',
      category: initialData?.category || '',
      author: initialData?.author || '',
      image_url: initialData?.image_url || '',
      video_url: initialData?.video_url || '',
    },
  })

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        setImagePreview(imageUrl)
        setValue('image_url', imageUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImagePreview(null)
    setValue('image_url', '')
  }

  const handleFormSubmit = async (data: BlogPostFormData) => {
    if (!content.trim()) {
      toast.error('Content is required')
      return
    }

    await onSubmit({ 
      ...data, 
      content,
      content_hi: contentHi.trim() || undefined
    })
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>
          {initialData ? 'Edit Blog Post' : 'Create New Blog Post'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter blog post title"
                {...register('title')}
                className={errors.title ? 'border-destructive' : ''}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                placeholder="Author name"
                {...register('author')}
                className={errors.author ? 'border-destructive' : ''}
              />
              {errors.author && (
                <p className="text-sm text-destructive">{errors.author.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt (English)</Label>
            <Input
              id="excerpt"
              placeholder="Brief description of the post"
              {...register('excerpt')}
              className={errors.excerpt ? 'border-destructive' : ''}
            />
            {errors.excerpt && (
              <p className="text-sm text-destructive">{errors.excerpt.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title_hi">Title (Hindi) - Optional</Label>
              <Input
                id="title_hi"
                placeholder="हिंदी में शीर्षक"
                {...register('title_hi')}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="excerpt_hi">Excerpt (Hindi) - Optional</Label>
              <Input
                id="excerpt_hi"
                placeholder="हिंदी में संक्षिप्त विवरण"
                {...register('excerpt_hi')}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              onValueChange={(value) => setValue('category', value)}
              defaultValue={initialData?.category}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-destructive">{errors.category.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Featured Image</Label>
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-md"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={removeImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-md p-8 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <Label htmlFor="image-upload" className="cursor-pointer">
                  <span className="text-sm text-muted-foreground">
                    Click to upload an image
                  </span>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </Label>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="video_url">Video URL (Optional)</Label>
            <Input
              id="video_url"
              placeholder="https://youtube.com/watch?v=..."
              {...register('video_url')}
            />
          </div>

          <div className="space-y-2">
            <Label>Content (English)</Label>
            <RichTextEditor
              content={content}
              onChange={setContent}
              placeholder="Write your blog post content here..."
            />
          </div>

          <div className="space-y-2">
            <Label>Content (Hindi) - Optional</Label>
            <RichTextEditor
              content={contentHi}
              onChange={setContentHi}
              placeholder="यहाँ अपना हिंदी ब्लॉग पोस्ट लिखें..."
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {initialData ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                initialData ? 'Update Post' : 'Create Post'
              )}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}