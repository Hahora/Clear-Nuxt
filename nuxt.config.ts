// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    ['@nuxtjs/tailwindcss', { cssPath: '~/assets/css/main.css' }],
    '@vueuse/nuxt',
  ],

  runtimeConfig: {
    public: {
      metrikaId: '',
    },
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },
})
