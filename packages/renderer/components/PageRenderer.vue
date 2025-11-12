<template>
  <div class="page-wrapper">
    <header class="page-header">
      <p class="eyebrow">{{ document.id }}</p>
      <h1>{{ document.title }}</h1>
      <p class="description" v-if="document.description">{{ document.description }}</p>
    </header>
    <RenderContainer :node="document.root" />
  </div>
</template>

<script setup lang="ts">
import RenderContainer from '~/components/render/RenderContainer.vue';
import type { PageDocument } from '~/lib/types';

defineProps<{ document: PageDocument }>();
</script>

<style scoped>
.page-wrapper {
  width: min(1024px, 100%);
  margin: 0 auto;
  padding: 80px 24px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.page-header {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.eyebrow {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.24em;
  font-size: 0.75rem;
  color: #64748b;
}

.description {
  margin: 0 auto;
  max-width: 640px;
  color: #475569;
}
</style>
