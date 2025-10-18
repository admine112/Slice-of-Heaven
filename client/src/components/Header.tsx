import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import logoImage from '@assets/generated_images/Pizza_logo_icon_orange_58b11467.png';

export function Header() {
  const [, setLocation] = useLocation();
  const [location] = useLocation();
  const { language, setLanguage, t } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/menu', label: t('nav.menu') },
    { path: '/calculator', label: t('nav.calculator') },
    { path: '/about', label: t('nav.about') },
    { path: '/contact', label: t('nav.contact') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover-elevate rounded-lg px-2 py-1 -ml-2">
            <img src={logoImage} alt="Slice of Heaven" className="h-10 w-10" />
            <span className="font-heading text-2xl font-bold text-primary">
              SLICE OF HEAVEN
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant={location === item.path ? 'default' : 'ghost'}
                  className="font-medium"
                  data-testid={`link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Language Switcher + Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1 shadow-sm border border-border">
              <button
                onClick={() => setLanguage('en')}
                className={`px-4 py-2 text-sm font-bold rounded-md transition-all duration-200 ${
                  language === 'en'
                    ? 'bg-primary text-primary-foreground shadow-md scale-105'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background'
                }`}
                data-testid="button-language-en"
                title="Switch to English"
              >
                🇬🇧 EN
              </button>
              <button
                onClick={() => setLanguage('ua')}
                className={`px-4 py-2 text-sm font-bold rounded-md transition-all duration-200 ${
                  language === 'ua'
                    ? 'bg-primary text-primary-foreground shadow-md scale-105'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background'
                }`}
                data-testid="button-language-ua"
                title="Перемкнути на українську"
              >
                🇺🇦 UA
              </button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border/40">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={location === item.path ? 'default' : 'ghost'}
                    className="w-full justify-start font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid={`mobile-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
              
              {/* Mobile Language Switcher */}
              <div className="mt-4 pt-4 border-t border-border/40">
                <p className="text-xs text-muted-foreground mb-2 px-3">
                  {language === 'en' ? 'Language / Мова' : 'Мова / Language'}
                </p>
                <div className="flex gap-2 px-3">
                  <button
                    onClick={() => {
                      setLanguage('en');
                      setMobileMenuOpen(false);
                    }}
                    className={`flex-1 px-4 py-2 text-sm font-bold rounded-md transition-all ${
                      language === 'en'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    🇬🇧 English
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('ua');
                      setMobileMenuOpen(false);
                    }}
                    className={`flex-1 px-4 py-2 text-sm font-bold rounded-md transition-all ${
                      language === 'ua'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    🇺🇦 Українська
                  </button>
                </div>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
