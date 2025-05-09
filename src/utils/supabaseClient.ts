// supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rlmdnigvpmtycwfbzlvp.supabase.co/';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsbWRuaWd2cG10eWN3ZmJ6bHZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2NTA0NDQsImV4cCI6MjA2MjIyNjQ0NH0.Psf5lpshwEdi5SveURDFQ9WsgCdCjIZGhYM8ajzoQ2Q';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
