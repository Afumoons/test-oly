// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    'nuxt-swiper',
    '@nuxt/eslint',
    'nuxt-typed-router',
    'nuxt-aos',
  ],
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    }
  },
  runtimeConfig: {
    public: {
      omdbApiKey: process.env.NUXT_PUBLIC_OMDB_API_KEY, // Expose the API key to the client
    },
  },
})