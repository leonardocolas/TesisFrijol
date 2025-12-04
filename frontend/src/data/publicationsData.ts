// src/data/publicationsData.ts
export interface Publication {
  id: number;
  title: string;
  authors: string;
  publicationDate: string;
  summary: string;
  pdfUrl: string;
  viewUrl: string;
  isNew: boolean;
}

export const publicationsData: Publication[] = [
  {
    id: 1,
    title: "Análisis del Mercado de Maíz 2024",
    authors: "Dr. A. Pérez, Ing. M. Soto",
    publicationDate: "2024-10-15",
    summary: "Estudio exhaustivo sobre las tendencias de precios y demanda en la cosecha actual de maíz y proyecciones futuras.",
    pdfUrl: "/docs/maiz_2024_reporte.pdf",
    viewUrl: "/publicacion/maiz-2024",
    isNew: true,
  },
  {
    id: 2,
    title: "Impacto de la Sequía en el Cultivo de Frijol",
    authors: "Lic. R. Guzmán",
    publicationDate: "2023-12-01",
    summary: "Revisión de las estrategias de mitigación implementadas para contrarrestar los efectos del cambio climático en el frijol.",
    pdfUrl: "/docs/frijol_sequia.pdf",
    viewUrl: "/publicacion/frijol-sequia",
    isNew: false,
  },
];