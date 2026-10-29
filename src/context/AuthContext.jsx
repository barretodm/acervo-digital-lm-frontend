import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }) {
  const [sessao, setSessao] = useState(undefined);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSessao(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSessao(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ sessao }}>{children}</AuthContext.Provider>;
}
