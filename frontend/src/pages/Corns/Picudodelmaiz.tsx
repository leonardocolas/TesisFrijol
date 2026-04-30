import { AlertTriangle, Bug, Eye, Package, ShieldCheck, SprayCan, Warehouse } from 'lucide-react';
import CropInfoPage from '../../components/global/CropInfoPage';
import img1 from '../../assets/img/Maiz/Picudo del maíz/Picudo del maíz1.webp';
import img2 from '../../assets/img/Maiz/Picudo del maíz/Picudo del maíz2.webp';
import img3 from '../../assets/img/Maiz/Picudo del maíz/Picudo del maíz3.webp';

const images = [img1, img2, img3];

const PicudoDelMaiz = () => {
  return (
    <CropInfoPage
      eyebrow="Maíz - postcosecha"
      title="Picudo del maíz"
      subtitle="Plaga de almacenamiento que perfora granos y reduce calidad, peso y viabilidad del lote."
      carouselTitle="Galería de síntomas"
      carouselDescription="Referencias visuales de granos afectados por picudo y señales de infestación en almacenamiento."
      images={images}
      imageAltPrefix="Picudo del maíz"
      infoTitle="Información técnica"
      summaryTitle="Resumen de control en almacén"
      summaryDescription="Puntos clave para detectar infestación temprana y reducir mermas en grano almacenado."
      statsTitle="Indicadores postcosecha"
      benefitsTitle="Señales de infestación"
      cultivationTitle="Manejo preventivo"
      overviewDescription="El picudo se desarrolla dentro del grano, por lo que la detección visual temprana y las buenas prácticas de almacenamiento son determinantes."
      overviewSections={[
        {
          icon: Bug,
          title: 'Biología de la plaga',
          paragraphs: [
            'Adultos ovipositan en grano y las larvas completan su ciclo en el interior.',
            'La infestación puede mantenerse oculta hasta que emerge nueva generación.',
          ],
        },
        {
          icon: Package,
          title: 'Impacto económico',
          paragraphs: [
            'Aumenta porcentaje de grano perforado y reduce peso útil comercializable.',
            'También compromete calidad sanitaria al favorecer contaminación secundaria.',
          ],
        },
        {
          icon: Eye,
          title: 'Diagnóstico en almacén',
          paragraphs: [
            'Revisar periódicamente muestra de sacos o celdas buscando orificios y polvo fino.',
            'Monitorear olor, temperatura y presencia de insectos vivos en superficie.',
          ],
        },
        {
          icon: AlertTriangle,
          title: 'Factores de riesgo',
          paragraphs: [
            'Humedad alta del grano y limpieza deficiente del almacén elevan incidencia.',
            'La mezcla de lotes viejos y nuevos acelera diseminación interna.',
          ],
        },
      ]}
      stats={[
        {
          value: 'Interno',
          label: 'Tipo de daño',
          note: 'La alimentación larval ocurre dentro del grano y reduce detección temprana.',
        },
        {
          value: 'Postcosecha',
          label: 'Etapa critica',
          note: 'La mayor pérdida aparece durante almacenamiento sin control continuo.',
        },
        {
          value: 'Acumulativo',
          label: 'Comportamiento',
          note: 'El daño aumenta con el tiempo si no se rompe el ciclo reproductivo.',
        },
      ]}
      benefits={[
        {
          icon: Eye,
          title: 'Perforaciones',
          description: 'Granos con orificios visibles y pérdida de integridad física.',
        },
        {
          icon: AlertTriangle,
          title: 'Merma de peso',
          description: 'Disminución progresiva del volumen útil del lote almacenado.',
        },
        {
          icon: Warehouse,
          title: 'Focos en almacenamiento',
          description: 'Mayor concentración en zonas con ventilación deficiente o limpieza insuficiente.',
        },
      ]}
      cultivation={[
        {
          icon: ShieldCheck,
          title: 'Secado correcto',
          description: 'Almacenar solo grano con humedad adecuada para reducir reproducción del picudo.',
        },
        {
          icon: Warehouse,
          title: 'Higiene del almacén',
          description: 'Limpiar estructuras, retirar residuos y separar lotes para evitar reinfestación.',
        },
        {
          icon: SprayCan,
          title: 'Control postcosecha',
          description: 'Aplicar tratamientos autorizados y monitoreo periódico según protocolo local.',
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

export default PicudoDelMaiz;
