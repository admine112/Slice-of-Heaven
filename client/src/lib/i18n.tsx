import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ua';

interface Translations {
  [key: string]: {
    en: string;
    ua: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.home': { en: 'Home', ua: 'Головна' },
  'nav.menu': { en: 'Menu', ua: 'Меню' },
  'nav.calculator': { en: 'Order Calculator', ua: 'Калькулятор Замовлення' },
  'nav.about': { en: 'About Us', ua: 'Про Нас' },
  'nav.contact': { en: 'Contact', ua: 'Контакти' },
  'nav.admin': { en: 'Admin', ua: 'Адмін' },
  
  // Hero
  'hero.slogan': { en: 'Taste the Sky. One Slice at a Time.', ua: 'Скуштуй небо. По шматочку.' },
  'hero.orderNow': { en: 'Order Now', ua: 'Замовити зараз' },
  'hero.viewMenu': { en: 'View Menu', ua: 'Переглянути меню' },
  
  // Menu
  'menu.title': { en: 'Our Pizza Menu', ua: 'Наше меню піци' },
  'menu.classic': { en: 'Classic', ua: 'Класична' },
  'menu.spicy': { en: 'Spicy', ua: 'Гостра' },
  'menu.vegetarian': { en: 'Vegetarian', ua: 'Вегетаріанська' },
  'menu.dessert': { en: 'Dessert', ua: 'Десертна' },
  'menu.addToCalculator': { en: 'Add to Calculator', ua: 'Додати до калькулятора' },
  'menu.notAvailable': { en: 'Not Available', ua: 'Недоступна' },
  
  // Calculator
  'calc.title': { en: 'Order Calculator', ua: 'Калькулятор Замовлення' },
  'calc.selectPizza': { en: 'Select Your Pizza', ua: 'Оберіть вашу піцу' },
  'calc.selectSize': { en: 'Select Size', ua: 'Оберіть розмір' },
  'calc.small': { en: 'Small', ua: 'Маленька' },
  'calc.medium': { en: 'Medium', ua: 'Середня' },
  'calc.large': { en: 'Large', ua: 'Велика' },
  'calc.extraIngredients': { en: 'Extra Ingredients', ua: 'Додаткові інгредієнти' },
  'calc.total': { en: 'Total', ua: 'Разом' },
  'calc.placeOrder': { en: 'Place Order', ua: 'Оформити замовлення' },
  'calc.selectPizzaFirst': { en: 'Please select a pizza first', ua: 'Будь ласка, спочатку оберіть піцу' },
  
  // Checkout
  'checkout.title': { en: 'Complete Your Order', ua: 'Завершити замовлення' },
  'checkout.orderSummary': { en: 'Order Summary', ua: 'Підсумок замовлення' },
  'checkout.customerInfo': { en: 'Customer Information', ua: 'Інформація про клієнта' },
  'checkout.name': { en: 'Full Name', ua: "Повне ім'я" },
  'checkout.email': { en: 'Email', ua: 'Електронна пошта' },
  'checkout.phone': { en: 'Phone Number', ua: 'Номер телефону' },
  'checkout.address': { en: 'Delivery Address', ua: 'Адреса доставки' },
  'checkout.submit': { en: 'Confirm Order', ua: 'Підтвердити замовлення' },
  'checkout.success': { en: 'Order placed successfully!', ua: 'Замовлення успішно оформлене!' },
  
  // About
  'about.title': { en: 'About Slice of Heaven', ua: 'Про Slice of Heaven' },
  'about.subtitle': { en: 'Every slice is a little piece of heaven', ua: 'Кожен шматок — це маленький рай' },
  'about.story': { 
    en: 'At Slice of Heaven, we believe that pizza is more than just food—it\'s an experience. Every pizza we craft is a masterpiece, combining premium ingredients with authentic recipes and a touch of heavenly magic.',
    ua: 'У Slice of Heaven ми віримо, що піца — це більше, ніж просто їжа, це досвід. Кожна піца, яку ми створюємо, є шедевром, що поєднує преміальні інгредієнти з автентичними рецептами та доторком небесної магії.'
  },
  
  // Contact
  'contact.title': { en: 'Contact Us', ua: "Зв'яжіться з нами" },
  'contact.getInTouch': { en: 'Get In Touch', ua: "Зв'язатися" },
  'contact.message': { en: 'Your Message', ua: 'Ваше повідомлення' },
  'contact.send': { en: 'Send Message', ua: 'Надіслати' },
  'contact.success': { en: 'Message sent successfully!', ua: 'Повідомлення успішно надіслано!' },
  'contact.location': { en: 'Our Location', ua: 'Наше розташування' },
  
  // Admin
  'admin.title': { en: 'Admin Panel', ua: 'Панель адміністратора' },
  'admin.login': { en: 'Admin Login', ua: 'Вхід адміністратора' },
  'admin.username': { en: 'Username', ua: "Ім'я користувача" },
  'admin.password': { en: 'Password', ua: 'Пароль' },
  'admin.signin': { en: 'Sign In', ua: 'Увійти' },
  'admin.logout': { en: 'Logout', ua: 'Вийти' },
  'admin.managePizzas': { en: 'Manage Pizzas', ua: 'Керувати піцами' },
  'admin.addPizza': { en: 'Add New Pizza', ua: 'Додати нову піцу' },
  'admin.editPizza': { en: 'Edit Pizza', ua: 'Редагувати піцу' },
  'admin.deletePizza': { en: 'Delete Pizza', ua: 'Видалити піцу' },
  'admin.nameEn': { en: 'Name (English)', ua: 'Назва (Англійська)' },
  'admin.nameUa': { en: 'Name (Ukrainian)', ua: 'Назва (Українська)' },
  'admin.descEn': { en: 'Description (English)', ua: 'Опис (Англійська)' },
  'admin.descUa': { en: 'Description (Ukrainian)', ua: 'Опис (Українська)' },
  'admin.category': { en: 'Category', ua: 'Категорія' },
  'admin.price': { en: 'Price', ua: 'Ціна' },
  'admin.imageUrl': { en: 'Image URL', ua: 'URL зображення' },
  'admin.available': { en: 'Available', ua: 'Доступна' },
  'admin.save': { en: 'Save', ua: 'Зберегти' },
  'admin.cancel': { en: 'Cancel', ua: 'Скасувати' },
  
  // Common
  'common.loading': { en: 'Loading...', ua: 'Завантаження...' },
  'common.error': { en: 'Error', ua: 'Помилка' },
  'common.success': { en: 'Success', ua: 'Успіх' },
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'en' || saved === 'ua') ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
