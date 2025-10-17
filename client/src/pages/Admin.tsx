import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useI18n } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Edit, Trash2, Plus, LogOut } from 'lucide-react';
import type { Pizza, InsertPizza } from '@shared/schema';

export default function Admin() {
  const { t, language } = useI18n();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [editingPizza, setEditingPizza] = useState<Pizza | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<InsertPizza>>({
    nameEn: '',
    nameUa: '',
    descriptionEn: '',
    descriptionUa: '',
    category: 'classic',
    price: '',
    imageUrl: '',
    available: true,
  });

  const { data: pizzas = [], isLoading } = useQuery<Pizza[]>({
    queryKey: ['/api/pizzas'],
    enabled: isLoggedIn,
  });

  const loginMutation = useMutation({
    mutationFn: (data: { username: string; password: string }) => 
      apiRequest('POST', '/api/admin/login', data),
    onSuccess: () => {
      setIsLoggedIn(true);
      toast({
        title: t('common.success'),
        description: language === 'en' ? 'Logged in successfully' : 'Успішний вхід',
      });
    },
    onError: () => {
      toast({
        title: t('common.error'),
        description: language === 'en' ? 'Invalid credentials' : 'Невірні дані входу',
        variant: 'destructive',
      });
    },
  });

  const createPizzaMutation = useMutation({
    mutationFn: (data: InsertPizza) => apiRequest('POST', '/api/pizzas', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/pizzas'] });
      toast({ title: t('common.success'), description: language === 'en' ? 'Pizza added' : 'Піцу додано' });
      setIsDialogOpen(false);
      resetForm();
    },
  });

  const updatePizzaMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: InsertPizza }) => 
      apiRequest('PUT', `/api/pizzas/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/pizzas'] });
      toast({ title: t('common.success'), description: language === 'en' ? 'Pizza updated' : 'Піцу оновлено' });
      setIsDialogOpen(false);
      resetForm();
    },
  });

  const deletePizzaMutation = useMutation({
    mutationFn: (id: number) => apiRequest('DELETE', `/api/pizzas/${id}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/pizzas'] });
      toast({ title: t('common.success'), description: language === 'en' ? 'Pizza deleted' : 'Піцу видалено' });
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ username, password });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = formData as InsertPizza;
    
    if (editingPizza) {
      updatePizzaMutation.mutate({ id: editingPizza.id, data });
    } else {
      createPizzaMutation.mutate(data);
    }
  };

  const resetForm = () => {
    setFormData({
      nameEn: '',
      nameUa: '',
      descriptionEn: '',
      descriptionUa: '',
      category: 'classic',
      price: '',
      imageUrl: '',
      available: true,
    });
    setEditingPizza(null);
  };

  const openEditDialog = (pizza: Pizza) => {
    setEditingPizza(pizza);
    setFormData({
      nameEn: pizza.nameEn,
      nameUa: pizza.nameUa,
      descriptionEn: pizza.descriptionEn,
      descriptionUa: pizza.descriptionUa,
      category: pizza.category,
      price: pizza.price,
      imageUrl: pizza.imageUrl,
      available: pizza.available,
    });
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-heading">{t('admin.login')}</CardTitle>
              <CardDescription>
                {language === 'en' ? 'Enter your credentials to access the admin panel' : 'Введіть свої дані для доступу до панелі адміністратора'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">{t('admin.username')}</Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    data-testid="input-admin-username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">{t('admin.password')}</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    data-testid="input-admin-password"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loginMutation.isPending}
                  data-testid="button-admin-signin"
                >
                  {loginMutation.isPending ? t('common.loading') : t('admin.signin')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-heading text-4xl md:text-5xl font-bold">{t('admin.title')}</h1>
        <div className="flex gap-2">
          <Button onClick={openAddDialog} className="glow-orange" data-testid="button-add-pizza">
            <Plus className="mr-2 h-4 w-4" />
            {t('admin.addPizza')}
          </Button>
          <Button variant="outline" onClick={() => setIsLoggedIn(false)} data-testid="button-admin-logout">
            <LogOut className="mr-2 h-4 w-4" />
            {t('admin.logout')}
          </Button>
        </div>
      </div>

      {/* Pizzas List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pizzas.map((pizza) => (
          <Card key={pizza.id} className="overflow-hidden" data-testid={`admin-card-pizza-${pizza.id}`}>
            <img src={pizza.imageUrl} alt={pizza.nameEn} className="w-full h-48 object-cover" />
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span>{pizza.nameEn}</span>
                <span className="text-primary">${pizza.price}</span>
              </CardTitle>
              <CardDescription className="line-clamp-2">{pizza.descriptionEn}</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <div className="space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openEditDialog(pizza)}
                  data-testid={`button-edit-pizza-${pizza.id}`}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deletePizzaMutation.mutate(pizza.id)}
                  data-testid={`button-delete-pizza-${pizza.id}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <span className={`text-sm ${pizza.available ? 'text-green-600' : 'text-red-600'}`}>
                {pizza.available ? (language === 'en' ? 'Available' : 'Доступна') : (language === 'en' ? 'Unavailable' : 'Недоступна')}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPizza ? t('admin.editPizza') : t('admin.addPizza')}
            </DialogTitle>
            <DialogDescription>
              {language === 'en' ? 'Fill in the pizza details below' : 'Заповніть деталі піци нижче'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t('admin.nameEn')}</Label>
                <Input
                  value={formData.nameEn}
                  onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                  required
                  data-testid="input-pizza-name-en"
                />
              </div>
              <div className="space-y-2">
                <Label>{t('admin.nameUa')}</Label>
                <Input
                  value={formData.nameUa}
                  onChange={(e) => setFormData({ ...formData, nameUa: e.target.value })}
                  required
                  data-testid="input-pizza-name-ua"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t('admin.descEn')}</Label>
              <Textarea
                value={formData.descriptionEn}
                onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                required
                data-testid="input-pizza-desc-en"
              />
            </div>

            <div className="space-y-2">
              <Label>{t('admin.descUa')}</Label>
              <Textarea
                value={formData.descriptionUa}
                onChange={(e) => setFormData({ ...formData, descriptionUa: e.target.value })}
                required
                data-testid="input-pizza-desc-ua"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t('admin.category')}</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(v) => setFormData({ ...formData, category: v })}
                >
                  <SelectTrigger data-testid="select-pizza-category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="classic">{t('menu.classic')}</SelectItem>
                    <SelectItem value="spicy">{t('menu.spicy')}</SelectItem>
                    <SelectItem value="vegetarian">{t('menu.vegetarian')}</SelectItem>
                    <SelectItem value="dessert">{t('menu.dessert')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{t('admin.price')}</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  data-testid="input-pizza-price"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t('admin.imageUrl')}</Label>
              <Input
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                required
                placeholder="https://..."
                data-testid="input-pizza-image-url"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="available"
                checked={formData.available}
                onCheckedChange={(checked) => setFormData({ ...formData, available: checked as boolean })}
                data-testid="checkbox-pizza-available"
              />
              <Label htmlFor="available" className="cursor-pointer">{t('admin.available')}</Label>
            </div>

            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                {t('admin.cancel')}
              </Button>
              <Button type="submit" className="glow-orange" data-testid="button-save-pizza">
                {t('admin.save')}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
