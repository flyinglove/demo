// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  css: ['~/assets/base.css'],
  app: {
    head: {
      title: 'Page Renderer',
      meta: [
        { name: 'description', content: 'Server-rendered Nuxt 应用，用于渲染搭建系统生成的页面结构。' }
      ]
    }
  }
});
