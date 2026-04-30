import { AlertTriangle, Bug, Eye, Leaf, ShieldCheck, SprayCan, Target } from 'lucide-react';
import CropInfoPage from '../../components/global/CropInfoPage';
import img1 from '../../assets/img/Frijol/empoasca/empoaasca1.webp';
import img2 from '../../assets/img/Frijol/empoasca/empoasca2.webp';
import img3 from '../../assets/img/Frijol/empoasca/empoasca 3.webp';

const images = [img1, img2, img3];

const Empoasca = () => {
  return (
    <CropInfoPage
      eyebrow="Frijol - plaga foliar"
      title="Empoasca"
      subtitle="La chicharrita del frijol afecta tejido foliar, reduce vigor y compromete el rendimiento cuando no se maneja a tiempo."
      carouselTitle="Galería de síntomas"
      carouselDescription="Secuencia visual de daños por Empoasca en hojas y brotes para facilitar la detección en campo."
      images={images}
      imageAltPrefix="Empoasca en frijol"
      infoTitle="Información técnica"
      summaryTitle="Resumen de diagnóstico rápido"
      summaryDescription="Variables clave para diferenciar daño por Empoasca, priorizar monitoreo y tomar decisiones de control."
      statsTitle="Indicadores de campo"
      benefitsTitle="Síntomas característicos"
      cultivationTitle="Estrategia de manejo"
      overviewDescription="El daño por Empoasca se relaciona con succión de savia en hojas y brotes tiernos, con efecto acumulativo durante etapas vegetativas y reproductivas."
      overviewSections={[
        {
          icon: Bug,
          title: 'Biología de la plaga',
          paragraphs: [
            'Insecto pequeño y móvil que coloniza rápidamente plantas en lotes con alta presión ambiental.',
            'Ninfas y adultos se alimentan en hojas nuevas, donde el impacto fisiológico es mayor.',
          ],
        },
        {
          icon: Leaf,
          title: 'Efecto en la planta',
          paragraphs: [
            'Produce alteraciones en bordes foliares, pérdida de color y menor área activa para fotosíntesis.',
            'El estrés continuo reduce crecimiento y limita capacidad de llenado de vaina.',
          ],
        },
        {
          icon: Eye,
          title: 'Diagnóstico',
          paragraphs: [
            'Inspeccionar hojas trifoliadas y brotes para reconocer daño inicial antes de síntomas severos.',
            'El muestreo semanal permite detectar incrementos poblacionales en forma temprana.',
          ],
        },
        {
          icon: AlertTriangle,
          title: 'Escenarios de mayor riesgo',
          paragraphs: [
            'Ambientes cálidos y períodos secos suelen aumentar la presión de la plaga.',
            'Parcelas con malezas hospederas cercanas sostienen reinfestaciones frecuentes.',
          ],
        },
      ]}
      stats={[
        {
          value: 'Rápida',
          label: 'Colonización',
          note: 'Puede multiplicarse en poco tiempo cuando no existe vigilancia continua.',
        },
        {
          value: 'Foliar',
          label: 'Tipo de daño',
          note: 'Afecta principalmente hojas y brotes con impacto directo en vigor del cultivo.',
        },
        {
          value: 'Progresivo',
          label: 'Impacto',
          note: 'El daño acumulado se expresa en menor crecimiento y menor rendimiento.',
        },
      ]}
      benefits={[
        {
          icon: Leaf,
          title: 'Bordes necróticos',
          description: 'Hojas con aspecto de quemado y deterioro en margen y ápice.',
        },
        {
          icon: Target,
          title: 'Enrollamiento',
          description: 'Láminas deformadas con menor expansión y menor capacidad fotosintética.',
        },
        {
          icon: AlertTriangle,
          title: 'Retardo de desarrollo',
          description: 'Plantas con menor altura, menor cobertura y menor capacidad productiva.',
        },
      ]}
      cultivation={[
        {
          icon: Eye,
          title: 'Muestreo sistemático',
          description: 'Realizar monitoreo por puntos fijos y ajustar acciones según intensidad del ataque.',
        },
        {
          icon: ShieldCheck,
          title: 'Manejo cultural',
          description: 'Reducir malezas hospederas y mejorar sanidad general del lote para bajar la presión.',
        },
        {
          icon: SprayCan,
          title: 'Intervención oportuna',
          description: 'Aplicar medidas de control integradas priorizando selectividad y rotación de activos.',
        },
      ]}
      theme={{
        pageGradient: 'from-emerald-50 via-white to-lime-50',
        heroGradient: 'from-green-800 via-green-700 to-lime-600',
        accentBorder: 'border-green-200',
        accentMutedBg: 'bg-green-100',
        accentMutedText: 'text-green-700',
        accentStrongText: 'text-green-950',
        sectionTint: 'from-green-50 to-lime-50',
        buttonClass: 'bg-green-600 hover:bg-green-700',
      }}
    />
  );
};

export default Empoasca;
