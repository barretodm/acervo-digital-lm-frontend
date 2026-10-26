import { useEffect, useState } from "react";
import { listarObras, buscarObra } from "../services/obras";

function useFetch(fn, deps) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    fn(controller.signal)
      .then(setData)
      .catch((e) => {
        if (e.name !== "AbortError") setError(e);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, deps);

  return { data, loading, error };
}

export const useObras = () => useFetch(listarObras, []);
export const useObra = (id) => useFetch((s) => buscarObra(id, s), [id]);