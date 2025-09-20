-- Update existing admin user to confirm email so they can login
UPDATE auth.users 
SET email_confirmed_at = NOW(),
    confirmation_token = '',
    updated_at = NOW()
WHERE email = 'admin1952@sgsits.com';