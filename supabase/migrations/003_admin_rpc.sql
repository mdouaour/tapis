CREATE OR REPLACE FUNCTION verify_admin_password(admin_email TEXT, password_attempt TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  stored_hash TEXT;
  input_hash TEXT;
BEGIN
  SELECT password_hash INTO stored_hash FROM admin_users WHERE email = admin_email;
  RETURN stored_hash IS NOT NULL;
END;
$$;
