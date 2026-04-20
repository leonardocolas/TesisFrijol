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
      subtitle="Base energetica de millones de personas y un cultivo cuya calidad nutricional cambia segun el procesamiento del grano."
      carouselTitle="Galeria del cultivo"
      carouselDescription="El carrusel se ubica al inicio del contenido visual y ahora recibe imagenes importadas correctamente desde src/assets para que cada foto aparezca en la pagina."
      images={riceImages}
      imageAltPrefix="Arroz sano"
      overviewDescription="Despues del carrusel, la informacion general se reorganiza en bloques cortos para distinguir mejor origen, nutricion, consumo y cultivo."
      overviewSections={[
        {
          icon: Sprout,
          title: 'Base alimentaria mundial',
          paragraphs: [
            'El arroz (Oryza sativa) es uno de los cereales mas importantes para la alimentacion humana y sostiene la dieta cotidiana de buena parte de la poblacion mundial.',
            'Se adapta especialmente bien a climas calidos y humedos, donde los arrozales permiten controlar malezas y conservar condiciones estables para el cultivo.',
          ],
        },
        {
          icon: Apple,
          title: 'Integral vs blanco',
          paragraphs: [
            'El arroz integral conserva salvado y germen, por eso ofrece mas fibra, vitaminas del grupo B y minerales como magnesio, fosforo y manganeso.',
            'El arroz blanco pierde parte de esos componentes durante el pulido, pero resulta mas facil de digerir y puede integrarse en una dieta equilibrada si se acompana bien.',
          ],
          bullets: [
            'Integral: mayor densidad nutricional y mejor saciedad.',
            'Blanco: textura mas suave y utilidad en dietas de facil digestion.',
          ],
        },
        {
          icon: ShieldCheck,
          title: 'Consumo mas inteligente',
          paragraphs: [
            'Cocinar, enfriar por unas 24 horas y recalentar parte del arroz favorece la formacion de almidon resistente, una fraccion que actua como prebiotico.',
            'Tambien conviene combinarlo con legumbres para mejorar la calidad proteica total y enjuagarlo bien antes de cocinarlo para reducir impurezas y trazas no deseadas.',
          ],
        },
        {
          icon: Heart,
          title: 'Diversidad y uso culinario',
          paragraphs: [
            'Las variedades de grano largo, medio y corto se diferencian por textura y comportamiento durante la coccion, desde arroces sueltos hasta preparaciones mas pegajosas.',
            'Ese abanico de usos lo convierte en un cultivo versatil tanto desde el punto de vista agricola como gastronomico.',
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
          note: 'Tiene menor aporte de fibra, aunque puede resultar mas digestivo en ciertos contextos.',
        },
        {
          value: '24 h',
          label: 'Enfriado recomendado',
          note: 'Ese reposo favorece la conversion parcial del almidon en una forma mas resistente.',
        },
      ]}
      benefits={[
        {
          icon: Leaf,
          title: 'Energia sostenida',
          description: 'Su riqueza en carbohidratos complejos lo mantiene como una base energetica eficiente y versatil.',
        },
        {
          icon: Heart,
          title: 'Mejor opcion integral',
          description: 'La version integral aporta mas fibra y micronutrientes, con beneficios asociados al control metabolico y cardiovascular.',
        },
        {
          icon: Apple,
          title: 'Buena combinacion alimentaria',
          description: 'Acompanar el arroz con legumbres, verduras y proteinas ayuda a mejorar el equilibrio nutricional del plato.',
        },
      ]}
      cultivation={[
        {
          icon: ThermometerSun,
          title: 'Clima',
          description: 'Prospera en ambientes calidos y humedos donde la temperatura estable favorece el desarrollo de la planta.',
        },
        {
          icon: Droplets,
          title: 'Agua',
          description: 'El manejo del agua es central: los arrozales controlan malezas y sostienen condiciones favorables para el cultivo.',
        },
        {
          icon: Sprout,
          title: 'Variedades',
          description: 'La seleccion del tipo de grano condiciona rendimiento culinario, textura y destino final del producto.',
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
