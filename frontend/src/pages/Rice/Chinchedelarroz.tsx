import { AlertTriangle, Bug, Eye, ShieldCheck, SprayCan, Target, Wheat } from 'lucide-react';
import CropInfoPage from '../../components/global/CropInfoPage';
import img1 from '../../assets/img/Arroz/Chinche del arroz/Chinche-del-arroz1.webp';
import img2 from '../../assets/img/Arroz/Chinche del arroz/Chinche-del-arroz2.webp';
import img3 from '../../assets/img/Arroz/Chinche del arroz/Chinche del arroz3.webp';

const images = [img1, img2, img3];

const ChincheDelArroz = () => {
  return (
    <CropInfoPage
      eyebrow="Arroz - plaga en panícula"
      title="Chinche del arroz"
      subtitle="Plaga que afecta granos en formación y reduce calidad comercial durante etapas de espigado y llenado."
      carouselTitle="Galería de síntomas"
      carouselDescription="Referencias visuales de daño por picado en grano y presencia de chinche sobre panículas."
      images={images}
      imageAltPrefix="Chinche del arroz"
      infoTitle="Información técnica"
      summaryTitle="Resumen de vigilancia"
      summaryDescription="Aspectos prácticos para reconocer el ataque, estimar severidad y definir acciones de control oportuno."
      statsTitle="Indicadores de daño"
      benefitsTitle="Síntomas observables"
      cultivationTitle="Manejo recomendado"
      overviewDescription="El daño económico se concentra en fase reproductiva del arroz, por lo que la vigilancia en panículas es esencial para evitar mermas de calidad."
      overviewSections={[
        {
          icon: Bug,
          title: 'Comportamiento de la plaga',
          paragraphs: [
            'Ninfas y adultos se alimentan del contenido del grano durante llenado.',
            'La movilidad entre lotes cercanos favorece focos rápidos en zonas de alta oferta alimenticia.',
          ],
        },
        {
          icon: Wheat,
          title: 'Impacto productivo',
          paragraphs: [
            'La succión reduce peso y calidad del grano, con incremento de manchas y deformaciones.',
            'En ataques intensos disminuye valor comercial y viabilidad de semilla.',
          ],
        },
        {
          icon: Eye,
          title: 'Monitoreo de campo',
          paragraphs: [
            'Priorizar observación en espigado y fase lechosa, con muestreos periódicos por sección.',
            'Registrar presencia por panícula para detectar tendencia de crecimiento poblacional.',
          ],
        },
        {
          icon: AlertTriangle,
          title: 'Escenarios de mayor riesgo',
          paragraphs: [
            'Malezas gramíneas en bordes y canales sin limpieza sostienen poblaciones activas.',
            'Siembras escalonadas prolongan disponibilidad de alimento y favorecen persistencia.',
          ],
        },
      ]}
      stats={[
        {
          value: 'Reproductiva',
          label: 'Fase más sensible',
          note: 'El mayor daño se presenta durante llenado de grano y maduración inicial.',
        },
        {
          value: 'Alto',
          label: 'Impacto en calidad',
          note: 'Incrementa presencia de granos vanos, manchados o de menor peso comercial.',
        },
        {
          value: 'Puntual',
          label: 'Sitio de acción',
          note: 'La panícula es el principal punto de evaluación para decisiones de control.',
        },
      ]}
      benefits={[
        {
          icon: Target,
          title: 'Punteado de grano',
          description: 'Marcas por alimentación que deterioran apariencia y valor final del arroz.',
        },
        {
          icon: AlertTriangle,
          title: 'Grano vano',
          description: 'Menor llenado por succión en etapas críticas de formación de grano.',
        },
        {
          icon: Eye,
          title: 'Presencia en panícula',
          description: 'Adultos y ninfas visibles durante horas frescas sobre panojas expuestas.',
        },
      ]}
      cultivation={[
        {
          icon: ShieldCheck,
          title: 'Saneamiento del lote',
          description: 'Controlar malezas hospederas en bordes y canales para bajar reinfestación.',
        },
        {
          icon: Eye,
          title: 'Monitoreo por umbral',
          description: 'Definir frecuencia de muestreo y acción según nivel poblacional observado.',
        },
        {
          icon: SprayCan,
          title: 'Intervención dirigida',
          description: 'Aplicar control cuando se alcance umbral, ajustando momento y cobertura en panículas.',
        },
      ]}
      theme={{
        pageGradient: 'from-emerald-50 via-white to-lime-50',
        heroGradient: 'from-emerald-800 via-lime-700 to-green-500',
        accentBorder: 'border-lime-200',
        accentMutedBg: 'bg-lime-100',
        accentMutedText: 'text-lime-700',
        accentStrongText: 'text-emerald-950',
        sectionTint: 'from-lime-50 to-emerald-50',
        buttonClass: 'bg-lime-600 hover:bg-lime-700',
      }}
    />
  );
};

export default ChincheDelArroz;
