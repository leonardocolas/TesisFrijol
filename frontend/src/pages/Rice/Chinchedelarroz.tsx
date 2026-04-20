import { AlertTriangle, Bug, Eye, ShieldCheck, SprayCan, Target, Wheat } from 'lucide-react';
import CropInfoPage from '../../components/global/CropInfoPage';
import img1 from '../../assets/img/Arroz/Chinche del arroz/Chinche-del-arroz1.webp';
import img2 from '../../assets/img/Arroz/Chinche del arroz/Chinche-del-arroz2.webp';
import img3 from '../../assets/img/Arroz/Chinche del arroz/Chinche del arroz3.webp';

const images = [img1, img2, img3];

const ChincheDelArroz = () => {
  return (
    <CropInfoPage
      eyebrow="Arroz - plaga en panicula"
      title="Chinche del arroz"
      subtitle="Plaga que afecta granos en formacion y reduce calidad comercial durante etapas de espigado y llenado."
      carouselTitle="Galeria de sintomas"
      carouselDescription="Referencias visuales de dano por picado en grano y presencia de chinche sobre paniculas."
      images={images}
      imageAltPrefix="Chinche del arroz"
      infoTitle="Informacion tecnica"
      summaryTitle="Resumen de vigilancia"
      summaryDescription="Aspectos practicos para reconocer el ataque, estimar severidad y definir acciones de control oportuno."
      statsTitle="Indicadores de dano"
      benefitsTitle="Sintomas observables"
      cultivationTitle="Manejo recomendado"
      overviewDescription="El dano economico se concentra en fase reproductiva del arroz, por lo que la vigilancia en paniculas es esencial para evitar mermas de calidad."
      overviewSections={[
        {
          icon: Bug,
          title: 'Comportamiento de la plaga',
          paragraphs: [
            'Ninfas y adultos se alimentan del contenido del grano durante llenado.',
            'La movilidad entre lotes cercanos favorece focos rapidos en zonas de alta oferta alimenticia.',
          ],
        },
        {
          icon: Wheat,
          title: 'Impacto productivo',
          paragraphs: [
            'La succion reduce peso y calidad del grano, con incremento de manchas y deformaciones.',
            'En ataques intensos disminuye valor comercial y viabilidad de semilla.',
          ],
        },
        {
          icon: Eye,
          title: 'Monitoreo de campo',
          paragraphs: [
            'Priorizar observacion en espigado y fase lechosa, con muestreos periodicos por seccion.',
            'Registrar presencia por panicula para detectar tendencia de crecimiento poblacional.',
          ],
        },
        {
          icon: AlertTriangle,
          title: 'Escenarios de mayor riesgo',
          paragraphs: [
            'Malezas graminias en bordes y canales sin limpieza sostienen poblaciones activas.',
            'Siembras escalonadas prolongan disponibilidad de alimento y favorecen persistencia.',
          ],
        },
      ]}
      stats={[
        {
          value: 'Reproductiva',
          label: 'Fase mas sensible',
          note: 'El mayor dano se presenta durante llenado de grano y maduracion inicial.',
        },
        {
          value: 'Alto',
          label: 'Impacto en calidad',
          note: 'Incrementa presencia de granos vanos, manchados o de menor peso comercial.',
        },
        {
          value: 'Puntual',
          label: 'Sitio de accion',
          note: 'La panicula es el principal punto de evaluacion para decisiones de control.',
        },
      ]}
      benefits={[
        {
          icon: Target,
          title: 'Punteado de grano',
          description: 'Marcas por alimentacion que deterioran apariencia y valor final del arroz.',
        },
        {
          icon: AlertTriangle,
          title: 'Grano vano',
          description: 'Menor llenado por succion en etapas criticas de formacion de grano.',
        },
        {
          icon: Eye,
          title: 'Presencia en panicula',
          description: 'Adultos y ninfas visibles durante horas frescas sobre panojas expuestas.',
        },
      ]}
      cultivation={[
        {
          icon: ShieldCheck,
          title: 'Saneamiento del lote',
          description: 'Controlar malezas hospederas en bordes y canales para bajar reinfestacion.',
        },
        {
          icon: Eye,
          title: 'Monitoreo por umbral',
          description: 'Definir frecuencia de muestreo y accion segun nivel poblacional observado.',
        },
        {
          icon: SprayCan,
          title: 'Intervencion dirigida',
          description: 'Aplicar control cuando se alcance umbral, ajustando momento y cobertura en paniculas.',
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
