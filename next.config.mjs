/** @type {import('next').NextConfig} */
// Configuración para Vercel (despliegue nativo de Next.js).
const nextConfig = {
  trailingSlash: true,            // rutas con / final, coherentes con los enlaces internos
  images: { unoptimized: true },  // no usamos optimización de imágenes (iconos/emoji)
};
export default nextConfig;
