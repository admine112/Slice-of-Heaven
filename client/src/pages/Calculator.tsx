import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, Pizza as PizzaIcon } from 'lucide-react';
import { useLocation } from 'wouter';
import type { Pizza, Ingredient } from '@shared/schema';

export default function Calculator() {
  const { t, language } = useI18n();
  const [, setLocation] = useLocation();
  
  const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);
  const [selectedSize, setSelectedSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [selectedIngredients, setSelectedIngredients] = useState<number[]>([]);

  const { data: pizzas = [] } = useQuery<Pizza[]>({
    queryKey: ['/api/pizzas'],
  });

  const { data: ingredients = [] } = useQuery<Ingredient[]>({
    queryKey: ['/api/ingredients'],
  });

  // Load pre-selected pizza from localStorage if coming from menu
  useEffect(() => {
    const savedPizza = localStorage.getItem('selectedPizza');
    if (savedPizza) {
      const pizza = JSON.parse(savedPizza);
      const fullPizza = pizzas.find(p => p.id === pizza.id);
      if (fullPizza) {
        setSelectedPizza(fullPizza);
      }
      localStorage.removeItem('selectedPizza');
    }
  }, [pizzas]);

  // Size multipliers
  const sizeMultipliers = {
    small: 0.8,
    medium: 1.0,
    large: 1.3,
  };

  // Calculate total price
  const calculateTotal = (): number => {
    if (!selectedPizza) return 0;
    
    let total = parseFloat(selectedPizza.price) * sizeMultipliers[selectedSize];
    
    selectedIngredients.forEach(ingId => {
      const ingredient = ingredients.find(i => i.id === ingId);
      if (ingredient) {
        total += parseFloat(ingredient.price);
      }
    });
    
    return total;
  };

  const handlePlaceOrder = () => {
    if (!selectedPizza) return;
    
    const orderData = {
      pizza: selectedPizza,
      size: selectedSize,
      ingredients: selectedIngredients.map(id => ingredients.find(i => i.id === id)).filter(Boolean),
      total: calculateTotal(),
    };
    
    localStorage.setItem('orderData', JSON.stringify(orderData));
    setLocation('/checkout');
  };

  const toggleIngredient = (ingredientId: number) => {
    setSelectedIngredients(prev =>
      prev.includes(ingredientId)
        ? prev.filter(id => id !== ingredientId)
        : [...prev, ingredientId]
    );
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4">
            {t('calc.title')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {language === 'en'
              ? 'Customize your perfect pizza and see the price update in real-time'
              : 'Налаштуйте свою ідеальну піцу та дивіться, як ціна оновлюється в реальному часі'
            }
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Configuration */}
          <div className="lg:col-span-2 space-y-6">
            {/* Select Pizza */}
            <Card data-testid="card-select-pizza">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PizzaIcon className="h-5 w-5 text-primary" />
                  {t('calc.selectPizza')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pizzas.filter(p => p.available).map((pizza) => (
                    <div
                      key={pizza.id}
                      onClick={() => setSelectedPizza(pizza)}
                      className={`cursor-pointer rounded-lg border-2 p-4 transition-all hover-elevate ${
                        selectedPizza?.id === pizza.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      data-testid={`option-pizza-${pizza.id}`}
                    >
                      <div className="flex gap-3">
                        <img
                          src={pizza.imageUrl}
                          alt={language === 'en' ? pizza.nameEn : pizza.nameUa}
                          className="w-16 h-16 rounded-md object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold truncate">
                            {language === 'en' ? pizza.nameEn : pizza.nameUa}
                          </h4>
                          <p className="text-sm text-muted-foreground">${pizza.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Select Size */}
            <Card data-testid="card-select-size">
              <CardHeader>
                <CardTitle>{t('calc.selectSize')}</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedSize} onValueChange={(v) => setSelectedSize(v as any)}>
                  <div className="grid grid-cols-3 gap-4">
                    {(['small', 'medium', 'large'] as const).map((size) => (
                      <div key={size} className="relative">
                        <RadioGroupItem
                          value={size}
                          id={size}
                          className="peer sr-only"
                          data-testid={`radio-size-${size}`}
                        />
                        <Label
                          htmlFor={size}
                          className="flex flex-col items-center justify-center rounded-lg border-2 border-border p-4 hover-elevate cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all"
                        >
                          <span className="text-3xl mb-2">
                            {size === 'small' ? '🍕' : size === 'medium' ? '🍕🍕' : '🍕🍕🍕'}
                          </span>
                          <span className="font-semibold capitalize">{t(`calc.${size}`)}</span>
                          <span className="text-sm text-muted-foreground">
                            {size === 'small' && '8"'}
                            {size === 'medium' && '12"'}
                            {size === 'large' && '16"'}
                          </span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Extra Ingredients */}
            <Card data-testid="card-extra-ingredients">
              <CardHeader>
                <CardTitle>{t('calc.extraIngredients')}</CardTitle>
                <CardDescription>
                  {language === 'en'
                    ? 'Add extra toppings to customize your pizza'
                    : 'Додайте додаткові начинки, щоб налаштувати свою піцу'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {ingredients.filter(i => i.available).map((ingredient) => (
                    <div
                      key={ingredient.id}
                      className="flex items-center gap-3 p-3 rounded-lg border hover-elevate transition-all"
                    >
                      <Checkbox
                        id={`ingredient-${ingredient.id}`}
                        checked={selectedIngredients.includes(ingredient.id)}
                        onCheckedChange={() => toggleIngredient(ingredient.id)}
                        data-testid={`checkbox-ingredient-${ingredient.id}`}
                      />
                      <Label
                        htmlFor={`ingredient-${ingredient.id}`}
                        className="flex-1 cursor-pointer flex justify-between items-center"
                      >
                        <span>{language === 'en' ? ingredient.nameEn : ingredient.nameUa}</span>
                        <span className="text-sm text-muted-foreground">+${ingredient.price}</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20" data-testid="card-order-summary">
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Order Summary' : 'Підсумок замовлення'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedPizza ? (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {language === 'en' ? 'Pizza' : 'Піца'}:
                        </span>
                        <span className="font-medium">
                          {language === 'en' ? selectedPizza.nameEn : selectedPizza.nameUa}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {language === 'en' ? 'Size' : 'Розмір'}:
                        </span>
                        <span className="font-medium capitalize">{t(`calc.${selectedSize}`)}</span>
                      </div>
                      {selectedIngredients.length > 0 && (
                        <div className="pt-2 border-t">
                          <p className="text-sm text-muted-foreground mb-2">
                            {language === 'en' ? 'Extra toppings' : 'Додаткові начинки'}:
                          </p>
                          {selectedIngredients.map(ingId => {
                            const ing = ingredients.find(i => i.id === ingId);
                            return ing ? (
                              <div key={ing.id} className="flex justify-between text-sm pl-2">
                                <span>{language === 'en' ? ing.nameEn : ing.nameUa}</span>
                                <span>+${ing.price}</span>
                              </div>
                            ) : null;
                          })}
                        </div>
                      )}
                    </div>
                    
                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">{t('calc.total')}:</span>
                        <span className="text-2xl font-bold text-primary" data-testid="text-total-price">
                          ${calculateTotal().toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    {t('calc.selectPizzaFirst')}
                  </p>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handlePlaceOrder}
                  disabled={!selectedPizza}
                  className="w-full glow-orange group"
                  size="lg"
                  data-testid="button-place-order"
                >
                  {t('calc.placeOrder')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
