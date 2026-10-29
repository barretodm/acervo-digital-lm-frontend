import { useEffect, useState } from "react";
import { listarTodosInteresses, listarInteresses } from "../services/interesses";

export function useTodosInteresses() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    listarTodosInteresses(controller.signal)
      .then(setData)
      .catch((e) => {
        if (e.name !== "AbortError") setError(e);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, []);

  return { data, loading, error };
}

export function useInteresses(obraId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    // precisa resetar ao trocar de obraId, senao mostra os interesses da obra anterior
    // oxlint-disable-next-line react/set-state-in-effect
    setLoading(true);
    // oxlint-disable-next-line react/set-state-in-effect
    setError(null);
    listarInteresses(obraId, controller.signal)
      .then(setData)
      .catch((e) => {
        if (e.name !== "AbortError") setError(e);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [obraId]);

  return { data, loading, error };
}
