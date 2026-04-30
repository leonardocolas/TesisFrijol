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
import riceImage1 from '../../assets/img/Arroz/sana/arroz1.webp';
import riceImage2 from '../../assets/img/Arroz/sana/arroz2.webp';
import riceImage3 from '../../assets/img/Arroz/sana/arroz3.webp';
import riceImage4 from '../../assets/img/Arroz/sana/arroz4.webp';
import riceImage5 from '../../assets/img/Arroz/sana/arroz5.webp';

const riceImages = [riceImage1, riceImage2, riceImage3, riceImage4, riceImage5];

const IGRice = () => {
  return (
    <CropInfoPage
      eyebrow="Cereal esencial"
      title="Arroz"
      subtitle="Base energética de millones de personas y un cultivo cuya calidad nutricional cambia según el procesamiento del grano."
      carouselTitle="Galería del cultivo"
      carouselDescription="Imágenes del cultivo de arroz que muestran su desarrollo vegetativo y el aspecto general del follaje en buen estado."
      images={riceImages}
      imageAltPrefix="Arroz sano"
      overviewDescription="Panorama general del arroz, con énfasis en su papel alimentario, su valor nutricional y sus condiciones de cultivo."
      overviewSections={[
        {
          icon: Sprout,
          title: 'Base alimentaria mundial',
          paragraphs: [
            'El arroz (Oryza sativa) es uno de los cereales más importantes para la alimentación humana y sostiene la dieta cotidiana de buena parte de la población mundial.',
            'Se adapta especialmente bien a climas cálidos y húmedos, donde los arrozales permiten controlar malezas y conservar condiciones estables para el cultivo.',
          ],
        },
        {
          icon: Apple,
          title: 'Integral vs blanco',
          paragraphs: [
            'El arroz integral conserva salvado y germen, por eso ofrece más fibra, vitaminas del grupo B y minerales como magnesio, fósforo y manganeso.',
            'El arroz blanco pierde parte de esos componentes durante el pulido, pero resulta más fácil de digerir y puede integrarse en una dieta equilibrada si se acompaña bien.',
          ],
          bullets: [
            'Integral: mayor densidad nutricional y mejor saciedad.',
            'Blanco: textura más suave y utilidad en dietas de fácil digestión.',
          ],
        },
        {
          icon: ShieldCheck,
          title: 'Consumo más inteligente',
          paragraphs: [
            'Cocinar, enfriar por unas 24 horas y recalentar parte del arroz favorece la formación de almidón resistente, una fracción que actúa como prebiótico.',
            'También conviene combinarlo con legumbres para mejorar la calidad proteica total y enjuagarlo bien antes de cocinarlo para reducir impurezas y trazas no deseadas.',
          ],
        },
        {
          icon: Heart,
          title: 'Diversidad y uso culinario',
          paragraphs: [
            'Las variedades de grano largo, medio y corto se diferencian por textura y comportamiento durante la cocción, desde arroces sueltos hasta preparaciones más pegajosas.',
            'Ese abanico de usos lo convierte en un cultivo versátil tanto desde el punto de vista agrícola como gastronómico.',
          ],
        },
      ]}
      stats={[
        {
          value: '2.8 g',
          label: 'Fibra del integral',
          note: 'Aproximadamente por cada 100 gramos cocidos, con ventaja clara frente al arroz blanco.',
        },
        {
          value: '0.2 g',
          label: 'Fibra del blanco',
          note: 'Tiene menor aporte de fibra, aunque puede resultar más digestivo en ciertos contextos.',
        },
        {
          value: '24 h',
          label: 'Enfriado recomendado',
          note: 'Ese reposo favorece la conversión parcial del almidón en una forma más resistente.',
        },
      ]}
      benefits={[
        {
          icon: Leaf,
          title: 'Energía sostenida',
          description: 'Su riqueza en carbohidratos complejos lo mantiene como una base energética eficiente y versátil.',
        },
        {
          icon: Heart,
          title: 'Mejor opción integral',
          description: 'La versión integral aporta más fibra y micronutrientes, con beneficios asociados al control metabólico y cardiovascular.',
        },
        {
          icon: Apple,
          title: 'Buena combinación alimentaria',
          description: 'Acompañar el arroz con legumbres, verduras y proteínas ayuda a mejorar el equilibrio nutricional del plato.',
        },
      ]}
      cultivation={[
        {
          icon: ThermometerSun,
          title: 'Clima',
          description: 'Prospera en ambientes cálidos y húmedos donde la temperatura estable favorece el desarrollo de la planta.',
        },
        {
          icon: Droplets,
          title: 'Agua',
          description: 'El manejo del agua es central: los arrozales controlan malezas y sostienen condiciones favorables para el cultivo.',
        },
        {
          icon: Sprout,
          title: 'Variedades',
          description: 'La selección del tipo de grano condiciona rendimiento culinario, textura y destino final del producto.',
        },
      ]}
      theme={{
        pageGradient: 'from-emerald-50 via-white to-lime-50',
        heroGradient: 'from-emerald-800 via-lime-700 to-green-500',
        accentBorder: 'border-lime-200',
        accentMutedBg: 'bg-lime-100',
        accentMutedText: 'text-lime-700',
        accentStrongText: 'text-emerald-950',
        sectionTint: 'from-lime-50 to-emerald-50',
        buttonClass: 'bg-lime-600 hover:bg-lime-700',
      }}
    />
  );
};

export default IGRice;
