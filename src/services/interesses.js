import api from "./api";

export async function listarTodosInteresses(signal) {
  const { data } = await api.get("/interesses", { signal });
  return data;
}

export async function listarInteresses(obraId, signal) {
  const { data } = await api.get(`/obras/${encodeURIComponent(obraId)}/interesses`, { signal });
  return data;
}

export async function enviarInteresse(dados) {
  await api.post("/interesses", dados);
}
