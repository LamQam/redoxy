/*
  # REDOXY Industrial Services Database Schema

  ## Overview
  This migration creates the complete database structure for the REDOXY industrial engineering 
  services platform, including services management, contact submissions, and testimonials.

  ## New Tables

  ### 1. services
  Core services offered by REDOXY with categorization and detailed information
  - `id` (uuid, primary key) - Unique service identifier
  - `title` (text) - Service name
  - `category` (text) - Service category (Waste Treatment, Environmental, Industrial, Other)
  - `description` (text) - Detailed service description
  - `icon` (text) - Icon identifier for UI display
  - `features` (text[]) - Array of key features
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. testimonials
  Client testimonials and reviews
  - `id` (uuid, primary key) - Unique testimonial identifier
  - `client_name` (text) - Client or company name
  - `position` (text) - Client's position/title
  - `company` (text) - Company name
  - `content` (text) - Testimonial content
  - `rating` (integer) - Rating out of 5
  - `is_featured` (boolean) - Whether to feature prominently
  - `created_at` (timestamptz) - Record creation timestamp

  ### 3. contact_submissions
  Contact form submissions from website visitors
  - `id` (uuid, primary key) - Unique submission identifier
  - `name` (text) - Submitter's name
  - `email` (text) - Contact email address
  - `phone` (text, optional) - Contact phone number
  - `company` (text, optional) - Company name
  - `service_interest` (text, optional) - Service category of interest
  - `message` (text) - Inquiry message
  - `status` (text) - Processing status (new, contacted, resolved)
  - `created_at` (timestamptz) - Submission timestamp

  ### 4. service_inquiries
  Specific service inquiries and quote requests
  - `id` (uuid, primary key) - Unique inquiry identifier
  - `service_id` (uuid, foreign key) - Reference to services table
  - `contact_name` (text) - Inquirer's name
  - `contact_email` (text) - Contact email
  - `contact_phone` (text, optional) - Contact phone
  - `project_details` (text) - Project description
  - `urgency` (text) - Urgency level (low, medium, high, critical)
  - `status` (text) - Inquiry status (pending, quoted, accepted, declined)
  - `created_at` (timestamptz) - Inquiry timestamp

  ## Security

  ### Row Level Security (RLS)
  All tables have RLS enabled with appropriate policies:

  1. **services table**
     - Public read access (anyone can view services)
     - No public write access (admin only via service role)

  2. **testimonials table**
     - Public read access for featured testimonials
     - No public write access

  3. **contact_submissions table**
     - Public insert access (anyone can submit)
     - No public read access (admin only)

  4. **service_inquiries table**
     - Public insert access (anyone can submit)
     - No public read access (admin only)

  ## Notes
  - All timestamps use timestamptz for proper timezone handling
  - Arrays are used for features to allow flexible service descriptions
  - Status fields use text for flexibility in future status additions
  - Foreign key constraints ensure data integrity
*/

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  icon text DEFAULT 'wrench',
  features text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  position text NOT NULL,
  company text NOT NULL,
  content text NOT NULL,
  rating integer DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  service_interest text,
  message text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'resolved')),
  created_at timestamptz DEFAULT now()
);

-- Create service inquiries table
CREATE TABLE IF NOT EXISTS service_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid REFERENCES services(id) ON DELETE CASCADE,
  contact_name text NOT NULL,
  contact_email text NOT NULL,
  contact_phone text,
  project_details text NOT NULL,
  urgency text DEFAULT 'medium' CHECK (urgency IN ('low', 'medium', 'high', 'critical')),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'quoted', 'accepted', 'declined')),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_inquiries ENABLE ROW LEVEL SECURITY;

-- Services policies (public read access)
CREATE POLICY "Anyone can view services"
  ON services FOR SELECT
  TO anon
  USING (true);

-- Testimonials policies (public read for featured only)
CREATE POLICY "Anyone can view featured testimonials"
  ON testimonials FOR SELECT
  TO anon
  USING (is_featured = true);

-- Contact submissions policies (public insert only)
CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions FOR INSERT
  TO anon
  WITH CHECK (true);

-- Service inquiries policies (public insert only)
CREATE POLICY "Anyone can submit service inquiry"
  ON service_inquiries FOR INSERT
  TO anon
  WITH CHECK (true);

-- Insert sample services data
INSERT INTO services (title, category, description, icon, features) VALUES
  ('Hazardous Waste Treatment', 'Waste Treatment', 'Comprehensive hazardous waste management and treatment solutions using cutting-edge technology to ensure environmental compliance and safety.', 'alert-triangle', ARRAY['Chemical Waste Processing', 'Biological Treatment', 'Thermal Treatment', 'Waste Segregation', 'EPA Compliance']),
  ('Waste Water Treatment', 'Waste Treatment', 'Advanced wastewater treatment systems for industrial facilities, ensuring clean discharge and environmental protection.', 'droplet', ARRAY['Primary Treatment', 'Secondary Treatment', 'Tertiary Filtration', 'Sludge Management', 'Water Recycling']),
  ('Environmental Impact Assessment', 'Environmental', 'Thorough environmental impact studies and compliance audits to meet international standards and regulations.', 'leaf', ARRAY['Site Assessment', 'Risk Analysis', 'Compliance Reporting', 'ISO 14001 Certification', 'Sustainability Planning']),
  ('Air Quality Management', 'Environmental', 'Advanced air quality monitoring and emission control solutions for industrial facilities.', 'wind', ARRAY['Emission Monitoring', 'Pollution Control', 'Stack Testing', 'Ambient Air Quality', 'Regulatory Compliance']),
  ('Industrial Maintenance', 'Industrial', 'Comprehensive preventive and corrective maintenance services for industrial equipment and facilities.', 'settings', ARRAY['Equipment Maintenance', 'Preventive Services', '24/7 Emergency Support', 'Spare Parts Management', 'Performance Optimization']),
  ('Pipeline Services', 'Industrial', 'Complete pipeline installation, maintenance, and inspection services for oil, gas, and chemical industries.', 'git-branch', ARRAY['Pipeline Installation', 'Integrity Testing', 'Corrosion Control', 'Leak Detection', 'Repair Services']),
  ('Safety Consulting', 'Other', 'Expert safety consulting and training services to ensure workplace safety and regulatory compliance.', 'shield', ARRAY['Safety Audits', 'Training Programs', 'OHSAS 18001', 'Emergency Response', 'PPE Assessment']),
  ('Engineering Design', 'Other', 'Innovative engineering design services for industrial facilities and environmental systems.', 'compass', ARRAY['Process Design', 'Equipment Selection', '3D Modeling', 'Cost Estimation', 'Feasibility Studies'])
ON CONFLICT DO NOTHING;

-- Insert sample testimonials
INSERT INTO testimonials (client_name, position, company, content, rating, is_featured) VALUES
  ('Muhammed Ayed Al Shamri', 'GM', 'GEMS', 'REDOXY solutions exceeded our expectations, revolutionizing our operations. A game-changer in engineering excellence!', 5, true),
  ('Saad Dhafer Al Muteb', 'Procurement Engineer', 'Farabi Petrochemicals', 'Outstanding environmental compliance services. Their team helped us achieve ISO 14001 certification ahead of schedule.', 5, true),
  ('Remiz Ali Rasheed', '', 'CSMO ', 'Incredible service and unmatched expertise. REDOXY is the go-to for cutting-edge engineering solutions.', 5, true),
ON CONFLICT DO NOTHING;