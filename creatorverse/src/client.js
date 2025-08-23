import { createClient } from '@supabase/supabase-js'

const URL = 'https://auowdbtlxioogpnzjkcl.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1b3dkYnRseGlvb2dwbnpqa2NsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyOTMwMTIsImV4cCI6MjA3MDg2OTAxMn0.d5Z0F9bNC1Rk9I_gBVOm4oxYKOtq1vh2uCm8bg-xxMQ';
export const supabase = createClient(URL, API_KEY);
