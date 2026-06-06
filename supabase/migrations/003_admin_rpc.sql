CREATE OR REPLACE FUNCTION verify_admin_password(admin_email TEXT, password_attempt TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users
    WHERE email = admin_email
    AND password_hash = crypt(password_attempt, password_hash)
  );
END;
$$;
