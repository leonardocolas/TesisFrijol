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
      eyebrow="Maiz - enfermedad foliar"
      title="Roya del maiz"
      subtitle="Enfermedad fungica que forma pustulas en hoja y reduce fotosintesis, con efecto directo en llenado de grano."
      carouselTitle="Galeria de sintomas"
      carouselDescription="Imagenes de lesiones tipo roya para facilitar el diagnostico visual en diferentes etapas del cultivo."
      images={images}
      imageAltPrefix="Roya del maiz"
      infoTitle="Informacion tecnica"
      summaryTitle="Resumen de riesgo"
      summaryDescription="Aspectos esenciales para identificar avance de roya y decidir medidas de manejo en campo."
      statsTitle="Indicadores de severidad"
      benefitsTitle="Sintomas clave"
      cultivationTitle="Manejo fitosanitario"
      overviewDescription="La roya se intensifica bajo humedad alta y temperaturas moderadas, especialmente en lotes con variedades susceptibles."
      overviewSections={[
        {
          icon: FlaskConical,
          title: 'Agente causal',
          paragraphs: [
            'Es una enfermedad fungica que se disemina por esporas transportadas por viento.',
            'Puede reiniciar ciclos de infeccion en periodos cortos si el ambiente es favorable.',
          ],
        },
        {
          icon: Leaf,
          title: 'Efecto en rendimiento',
          paragraphs: [
            'La colonizacion foliar reduce area fotosintetica activa y acelera senescencia.',
            'El cultivo pierde capacidad de llenar grano cuando la infeccion progresa sin control.',
          ],
        },
        {
          icon: Eye,
          title: 'Reconocimiento en campo',
          paragraphs: [
            'Pustulas naranja a marron sobre hojas, con liberacion de polvo esporal.',
            'La severidad aumenta desde hojas bajas hacia estratos superiores si no se interviene.',
          ],
        },
        {
          icon: AlertTriangle,
          title: 'Condiciones favorables',
          paragraphs: [
            'Humedad elevada, rocio prolongado y densidades altas incrementan incidencia.',
            'Rastrojos infectados y ausencia de rotacion sostienen fuentes de inoculo.',
          ],
        },
      ]}
      stats={[
        {
          value: 'Foliar',
          label: 'Sitio principal',
          note: 'La enfermedad se expresa en hojas y afecta balance fotosintetico del cultivo.',
        },
        {
          value: 'Media-alta',
          label: 'Velocidad de avance',
          note: 'Con clima favorable puede escalar rapidamente en pocos dias.',
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
          title: 'Pustulas visibles',
          description: 'Lesiones elevadas de color naranja o marron sobre superficie foliar.',
        },
        {
          icon: Eye,
          title: 'Clorosis y necrosis',
          description: 'Perdida progresiva de color verde con secado anticipado de hojas.',
        },
        {
          icon: AlertTriangle,
          title: 'Menor llenado',
          description: 'Disminucion de rendimiento por menor actividad fotosintetica en etapas clave.',
        },
      ]}
      cultivation={[
        {
          icon: ShieldCheck,
          title: 'Variedades tolerantes',
          description: 'Priorizar materiales con mejor comportamiento frente a roya comun.',
        },
        {
          icon: Droplets,
          title: 'Manejo de humedad',
          description: 'Evitar excesos que prolonguen mojado foliar y faciliten infeccion.',
        },
        {
          icon: SprayCan,
          title: 'Fungicidas',
          description: 'Aplicar productos registrados cuando se alcance nivel de accion en hojas clave.',
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
