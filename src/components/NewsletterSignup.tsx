import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'
import { Mail, Loader2 } from 'lucide-react'

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type NewsletterFormData = z.infer<typeof newsletterSchema>

export const NewsletterSignup = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  })

  const onSubmit = async (data: NewsletterFormData) => {
    setIsLoading(true)
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email: data.email }])

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast.error('This email is already subscribed to our newsletter')
        } else {
          throw error
        }
      } else {
        setIsSubscribed(true)
        toast.success('Successfully subscribed to our newsletter!')
        reset()
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error)
      toast.error('Failed to subscribe. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubscribed) {
    return (
      <Card className="w-full max-w-md mx-auto bg-gradient-wellness">
        <CardContent className="pt-6 text-center">
          <Mail className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h3 className="text-lg font-semibold mb-2">Thank You!</h3>
          <p className="text-muted-foreground">
            You've successfully subscribed to our wellness newsletter.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-wellness">
      <CardHeader className="text-center">
        <Mail className="h-8 w-8 mx-auto mb-2 text-primary" />
        <CardTitle className="text-xl">Stay Connected</CardTitle>
        <CardDescription>
          Get weekly wellness tips and latest articles delivered to your inbox
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Enter your email address"
              {...register('email')}
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subscribing...
              </>
            ) : (
              'Subscribe to Newsletter'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}