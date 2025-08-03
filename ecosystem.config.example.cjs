module.exports = {
  apps: [
    {
      name: 'CDS',
      port: '3000',
      exec_mode: 'cluster',
      instances: '1',
      script: './.output/server/index.mjs',
      env: {
        NUXT_HOSPITAL_TOKEN: '',
        NUXT_DINGDING_WEBHOOKS_ACCESS_TOKEN: '',
      },
    },
  ],
}
