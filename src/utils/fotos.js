export function fotoCapa(fotos) {
  if (!fotos || fotos.length === 0) return undefined;
  return fotos.find((foto) => foto.capa)?.url ?? fotos[0].url;
}
