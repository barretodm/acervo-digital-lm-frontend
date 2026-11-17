import api from "./api";

export async function listarObras({ tipo, tecnica, signal } = {}) {
  const { data } = await api.get("/obras", { params: { tipo, tecnica }, signal });
  return data;
}

export async function buscarObra(id, signal) {
  const { data } = await api.get(`/obras/${encodeURIComponent(id)}`, { signal });
  return data;
}

export async function listarHistorico(signal) {
  const { data } = await api.get("/obras/historico", { signal });
  return data;
}

export async function criarObra(obra) {
  const { data } = await api.post("/obras", obra);
  return data;
}

export async function atualizarObra(id, obra) {
  const { data } = await api.put(`/obras/${encodeURIComponent(id)}`, obra);
  return data;
}

export async function atualizarStatusObra(id, status) {
  const { data } = await api.patch(`/obras/${encodeURIComponent(id)}/status`, { status });
  return data;
}

export async function reativarObra(id) {
  const { data } = await api.post(`/obras/${encodeURIComponent(id)}/reativar`);
  return data;
}

export async function excluirObra(id) {
  await api.delete(`/obras/${encodeURIComponent(id)}`);
}

export async function adicionarFoto(obraId, imagem, capa) {
  const dados = new FormData();
  dados.append("foto", imagem);
  if (capa) dados.append("capa", "true");
  const { data } = await api.post(`/obras/${encodeURIComponent(obraId)}/fotos`, dados);
  return data;
}

export async function removerFoto(obraId, fotoId) {
  await api.delete(`/obras/${encodeURIComponent(obraId)}/fotos/${encodeURIComponent(fotoId)}`);
}
