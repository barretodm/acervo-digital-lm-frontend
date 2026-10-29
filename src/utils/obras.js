import { fotosObra } from "../mocks/fotosObra";

export function fotoCapa(obraId) {
  return fotosObra.find((foto) => foto.obra_id === obraId && foto.capa)?.url;
}

export function fotosDaObra(obraId) {
  return fotosObra
    .filter((foto) => foto.obra_id === obraId)
    .sort((a, b) => a.ordem - b.ordem)
    .map((foto) => foto.url);
}

// RF11/RF13: ao definir o status como "vendido", a obra sai do acervo
// ativo automaticamente e vai pro historico interno.
export function aplicarMudancaStatus(obra, novoStatus) {
  return {
    ...obra,
    status: novoStatus,
    ativa: novoStatus === "vendido" ? false : obra.ativa,
  };
}
