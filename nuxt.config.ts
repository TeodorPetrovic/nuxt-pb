// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
  ],
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
  css: [
    'jsuites/dist/jsuites.css',
    'jspreadsheet-ce/dist/jspreadsheet.css',
  ],
})
