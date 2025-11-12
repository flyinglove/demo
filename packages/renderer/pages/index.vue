<template>
  <PageRenderer :document="page" />
</template>

<script setup lang="ts">
import PageRenderer from '~/components/PageRenderer.vue';
import { samplePage } from '~/lib/sample-page';

const page = samplePage;

useHead({
  title: `${page.title} · Page Renderer`,
  meta: [
    {
      name: 'description',
      content: page.description ?? '使用 Nuxt 渲染从搭建系统导出的页面结构。'
    }
  ]
});
</script>
