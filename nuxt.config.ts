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
    'reka-ui/nuxt',
    '@tresjs/nuxt',
  ],
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  ui: {
    fonts: false,
  },

  runtimeConfig: {
    dingdingWebhooksAccessToken: '',
    hospitalToken: '',
  },

  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-11-27',

  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        '@tanstack/vue-table',
        '@vue/devtools-core',
        '@vue/devtools-kit',
        '@tanstack/vue-table',
        '@tresjs/cientos',
        '@tresjs/core',
        'debug', // CJS
        'three',
        'xlsx',
      ],
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },
})
