import { useI18n } from '@/lib/i18n';
import aboutImage from '@assets/generated_images/Pizza_cloud_heaven_illustration_2f7fd147.png';

export default function About() {
  const { t, language } = useI18n();

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-16">
      {/* Header */}
      <div className="text-center mb-8 md:mb-16">
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 leading-tight">
          {t('about.title')}
        </h1>
        <p className="font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl text-primary max-w-3xl mx-auto px-2">
          {t('about.subtitle')}
        </p>
      </div>

      {/* Hero Image */}
      <div className="max-w-5xl mx-auto mb-8 md:mb-16">
        <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-lg">
          <img
            src={aboutImage}
            alt="Pizza in the clouds"
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Story */}
      <div className="max-w-3xl mx-auto mb-8 md:mb-16 px-2">
        <p className="text-base md:text-lg leading-relaxed text-foreground/90 mb-4 md:mb-6">
          {t('about.story')}
        </p>
        <p className="text-base md:text-lg leading-relaxed text-foreground/90">
          {language === 'en'
            ? 'Our journey began with a simple dream: to create the perfect pizza that brings joy to every bite. Using only the finest ingredients sourced from local farms and authentic Italian recipes passed down through generations, we\'ve created a menu that celebrates the art of pizza making.'
            : 'Наша подорож почалася з простої мрії: створити ідеальну піцу, яка приносить радість з кожним шматочком. Використовуючи лише найкращі інгредієнти з місцевих ферм та автентичні італійські рецепти, передані через покоління, ми створили меню, яке святкує мистецтво приготування піци.'
          }
        </p>
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto px-2">
        <div className="text-center p-6 md:p-8 rounded-lg hover-elevate transition-all bg-card">
          <div className="text-4xl md:text-5xl mb-3 md:mb-4">✨</div>
          <h3 className="font-heading text-xl md:text-2xl font-bold mb-2 md:mb-3">
            {language === 'en' ? 'Quality First' : 'Якість понад усе'}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground">
            {language === 'en'
              ? 'We never compromise on ingredients. Only the best makes it to your plate.'
              : 'Ми ніколи не йдемо на компроміс щодо інгредієнтів. Тільки найкраще потрапляє на вашу тарілку.'
            }
          </p>
        </div>

        <div className="text-center p-6 md:p-8 rounded-lg hover-elevate transition-all bg-card">
          <div className="text-4xl md:text-5xl mb-3 md:mb-4">🔥</div>
          <h3 className="font-heading text-xl md:text-2xl font-bold mb-2 md:mb-3">
            {language === 'en' ? 'Authentic Craft' : 'Автентична майстерність'}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground">
            {language === 'en'
              ? 'Traditional methods meet modern innovation in every pizza we make.'
              : 'Традиційні методи поєднуються з сучасними інноваціями в кожній піці, яку ми готуємо.'
            }
          </p>
        </div>

        <div className="text-center p-6 md:p-8 rounded-lg hover-elevate transition-all bg-card">
          <div className="text-4xl md:text-5xl mb-3 md:mb-4">❤️</div>
          <h3 className="font-heading text-xl md:text-2xl font-bold mb-2 md:mb-3">
            {language === 'en' ? 'Made with Love' : 'Зроблено з любов\'ю'}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground">
            {language === 'en'
              ? 'Every pizza is crafted with passion and care, just for you.'
              : 'Кожна піца готується з пристрастю та турботою, спеціально для вас.'
            }
          </p>
        </div>
      </div>
    </div>
  );
}
