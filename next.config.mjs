import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

// Here we use the @cloudflare/next-on-pages next-dev module to allow us to use bindings during local development
// (when running the application with `next dev`), for more information see:
// https://github.com/cloudflare/next-on-pages/blob/5712c57ea7/internal-packages/next-dev/README.md
if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['links.papareact.com', 'platform-lookaside.fbsbx', 'firebasestorage.googleapis.com', 'lh3.googleusercontent.com', 'avatars.githubusercontent.com', 'www.pexels.com', 'hotdesipics.co', 'i.picsum.photos', 'static-ca-cdn.eporner.com', 'imggen.eporner.com', 'www.pezporn.com', 'https://www.pornpics.de/', 'cdni.pornpics.de', 'static-sg-cdn.eporner.com']
  },
  env: {
    // FRONTEND_URL: 'http://localhost:3000/',
    CLOUDFLARE_STORAGE: ' https://pub-46cdeefeaf774247ab99232ab1ebaa66.r2.dev/',
    BACKEND_URL: 'https://clownfish-app-jn7w9.ondigitalocean.app/',
    FRONTEND_URL: 'https://www.chutlunds.com/',
    FACEBOOK_APP_SECRET: '691004714be90ba61d9ab8e0ba0d0c5e',
    FACEBOOK_APP_ID: '412940630805200',
    GOOGLE_CLIENT_ID: '1004706057785-k3qei8am5at1g5789vqudsgr13455a0o.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET: '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',
    MONGODB_URI_STRING: 'mongodb+srv://bhola:IyNs48Pf1SNHUWpu@cluster0.acjho.mongodb.net/chutlunds?retryWrites=true&w=majority',
    PAYPAL_CLIENT_ID:"AQEfZ9BtOjDaH-FAfZX-yRRFO7RmeSyNycJmJ8IiykzjBWGEKF_5yQJs-xagJEAT0D_fI-7GVdlYrrtX",
    PAYPAL_CLIENT_SECRET:"EHdwoyfs3cRT6bFCDBgnwIQR67PW8C4AK5spurQoW7A92YBNUPodWG_vtz5XRfBhMouwisgZPVn5ltaV",
    PAYPAL_ENDPOINT:"https://api-m.sandbox.paypal.com",
    JWT_SECRET: 'dsaljfhsaldkfsldaflksdf;afd',
    NEXTAUTH_URL: 'dsaljfhsaldkfsldaflksdf;afd',
  },
};

export default nextConfig;
