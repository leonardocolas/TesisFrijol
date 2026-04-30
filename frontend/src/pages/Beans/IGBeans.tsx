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
      carouselTitle="Galería del cultivo"
      carouselDescription="Imágenes del cultivo de frijol en distintas etapas, útiles para reconocer su follaje, porte y estado general."
      images={beanImages}
      imageAltPrefix="Frijol sano"
      overviewDescription="Panorama general del cultivo, desde su origen y valor agronómico hasta su aporte nutricional y sus principales condiciones de manejo."
      overviewSections={[
        {
          icon: Sprout,
          title: 'Origen e identidad',
          paragraphs: [
            'El frijol común (Phaseolus vulgaris L.) pertenece a la familia Fabaceae y fue domesticado de forma independiente en Mesoamérica y la región andina hace miles de años.',
            'Junto con el maíz y la calabaza formó la base de la milpa, un sistema agrícola tradicional donde cada cultivo aporta funciones complementarias.',
          ],
        },
        {
          icon: Leaf,
          title: 'Valor agronómico',
          paragraphs: [
            'El frijol establece simbiosis con bacterias del género Rhizobium, capaces de fijar nitrógeno atmosférico y convertirlo en una forma útil para la planta.',
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
            'Su contenido proteico suele ubicarse entre 18% y 25% del peso seco, por lo que es una referencia importante de proteína vegetal en la dieta.',
            'También aporta fibra, carbohidratos de liberación lenta, hierro, magnesio, potasio y folato, una combinación asociada con energía sostenida y buena saciedad.',
          ],
        },
        {
          icon: ShieldCheck,
          title: 'Consumo y salud',
          paragraphs: [
            'El consumo frecuente de legumbres se asocia con beneficios cardiovasculares, mejor control glucémico y apoyo a la microbiota intestinal gracias a la fibra fermentable y al almidón resistente.',
            'El remojo prolongado y el cambio del agua de cocción ayudan a reducir los oligosacáridos que causan gases, mejorando la tolerancia digestiva.',
          ],
        },
      ]}
      stats={[
        {
          value: '18-25%',
          label: 'Proteína vegetal',
          note: 'Rango habitual del grano seco, clave para dietas basadas en plantas.',
        },
        {
          value: '12-15 g',
          label: 'Fibra por taza cocida',
          note: 'Contribuye a la saciedad, la salud digestiva y el control metabolico.',
        },
        {
          value: '16-24 °C',
          label: 'Temperatura preferida',
          note: 'El rendimiento mejora en climas templados a cálidos sin extremos térmicos.',
        },
      ]}
      benefits={[
        {
          icon: Heart,
          title: 'Protección cardiovascular',
          description: 'La fibra soluble y el potasio favorecen perfiles lipídicos más sanos y mejor regulación de la presión arterial.',
        },
        {
          icon: Apple,
          title: 'Saciedad y control glucémico',
          description: 'Proteína, fibra y carbohidratos complejos enlentecen la absorción de azúcares y ayudan a mantener energía estable.',
        },
        {
          icon: Leaf,
          title: 'Proteína complementaria',
          description: 'Combinado con arroz o maíz aporta un perfil de aminoácidos más completo y de alto valor biológico.',
        },
      ]}
      cultivation={[
        {
          icon: ThermometerSun,
          title: 'Clima',
          description: 'Prefiere temperaturas medias y es sensible tanto a heladas como a calor excesivo durante la floración.',
        },
        {
          icon: Droplets,
          title: 'Suelo',
          description: 'Necesita suelos sueltos, bien drenados y sin encharcamientos prolongados para evitar daño radicular.',
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
