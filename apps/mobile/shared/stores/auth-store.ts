import { Session } from '@supabase/supabase-js';
import { Store } from '@tanstack/store';

export const authStore = new Store<{ session: Session | null; }>({
  session: null,
});


export function setAuthSession(session: Session | null) {
  authStore.setState(state => ({
    ...state,
    session
  }));
}



//TODO: dirty state
//  playerStore.setState(prev => ({
//   ...prev,
//   profileDirty: false,
//   lastSyncedAt: Date.now()
// }));
// then react to dirty state in SyncBootstrap
