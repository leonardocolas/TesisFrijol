import { AlertTriangle, Bug, Eye, FlaskConical, Leaf, ShieldCheck, SprayCan } from 'lucide-react';
import CropInfoPage from '../../components/global/CropInfoPage';
import img1 from '../../assets/img/Frijol/mosaicoDorado/mosaicoD1.png';
import img2 from '../../assets/img/Frijol/mosaicoDorado/mosaicoD2.jpeg';
import img3 from '../../assets/img/Frijol/mosaicoDorado/mosaicoD3.webp';
import img4 from '../../assets/img/Frijol/mosaicoDorado/mosaicoD4.webp';
import img5 from '../../assets/img/Frijol/mosaicoDorado/mosaicoD5.webp';

const images = [img1, img2, img3, img4, img5];

const MosaicoDorado = () => {
  return (
    <CropInfoPage
      eyebrow="Frijol - virosis"
      title="Mosaico dorado del frijol"
      subtitle="Enfermedad viral de alto impacto productivo, estrechamente asociada a la presencia de mosca blanca."
      carouselTitle="Galería de síntomas"
      carouselDescription="Imágenes de referencia para identificar patrones de mosaico, deformación foliar y reducción de vigor."
      images={images}
      imageAltPrefix="Mosaico dorado en frijol"
      infoTitle="Información técnica"
      summaryTitle="Resumen de riesgo sanitario"
      summaryDescription="Elementos clave para reconocer la virosis, estimar impacto y enfocar medidas de prevención."
      statsTitle="Indicadores de severidad"
      benefitsTitle="Síntomas principales"
      cultivationTitle="Manejo recomendado"
      overviewDescription="No existe cura directa para plantas infectadas, por lo que el control se concentra en cortar la transmisión y disminuir la carga de vector e inóculo."
      overviewSections={[
        {
          icon: FlaskConical,
          title: 'Naturaleza de la enfermedad',
          paragraphs: [
            'Corresponde a una virosis que altera tejido foliar y crecimiento del cultivo.',
            'La infección temprana provoca daños más severos y fuerte impacto sobre rendimiento.',
          ],
        },
        {
          icon: Eye,
          title: 'Expresión en campo',
          paragraphs: [
            'Se observa mosaico amarillo-dorado entre nervaduras y reducción del área verde funcional.',
            'El cultivo puede mostrar enanismo, hojas deformadas y menor formación de vainas.',
          ],
        },
        {
          icon: Bug,
          title: 'Relación con el vector',
          paragraphs: [
            'La mosca blanca facilita la diseminación entre plantas y lotes vecinos.',
            'La presión del vector aumenta cuando existen hospederos alternativos sin control.',
          ],
        },
        {
          icon: AlertTriangle,
          title: 'Momentos críticos',
          paragraphs: [
            'Etapas vegetativas tempranas son las más sensibles para la pérdida de potencial productivo.',
            'Reinfecciones sucesivas incrementan síntomas y deterioro de calidad comercial.',
          ],
        },
      ]}
      stats={[
        {
          value: 'Muy alta',
          label: 'Pérdida potencial',
          note: 'Cuando la infección ocurre temprano, la reducción de rendimiento puede ser severa.',
        },
        {
          value: 'Vectorial',
          label: 'Vía de diseminación',
          note: 'La enfermedad depende de la dinámica poblacional de mosca blanca.',
        },
        {
          value: 'Sin cura',
          label: 'En planta afectada',
          note: 'El enfoque de manejo es preventivo y de contencion temprana.',
        },
      ]}
      benefits={[
        {
          icon: Leaf,
          title: 'Mosaico dorado',
          description: 'Cambio irregular de coloración verde a amarillo sobre hojas nuevas y adultas.',
        },
        {
          icon: AlertTriangle,
          title: 'Deformación foliar',
          description: 'Arrugamiento y curvatura de láminas con menor expansión del follaje.',
        },
        {
          icon: Eye,
          title: 'Menor desarrollo',
          description: 'Plantas de menor tamaño, con menos flores, vainas y llenado de grano.',
        },
      ]}
      cultivation={[
        {
          icon: ShieldCheck,
          title: 'Semilla y sanidad',
          description: 'Utilizar material sano y reducir fuentes de inóculo dentro y alrededor del lote.',
        },
        {
          icon: SprayCan,
          title: 'Manejo del vector',
          description: 'Integrar monitoreo, control biológico y control químico selectivo cuando corresponda.',
        },
        {
          icon: Bug,
          title: 'Control de hospederos',
          description: 'Eliminar malezas y plantas voluntarias que sostienen poblaciones de mosca blanca.',
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

export default MosaicoDorado;
