// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    ['@nuxtjs/tailwindcss', { cssPath: '~/assets/css/main.css' }],
    '@vueuse/nuxt',
    '@nuxt/icon',
  ],

  icon: {
    serverBundle: {
      collections: ['mdi'],
    },
  },

  runtimeConfig: {
    smtpUser: '',
    smtpPass: '',
    mailTo: '',
    public: {
      metrikaId: '',
    },
  },

  vite: {
    server: {
      allowedHosts: ['intently-succinct-pitta.cloudpub.ru'],
    },
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },
})
