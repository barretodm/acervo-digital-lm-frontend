import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";
import { reativarObra } from "../../services/obras";
import AdminHeader from "../../components/layout/AdminHeader";
import StatusBadge from "../../components/common/StatusBadge";
import Aviso from "../../components/common/Aviso";
import { useHistorico } from "../../hooks/useObras";
import { fotoCapa } from "../../utils/fotos";

function HistoricoObras() {
  const navigate = useNavigate();
  const { data: obrasObtidas, loading, error } = useHistorico();
  const [obras, setObras] = useState([]);

  useEffect(() => {
    // copia local editavel, iniciada so quando o fetch resolve
    // oxlint-disable-next-line react/set-state-in-effect
    if (obrasObtidas) setObras(obrasObtidas);
  }, [obrasObtidas]);

  async function handleReativar(obraId) {
    try {
      await reativarObra(obraId);
      setObras((lista) => lista.filter((obra) => obra.id !== obraId));
    } catch {
      alert("Não foi possível reativar a obra. Tente novamente.");
    }
  }

  function handleBack() {
    navigate("/admin");
  }

  function handleLogout() {
    supabase?.auth.signOut();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-lm-admin-bg flex flex-col">
      <AdminHeader title="Histórico de Obras" onBack={handleBack} onLogout={handleLogout} />

      <main className="max-w-3xl mx-auto w-full px-5 py-8 flex-1">
        <p className="text-sm text-lm-warm-gray font-sans mb-6 leading-relaxed">
          Obras que foram removidas do acervo ativo. Você pode reativá-las a qualquer momento.
        </p>

        {loading && <Aviso>Carregando obras...</Aviso>}
        {error && <Aviso>Não foi possível carregar as obras. Tente novamente.</Aviso>}

        {!loading &&
          !error &&
          (obras.length === 0 ? (
            <div className="bg-white border border-lm-border p-10 text-center text-lm-muted font-sans text-sm">
              Nenhuma obra no histórico.
            </div>
          ) : (
            <div className="space-y-3">
              {obras.map((obra) => (
                <div
                  key={obra.id}
                  className="bg-white border border-lm-border p-4 flex gap-4 items-center"
                >
                  <img
                    src={fotoCapa(obra.fotos)}
                    alt={obra.artista}
                    className="w-14 h-18 object-cover bg-lm-image-bg flex-shrink-0"
                  />
                  <div className="flex-1">
                    <p className="font-sans font-semibold text-lm-charcoal">{obra.artista}</p>
                    {obra.titulo && (
                      <p className="text-sm italic text-lm-warm-gray font-sans">{obra.titulo}</p>
                    )}
                    <p className="text-xs text-lm-muted font-sans mt-0.5 flex items-center gap-2">
                      {obra.tecnica} · {obra.ano}
                      <StatusBadge status={obra.status} />
                    </p>
                    <p className="text-xs text-lm-muted font-sans mt-1">
                      {obra.total_interesses} interesse{obra.total_interesses !== 1 ? "s" : ""}{" "}
                      recebido{obra.total_interesses !== 1 ? "s" : ""}
                    </p>
                  </div>

                  <button
                    onClick={() => handleReativar(obra.id)}
                    className="text-sm font-sans text-emerald-700 border border-emerald-300 px-4 py-2 hover:bg-emerald-50 transition-colors whitespace-nowrap"
                  >
                    Reativar
                  </button>
                </div>
              ))}
            </div>
          ))}
      </main>
    </div>
  );
}

export default HistoricoObras;
