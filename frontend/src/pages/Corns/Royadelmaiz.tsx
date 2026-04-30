import { AlertTriangle, Droplets, Eye, FlaskConical, Leaf, ShieldCheck, SprayCan } from 'lucide-react';
import CropInfoPage from '../../components/global/CropInfoPage';
import img1 from '../../assets/img/Maiz/Roya del maíz/Roya del maíz1.webp';
import img2 from '../../assets/img/Maiz/Roya del maíz/Roya del maíz2.webp';
import img3 from '../../assets/img/Maiz/Roya del maíz/Roya del maíz3.webp';
import img4 from '../../assets/img/Maiz/Roya del maíz/Roya del maíz4.webp';

const images = [img1, img2, img3, img4];

const RoyaDelMaiz = () => {
  return (
    <CropInfoPage
      eyebrow="Maíz - enfermedad foliar"
      title="Roya del maíz"
      subtitle="Enfermedad fúngica que forma pústulas en hoja y reduce fotosíntesis, con efecto directo en llenado de grano."
      carouselTitle="Galería de síntomas"
      carouselDescription="Imágenes de lesiones tipo roya para facilitar el diagnóstico visual en diferentes etapas del cultivo."
      images={images}
      imageAltPrefix="Roya del maíz"
      infoTitle="Información técnica"
      summaryTitle="Resumen de riesgo"
      summaryDescription="Aspectos esenciales para identificar avance de roya y decidir medidas de manejo en campo."
      statsTitle="Indicadores de severidad"
      benefitsTitle="Síntomas clave"
      cultivationTitle="Manejo fitosanitario"
      overviewDescription="La roya se intensifica bajo humedad alta y temperaturas moderadas, especialmente en lotes con variedades susceptibles."
      overviewSections={[
        {
          icon: FlaskConical,
          title: 'Agente causal',
          paragraphs: [
            'Es una enfermedad fúngica que se disemina por esporas transportadas por viento.',
            'Puede reiniciar ciclos de infección en períodos cortos si el ambiente es favorable.',
          ],
        },
        {
          icon: Leaf,
          title: 'Efecto en rendimiento',
          paragraphs: [
            'La colonización foliar reduce área fotosintética activa y acelera senescencia.',
            'El cultivo pierde capacidad de llenar grano cuando la infección progresa sin control.',
          ],
        },
        {
          icon: Eye,
          title: 'Reconocimiento en campo',
          paragraphs: [
            'Pústulas naranja a marrón sobre hojas, con liberación de polvo esporal.',
            'La severidad aumenta desde hojas bajas hacia estratos superiores si no se interviene.',
          ],
        },
        {
          icon: AlertTriangle,
          title: 'Condiciones favorables',
          paragraphs: [
            'Humedad elevada, rocío prolongado y densidades altas incrementan incidencia.',
            'Rastrojos infectados y ausencia de rotación sostienen fuentes de inóculo.',
          ],
        },
      ]}
      stats={[
        {
          value: 'Foliar',
          label: 'Sitio principal',
          note: 'La enfermedad se expresa en hojas y afecta balance fotosintético del cultivo.',
        },
        {
          value: 'Media-alta',
          label: 'Velocidad de avance',
          note: 'Con clima favorable puede escalar rápidamente en pocos días.',
        },
        {
          value: 'Recurrente',
          label: 'Riesgo',
          note: 'Sin manejo preventivo puede repetirse ciclo tras ciclo en la parcela.',
        },
      ]}
      benefits={[
        {
          icon: Leaf,
          title: 'Pústulas visibles',
          description: 'Lesiones elevadas de color naranja o marrón sobre superficie foliar.',
        },
        {
          icon: Eye,
          title: 'Clorosis y necrosis',
          description: 'Pérdida progresiva de color verde con secado anticipado de hojas.',
        },
        {
          icon: AlertTriangle,
          title: 'Menor llenado',
          description: 'Disminución de rendimiento por menor actividad fotosintética en etapas clave.',
        },
      ]}
      cultivation={[
        {
          icon: ShieldCheck,
          title: 'Variedades tolerantes',
          description: 'Priorizar materiales con mejor comportamiento frente a roya común.',
        },
        {
          icon: Droplets,
          title: 'Manejo de humedad',
          description: 'Evitar excesos que prolonguen mojado foliar y faciliten infección.',
        },
        {
          icon: SprayCan,
          title: 'Fungicidas',
          description: 'Aplicar productos registrados cuando se alcance nivel de acción en hojas clave.',
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

export default RoyaDelMaiz;
