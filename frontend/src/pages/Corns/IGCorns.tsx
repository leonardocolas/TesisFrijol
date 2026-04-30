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
      eyebrow="Gramínea de alto impacto"
      title="Maíz"
      subtitle="Un cultivo de enorme importancia cultural, productiva y nutricional, con gran eficiencia fotosintética y múltiples usos alimentarios."
      carouselTitle="Galería del cultivo"
      carouselDescription="Imágenes del cultivo de maíz en distintas etapas, útiles para observar su desarrollo, estructura foliar y estado general."
      images={cornImages}
      imageAltPrefix="Maíz sano"
      overviewDescription="Panorama general del maíz, con énfasis en su origen, su eficiencia biológica, su valor nutricional y sus requerimientos de manejo."
      overviewSections={[
        {
          icon: Wheat,
          title: 'Origen y relevancia',
          paragraphs: [
            'El maíz (Zea mays L.) desciende del teocintle domesticado en Mesoamérica y se convirtió con el tiempo en uno de los cultivos más influyentes del planeta.',
            'Su valor va más allá de la producción de grano: sostiene sistemas alimentarios, industrias y tradiciones culturales en buena parte de América Latina.',
          ],
        },
        {
          icon: SunMedium,
          title: 'Eficiencia biológica',
          paragraphs: [
            'El metabolismo fotosintético C4 le permite aprovechar mejor la luz y el calor que muchos cultivos C3, reduciendo fotorrespiración y elevando su productividad.',
            'La arquitectura del follaje y un índice de área foliar adecuado ayudan a interceptar radiación y sostener un llenado de grano más eficiente.',
          ],
        },
        {
          icon: Apple,
          title: 'Aporte nutricional',
          paragraphs: [
            'El maíz aporta carbohidratos complejos, fibra, vitaminas del grupo B, vitamina E y minerales como magnesio, fósforo y potasio.',
            'En variedades amarillas destacan la luteína y la zeaxantina, mientras que los maíces de colores concentran antocianinas con actividad antioxidante.',
          ],
        },
        {
          icon: ShieldCheck,
          title: 'Uso y salud',
          paragraphs: [
            'Al ser naturalmente libre de gluten, representa una alternativa segura para personas con enfermedad celíaca o sensibilidad al gluten.',
            'Su diversidad de colores y formatos alimentarios permite aprovecharlo tanto como base energética como por sus compuestos bioactivos.',
          ],
        },
      ]}
      stats={[
        {
          value: '25-30 °C',
          label: 'Rango óptimo',
          note: 'Las condiciones cálidas favorecen la fotosíntesis C4 y el crecimiento del cultivo.',
        },
        {
          value: '500-700 mm',
          label: 'Agua requerida',
          note: 'El suministro debe mantenerse bien distribuido durante el ciclo y ser cuidadoso alrededor de la floración.',
        },
        {
          value: 'Luteina + Zeaxantina',
          label: 'Compuestos clave',
          note: 'Carotenoides ligados a la protección ocular y al valor funcional del maíz amarillo.',
        },
      ]}
      benefits={[
        {
          icon: Heart,
          title: 'Protección ocular',
          description: 'La luteína y la zeaxantina se asocian con apoyo a la salud visual y protección frente al daño oxidativo.',
        },
        {
          icon: Apple,
          title: 'Fibra y saciedad',
          description: 'La fibra del maíz contribuye a la regularidad digestiva y puede apoyar estrategias de control del apetito.',
        },
        {
          icon: ShieldCheck,
          title: 'Sin gluten',
          description: 'Es una opción segura y flexible para dietas que necesitan evitar trigo, cebada y centeno.',
        },
      ]}
      cultivation={[
        {
          icon: ThermometerSun,
          title: 'Temperatura',
          description: 'El rendimiento mejora en climas cálidos, con suelos templados para lograr emergencia uniforme.',
        },
        {
          icon: Droplets,
          title: 'Agua',
          description: 'El estrés hídrico cerca de la floración puede reducir de forma severa la formación y el llenado de granos.',
        },
        {
          icon: Sprout,
          title: 'Suelo y nutrición',
          description: 'Necesita suelos profundos y fértiles, además de una nutrición exigente en nitrógeno, fósforo y potasio.',
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
