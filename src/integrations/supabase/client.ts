// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://rhkkygmgxdrtdfyntmqu.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJoa2t5Z21neGRydGRmeW50bXF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxNjcyNTIsImV4cCI6MjA1Nzc0MzI1Mn0.sZ88jiMrXAiVpYIIOXV8k1Vk1Iudyl2_AKJp_FwOwtw";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);