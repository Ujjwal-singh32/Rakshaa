/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/user/home', 
          permanent: false, 
        },
      ]
    },
  }
  
  export default nextConfig
  