<template>
  <section class="hero">
    <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
    <h1>{{ title }}</h1>
    <p class="subtitle">{{ subtitle }}</p>
    <NuxtLink v-if="ctaText" :href="ctaLink" class="cta">{{ ctaText }}</NuxtLink>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow?: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}>();
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, #1d4ed8, #3b82f6);
  color: white;
  padding: 48px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 30px 60px rgba(30, 64, 175, 0.35);
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.3em;
  font-size: 0.75rem;
  opacity: 0.8;
}

.subtitle {
  max-width: 640px;
  font-size: 1.1rem;
  line-height: 1.6;
}

.cta {
  align-self: flex-start;
  background: white;
  color: #1d4ed8;
  padding: 10px 20px;
  border-radius: 999px;
  font-weight: 600;
  text-decoration: none;
}
</style>
