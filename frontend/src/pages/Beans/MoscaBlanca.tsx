import { AlertTriangle, Bug, Eye, Leaf, ShieldCheck, SprayCan } from 'lucide-react';
import CropInfoPage from '../../components/global/CropInfoPage';
import img1 from '../../assets/img/Frijol/mosca blanca/moscablanca1.webp';
import img2 from '../../assets/img/Frijol/mosca blanca/moscablanca2.webp';
import img3 from '../../assets/img/Frijol/mosca blanca/moscablanca3.webp';
import img4 from '../../assets/img/Frijol/mosca blanca/moscblanca4.webp';

const images = [img1, img2, img3, img4];

const MoscaBlanca = () => {
  return (
    <CropInfoPage
      eyebrow="Frijol - plaga clave"
      title="Mosca blanca"
      subtitle="La presencia de mosca blanca en frijol debilita la planta y aumenta el riesgo de virosis asociadas."
      carouselTitle="Galería de síntomas"
      carouselDescription="Secuencia visual de daño por mosca blanca en hojas de frijol para apoyar la identificación en campo."
      images={images}
      imageAltPrefix="Mosca blanca en frijol"
      infoTitle="Información técnica"
      summaryTitle="Resumen de monitoreo"
      summaryDescription="Puntos rápidos para estimar riesgo, reconocer síntomas y priorizar acciones de manejo integrado."
      statsTitle="Indicadores de impacto"
      benefitsTitle="Síntomas frecuentes"
      cultivationTitle="Control y prevención"
      overviewDescription="La mosca blanca se concentra en el envés de la hoja, succiona savia y puede transmitir virus con alta eficiencia cuando no hay control temprano."
      overviewSections={[
        {
          icon: Bug,
          title: 'Identificación',
          paragraphs: [
            'Adultos pequeños y de color blanco, visibles al sacudir el follaje.',
            'Ninfas planas adheridas en el envés, distribuidas sobre hojas tiernas.',
          ],
        },
        {
          icon: Leaf,
          title: 'Daño directo',
          paragraphs: [
            'La alimentación continua reduce vigor, crecimiento vegetativo y formación de vainas.',
            'La excreción de melaza favorece fumagina y reduce fotosíntesis útil.',
          ],
        },
        {
          icon: AlertTriangle,
          title: 'Riesgo epidemiológico',
          paragraphs: [
            'Actúa como vector de virosis, por lo que una infestación temprana puede multiplicar la pérdida de rendimiento.',
            'Lotes cercanos con hospederos alternos elevan la presión de reinfestación.',
          ],
        },
        {
          icon: Eye,
          title: 'Monitoreo',
          paragraphs: [
            'Evaluar semanalmente el envés de hojas en plantas representativas.',
            'Priorizar seguimiento durante establecimiento y prefloración.',
          ],
        },
      ]}
      stats={[
        {
          value: 'Alta',
          label: 'Capacidad de dispersión',
          note: 'Los adultos migran con facilidad entre parcelas y hospederos cercanos.',
        },
        {
          value: 'Temprano',
          label: 'Momento crítico',
          note: 'El daño inicial suele tener mayor efecto en la productividad final.',
        },
        {
          value: 'Vector',
          label: 'Riesgo sanitario',
          note: 'Incrementa probabilidad de virosis cuando coexisten fuentes de inóculo.',
        },
      ]}
      benefits={[
        {
          icon: Leaf,
          title: 'Clorosis foliar',
          description: 'Hojas con amarillamiento progresivo y menor actividad fotosintética.',
        },
        {
          icon: AlertTriangle,
          title: 'Debilitamiento general',
          description: 'Plantas con menor vigor, menor crecimiento y menor carga de vainas.',
        },
        {
          icon: Bug,
          title: 'Melaza y fumagina',
          description: 'Depositos pegajosos en hoja y desarrollo posterior de hongo superficial oscuro.',
        },
      ]}
      cultivation={[
        {
          icon: Eye,
          title: 'Monitoreo continuo',
          description: 'Inspeccionar lotes por focos y actuar antes de picos poblacionales.',
        },
        {
          icon: SprayCan,
          title: 'Control integrado',
          description: 'Combinar manejo cultural, control biológico y productos selectivos rotando modos de acción.',
        },
        {
          icon: ShieldCheck,
          title: 'Prevención',
          description: 'Eliminar hospederos alternos y coordinar fechas de siembra para reducir presión del vector.',
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

export default MoscaBlanca;
