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
      carouselTitle="Galeria de sintomas"
      carouselDescription="Secuencia visual de dano por mosca blanca en hojas de frijol para apoyar la identificacion en campo."
      images={images}
      imageAltPrefix="Mosca blanca en frijol"
      infoTitle="Informacion tecnica"
      summaryTitle="Resumen de monitoreo"
      summaryDescription="Puntos rapidos para estimar riesgo, reconocer sintomas y priorizar acciones de manejo integrado."
      statsTitle="Indicadores de impacto"
      benefitsTitle="Sintomas frecuentes"
      cultivationTitle="Control y prevencion"
      overviewDescription="La mosca blanca se concentra en el enves de la hoja, succiona savia y puede transmitir virus con alta eficiencia cuando no hay control temprano."
      overviewSections={[
        {
          icon: Bug,
          title: 'Identificacion',
          paragraphs: [
            'Adultos pequenos y de color blanco, visibles al sacudir el follaje.',
            'Ninfas planas adheridas en el enves, distribuidas sobre hojas tiernas.',
          ],
        },
        {
          icon: Leaf,
          title: 'Dano directo',
          paragraphs: [
            'La alimentacion continua reduce vigor, crecimiento vegetativo y formacion de vainas.',
            'La excrecion de melaza favorece fumagina y reduce fotosintesis util.',
          ],
        },
        {
          icon: AlertTriangle,
          title: 'Riesgo epidemiologico',
          paragraphs: [
            'Actua como vector de virosis, por lo que una infestacion temprana puede multiplicar la perdida de rendimiento.',
            'Lotes cercanos con hospederos alternos elevan la presion de reinfestacion.',
          ],
        },
        {
          icon: Eye,
          title: 'Monitoreo',
          paragraphs: [
            'Evaluar semanalmente el enves de hojas en plantas representativas.',
            'Priorizar seguimiento durante establecimiento y prefloracion.',
          ],
        },
      ]}
      stats={[
        {
          value: 'Alta',
          label: 'Capacidad de dispersion',
          note: 'Los adultos migran con facilidad entre parcelas y hospederos cercanos.',
        },
        {
          value: 'Temprano',
          label: 'Momento critico',
          note: 'El dano inicial suele tener mayor efecto en la productividad final.',
        },
        {
          value: 'Vector',
          label: 'Riesgo sanitario',
          note: 'Incrementa probabilidad de virosis cuando coexisten fuentes de inoculo.',
        },
      ]}
      benefits={[
        {
          icon: Leaf,
          title: 'Clorosis foliar',
          description: 'Hojas con amarillamiento progresivo y menor actividad fotosintetica.',
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
          description: 'Combinar manejo cultural, control biologico y productos selectivos rotando modos de accion.',
        },
        {
          icon: ShieldCheck,
          title: 'Prevencion',
          description: 'Eliminar hospederos alternos y coordinar fechas de siembra para reducir presion del vector.',
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
