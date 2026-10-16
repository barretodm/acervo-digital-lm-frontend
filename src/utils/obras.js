import { fotosObra } from '../mocks/fotosObra'

export function fotoCapa(obraId) {
  return fotosObra.find((foto) => foto.obra_id === obraId && foto.capa)?.url
}
