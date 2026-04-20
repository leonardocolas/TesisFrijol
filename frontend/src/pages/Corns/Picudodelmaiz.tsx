import { AlertTriangle, Bug, Eye, Package, ShieldCheck, SprayCan, Warehouse } from 'lucide-react';
import CropInfoPage from '../../components/global/CropInfoPage';
import img1 from '../../assets/img/Maiz/Picudo del maíz/Picudo del maíz1.webp';
import img2 from '../../assets/img/Maiz/Picudo del maíz/Picudo del maíz2.webp';
import img3 from '../../assets/img/Maiz/Picudo del maíz/Picudo del maíz3.webp';

const images = [img1, img2, img3];

const PicudoDelMaiz = () => {
  return (
    <CropInfoPage
      eyebrow="Maiz - postcosecha"
      title="Picudo del maiz"
      subtitle="Plaga de almacenamiento que perfora granos y reduce calidad, peso y viabilidad del lote."
      carouselTitle="Galeria de sintomas"
      carouselDescription="Referencias visuales de granos afectados por picudo y senales de infestacion en almacenamiento."
      images={images}
      imageAltPrefix="Picudo del maiz"
      infoTitle="Informacion tecnica"
      summaryTitle="Resumen de control en almacen"
      summaryDescription="Puntos clave para detectar infestacion temprana y reducir mermas en grano almacenado."
      statsTitle="Indicadores postcosecha"
      benefitsTitle="Senales de infestacion"
      cultivationTitle="Manejo preventivo"
      overviewDescription="El picudo se desarrolla dentro del grano, por lo que la deteccion visual temprana y las buenas practicas de almacenamiento son determinantes."
      overviewSections={[
        {
          icon: Bug,
          title: 'Biologia de la plaga',
          paragraphs: [
            'Adultos ovipositan en grano y las larvas completan su ciclo en el interior.',
            'La infestacion puede mantenerse oculta hasta que emerge nueva generacion.',
          ],
        },
        {
          icon: Package,
          title: 'Impacto economico',
          paragraphs: [
            'Aumenta porcentaje de grano perforado y reduce peso util comercializable.',
            'Tambien compromete calidad sanitaria al favorecer contaminacion secundaria.',
          ],
        },
        {
          icon: Eye,
          title: 'Diagnostico en almacen',
          paragraphs: [
            'Revisar periodicamente muestra de sacos o celdas buscando orificios y polvo fino.',
            'Monitorear olor, temperatura y presencia de insectos vivos en superficie.',
          ],
        },
        {
          icon: AlertTriangle,
          title: 'Factores de riesgo',
          paragraphs: [
            'Humedad alta del grano y limpieza deficiente del almacen elevan incidencia.',
            'La mezcla de lotes viejos y nuevos acelera diseminacion interna.',
          ],
        },
      ]}
      stats={[
        {
          value: 'Interno',
          label: 'Tipo de dano',
          note: 'La alimentacion larval ocurre dentro del grano y reduce deteccion temprana.',
        },
        {
          value: 'Postcosecha',
          label: 'Etapa critica',
          note: 'La mayor perdida aparece durante almacenamiento sin control continuo.',
        },
        {
          value: 'Acumulativo',
          label: 'Comportamiento',
          note: 'El dano aumenta con el tiempo si no se rompe el ciclo reproductivo.',
        },
      ]}
      benefits={[
        {
          icon: Eye,
          title: 'Perforaciones',
          description: 'Granos con orificios visibles y perdida de integridad fisica.',
        },
        {
          icon: AlertTriangle,
          title: 'Merma de peso',
          description: 'Disminucion progresiva del volumen util del lote almacenado.',
        },
        {
          icon: Warehouse,
          title: 'Focos en almacenamiento',
          description: 'Mayor concentracion en zonas con ventilacion deficiente o limpieza insuficiente.',
        },
      ]}
      cultivation={[
        {
          icon: ShieldCheck,
          title: 'Secado correcto',
          description: 'Almacenar solo grano con humedad adecuada para reducir reproduccion del picudo.',
        },
        {
          icon: Warehouse,
          title: 'Higiene del almacen',
          description: 'Limpiar estructuras, retirar residuos y separar lotes para evitar reinfestacion.',
        },
        {
          icon: SprayCan,
          title: 'Control postcosecha',
          description: 'Aplicar tratamientos autorizados y monitoreo periodico segun protocolo local.',
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
