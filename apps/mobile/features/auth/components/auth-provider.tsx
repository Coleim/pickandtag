import { supabase } from "@/lib/supabase";
import { setAuthSession } from "@/shared/stores/auth-store";
import { ReactNode, useEffect } from "react";

export function AuthProvider({ children }: { children: ReactNode }) {

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (data.session) {
        setAuthSession(data.session);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
          console.log("SIGNED IN !!! ")
          setAuthSession(session);
        }
        if (event === "SIGNED_OUT") {
          console.log("SIGNED OUT !")
          setAuthSession(null)
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return children;
}
