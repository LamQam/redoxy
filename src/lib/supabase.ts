import { createClient } from '@supabase/supabase-js';

// Default to empty strings to prevent runtime errors
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Only throw error in development
if (import.meta.env.DEV && (!supabaseUrl || !supabaseAnonKey)) {
  console.error('Missing Supabase environment variables');
  console.log('Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Add a check for Supabase connection in development
if (import.meta.env.DEV) {
  supabase.auth.getSession().then(({ data: { session } }) => {
    console.log('Supabase session:', session ? 'Authenticated' : 'Not authenticated');
  }).catch(error => {
    console.error('Supabase connection error:', error.message);
  });
}

export interface Service {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: string;
  features: string[];
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  is_featured: boolean;
  created_at: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service_interest?: string;
  message: string;
}

export interface ServiceInquiry {
  service_id: string;
  contact_name: string;
  contact_email: string;
  contact_phone?: string;
  project_details: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
}
