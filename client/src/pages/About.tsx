import { useI18n } from '@/lib/i18n';
import aboutImage from '@assets/generated_images/Pizza_cloud_heaven_illustration_2f7fd147.png';

export default function About() {
  const { t, language } = useI18n();

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4">
          {t('about.title')}
        </h1>
        <p className="font-serif text-2xl md:text-3xl text-primary max-w-3xl mx-auto">
          {t('about.subtitle')}
        </p>
      </div>

      {/* Hero Image */}
      <div className="max-w-5xl mx-auto mb-16">
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src={aboutImage}
            alt="Pizza in the clouds"
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Story */}
      <div className="max-w-3xl mx-auto mb-16">
        <p className="text-lg leading-relaxed text-foreground/90 mb-6">
          {t('about.story')}
        </p>
        <p className="text-lg leading-relaxed text-foreground/90">
          {language === 'en'
            ? 'Our journey began with a simple dream: to create the perfect pizza that brings joy to every bite. Using only the finest ingredients sourced from local farms and authentic Italian recipes passed down through generations, we\'ve created a menu that celebrates the art of pizza making.'
            : 'Наша подорож почалася з простої мрії: створити ідеальну піцу, яка приносить радість з кожним шматочком. Використовуючи лише найкращі інгредієнти з місцевих ферм та автентичні італійські рецепти, передані через покоління, ми створили меню, яке святкує мистецтво приготування піци.'
          }
        </p>
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="text-center p-8 rounded-lg hover-elevate transition-all">
          <div className="text-5xl mb-4">✨</div>
          <h3 className="font-heading text-2xl font-bold mb-3">
            {language === 'en' ? 'Quality First' : 'Якість понад усе'}
          </h3>
          <p className="text-muted-foreground">
            {language === 'en'
              ? 'We never compromise on ingredients. Only the best makes it to your plate.'
              : 'Ми ніколи не йдемо на компроміс щодо інгредієнтів. Тільки найкраще потрапляє на вашу тарілку.'
            }
          </p>
        </div>

        <div className="text-center p-8 rounded-lg hover-elevate transition-all">
          <div className="text-5xl mb-4">🔥</div>
          <h3 className="font-heading text-2xl font-bold mb-3">
            {language === 'en' ? 'Authentic Craft' : 'Автентична майстерність'}
          </h3>
          <p className="text-muted-foreground">
            {language === 'en'
              ? 'Traditional methods meet modern innovation in every pizza we make.'
              : 'Традиційні методи поєднуються з сучасними інноваціями в кожній піці, яку ми готуємо.'
            }
          </p>
        </div>

        <div className="text-center p-8 rounded-lg hover-elevate transition-all">
          <div className="text-5xl mb-4">❤️</div>
          <h3 className="font-heading text-2xl font-bold mb-3">
            {language === 'en' ? 'Made with Love' : 'Зроблено з любов\'ю'}
          </h3>
          <p className="text-muted-foreground">
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
