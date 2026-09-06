import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vnagwbqjcyuzjlewadvk.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZuYWd3YnFqY3l1empsZXdhZHZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzODQ3OTksImV4cCI6MjA4ODk2MDc5OX0.bTRLK49ybB9iK2-oUuvPCuXPDRuHlYDsNLDUhmkIkeU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
