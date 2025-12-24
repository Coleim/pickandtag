import { Session } from '@supabase/supabase-js';
import { Store } from '@tanstack/store';

export const authStore = new Store<{ session: Session | null; needSync: boolean }>({
  session: null,
  needSync: false,
});


export function setAuthSession(session: Session | null) {
  authStore.setState(state => ({
    ...state,
    session
  }));
}

export function setAuthNeedSync(needSync: boolean) {
  authStore.setState(state => ({
    ...state,
    needSync
  }));
}



//TODO: dirty state
//  playerStore.setState(prev => ({
//   ...prev,
//   profileDirty: false,
//   lastSyncedAt: Date.now()
// }));
// then react to dirty state in SyncBootstrap
