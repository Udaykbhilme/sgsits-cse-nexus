-- Create admin users in auth.users with proper configuration
-- First, disable email confirmation for admin users

-- Create admin user function that bypasses email confirmation
CREATE OR REPLACE FUNCTION create_admin_user(
  admin_email TEXT,
  admin_password TEXT,
  admin_name TEXT
) RETURNS UUID AS $$
DECLARE
  admin_user_id UUID;
BEGIN
  -- Insert into auth.users with email_confirmed_at set
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000'::UUID,
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    admin_email,
    crypt(admin_password, gen_salt('bf')),
    NOW(),
    jsonb_build_object('full_name', admin_name, 'role', 'admin'),
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
  )
  RETURNING id INTO admin_user_id;

  -- Create profile for admin user
  INSERT INTO public.profiles (
    user_id,
    full_name,
    email
  ) VALUES (
    admin_user_id,
    admin_name,
    admin_email
  );

  RETURN admin_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the admin user
SELECT create_admin_user(
  'admin1952@sgsits.com',
  'admin123',
  'Admin User'
);

-- Clean up the function after use
DROP FUNCTION create_admin_user(TEXT, TEXT, TEXT);