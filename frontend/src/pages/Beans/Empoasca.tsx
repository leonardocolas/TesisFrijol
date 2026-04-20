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
      carouselTitle="Galeria de sintomas"
      carouselDescription="Secuencia visual de danos por Empoasca en hojas y brotes para facilitar la deteccion en campo."
      images={images}
      imageAltPrefix="Empoasca en frijol"
      infoTitle="Informacion tecnica"
      summaryTitle="Resumen de diagnostico rapido"
      summaryDescription="Variables clave para diferenciar dano por Empoasca, priorizar monitoreo y tomar decisiones de control."
      statsTitle="Indicadores de campo"
      benefitsTitle="Sintomas caracteristicos"
      cultivationTitle="Estrategia de manejo"
      overviewDescription="El dano por Empoasca se relaciona con succion de savia en hojas y brotes tiernos, con efecto acumulativo durante etapas vegetativas y reproductivas."
      overviewSections={[
        {
          icon: Bug,
          title: 'Biologia de la plaga',
          paragraphs: [
            'Insecto pequeno y movil que coloniza rapidamente plantas en lotes con alta presion ambiental.',
            'Ninfas y adultos se alimentan en hojas nuevas, donde el impacto fisiologico es mayor.',
          ],
        },
        {
          icon: Leaf,
          title: 'Efecto en la planta',
          paragraphs: [
            'Produce alteraciones en bordes foliares, perdida de color y menor area activa para fotosintesis.',
            'El estres continuo reduce crecimiento y limita capacidad de llenado de vaina.',
          ],
        },
        {
          icon: Eye,
          title: 'Diagnostico',
          paragraphs: [
            'Inspeccionar hojas trifoliadas y brotes para reconocer dano inicial antes de sintomas severos.',
            'El muestreo semanal permite detectar incrementos poblacionales en forma temprana.',
          ],
        },
        {
          icon: AlertTriangle,
          title: 'Escenarios de mayor riesgo',
          paragraphs: [
            'Ambientes calidos y periodos secos suelen aumentar la presion de la plaga.',
            'Parcelas con malezas hospederas cercanas sostienen reinfestaciones frecuentes.',
          ],
        },
      ]}
      stats={[
        {
          value: 'Rapida',
          label: 'Colonizacion',
          note: 'Puede multiplicarse en poco tiempo cuando no existe vigilancia continua.',
        },
        {
          value: 'Foliar',
          label: 'Tipo de dano',
          note: 'Afecta principalmente hojas y brotes con impacto directo en vigor del cultivo.',
        },
        {
          value: 'Progresivo',
          label: 'Impacto',
          note: 'El dano acumulado se expresa en menor crecimiento y menor rendimiento.',
        },
      ]}
      benefits={[
        {
          icon: Leaf,
          title: 'Bordes necroticos',
          description: 'Hojas con aspecto de quemado y deterioro en margen y apice.',
        },
        {
          icon: Target,
          title: 'Enrrollamiento',
          description: 'Laminas deformadas con menor expansion y menor capacidad fotosintetica.',
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
          title: 'Muestreo sistematico',
          description: 'Realizar monitoreo por puntos fijos y ajustar acciones segun intensidad del ataque.',
        },
        {
          icon: ShieldCheck,
          title: 'Manejo cultural',
          description: 'Reducir malezas hospederas y mejorar sanidad general del lote para bajar la presion.',
        },
        {
          icon: SprayCan,
          title: 'Intervencion oportuna',
          description: 'Aplicar medidas de control integradas priorizando selectividad y rotacion de activos.',
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
