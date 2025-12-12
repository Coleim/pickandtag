import { syncPlayerProfile } from "@/features/player/services/userService";
import { supabase } from "@/lib/supabase";
import { ReactNode, useEffect } from "react";

export function AuthProvider({ children }: { children: ReactNode }) {

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (data.session) {
        console.log(" Data session: ", data.session)
        await syncPlayerProfile();
        // setProfile(profile);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event) => {
        if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
          console.log("SIGNED IN !!! ")
        }
        if (event === "SIGNED_OUT") {
          console.log("SIGNED OUT !")
          // useUserStore.getState().reset();
          //TODO: What to do if sign out ?
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);



  return children;
}
