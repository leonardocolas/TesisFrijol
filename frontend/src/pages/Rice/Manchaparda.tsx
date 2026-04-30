import { AlertTriangle, Droplets, Eye, FlaskConical, Leaf, ShieldCheck, SprayCan } from 'lucide-react';
import CropInfoPage from '../../components/global/CropInfoPage';
import img1 from '../../assets/img/Arroz/Mancha parda/Mancha parda 1.webp';
import img2 from '../../assets/img/Arroz/Mancha parda/Mancha parda 2.webp';
import img3 from '../../assets/img/Arroz/Mancha parda/Mancha parda 3.webp';

const images = [img1, img2, img3];

const ManchaParda = () => {
  return (
    <CropInfoPage
      eyebrow="Arroz - enfermedad fúngica"
      title="Mancha parda"
      subtitle="Enfermedad foliar y de grano asociada a condiciones de alta humedad, manejo inadecuado de rastrojo y material de siembra contaminado."
      carouselTitle="Galería de síntomas"
      carouselDescription="Evidencia visual de lesiones pardas en hoja y daño asociado a reducción de área fotosintética."
      images={images}
      imageAltPrefix="Mancha parda en arroz"
      infoTitle="Información técnica"
      summaryTitle="Resumen fitosanitario"
      summaryDescription="Claves para reconocer el problema, entender su avance y orientar acciones de prevención y control."
      statsTitle="Indicadores de riesgo"
      benefitsTitle="Señales de campo"
      cultivationTitle="Manejo integrado"
      overviewDescription="La mancha parda avanza cuando el ambiente favorece esporulación y permanencia de humedad en follaje, especialmente con lotes poco ventilados."
      overviewSections={[
        {
          icon: FlaskConical,
          title: 'Origen del problema',
          paragraphs: [
            'Es causada por un hongo que puede persistir en residuos y semilla infectada.',
            'La infección se propaga con facilidad bajo microclimas húmedos en el cultivo.',
          ],
        },
        {
          icon: Leaf,
          title: 'Daño fisiológico',
          paragraphs: [
            'Las lesiones pardas reducen área foliar funcional y eficiencia fotosintética.',
            'En ataques severos compromete llenado de grano y calidad comercial.',
          ],
        },
        {
          icon: Eye,
          title: 'Diagnóstico en campo',
          paragraphs: [
            'Observar forma, color y distribución de manchas en hojas de diferentes estratos.',
            'Confirmar si existe avance hacia panículas o grano en etapas finales.',
          ],
        },
        {
          icon: AlertTriangle,
          title: 'Factores predisponentes',
          paragraphs: [
            'Alta humedad relativa, rastrojo infectado y excesos de nitrógeno incrementan incidencia.',
            'Densidades altas elevan el tiempo de mojado foliar y aceleran desarrollo del hongo.',
          ],
        },
      ]}
      stats={[
        {
          value: 'Alta',
          label: 'Dependencia de humedad',
          note: 'El progreso de la enfermedad aumenta con periodos prolongados de mojado foliar.',
        },
        {
          value: 'Foliar y grano',
          label: 'Sitio de daño',
          note: 'Afecta productividad y también calidad final del arroz cosechado.',
        },
        {
          value: 'Escalable',
          label: 'Comportamiento',
          note: 'Sin manejo temprano, la severidad crece rápidamente en ambientes favorables.',
        },
      ]}
      benefits={[
        {
          icon: Leaf,
          title: 'Lesiones pardas',
          description: 'Manchas marrones con bordes definidos en hojas de distintos niveles.',
        },
        {
          icon: Eye,
          title: 'Secado prematuro',
          description: 'Hojas con pérdida de área verde activa y envejecimiento acelerado.',
        },
        {
          icon: AlertTriangle,
          title: 'Pérdida de calidad',
          description: 'Aumento de grano manchado y menor peso específico en cosecha.',
        },
      ]}
      cultivation={[
        {
          icon: ShieldCheck,
          title: 'Semilla sana',
          description: 'Usar semilla certificada y tratamiento preventivo cuando corresponda.',
        },
        {
          icon: Droplets,
          title: 'Manejo de ambiente',
          description: 'Optimizar ventilación del cultivo y evitar condiciones de humedad excesiva sostenida.',
        },
        {
          icon: SprayCan,
          title: 'Control dirigido',
          description: 'Aplicar fungicidas registrados en momentos de riesgo siguiendo umbrales locales.',
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

export default ManchaParda;
