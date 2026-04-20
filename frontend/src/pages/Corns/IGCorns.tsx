import {
  Apple,
  Droplets,
  Heart,
  ShieldCheck,
  Sprout,
  SunMedium,
  ThermometerSun,
  Wheat,
} from 'lucide-react';
import CropInfoPage from '../../components/global/CropInfoPage';
import cornImage1 from '../../assets/img/Maiz/sana/maiz1.webp';
import cornImage2 from '../../assets/img/Maiz/sana/maiz2.webp';
import cornImage3 from '../../assets/img/Maiz/sana/maiz3.webp';
import cornImage4 from '../../assets/img/Maiz/sana/Maiz4.webp';
import cornImage5 from '../../assets/img/Maiz/sana/maiz5.webp';

const cornImages = [cornImage1, cornImage2, cornImage3, cornImage4, cornImage5];

const IGCorns = () => {
  return (
    <CropInfoPage
      eyebrow="Graminea de alto impacto"
      title="Maiz"
      subtitle="Un cultivo de enorme importancia cultural, productiva y nutricional, con gran eficiencia fotosintetica y multiples usos alimentarios."
      carouselTitle="Galeria del cultivo"
      carouselDescription="Las rutas del carrusel quedaron corregidas con imports explicitos, incluyendo el archivo Maiz4.webp, para que todas las imagenes se visualicen sin depender de rutas absolutas fragiles."
      images={cornImages}
      imageAltPrefix="Maiz sano"
      overviewDescription="La informacion general ahora aparece antes de los elementos resumen, dividida en bloques que hacen mas legible la historia, la fisiologia, la nutricion y el manejo del maiz."
      overviewSections={[
        {
          icon: Wheat,
          title: 'Origen y relevancia',
          paragraphs: [
            'El maiz (Zea mays L.) desciende del teocintle domesticado en Mesoamerica y se convirtio con el tiempo en uno de los cultivos mas influyentes del planeta.',
            'Su valor va mas alla de la produccion de grano: sostiene sistemas alimentarios, industrias y tradiciones culturales en buena parte de America Latina.',
          ],
        },
        {
          icon: SunMedium,
          title: 'Eficiencia biologica',
          paragraphs: [
            'El metabolismo fotosintetico C4 le permite aprovechar mejor la luz y el calor que muchos cultivos C3, reduciendo fotorrespiracion y elevando su productividad.',
            'La arquitectura del follaje y un indice de area foliar adecuado ayudan a interceptar radiacion y sostener un llenado de grano mas eficiente.',
          ],
        },
        {
          icon: Apple,
          title: 'Aporte nutricional',
          paragraphs: [
            'El maiz aporta carbohidratos complejos, fibra, vitaminas del grupo B, vitamina E y minerales como magnesio, fosforo y potasio.',
            'En variedades amarillas destacan la luteina y la zeaxantina, mientras que los maices de colores concentran antocianinas con actividad antioxidante.',
          ],
        },
        {
          icon: ShieldCheck,
          title: 'Uso y salud',
          paragraphs: [
            'Al ser naturalmente libre de gluten, representa una alternativa segura para personas con enfermedad celiaca o sensibilidad al gluten.',
            'Su diversidad de colores y formatos alimentarios permite aprovecharlo tanto como base energetica como por sus compuestos bioactivos.',
          ],
        },
      ]}
      stats={[
        {
          value: '25-30 C',
          label: 'Rango optimo',
          note: 'Las condiciones calidas favorecen la fotosintesis C4 y el crecimiento del cultivo.',
        },
        {
          value: '500-700 mm',
          label: 'Agua requerida',
          note: 'El suministro debe mantenerse bien distribuido durante el ciclo y ser cuidadoso alrededor de la floracion.',
        },
        {
          value: 'Luteina + Zeaxantina',
          label: 'Compuestos clave',
          note: 'Carotenoides ligados a la proteccion ocular y al valor funcional del maiz amarillo.',
        },
      ]}
      benefits={[
        {
          icon: Heart,
          title: 'Proteccion ocular',
          description: 'La luteina y la zeaxantina se asocian con apoyo a la salud visual y proteccion frente al dano oxidativo.',
        },
        {
          icon: Apple,
          title: 'Fibra y saciedad',
          description: 'La fibra del maiz contribuye a la regularidad digestiva y puede apoyar estrategias de control del apetito.',
        },
        {
          icon: ShieldCheck,
          title: 'Sin gluten',
          description: 'Es una opcion segura y flexible para dietas que necesitan evitar trigo, cebada y centeno.',
        },
      ]}
      cultivation={[
        {
          icon: ThermometerSun,
          title: 'Temperatura',
          description: 'El rendimiento mejora en climas calidos, con suelos templados para lograr emergencia uniforme.',
        },
        {
          icon: Droplets,
          title: 'Agua',
          description: 'El estres hidrico cerca de la floracion puede reducir de forma severa la formacion y el llenado de granos.',
        },
        {
          icon: Sprout,
          title: 'Suelo y nutricion',
          description: 'Necesita suelos profundos y fertiles, ademas de una nutricion exigente en nitrogeno, fosforo y potasio.',
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

export default IGCorns;
