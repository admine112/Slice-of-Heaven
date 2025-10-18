import { useI18n } from '@/lib/i18n';
import { Link } from 'wouter';
import logoImage from '@assets/generated_images/Pizza_logo_icon_orange_58b11467.png';

export function Footer() {
  const { language, t } = useI18n();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t border-border mt-auto">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <img src={logoImage} alt="Slice of Heaven" className="h-10 w-10" />
              <span className="font-heading text-2xl font-bold text-primary">
                SLICE OF HEAVEN
              </span>
            </Link>
            <p className="text-muted-foreground mb-4">
              {t('footer.description')}
            </p>
            <p className="text-sm text-muted-foreground">
              {t('footer.slogan')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-bold mb-4">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.menu')}
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.calculator')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-lg font-bold mb-4">
              {t('footer.contact')}
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-lg">📍</span>
                <span className="text-sm">
                  {t('footer.address')}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-lg">📞</span>
                <span className="text-sm">+380 XX XXX XXXX</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-lg">✉️</span>
                <span className="text-sm">hello@sliceofheaven.pizza</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-lg">🕐</span>
                <span className="text-sm">
                  {t('footer.hours')}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Slice of Heaven. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
