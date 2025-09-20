-- Update existing admin user to confirm email
UPDATE auth.users 
SET email_confirmed_at = NOW()
WHERE email = 'admin1952@sgsits.com';