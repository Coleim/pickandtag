import { supabase } from "@/lib/supabase";
import { setAuthSession } from "@/shared/stores/auth-store";
import { Session } from "@supabase/supabase-js";
import { ReactNode, useEffect, useState } from "react";

export function AuthProvider({ children }: { children: ReactNode }) {

  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (data.session) {
        setAuthSession(data.session);
        console.log(" Data session: ", data.session)
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

  // useEffect(() => {
  //   if (!session) return;
  //   await syncPlayerProfile();
  //   await syncImages(session.user.id);
  //
  // }, [session]);

  return children;
}
