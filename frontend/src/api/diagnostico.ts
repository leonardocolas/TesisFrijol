export interface HojaResultado {
  bounding_box: number[];
  prob_sana: number;
  prob_sano?: number;
  prob_mosaico_dorado: number;
  clase: string;
  clase_canonica?: string;
}

export interface DiagnosticoResponse {
  diagnostico_general: string;
  diagnostico_general_canonico?: string | null;
  cantidad_hojas: number;
  detalles_por_hoja: HojaResultado[];
}

const API_BASE_URL = "http://127.0.0.1:8000/api";
const API_URL = `${API_BASE_URL}/diagnosticar/`;
const WARMUP_URL = `${API_BASE_URL}/diagnosticar/warmup/`;

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

export async function precalentarDiagnostico(): Promise<void> {
  try {
    await fetch(WARMUP_URL, { method: "GET" });
  } catch {
  }
}
