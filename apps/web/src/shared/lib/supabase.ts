import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from '@pickandtag/domain';
import { createClient } from '@supabase/supabase-js';

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
