// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/content",
    "@nuxt/scripts",
    "@vueuse/nuxt",
    "@nuxtjs/color-mode",
  ],
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  ssr: false,
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      title: "Jessie Zhang",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.svg" }],
    },
  },
  experimental: {
    payloadExtraction: true,
  },
});