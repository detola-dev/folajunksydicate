DROP POLICY IF EXISTS "read product media" ON storage.objects;
CREATE POLICY "admin read product media" ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'product-media' AND public.has_role(auth.uid(), 'admin'::public.app_role));