import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const MainLayout = lazy(() => import("../layout/MainLayout"));
const Home = lazy(() => import("../pages/Home"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Beans = lazy(() => import("../pages/IGBeans"));
const Rice = lazy(() => import("../pages/IGRice"));
const Corn = lazy(() => import("../pages/IGCorns"));

const BeansPlagas = lazy(() => import("../pages/BeansPlagas"));
const BeansDeteccion = lazy(() => import("../pages/BeansDeteccion"));
const CornsPlagas = lazy(() => import("../pages/CornsPlagas"));
const RicePlagas = lazy(() => import("../pages/RicePlagas"));

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

          <Route path="beans" element={<Beans />} />
          <Route path="beans/plagas" element={<BeansPlagas />} />
          <Route path="beans/deteccion" element={<BeansDeteccion />} />
       

          <Route path="corn" element={<Corn />} />
          <Route path="corn/plagas" element={<CornsPlagas />} />


          <Route path="rice" element={<Rice />} />
          <Route path="rice/plagas" element={<RicePlagas />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}