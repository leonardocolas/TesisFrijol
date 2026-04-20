import {
  Apple,
  Droplets,
  Heart,
  Leaf,
  ShieldCheck,
  Sprout,
  ThermometerSun,
} from 'lucide-react';
import CropInfoPage from '../../components/global/CropInfoPage';
import beanImage1 from '../../assets/img/Frijol/sana/frijol1.webp';
import beanImage2 from '../../assets/img/Frijol/sana/frijol2.webp';
import beanImage3 from '../../assets/img/Frijol/sana/Frijol3.webp';
import beanImage4 from '../../assets/img/Frijol/sana/Frijol4.webp';
import beanImage5 from '../../assets/img/Frijol/sana/frijol5.webp';

const beanImages = [beanImage1, beanImage2, beanImage3, beanImage4, beanImage5];

const IGBeans = () => {
  return (
    <CropInfoPage
      eyebrow="Leguminosa clave"
      title="Frijol"
      subtitle="Un cultivo esencial por su aporte proteico, su valor en la milpa y su capacidad de mejorar el suelo."
      carouselTitle="Galeria del cultivo"
      carouselDescription="Las imagenes del carrusel ahora cargan desde imports reales de Vite para asegurar que el componente y la pagina muestren correctamente cada fotografia del frijol."
      images={beanImages}
      imageAltPrefix="Frijol sano"
      overviewDescription="Primero se presenta el contexto general del cultivo, separado en bloques tematicos para que la lectura sea mas clara antes de pasar al resumen visual."
      overviewSections={[
        {
          icon: Sprout,
          title: 'Origen e identidad',
          paragraphs: [
            'El frijol comun (Phaseolus vulgaris L.) pertenece a la familia Fabaceae y fue domesticado de forma independiente en Mesoamerica y la region andina hace miles de anos.',
            'Junto con el maiz y la calabaza formo la base de la milpa, un sistema agricola tradicional donde cada cultivo aporta funciones complementarias.',
          ],
        },
        {
          icon: Leaf,
          title: 'Valor agronomico',
          paragraphs: [
            'El frijol establece simbiosis con bacterias del genero Rhizobium, capaces de fijar nitrogeno atmosferico y convertirlo en una forma util para la planta.',
            'Esa capacidad mejora la fertilidad del suelo y lo vuelve especialmente valioso en rotaciones y sistemas de agricultura regenerativa.',
          ],
          bullets: [
            'Puede enriquecer el suelo para cultivos posteriores.',
            'Tolera mejor suelos modestos si cuenta con drenaje y manejo adecuado.',
          ],
        },
        {
          icon: Apple,
          title: 'Perfil nutricional',
          paragraphs: [
            'Su contenido proteico suele ubicarse entre 18% y 25% del peso seco, por lo que es una referencia importante de proteina vegetal en la dieta.',
            'Tambien aporta fibra, carbohidratos de liberacion lenta, hierro, magnesio, potasio y folato, una combinacion asociada con energia sostenida y buena saciedad.',
          ],
        },
        {
          icon: ShieldCheck,
          title: 'Consumo y salud',
          paragraphs: [
            'El consumo frecuente de legumbres se asocia con beneficios cardiovasculares, mejor control glucemico y apoyo a la microbiota intestinal gracias a la fibra fermentable y al almidon resistente.',
            'El remojo prolongado y el cambio del agua de coccion ayudan a reducir los oligosacaridos que causan gases, mejorando la tolerancia digestiva.',
          ],
        },
      ]}
      stats={[
        {
          value: '18-25%',
          label: 'Proteina vegetal',
          note: 'Rango habitual del grano seco, clave para dietas basadas en plantas.',
        },
        {
          value: '12-15 g',
          label: 'Fibra por taza cocida',
          note: 'Contribuye a la saciedad, la salud digestiva y el control metabolico.',
        },
        {
          value: '16-24 C',
          label: 'Temperatura preferida',
          note: 'El rendimiento mejora en climas templados a calidos sin extremos termicos.',
        },
      ]}
      benefits={[
        {
          icon: Heart,
          title: 'Proteccion cardiovascular',
          description: 'La fibra soluble y el potasio favorecen perfiles lipidicos mas sanos y mejor regulacion de la presion arterial.',
        },
        {
          icon: Apple,
          title: 'Saciedad y control glucemico',
          description: 'Proteina, fibra y carbohidratos complejos enlentecen la absorcion de azucares y ayudan a mantener energia estable.',
        },
        {
          icon: Leaf,
          title: 'Proteina complementaria',
          description: 'Combinado con arroz o maiz aporta un perfil de aminoacidos mas completo y de alto valor biologico.',
        },
      ]}
      cultivation={[
        {
          icon: ThermometerSun,
          title: 'Clima',
          description: 'Prefiere temperaturas medias y es sensible tanto a heladas como a calor excesivo durante la floracion.',
        },
        {
          icon: Droplets,
          title: 'Suelo',
          description: 'Necesita suelos sueltos, bien drenados y sin encharcamientos prolongados para evitar dano radicular.',
        },
        {
          icon: Sprout,
          title: 'Manejo',
          description: 'La siembra directa, el soporte en variedades trepadoras y la cosecha oportuna mejoran la calidad del grano.',
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

export default IGBeans;
