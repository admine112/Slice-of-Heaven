import { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { insertOrderSchema } from '@shared/schema';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';
import { CheckCircle } from 'lucide-react';

type OrderFormData = z.infer<typeof insertOrderSchema>;

export default function Checkout() {
  const { t, language } = useI18n();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('orderData');
    if (saved) {
      setOrderData(JSON.parse(saved));
    } else {
      setLocation('/calculator');
    }
  }, [setLocation]);

  const form = useForm<OrderFormData>({
    resolver: zodResolver(insertOrderSchema),
    defaultValues: {
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      deliveryAddress: '',
      pizzaId: orderData?.pizza?.id || 0,
      size: orderData?.size || 'medium',
      extraIngredients: orderData?.ingredients?.map((i: any) => String(i.id)) || [],
      totalPrice: String(orderData?.total || 0),
    },
  });

  useEffect(() => {
    if (orderData) {
      form.setValue('pizzaId', orderData.pizza.id);
      form.setValue('size', orderData.size);
      form.setValue('extraIngredients', orderData.ingredients.map((i: any) => String(i.id)));
      form.setValue('totalPrice', String(orderData.total.toFixed(2)));
    }
  }, [orderData, form]);

  const createOrderMutation = useMutation({
    mutationFn: (data: OrderFormData) => apiRequest('POST', '/api/orders', data),
    onSuccess: () => {
      toast({
        title: t('common.success'),
        description: t('checkout.success'),
      });
      localStorage.removeItem('orderData');
      setTimeout(() => setLocation('/'), 2000);
    },
    onError: () => {
      toast({
        title: t('common.error'),
        description: language === 'en' ? 'Failed to place order' : 'Не вдалося оформити замовлення',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: OrderFormData) => {
    createOrderMutation.mutate(data);
  };

  if (!orderData) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4">
            {t('checkout.title')}
          </h1>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{t('checkout.orderSummary')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <img
                    src={orderData.pizza.imageUrl}
                    alt={language === 'en' ? orderData.pizza.nameEn : orderData.pizza.nameUa}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">
                      {language === 'en' ? orderData.pizza.nameEn : orderData.pizza.nameUa}
                    </h3>
                    <p className="text-sm text-muted-foreground capitalize">
                      {t(`calc.${orderData.size}`)}
                    </p>
                  </div>
                </div>

                {orderData.ingredients.length > 0 && (
                  <div className="pt-2 border-t">
                    <p className="text-sm font-medium mb-2">
                      {t('calc.extraIngredients')}:
                    </p>
                    <ul className="text-sm space-y-1">
                      {orderData.ingredients.map((ing: any) => (
                        <li key={ing.id} className="flex justify-between text-muted-foreground">
                          <span>{language === 'en' ? ing.nameEn : ing.nameUa}</span>
                          <span>+${ing.price}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">{t('calc.total')}:</span>
                    <span className="text-2xl font-bold text-primary">
                      ${orderData.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customer Info Form */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>{t('checkout.customerInfo')}</CardTitle>
                <CardDescription>
                  {language === 'en'
                    ? 'Please provide your details for delivery'
                    : 'Будь ласка, надайте свої дані для доставки'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="customerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('checkout.name')}</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder={language === 'en' ? 'John Doe' : 'Іван Петренко'} 
                              {...field} 
                              data-testid="input-customer-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="customerEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('checkout.email')}</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="john@example.com" 
                              {...field} 
                              data-testid="input-customer-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="customerPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('checkout.phone')}</FormLabel>
                          <FormControl>
                            <Input 
                              type="tel" 
                              placeholder="+380 XX XXX XXXX" 
                              {...field} 
                              data-testid="input-customer-phone"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="deliveryAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('checkout.address')}</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder={language === 'en' ? '123 Main St, Apt 4B' : 'вул. Хрещатик, 1, кв. 10'} 
                              {...field} 
                              data-testid="input-delivery-address"
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
                      disabled={createOrderMutation.isPending}
                      data-testid="button-confirm-order"
                    >
                      {createOrderMutation.isPending ? (
                        t('common.loading')
                      ) : (
                        <>
                          <CheckCircle className="mr-2 h-5 w-5" />
                          {t('checkout.submit')}
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
