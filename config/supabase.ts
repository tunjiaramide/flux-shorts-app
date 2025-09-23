// lib/supabase.ts
import 'react-native-url-polyfill/auto'; // important: polyfill URL for RN
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Replace these with your project's values
const SUPABASE_URL = 'https://YOUR-SUPABASE-URL.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

// create client and tell it to use AsyncStorage for session persistence
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    // use AsyncStorage so auth sessions persist in React Native
    storage: AsyncStorage,
  },
});
