<template>
  <div class="feature-list">
    <article v-for="(feature, index) in features" :key="index" class="card">
      <h3>{{ feature.title }}</h3>
      <p>{{ feature.description }}</p>
    </article>
  </div>
</template>

<script setup lang="ts">
interface FeatureItem {
  title: string;
  description: string;
}

defineProps<{
  features: FeatureItem[];
}>();
</script>

<style scoped>
.feature-list {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
}

h3 {
  margin: 0 0 8px;
}

p {
  margin: 0;
  color: #475569;
  line-height: 1.5;
}
</style>
