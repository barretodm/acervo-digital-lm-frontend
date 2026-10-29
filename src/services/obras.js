import { supabase } from "./supabase";
import { obras as obrasMock } from "../mocks/obras";
import { fotoCapa } from "../utils/obras";

const COLUNAS =
  "id, img:imagem_url, artista, tecnica, ano, tipo, status, titulo, valor, descricao";
const espera = (ms) => new Promise((r) => setTimeout(r, ms));

function paraObraPublica(obra) {
  return {
    ...obra,
    img: fotoCapa(obra.id),
  };
}

export async function listarObras(signal) {
  if (!supabase) {
    await espera(300);
    return obrasMock.filter((obra) => obra.ativa).map(paraObraPublica);
  }
  const { data, error } = await supabase
    .from("obras")
    .select(COLUNAS)
    .order("criado_em", { ascending: false })
    .abortSignal(signal);
  if (error) throw error;
  return data;
}

export async function buscarObra(id, signal) {
  if (!supabase) {
    await espera(300);
    const obra = obrasMock.find((o) => String(o.id) === String(id));
    if (!obra) throw new Error("Obra não encontrada");
    return paraObraPublica(obra);
  }
  const { data, error } = await supabase
    .from("obras")
    .select(COLUNAS)
    .eq("id", id)
    .abortSignal(signal)
    .single();
  if (error) throw error;
  return data;
}

export async function enviarInteresse(dados) {
  if (!supabase) {
    await espera(500);
    console.log("[modo exemplo] interesse que seria enviado:", dados);
    return;
  }
  const { error } = await supabase.from("interesses").insert(dados);
  if (error) throw error;
}
