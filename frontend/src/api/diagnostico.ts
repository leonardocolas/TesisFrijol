export interface HojaResultado {
  bounding_box: number[];
  prob_sana: number;
  prob_mosaico_dorado: number;
  clase: string;
}

export interface DiagnosticoResponse {
  diagnostico_general: string;
  cantidad_hojas: number;
  detalles_por_hoja: HojaResultado[];
}

const API_URL = "http://127.0.0.1:8000/api/diagnosticar/";

export async function enviarImagenDiagnostico(file: File): Promise<DiagnosticoResponse> {
  const formData = new FormData();
  formData.append("imagen", file);

  const response = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || "Error procesando la imagen en el servidor");
  }

  return response.json();
}
