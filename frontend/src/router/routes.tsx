import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const MainLayout = lazy(() => import("../layout/MainLayout"));
const Home = lazy(() => import("../pages/Home"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Beans = lazy(() => import("../pages/Beans/IGBeans"));
const Rice = lazy(() => import("../pages/Rice/IGRice"));
const Corn = lazy(() => import("../pages/Corns/IGCorns"));

const BeansPlagas = lazy(() => import("../pages/Beans/BeansPlagas"));
const BeansDeteccion = lazy(() => import("../pages/Beans/BeansDeteccion"));
const MoscaBlanca = lazy(() => import("../pages/Beans/MoscaBlanca"));
const MosaicoDorado = lazy(() => import("../pages/Beans/MosaicoDorado"));
const Empoasca = lazy(() => import("../pages/Beans/Empoasca"));
const CornsPlagas = lazy(() => import("../pages/Corns/CornsPlagas"));
const GusanoCogollero = lazy(() => import("../pages/Corns/Gusanocogollero"));
const RoyaDelMaiz = lazy(() => import("../pages/Corns/Royadelmaiz"));
const PicudoDelMaiz = lazy(() => import("../pages/Corns/Picudodelmaiz"));
const RicePlagas = lazy(() => import("../pages/Rice/RicePlagas"));
const ManchaParda = lazy(() => import("../pages/Rice/Manchaparda"));
const ChincheDelArroz = lazy(() => import("../pages/Rice/Chinchedelarroz"));
const LandingPageCentroGranos = lazy(() =>import("../pages/LandingPageCentroGranos"));

export function AppRouter() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex items-center justify-center">
          Cargando…
        </div>
      }
    >
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          
          <Route path="centro-granos" element={<LandingPageCentroGranos />} />

          <Route path="beans" element={<Beans />} />
          <Route path="beans/plagas" element={<BeansPlagas />} />
          <Route path="beans/enfermedades/mosca-blanca" element={<MoscaBlanca />} />
          <Route path="beans/enfermedades/mosaico-dorado" element={<MosaicoDorado />} />
          <Route path="beans/enfermedades/empoasca" element={<Empoasca />} />
          <Route path="beans/deteccion" element={<BeansDeteccion />} />
       

          <Route path="corn" element={<Corn />} />
          <Route path="corn/plagas" element={<CornsPlagas />} />
          <Route path="corn/enfermedades/gusano-cogollero" element={<GusanoCogollero />} />
          <Route path="corn/enfermedades/roya-del-maiz" element={<RoyaDelMaiz />} />
          <Route path="corn/enfermedades/picudo-del-maiz" element={<PicudoDelMaiz />} />


          <Route path="rice" element={<Rice />} />
          <Route path="rice/plagas" element={<RicePlagas />} />
          <Route path="rice/enfermedades/mancha-parda" element={<ManchaParda />} />
          <Route path="rice/enfermedades/chinche-del-arroz" element={<ChincheDelArroz />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
