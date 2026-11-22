import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";
import { criarObra, adicionarFoto } from "../../services/obras";
import AdminHeader from "../../components/layout/AdminHeader";
import AdminField from "../../components/common/AdminField";

const PASSOS = [1, 2, 3];
const TITULO_PASSO = {
  1: "Fotos da obra",
  2: "Informações principais",
  3: "Detalhes e valor",
};

const TIPOS_IMAGEM = ["image/jpeg", "image/png", "image/webp"];

const adminInputCls =
  "w-full border border-lm-border bg-lm-ivory px-4 py-3.5 text-base font-sans text-lm-charcoal focus:outline-none focus:border-lm-charcoal transition-colors placeholder:text-lm-placeholder";

async function reduzirImagem(arquivo) {
  const imagem = await createImageBitmap(arquivo);
  const escala = Math.min(1, 1200 / Math.max(imagem.width, imagem.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(imagem.width * escala);
  canvas.height = Math.round(imagem.height * escala);

  const contexto = canvas.getContext("2d");
  if (!contexto) {
    imagem.close();
    throw new Error("Não foi possível preparar a imagem.");
  }

  contexto.drawImage(imagem, 0, 0, canvas.width, canvas.height);
  imagem.close();

  const arquivoWebp = await new Promise((resolve) => {
    canvas.toBlob(resolve, "image/webp", 0.75);
  });
  if (!arquivoWebp) throw new Error("Não foi possível reduzir a imagem.");

  const nome = arquivo.name.replace(/\.[^.]+$/, "");
  return new File([arquivoWebp], `${nome}.webp`, { type: "image/webp" });
}

function CadastroObra() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [fotos, setFotos] = useState([]);
  const [fotoCapaIdx, setFotoCapaIdx] = useState(0);
  const [form, setForm] = useState({
    artista: "",
    tipo: "quadro",
    tecnica: "",
    tecnicas: "",
    ano: "",
    largura_cm: "",
    altura_cm: "",
    profundidade_cm: "",
    titulo: "",
    valor: "",
    descricao: "",
  });
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  const fotosRef = useRef(fotos);

  useEffect(() => {
    fotosRef.current = fotos;
  }, [fotos]);

  useEffect(() => {
    return () => {
      fotosRef.current.forEach((foto) => URL.revokeObjectURL(foto.preview));
    };
  }, []);

  function set(campo) {
    return (e) => setForm((f) => ({ ...f, [campo]: e.target.value }));
  }

  function handleSelecionarFotos(e) {
    const arquivos = Array.from(e.target.files || []);
    e.target.value = "";
    if (arquivos.length === 0) return;

    if (arquivos.some((arquivo) => !TIPOS_IMAGEM.includes(arquivo.type))) {
      setErro("Escolha apenas imagens JPG, PNG ou WEBP.");
      return;
    }
    if (arquivos.some((arquivo) => arquivo.size > 20 * 1024 * 1024)) {
      setErro("Cada imagem deve ter no máximo 20 MB.");
      return;
    }

    setErro("");
    setFotos((atual) => [
      ...atual,
      ...arquivos.map((arquivo) => ({ file: arquivo, preview: URL.createObjectURL(arquivo) })),
    ]);
  }

  function handleRemoverFoto(index) {
    URL.revokeObjectURL(fotos[index].preview);
    setFotos((atual) => atual.filter((_, i) => i !== index));
    setFotoCapaIdx((atual) => {
      if (index === atual) return 0;
      if (index < atual) return atual - 1;
      return atual;
    });
  }

  function handleCancelar() {
    navigate("/admin");
  }

  function handleLogout() {
    supabase?.auth.signOut();
    navigate("/login");
  }

  async function handleSalvar() {
    if (!form.tecnicas.split(",").some((tecnica) => tecnica.trim())) {
      setErro("Informe pelo menos uma técnica ou material para os filtros.");
      return;
    }
    if (
      Number(form.largura_cm) <= 0 ||
      Number(form.altura_cm) <= 0 ||
      (form.tipo === "escultura" && Number(form.profundidade_cm) <= 0)
    ) {
      setErro("Informe dimensões maiores que zero em centímetros.");
      return;
    }

    setSalvando(true);
    setErro("");
    try {
      const obra = await criarObra({
        ...form,
        ano: Number(form.ano),
        largura_cm: Number(form.largura_cm),
        altura_cm: Number(form.altura_cm),
        profundidade_cm: form.tipo === "escultura" ? Number(form.profundidade_cm) : null,
      });

      for (let i = 0; i < fotos.length; i++) {
        const imagemReduzida = await reduzirImagem(fotos[i].file);
        await adicionarFoto(obra.id, imagemReduzida, i === fotoCapaIdx);
      }

      navigate("/admin");
    } catch {
      setErro("Não foi possível cadastrar a obra. Verifique os dados e tente novamente.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="min-h-screen bg-lm-admin-bg flex flex-col">
      <AdminHeader title="Cadastrar Nova Obra" onBack={handleCancelar} onLogout={handleLogout} />

      <main className="max-w-2xl mx-auto w-full px-5 py-8 flex-1">
        <div className="flex items-center gap-2 mb-8">
          {PASSOS.map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 flex items-center justify-center text-sm font-sans font-semibold transition-colors ${
                  s === passo
                    ? "bg-lm-charcoal text-white"
                    : s < passo
                      ? "bg-emerald-600 text-white"
                      : "bg-white border border-lm-border text-lm-muted"
                }`}
              >
                {s < passo ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  s
                )}
              </div>
              {s < 3 && (
                <div className={`h-px w-8 ${s < passo ? "bg-emerald-600" : "bg-lm-border"}`} />
              )}
            </div>
          ))}
          <span className="ml-2 text-sm text-lm-warm-gray font-sans">{TITULO_PASSO[passo]}</span>
        </div>

        <div className="bg-white border border-lm-border p-6 md:p-8">
          {passo === 1 && (
            <div>
              <h2 className="font-sans font-semibold text-xl text-lm-charcoal mb-1">
                Fotos da obra
              </h2>
              <p className="text-sm text-lm-warm-gray font-sans mb-6 leading-relaxed">
                Adicione as fotos da obra. Você pode escolher qual será a foto principal (capa).
              </p>

              <label
                htmlFor="fotos-obra"
                className="block border-2 border-dashed border-lm-border-dashed hover:border-lm-charcoal transition-colors p-8 text-center mb-6 cursor-pointer"
              >
                <input
                  id="fotos-obra"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={handleSelecionarFotos}
                  className="sr-only"
                />
                <svg
                  className="w-10 h-10 text-lm-muted mx-auto mb-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                <p className="font-sans font-medium text-lm-charcoal text-sm">
                  Clique aqui para selecionar fotos
                </p>
                <p className="text-xs text-lm-muted font-sans mt-1">
                  JPG, PNG ou WEBP · Até 20 MB por foto
                </p>
              </label>

              {fotos.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {fotos.map((foto, i) => (
                    <div key={foto.preview} className="relative group">
                      <img
                        src={foto.preview}
                        alt={`Foto ${i + 1}`}
                        className="w-full aspect-square object-cover bg-lm-image-bg"
                      />
                      <button
                        type="button"
                        onClick={() => setFotoCapaIdx(i)}
                        className={`absolute bottom-2 left-2 text-[10px] font-sans font-semibold px-2 py-0.5 transition-colors ${
                          i === fotoCapaIdx
                            ? "bg-lm-charcoal text-white"
                            : "bg-white/80 text-lm-charcoal hover:bg-white"
                        }`}
                      >
                        {i === fotoCapaIdx ? "★ Capa" : "Tornar capa"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoverFoto(i)}
                        className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center text-xs bg-white/80 text-lm-charcoal hover:bg-white"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {passo === 2 && (
            <div>
              <h2 className="font-sans font-semibold text-xl text-lm-charcoal mb-1">
                Informações da obra
              </h2>
              <p className="text-sm text-lm-warm-gray font-sans mb-7 leading-relaxed">
                Preencha os dados principais. Os campos com * são obrigatórios.
              </p>

              <div className="space-y-5">
                <AdminField label="Nome do artista *">
                  <input
                    type="text"
                    placeholder="Ex: Adriana Varejão"
                    value={form.artista}
                    onChange={set("artista")}
                    className={adminInputCls}
                  />
                </AdminField>

                <AdminField label="Tipo de obra *">
                  <div className="flex gap-3">
                    {[
                      ["quadro", "Quadro"],
                      ["escultura", "Escultura"],
                    ].map(([val, label]) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, tipo: val }))}
                        className={`flex-1 py-3.5 text-base font-sans font-medium border-2 transition-colors ${
                          form.tipo === val
                            ? "border-lm-charcoal bg-lm-charcoal text-white"
                            : "border-lm-border text-lm-warm-gray hover:border-lm-charcoal"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </AdminField>

                <AdminField label="Técnica / descrição dos materiais *">
                  <input
                    type="text"
                    placeholder="Ex: Tinta a óleo, têmpera e giz pastel sobre papelão"
                    value={form.tecnica}
                    onChange={set("tecnica")}
                    className={adminInputCls}
                  />
                </AdminField>

                <AdminField label="Técnicas e materiais para filtros *">
                  <input
                    type="text"
                    placeholder="Ex: Tinta a óleo, têmpera, giz pastel, papelão"
                    value={form.tecnicas}
                    onChange={set("tecnicas")}
                    className={adminInputCls}
                  />
                  <p className="mt-2 text-xs text-lm-warm-gray">
                    Separe cada item por vírgula. Esses itens serão opções de filtro no acervo.
                  </p>
                </AdminField>

                <AdminField label="Ano *">
                  <input
                    type="number"
                    placeholder="Ex: 2022"
                    value={form.ano}
                    onChange={set("ano")}
                    className={adminInputCls}
                    min={1900}
                    max={new Date().getFullYear()}
                  />
                </AdminField>

                <div className="grid gap-5 sm:grid-cols-2">
                  <AdminField label="Largura (cm) *">
                    <input
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={form.largura_cm}
                      onChange={set("largura_cm")}
                      className={adminInputCls}
                    />
                  </AdminField>
                  <AdminField label="Altura (cm) *">
                    <input
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={form.altura_cm}
                      onChange={set("altura_cm")}
                      className={adminInputCls}
                    />
                  </AdminField>
                  {form.tipo === "escultura" && (
                    <AdminField label="Profundidade (cm) *">
                      <input
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={form.profundidade_cm}
                        onChange={set("profundidade_cm")}
                        className={adminInputCls}
                      />
                    </AdminField>
                  )}
                </div>
              </div>
            </div>
          )}

          {passo === 3 && (
            <div>
              <h2 className="font-sans font-semibold text-xl text-lm-charcoal mb-1">
                Detalhes e valor
              </h2>
              <p className="text-sm text-lm-warm-gray font-sans mb-7 leading-relaxed">
                Estes campos são opcionais.
              </p>

              <div className="space-y-5">
                <AdminField label="Título da obra (se houver)">
                  <input
                    type="text"
                    placeholder="Deixe em branco se a obra não tiver título"
                    value={form.titulo}
                    onChange={set("titulo")}
                    className={adminInputCls}
                  />
                </AdminField>

                <AdminField label="Valor">
                  <input
                    type="text"
                    placeholder="Ex: R$ 20.000   ou   Sob consulta"
                    value={form.valor}
                    onChange={set("valor")}
                    className={adminInputCls}
                  />
                </AdminField>

                <AdminField label="Descrição (texto livre, opcional)">
                  <textarea
                    placeholder="Informações adicionais sobre a obra, contexto, série..."
                    value={form.descricao}
                    onChange={set("descricao")}
                    rows={4}
                    className={adminInputCls + " resize-none"}
                  />
                </AdminField>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          {passo > 1 && (
            <button
              onClick={() => setPasso((p) => p - 1)}
              className="flex-1 border-2 border-lm-charcoal text-lm-charcoal font-sans font-semibold py-4 text-base hover:bg-lm-charcoal hover:text-white transition-colors"
            >
              ← Voltar
            </button>
          )}
          {passo < 3 ? (
            <button
              onClick={() => setPasso((p) => p + 1)}
              className="flex-1 bg-lm-charcoal text-white font-sans font-semibold py-4 text-base hover:bg-lm-charcoal-mid transition-colors"
            >
              Próximo →
            </button>
          ) : (
            <button
              onClick={handleSalvar}
              disabled={salvando}
              className="flex-1 bg-emerald-700 text-white font-sans font-semibold py-4 text-base hover:bg-emerald-800 transition-colors disabled:opacity-60"
            >
              {salvando ? "Salvando..." : "✓ Salvar obra"}
            </button>
          )}
        </div>
        {erro && <p className="mt-4 text-sm text-red-700">{erro}</p>}
      </main>
    </div>
  );
}

export default CadastroObra;
