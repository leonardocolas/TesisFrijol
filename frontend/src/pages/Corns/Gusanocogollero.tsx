import { AlertTriangle, Bug, Eye, Leaf, ShieldCheck, SprayCan, Target } from 'lucide-react';
import CropInfoPage from '../../components/global/CropInfoPage';
import img1 from '../../assets/img/Maiz/Gusano cogollero/Gusano cogollero1.webp';
import img2 from '../../assets/img/Maiz/Gusano cogollero/Gusano cogollero2.webp';
import img3 from '../../assets/img/Maiz/Gusano cogollero/Gusano cogollero3.webp';
import img4 from '../../assets/img/Maiz/Gusano cogollero/Gusano cogollero4.webp';

const images = [img1, img2, img3, img4];

const GusanoCogollero = () => {
  return (
    <CropInfoPage
      eyebrow="Maíz - plaga principal"
      title="Gusano cogollero"
      subtitle="Plaga de alta agresividad en maíz temprano, con daño foliar y afectación del punto de crecimiento."
      carouselTitle="Galería de síntomas"
      carouselDescription="Imágenes de perforaciones, excretas y daño en cogollo para mejorar el reconocimiento en campo."
      images={images}
      imageAltPrefix="Gusano cogollero en maíz"
      infoTitle="Información técnica"
      summaryTitle="Resumen de alerta temprana"
      summaryDescription="Elementos clave para identificar el ataque, medir avance y aplicar manejo integrado oportuno."
      statsTitle="Indicadores de daño"
      benefitsTitle="Síntomas frecuentes"
      cultivationTitle="Control recomendado"
      overviewDescription="El daño severo aparece cuando las larvas se establecen en el cogollo y consumen tejido joven antes de ser detectadas."
      overviewSections={[
        {
          icon: Bug,
          title: 'Biologia de ataque',
          paragraphs: [
            'Las larvas recién emergidas raspan hojas y luego migran al cogollo.',
            'Su desarrollo rápido permite que el daño aumente en pocos días.',
          ],
        },
        {
          icon: Leaf,
          title: 'Impacto en el cultivo',
          paragraphs: [
            'Perforaciones y desgarres reducen área fotosintética y vigor inicial.',
            'Si el cogollo se compromete, puede afectar desarrollo de mazorca.',
          ],
        },
        {
          icon: Eye,
          title: 'Monitoreo',
          paragraphs: [
            'Revisar surcos desde emergencia, enfocando plantas con perforaciones recientes.',
            'Buscar excretas y larvas dentro del cogollo para confirmar presencia activa.',
          ],
        },
        {
          icon: AlertTriangle,
          title: 'Riesgo de agravamiento',
          paragraphs: [
            'Temperaturas cálidas y ausencia de vigilancia aceleran la infestación.',
            'Lotes vecinos con gramíneas hospederas pueden sostener reinfestaciones.',
          ],
        },
      ]}
      stats={[
        {
          value: 'Temprana',
          label: 'Ventana critica',
          note: 'Las primeras etapas del maíz son las más sensibles al daño del cogollero.',
        },
        {
          value: 'Alta',
          label: 'Velocidad de daño',
          note: 'Sin control inicial la severidad aumenta rápidamente por larvas establecidas.',
        },
        {
          value: 'Cogollo',
          label: 'Zona objetivo',
          note: 'El punto de crecimiento concentra la mayor pérdida potencial.',
        },
      ]}
      benefits={[
        {
          icon: Target,
          title: 'Perforaciones en hoja',
          description: 'Daños tipo ventana y recortes irregulares en follaje joven.',
        },
        {
          icon: AlertTriangle,
          title: 'Excretas en cogollo',
          description: 'Acumulación de residuos oscuros, indicador común de larvas activas.',
        },
        {
          icon: Eye,
          title: 'Deterioro de brote',
          description: 'Plantas con crecimiento frenado por daño persistente en tejido nuevo.',
        },
      ]}
      cultivation={[
        {
          icon: Eye,
          title: 'Inspección semanal',
          description: 'Monitorear por lotes y registrar incremento de plantas afectadas.',
        },
        {
          icon: ShieldCheck,
          title: 'Manejo integrado',
          description: 'Combinar control biológico, prácticas culturales y manejo de hospederos alternos.',
        },
        {
          icon: SprayCan,
          title: 'Aplicación focalizada',
          description: 'Intervenir en momento temprano con buena cobertura en zona de cogollo.',
        },
      ]}
      theme={{
        pageGradient: 'from-amber-50 via-white to-orange-50',
        heroGradient: 'from-amber-700 via-orange-600 to-yellow-500',
        accentBorder: 'border-amber-200',
        accentMutedBg: 'bg-amber-100',
        accentMutedText: 'text-amber-700',
        accentStrongText: 'text-amber-950',
        sectionTint: 'from-amber-50 to-orange-50',
        buttonClass: 'bg-amber-500 hover:bg-amber-600',
      }}
    />
  );
};

export default GusanoCogollero;
