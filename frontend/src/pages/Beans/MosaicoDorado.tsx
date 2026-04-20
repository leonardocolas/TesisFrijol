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
      carouselTitle="Galeria de sintomas"
      carouselDescription="Imagenes de referencia para identificar patrones de mosaico, deformacion foliar y reduccion de vigor."
      images={images}
      imageAltPrefix="Mosaico dorado en frijol"
      infoTitle="Informacion tecnica"
      summaryTitle="Resumen de riesgo sanitario"
      summaryDescription="Elementos clave para reconocer la virosis, estimar impacto y enfocar medidas de prevencion."
      statsTitle="Indicadores de severidad"
      benefitsTitle="Sintomas principales"
      cultivationTitle="Manejo recomendado"
      overviewDescription="No existe cura directa para plantas infectadas, por lo que el control se concentra en cortar la transmision y disminuir la carga de vector e inoculo."
      overviewSections={[
        {
          icon: FlaskConical,
          title: 'Naturaleza de la enfermedad',
          paragraphs: [
            'Corresponde a una virosis que altera tejido foliar y crecimiento del cultivo.',
            'La infeccion temprana provoca danos mas severos y fuerte impacto sobre rendimiento.',
          ],
        },
        {
          icon: Eye,
          title: 'Expresion en campo',
          paragraphs: [
            'Se observa mosaico amarillo-dorado entre nervaduras y reduccion del area verde funcional.',
            'El cultivo puede mostrar enanismo, hojas deformadas y menor formacion de vainas.',
          ],
        },
        {
          icon: Bug,
          title: 'Relacion con el vector',
          paragraphs: [
            'La mosca blanca facilita la diseminacion entre plantas y lotes vecinos.',
            'La presion del vector aumenta cuando existen hospederos alternativos sin control.',
          ],
        },
        {
          icon: AlertTriangle,
          title: 'Momentos criticos',
          paragraphs: [
            'Etapas vegetativas tempranas son las mas sensibles para la perdida de potencial productivo.',
            'Reinfecciones sucesivas incrementan sintomas y deterioro de calidad comercial.',
          ],
        },
      ]}
      stats={[
        {
          value: 'Muy alta',
          label: 'Perdida potencial',
          note: 'Cuando la infeccion ocurre temprano, la reduccion de rendimiento puede ser severa.',
        },
        {
          value: 'Vectorial',
          label: 'Via de diseminacion',
          note: 'La enfermedad depende de la dinamica poblacional de mosca blanca.',
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
          description: 'Cambio irregular de coloracion verde a amarillo sobre hojas nuevas y adultas.',
        },
        {
          icon: AlertTriangle,
          title: 'Deformacion foliar',
          description: 'Arrugamiento y curvatura de laminas con menor expansion del follaje.',
        },
        {
          icon: Eye,
          title: 'Menor desarrollo',
          description: 'Plantas de menor tamano, con menos flores, vainas y llenado de grano.',
        },
      ]}
      cultivation={[
        {
          icon: ShieldCheck,
          title: 'Semilla y sanidad',
          description: 'Utilizar material sano y reducir fuentes de inoculo dentro y alrededor del lote.',
        },
        {
          icon: SprayCan,
          title: 'Manejo del vector',
          description: 'Integrar monitoreo, control biologico y control quimico selectivo cuando corresponda.',
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
