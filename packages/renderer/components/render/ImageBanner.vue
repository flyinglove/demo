<template>
  <figure class="image-banner">
    <img :src="src" :alt="alt" loading="lazy" />
    <figcaption v-if="alt">{{ alt }}</figcaption>
  </figure>
</template>

<script setup lang="ts">
defineProps<{
  src: string;
  alt?: string;
}>();
</script>

<style scoped>
.image-banner {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

img {
  width: 100%;
  border-radius: 16px;
  object-fit: cover;
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.18);
}

figcaption {
  font-size: 0.9rem;
  color: #475569;
}
</style>
