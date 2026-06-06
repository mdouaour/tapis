import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { Phone, Mail, MapPin, Globe, Image, Play } from 'lucide-react'

const WHATSAPP_NUMBER = '+213555555555'
const EMAIL = 'contact@tapis.dz'
const ADDRESS_AR = 'قسنطينة، الجزائر'
const ADDRESS_FR = 'Constantine, Algérie'

export function Footer({ locale }: { locale: 'ar' | 'fr' }) {
  const t = useTranslations()

  const year = new Date().getFullYear()

  const quickLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/categories', label: t('nav.categories') },
    { href: '/search', label: t('nav.search') },
    { href: '/admin', label: t('nav.admin') },
  ]

  return (
    <footer className="border-t border-border/60 bg-muted/30" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container-luxury py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="text-xl font-bold font-heading gold-gradient-text tracking-wide"
            >
              {locale === 'ar' ? 'تاپيس' : 'Tapis'}
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('footer.about_desc')}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center size-8 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors text-muted-foreground"
                aria-label="Facebook"
              >
                <Globe className="size-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center size-8 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors text-muted-foreground"
                aria-label="Instagram"
              >
                <Image className="size-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center size-8 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors text-muted-foreground"
                aria-label="YouTube"
              >
                <Play className="size-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold font-heading text-foreground uppercase tracking-wider">
              {t('footer.quick_links')}
            </h3>
            <nav className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold font-heading text-foreground uppercase tracking-wider">
              {t('footer.contact')}
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href={`tel:${WHATSAPP_NUMBER}`}
                className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                dir="ltr"
              >
                <Phone className="size-4 shrink-0" />
                <span>{WHATSAPP_NUMBER}</span>
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="size-4 shrink-0" />
                <span>{EMAIL}</span>
              </a>
              <span className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <MapPin className="size-4 shrink-0" />
                <span>{locale === 'ar' ? ADDRESS_AR : ADDRESS_FR}</span>
              </span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold font-heading text-foreground uppercase tracking-wider">
              {t('footer.payment_methods')}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {locale === 'ar'
                ? 'نقبل الدفع عند الاستلام (نقداً)'
                : 'Nous acceptons le paiement à la livraison (espèces)'}
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground">
                {locale === 'ar' ? 'نقداً' : 'Espèces'}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground">
                {locale === 'ar' ? ' CCP' : 'CCP'}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground">
                {locale === 'ar' ? 'بطاقة بنكية' : 'Carte Bancaire'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border/60">
        <div className="container-luxury flex flex-col items-center justify-between gap-2 py-5 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {year} Tapis. {t('footer.rights')}.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              {t('footer.privacy_policy')}
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
