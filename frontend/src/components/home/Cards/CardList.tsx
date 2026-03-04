import React from "react";
import { motion} from "framer-motion";
import Card from "./Card";
import imgrice from "../../../assets/img/imgrice.jpg";
import imgbeans from "../../../assets/img/imgfrijol.avif";
import imgcorns from "../../../assets/img/imgmaiz.jpg";
import { Sprout } from "lucide-react";

const cardsData = [
  {
    image: imgbeans,
    title: "Frijol",
    description: "Leguminosa rica en proteínas, hierro y fibra. Cultivo básico en la dieta latinoamericana que fija nitrógeno al suelo, mejorando su fertilidad naturalmente.",
    link: "/beans",
    backgroundColor: "bg-green-500",
  },
  {
    image: imgrice,
    title: "Arroz",
    description: "Cereal fundamental para la alimentación mundial. Requiere abundante agua para su cultivo y es la principal fuente de calorías para más de la mitad de la población global.",
    link: "/rice",
    backgroundColor: "bg-lime-500",
  },
  {
    image: imgcorns,
    title: "Maíz",
    description: "Cereal originario de América con múltiples usos: alimentación humana, animal y producción industrial. Base de la dieta mesoamericana y cultivo versátil y resistente.",
    link: "/corn",
    backgroundColor: "bg-lime-400",
  },
];

const CardsList: React.FC = () => {
  return (
    <div className="py-20 bg-gray-50">
      <Sprout size={40} className="mx-auto mb-3 text-lime-600" />
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center mb-12">
        Cultivos
      </h2>
      
  
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 max-w-7xl mx-auto">
        {cardsData.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <Card
              image={card.image}
              title={card.title}
              description={card.description}
              link={card.link}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CardsList;