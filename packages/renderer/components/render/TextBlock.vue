<template>
  <div class="text-block">
    <slot>
      <p v-html="content"></p>
    </slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  content: string;
}>();
</script>

<style scoped>
.text-block {
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
  max-width: 480px;
}

p {
  margin: 0;
  color: #1f2937;
}
</style>
