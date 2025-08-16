import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Mail, MapPin, Phone, Send, MessageCircle, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false)
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true)
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([{
          name: data.name,
          email: data.email,
          message: `Subject: ${data.subject}\n\n${data.message}`
        }])

      if (error) throw error

      toast.success('Message sent successfully! We\'ll get back to you soon.')
      reset()
    } catch (error) {
      console.error('Error sending message:', error)
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: "Email Us",
      content: "hello@sattvaspace.com",
      description: "Send us an email anytime"
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-fitness" />,
      title: "Live Chat",
      content: "Available 9 AM - 6 PM PST",
      description: "Get instant answers to your questions"
    },
    {
      icon: <Clock className="w-6 h-6 text-lifestyle" />,
      title: "Response Time",
      content: "Within 24 hours",
      description: "We typically respond the same day"
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-foreground mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a question about wellness, need guidance on your journey, or want to collaborate? 
            We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  Let's Connect
                </h2>
                <p className="text-muted-foreground mb-6">
                  Whether you're seeking wellness advice, have feedback about our content, 
                  or want to explore partnership opportunities, we're here to help.
                </p>
              </div>

              {contactInfo.map((info, index) => (
                <Card key={index} className="border-border/50 hover:shadow-card transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-wellness rounded-lg flex-shrink-0">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-foreground mb-1">
                          {info.title}
                        </h3>
                        <p className="font-medium text-primary mb-1">
                          {info.content}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Social Links */}
              <Card className="bg-gradient-wellness border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-foreground mb-4">
                    Follow Our Journey
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Stay connected with our wellness community on social media for daily inspiration and tips.
                  </p>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="hover:bg-primary hover:text-white">
                      Instagram
                    </Button>
                    <Button variant="outline" size="sm" className="hover:bg-primary hover:text-white">
                      Facebook
                    </Button>
                    <Button variant="outline" size="sm" className="hover:bg-primary hover:text-white">
                      Twitter
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl font-heading text-foreground">
                  Send Us a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        placeholder="Your full name"
                        {...register('name')}
                        className={`bg-background border-border focus:border-primary ${
                          errors.name ? 'border-destructive' : ''
                        }`}
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        {...register('email')}
                        className={`bg-background border-border focus:border-primary ${
                          errors.email ? 'border-destructive' : ''
                        }`}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      placeholder="What's this about?"
                      {...register('subject')}
                      className={`bg-background border-border focus:border-primary ${
                        errors.subject ? 'border-destructive' : ''
                      }`}
                    />
                    {errors.subject && (
                      <p className="text-sm text-destructive mt-1">{errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help you on your wellness journey..."
                      rows={6}
                      {...register('message')}
                      className={`bg-background border-border focus:border-primary resize-none ${
                        errors.message ? 'border-destructive' : ''
                      }`}
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 items-start">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-gradient-hero hover:opacity-90 text-white px-8 py-3"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      * Required fields. We respect your privacy and will never share your information.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card className="mt-8 bg-muted/30 border-border/50">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-foreground mb-4">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-1">
                      How quickly do you respond to messages?
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      We typically respond within 24 hours, often the same day during business hours.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">
                      Can you provide personalized health advice?
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      While we can offer general wellness guidance, we always recommend consulting with qualified healthcare providers for personalized medical advice.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">
                      Do you accept guest article submissions?
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Yes! We welcome submissions from qualified wellness practitioners. Please include your credentials and article outline in your message.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;