import { supabase } from '@/lib/supabase';
import { makeRedirectUri } from 'expo-auth-session';
import * as QueryParams from 'expo-auth-session/build/QueryParams';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();


const redirectTo = makeRedirectUri({
  path: '(tabs)/profile',
});

export async function signInWithOAuth(provider: 'google' | 'github') {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectTo,
      skipBrowserRedirect: true,
    },
  });

  if (error) throw error;

  const res = await WebBrowser.openAuthSessionAsync(data.url!, redirectTo);

  if (res.type === 'success') {
    WebBrowser.dismissBrowser();
    const { params } = QueryParams.getQueryParams(res.url);
    if (params?.access_token) {
      await supabase.auth.setSession({
        access_token: params.access_token,
        refresh_token: params.refresh_token,
      });

    }
  }
  // await syncPlayerProfile();
}

export async function signOut() {
  console.log(' SIGN OUT ')
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    console.log("No session to sign out")
    return;
  }
  return supabase.auth.signOut();
}

