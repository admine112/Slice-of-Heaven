import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import logoImage from '@assets/generated_images/Pizza_logo_icon_orange_58b11467.png';

export function Header() {
  const [, setLocation] = useLocation();
  const [location] = useLocation();
  const { language, setLanguage, t } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                  language === 'en'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                data-testid="button-language-en"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ua')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                  language === 'ua'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                data-testid="button-language-ua"
              >
                UA
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
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
