// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/test-utils',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxtjs/mdc',
    '@vueuse/sound/nuxt',
  ],
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    dingdingWebhooksAccessToken: ''
  },

  ui: {
    fonts: false,
  },

  runtimeConfig: {
    dingdingWebhooksAccessToken: '',
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-11-27',

  eslint: {
    config: {
      stylistic: true,
    },
  },
})
