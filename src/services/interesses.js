import { supabase } from "./supabase";
import { interesses as interessesMock } from "../mocks/interesses";

const espera = (ms) => new Promise((r) => setTimeout(r, ms));

export async function listarTodosInteresses(signal) {
  if (!supabase) {
    await espera(300);
    return interessesMock;
  }
  const { data, error } = await supabase
    .from("interesses")
    .select("*")
    .order("criado_em", { ascending: false })
    .abortSignal(signal);
  if (error) throw error;
  return data;
}

export async function listarInteresses(obraId, signal) {
  if (!supabase) {
    await espera(300);
    return interessesMock.filter((interesse) => interesse.obra_id === obraId);
  }
  const { data, error } = await supabase
    .from("interesses")
    .select("*")
    .eq("obra_id", obraId)
    .order("criado_em", { ascending: false })
    .abortSignal(signal);
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
