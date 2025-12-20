import { syncPlayerProfile } from "@/features/player/services/userService";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { ReactNode, useEffect, useState } from "react";

export function AuthProvider({ children }: { children: ReactNode }) {

  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (data.session) {
        setSession(data.session)
        console.log(" Data session: ", data.session)
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
          console.log("SIGNED IN !!! ")
          setSession(session)
        }
        if (event === "SIGNED_OUT") {
          console.log("SIGNED OUT !")
          setSession(null)
        }
        console.log("OK SYNC !!!! ")
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    syncPlayerProfile();
  }, [session]);

  return children;
}
