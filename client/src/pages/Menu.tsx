import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ShoppingCart } from 'lucide-react';
import { useLocation } from 'wouter';
import type { Pizza } from '@shared/schema';

export default function Menu() {
  const { t, language } = useI18n();
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const { data: pizzas = [], isLoading } = useQuery<Pizza[]>({
    queryKey: ['/api/pizzas'],
  });

  const categories = [
    { value: 'all', label: language === 'en' ? 'All' : 'Всі' },
    { value: 'classic', label: t('menu.classic') },
    { value: 'spicy', label: t('menu.spicy') },
    { value: 'vegetarian', label: t('menu.vegetarian') },
    { value: 'dessert', label: t('menu.dessert') },
  ];

  const filteredPizzas = selectedCategory === 'all' 
    ? pizzas 
    : pizzas.filter(p => p.category === selectedCategory);

  const handleAddToCalculator = (pizza: Pizza) => {
    localStorage.setItem('selectedPizza', JSON.stringify(pizza));
    setLocation('/calculator');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4">
          {t('menu.title')}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {language === 'en' 
            ? 'Choose from our selection of handcrafted pizzas, made with premium ingredients'
            : 'Оберіть з нашого асортименту піц ручної роботи, приготованих з преміальних інгредієнтів'
          }
        </p>
      </div>

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
        <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5 h-auto">
          {categories.map((cat) => (
            <TabsTrigger 
              key={cat.value} 
              value={cat.value} 
              className="font-medium"
              data-testid={`tab-${cat.value}`}
            >
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Pizza Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPizzas.map((pizza) => (
          <Card 
            key={pizza.id} 
            className="overflow-hidden hover-elevate transition-all duration-300 group"
            data-testid={`card-pizza-${pizza.id}`}
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden bg-muted">
              <img 
                src={pizza.imageUrl} 
                alt={language === 'en' ? pizza.nameEn : pizza.nameUa}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Category Badge */}
              <Badge className="absolute top-3 left-3 capitalize">
                {pizza.category}
              </Badge>

              {/* Price Badge */}
              <Badge variant="default" className="absolute top-3 right-3 text-lg font-bold px-4 py-2 bg-primary shadow-lg">
                ${pizza.price}
              </Badge>

              {!pizza.available && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <Badge variant="destructive" className="text-sm">
                    {t('menu.notAvailable')}
                  </Badge>
                </div>
              )}
            </div>

            <CardHeader className="pb-3">
              <div className="flex justify-between items-start gap-2">
                <CardTitle className="font-heading text-xl flex-1">
                  {language === 'en' ? pizza.nameEn : pizza.nameUa}
                </CardTitle>
                <span className="text-2xl font-bold text-primary whitespace-nowrap">
                  ${pizza.price}
                </span>
              </div>
            </CardHeader>

            <CardContent className="pb-3">
              <CardDescription className="line-clamp-2">
                {language === 'en' ? pizza.descriptionEn : pizza.descriptionUa}
              </CardDescription>
            </CardContent>

            <CardFooter>
              <Button
                onClick={() => handleAddToCalculator(pizza)}
                disabled={!pizza.available}
                className="w-full group/btn"
                data-testid={`button-add-to-calc-${pizza.id}`}
              >
                <ShoppingCart className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                {t('menu.addToCalculator')}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredPizzas.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            {language === 'en' ? 'No pizzas in this category yet.' : 'Поки немає піц у цій категорії.'}
          </p>
        </div>
      )}
    </div>
  );
}
