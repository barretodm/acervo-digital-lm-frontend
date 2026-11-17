import { useEffect, useState } from "react";
import { listarObras, buscarObra, listarHistorico } from "../services/obras";

export function useObras() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    listarObras({ signal: controller.signal })
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

export function useHistorico() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    listarHistorico(controller.signal)
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

export function useObra(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    // precisa resetar ao trocar de id, senao mostra o loading/erro da obra anterior
    // oxlint-disable-next-line react/set-state-in-effect
    setLoading(true);
    // oxlint-disable-next-line react/set-state-in-effect
    setError(null);
    buscarObra(id, controller.signal)
      .then(setData)
      .catch((e) => {
        if (e.name !== "AbortError") setError(e);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [id]);

  return { data, loading, error };
}
