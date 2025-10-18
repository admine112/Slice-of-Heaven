import { useI18n } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import heroImage from '@assets/generated_images/Pizza_hero_banner_background_e151f4db.png';

export default function Home() {
  const { t } = useI18n();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section 
        className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/70" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            SLICE OF HEAVEN
          </h1>
          
          <p className="font-serif text-xl md:text-2xl lg:text-3xl text-white/90 mb-8 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            {t('hero.slogan')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <Link href="/calculator">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 glow-orange group"
                data-testid="button-order-now"
              >
                {t('hero.orderNow')}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Link href="/menu">
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 border-2 border-primary text-primary hover:bg-primary/10 backdrop-blur-sm bg-background/20"
                data-testid="button-view-menu"
              >
                {t('hero.viewMenu')}
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative orange glow effect */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none" />
      </section>

      {/* Quick Features */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 hover-elevate rounded-lg transition-all duration-300">
              <div className="text-5xl mb-4">🍕</div>
              <h3 className="font-heading text-2xl font-bold mb-2">{t('home.premiumQuality')}</h3>
              <p className="text-muted-foreground">{t('home.premiumDesc')}</p>
            </div>
            
            <div className="text-center p-6 hover-elevate rounded-lg transition-all duration-300">
              <div className="text-5xl mb-4">🔥</div>
              <h3 className="font-heading text-2xl font-bold mb-2">{t('home.fireBaked')}</h3>
              <p className="text-muted-foreground">{t('home.fireBakedDesc')}</p>
            </div>
            
            <div className="text-center p-6 hover-elevate rounded-lg transition-all duration-300">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="font-heading text-2xl font-bold mb-2">{t('home.fastDelivery')}</h3>
              <p className="text-muted-foreground">{t('home.fastDeliveryDesc')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
