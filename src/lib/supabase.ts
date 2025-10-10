import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

