import { SUPABASE_KEY, SUPABASE_URL } from "@env";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
