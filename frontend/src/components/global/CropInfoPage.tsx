import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import Carousel from './Carousel';

export interface CropInfoSection {
  icon: LucideIcon;
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface CropStat {
  value: string;
  label: string;
  note: string;
}

export interface CropSummaryCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface CropPageTheme {
  pageGradient: string;
  heroGradient: string;
  accentBorder: string;
  accentMutedBg: string;
  accentMutedText: string;
  accentStrongText: string;
  sectionTint: string;
  buttonClass: string;
}

interface CropInfoPageProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  carouselTitle: string;
  carouselDescription: string;
  images: string[];
  imageAltPrefix: string;
  overviewDescription: string;
  overviewSections: CropInfoSection[];
  stats: CropStat[];
  benefits: CropSummaryCard[];
  cultivation: CropSummaryCard[];
  theme: CropPageTheme;
  infoTitle?: string;
  summaryTitle?: string;
  summaryDescription?: string;
  statsTitle?: string;
  benefitsTitle?: string;
  cultivationTitle?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const CropInfoPage = ({
  eyebrow,
  title,
  subtitle,
  carouselTitle,
  carouselDescription,
  images,
  imageAltPrefix,
  overviewDescription,
  overviewSections,
  stats,
  benefits,
  cultivation,
  theme,
  infoTitle = 'Información general',
  summaryTitle = 'Resumen visual',
  summaryDescription = 'Los puntos clave quedan condensados en tarjetas para consultar lo esencial de forma rápida.',
  statsTitle = 'Perfil nutricional',
  benefitsTitle = 'Beneficios clave',
  cultivationTitle = 'Condiciones de cultivo',
}: CropInfoPageProps) => {
  return (
    <motion.div
      className={`min-h-screen bg-gradient-to-b ${theme.pageGradient}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.section
        variants={itemVariants}
        className={`relative overflow-hidden bg-gradient-to-br ${theme.heroGradient}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.22),_transparent_42%)]" />
        <div className="absolute -left-12 top-16 h-36 w-36 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-8 right-8 h-52 w-52 rounded-full bg-black/10 blur-3xl" />

        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-16 text-white md:px-6 md:py-20">
          <span className="inline-flex w-fit rounded-full border border-white/25 bg-white/12 px-4 py-1.5 text-sm font-medium backdrop-blur">
            {eyebrow}
          </span>
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl font-black tracking-tight md:text-6xl">{title}</h1>
            <p className="text-lg text-white/90 md:text-xl">{subtitle}</p>
          </div>
        </div>
      </motion.section>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-10 md:px-6 md:py-14">
        <motion.section variants={itemVariants} className="space-y-6">
          <div className="space-y-3">
            <h2 className={`text-3xl font-bold md:text-4xl ${theme.accentStrongText}`}>{carouselTitle}</h2>
            <p className="max-w-3xl text-base leading-7 text-slate-600 md:text-lg">{carouselDescription}</p>
          </div>

          <Carousel
            images={images}
            interval={4000}
            altPrefix={imageAltPrefix}
            className={`border ${theme.accentBorder}`}
            imageClassName="aspect-[16/9] md:aspect-[18/9]"
          />
        </motion.section>

        <motion.section variants={itemVariants} className="space-y-6">
          <div className="space-y-3">
            <h2 className={`text-3xl font-bold md:text-4xl ${theme.accentStrongText}`}>{infoTitle}</h2>
            <p className="max-w-3xl text-base leading-7 text-slate-600 md:text-lg">{overviewDescription}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {overviewSections.map((section) => {
              const Icon = section.icon;

              return (
                <motion.article
                  key={section.title}
                  variants={itemVariants}
                  className={`rounded-[2rem] border ${theme.accentBorder} bg-white/90 p-8 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.3)] backdrop-blur`}
                >
                  <div className={`mb-5 inline-flex rounded-2xl p-3 ${theme.accentMutedBg}`}>
                    <Icon className={`h-6 w-6 ${theme.accentMutedText}`} />
                  </div>
                  <div className="space-y-4">
                    <h3 className={`text-2xl font-bold ${theme.accentStrongText}`}>{section.title}</h3>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-base leading-7 text-slate-600">
                        {paragraph}
                      </p>
                    ))}
                    {section.bullets && (
                      <ul className="space-y-2 pt-1 text-sm leading-6 text-slate-600">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3">
                            <span className={`mt-2 h-2 w-2 rounded-full ${theme.accentMutedBg}`} />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.section>

        <motion.section
          variants={itemVariants}
          className={`rounded-[2rem] border ${theme.accentBorder} bg-gradient-to-br ${theme.sectionTint} p-8 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.25)] md:p-10`}
        >
          <div className="space-y-10">
            <div className="space-y-3">
              <h2 className={`text-3xl font-bold md:text-4xl ${theme.accentStrongText}`}>{summaryTitle}</h2>
              <p className="max-w-3xl text-base leading-7 text-slate-600 md:text-lg">{summaryDescription}</p>
            </div>

            <div className="space-y-5">
              <h3 className={`text-2xl font-bold ${theme.accentStrongText}`}>{statsTitle}</h3>
              <div className="grid gap-4 md:grid-cols-3">
                {stats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    variants={itemVariants}
                    className={`rounded-[1.75rem] border ${theme.accentBorder} bg-white p-6 shadow-sm`}
                  >
                    <p className={`text-3xl font-black md:text-4xl ${theme.accentStrongText}`}>{stat.value}</p>
                    <p className="mt-3 text-lg font-semibold text-slate-800">{stat.label}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{stat.note}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <h3 className={`text-2xl font-bold ${theme.accentStrongText}`}>{benefitsTitle}</h3>
              <div className="grid gap-4 md:grid-cols-3">
                {benefits.map((card) => {
                  const Icon = card.icon;

                  return (
                    <motion.div
                      key={card.title}
                      variants={itemVariants}
                      className={`rounded-[1.75rem] border ${theme.accentBorder} bg-white p-6 shadow-sm`}
                    >
                      <div className={`mb-4 inline-flex rounded-2xl p-3 ${theme.accentMutedBg}`}>
                        <Icon className={`h-5 w-5 ${theme.accentMutedText}`} />
                      </div>
                      <h4 className="text-xl font-bold text-slate-800">{card.title}</h4>
                      <p className="mt-3 text-sm leading-6 text-slate-600">{card.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-5">
              <h3 className={`text-2xl font-bold ${theme.accentStrongText}`}>{cultivationTitle}</h3>
              <div className="grid gap-4 md:grid-cols-3">
                {cultivation.map((card) => {
                  const Icon = card.icon;

                  return (
                    <motion.div
                      key={card.title}
                      variants={itemVariants}
                      className={`rounded-[1.75rem] border ${theme.accentBorder} bg-white p-6 shadow-sm`}
                    >
                      <div className={`mb-4 inline-flex rounded-2xl p-3 ${theme.accentMutedBg}`}>
                        <Icon className={`h-5 w-5 ${theme.accentMutedText}`} />
                      </div>
                      <h4 className="text-xl font-bold text-slate-800">{card.title}</h4>
                      <p className="mt-3 text-sm leading-6 text-slate-600">{card.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section variants={itemVariants} className="pb-4 text-center">
          <Link
            to="/"
            className={`inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-base font-semibold text-white shadow-lg transition ${theme.buttonClass}`}
          >
            <ArrowLeft className="h-5 w-5" />
            Volver al inicio
          </Link>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default CropInfoPage;
