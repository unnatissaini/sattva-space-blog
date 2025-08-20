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
import { useLanguage } from "@/contexts/LanguageContext";

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

const Contact = () => {
  const { t } = useLanguage();
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
      title: t('contact.email'),
      content: t('contact.email.content'),
      description: t('contact.email.desc')
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-fitness" />,
      title: t('contact.chat'),
      content: t('contact.chat.content'),
      description: t('contact.chat.desc')
    },
    {
      icon: <Clock className="w-6 h-6 text-lifestyle" />,
      title: t('contact.response'),
      content: t('contact.response.content'),
      description: t('contact.response.desc')
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-foreground mb-4">
            {t('contact.title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  {t('contact.connect')}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {t('contact.connect.desc')}
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
                    {t('contact.follow')}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {t('contact.follow.desc')}
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
                  {t('contact.form.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        {t('contact.form.name')} *
                      </label>
                      <Input
                        id="name"
                        placeholder={t('contact.form.name.placeholder')}
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
                        {t('contact.form.email')} *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={t('contact.form.email.placeholder')}
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
                      {t('contact.form.subject')} *
                    </label>
                    <Input
                      id="subject"
                      placeholder={t('contact.form.subject.placeholder')}
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
                      {t('contact.form.message')} *
                    </label>
                    <Textarea
                      id="message"
                      placeholder={t('contact.form.message.placeholder')}
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
                          {t('contact.form.sending')}
                        </>
                      ) : (
                        <>
                          {t('contact.form.send')}
                          <Send className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      {t('contact.form.required')}
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card className="mt-8 bg-muted/30 border-border/50">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-foreground mb-4">
                  {t('contact.faq')}
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-1">
                      {t('contact.faq.q1')}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {t('contact.faq.a1')}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">
                      {t('contact.faq.q2')}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {t('contact.faq.a2')}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">
                      {t('contact.faq.q3')}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {t('contact.faq.a3')}
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