import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Youtube,
  Globe,
  MapPin,
  Phone,
} from "lucide-react";
import hero from '../assets/img/homepic.jpg';

export default function LandingPageCentroGranos() {
  return (
    <div className="min-h-screen bg-white text-green-900">
      {/* Hero */}
      {/* Hero */}
<section className="relative h-[80vh] min-h-[500px] overflow-hidden text-white">
  {/* Imagen de fondo */}
  <img
    src={hero}
    alt="Centro de Granos Nacional"
    className="absolute inset-0 h-full w-full object-cover"
  />

  {/* Overlay para legibilidad */}
  <div className="absolute inset-0 bg-green-900/60"></div>

  {/* Contenido */}
  <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 text-center">
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-4xl font-bold md:text-6xl"
    >
      Centro de Granos Nacional
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="mx-auto mt-6 max-w-3xl text-lg text-green-100"
    >
      Institución dedicada a la investigación, desarrollo e innovación en
      granos, contribuyendo a la seguridad alimentaria y al desarrollo
      agrícola del país.
    </motion.p>
  </div>
</section>


      {/* About */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid gap-10 md:grid-cols-2"
        >
          <div>
            <h2 className="text-3xl font-semibold text-green-800">
              Sobre Nosotros
            </h2>
            <p className="mt-4 leading-relaxed text-green-700">
              El Centro de Granos Nacional forma parte del Instituto de
              Investigaciones de Granos, desempeñando un papel clave en la
              generación de conocimiento científico y tecnológico enfocado en
              cultivos estratégicos.
            </p>
            <p className="mt-4 leading-relaxed text-green-700">
              Nuestro trabajo apoya a productores, instituciones y decisores a
              través de investigaciones aplicadas, transferencia tecnológica y
              divulgación científica.
            </p>
          </div>

          <div className="rounded-2xl bg-green-50 p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-green-800">
              Información de Contacto
            </h3>
            <ul className="mt-4 space-y-4 text-green-700">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-green-600" />
                <span>
                  Autopista Novia del Mediodía Km 16 1/2, Bauta, Artemisa
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-green-600" />
                <span>Teléfono: 4937 3769 (histórico)</span>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-green-600" />
                <a
                  href="http://www.iigranos.cu"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-green-700 hover:text-green-900"
                >
                  www.iigranos.cu
                </a>
              </li>
            </ul>
          </div>
        </motion.div>
      </section>

      {/* Social Media */}
      <section className="bg-green-100 py-16">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-semibold text-green-800"
          >
            Redes Sociales
          </motion.h2>
          <p className="mx-auto mt-4 max-w-2xl text-green-700">
            Mantente informado sobre nuestras investigaciones, eventos y
            publicaciones a través de nuestras plataformas oficiales.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-6">
            <a
              href="https://www.facebook.com/GranosInstituto"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-xl bg-white px-6 py-4 text-green-700 shadow-sm transition hover:bg-green-50"
            >
              <Facebook className="h-6 w-6 text-green-600" />
              Facebook
            </a>
            <a
              href="https://twitter.com/GranosInstituto"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-xl bg-white px-6 py-4 text-green-700 shadow-sm transition hover:bg-green-50"
            >
              <Twitter className="h-6 w-6 text-green-600" />
              Twitter
            </a>
            <a
              href="https://youtube.com/@institutodeinvestigaciones6739"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-xl bg-white px-6 py-4 text-green-700 shadow-sm transition hover:bg-green-50"
            >
              <Youtube className="h-6 w-6 text-green-600" />
              YouTube
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
