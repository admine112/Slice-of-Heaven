import { useI18n } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { insertContactSchema } from '@shared/schema';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

type ContactFormData = z.infer<typeof insertContactSchema>;

export default function Contact() {
  const { t, language } = useI18n();
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const contactMutation = useMutation({
    mutationFn: (data: ContactFormData) => apiRequest('POST', '/api/contacts', data),
    onSuccess: () => {
      toast({
        title: t('common.success'),
        description: t('contact.success'),
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: t('common.error'),
        description: language === 'en' ? 'Failed to send message' : 'Не вдалося надіслати повідомлення',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4">
          {t('contact.title')}
        </h1>
        <p className="text-lg text-muted-foreground">
          {language === 'en'
            ? 'Have a question? We\'d love to hear from you.'
            : 'Є питання? Ми будемо раді почути від вас.'
          }
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>{t('contact.getInTouch')}</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('checkout.name')}</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={language === 'en' ? 'Your name' : "Ваше ім'я"} 
                            {...field} 
                            data-testid="input-contact-name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('checkout.email')}</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="your@email.com" 
                            {...field} 
                            data-testid="input-contact-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.message')}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={language === 'en' ? 'Your message...' : 'Ваше повідомлення...'}
                            className="min-h-[150px]"
                            {...field}
                            data-testid="input-contact-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full glow-orange"
                    size="lg"
                    disabled={contactMutation.isPending}
                    data-testid="button-send-message"
                  >
                    {contactMutation.isPending ? (
                      t('common.loading')
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        {t('contact.send')}
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Info & Map */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('contact.location')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Contact Details */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">
                      {language === 'en' ? 'Address' : 'Адреса'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {language === 'en'
                        ? '123 Heaven Street, Pizza City, PC 12345'
                        : 'вул. Небесна, 123, Київ, 01001'
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">
                      {language === 'en' ? 'Phone' : 'Телефон'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      +380 XX XXX XXXX
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">
                      hello@sliceofheaven.pizza
                    </p>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">
                  {language === 'en' ? 'Map location' : 'Карта розташування'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
