-- Create trading_services table
CREATE TABLE IF NOT EXISTS public.trading_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Oil', 'Water', 'Logistics', 'Services')),
  description TEXT NOT NULL,
  features TEXT[] DEFAULT '{}',
  icon TEXT NOT NULL DEFAULT 'package',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add comments
COMMENT ON TABLE public.trading_services IS 'Trading services offered by REDOXY for oil, water, and related products';

-- Enable Row Level Security
ALTER TABLE public.trading_services ENABLE ROW LEVEL SECURITY;

-- Public read access for active services
CREATE POLICY "Enable read access for all users"
  ON public.trading_services
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_trading_services_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on row update
CREATE TRIGGER update_trading_services_updated_at
BEFORE UPDATE ON public.trading_services
FOR EACH ROW
EXECUTE FUNCTION update_trading_services_updated_at();

-- Insert sample data
INSERT INTO public.trading_services (title, category, description, features, icon) VALUES
  ('Crude Oil Trading', 'Oil', 'Global crude oil trading solutions with reliable supply chain management and competitive pricing.',
    ARRAY['Global crude oil sourcing', 'Competitive market pricing', 'Secure transactions', '24/7 market monitoring'], 'droplet'),
  
  ('Oil Products Distribution', 'Oil', 'Comprehensive distribution network for refined petroleum products across multiple regions.',
    ARRAY['Gasoline & diesel supply', 'Jet fuel distribution', 'Bulk fuel solutions', 'Quality assurance'], 'factory'),
  
  ('Trading Consultancy', 'Services', 'Expert consultancy services for oil and water trading operations.',
    ARRAY['Market analysis', 'Risk management', 'Regulatory compliance', 'Contract negotiation'], 'shield')
ON CONFLICT (title) DO NOTHING;
