<template>
  <component :is="resolved" v-bind="node.props" v-if="resolved" />
  <pre v-else class="fallback">未找到组件 {{ node.component }}，原始数据：{{ formatted }}</pre>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { resolveComponent } from '~/lib/component-registry';
import type { ComponentNode } from '~/lib/types';

const props = defineProps<{ node: ComponentNode }>();

const resolved = computed(() => resolveComponent(props.node.component));
const formatted = computed(() => JSON.stringify(props.node.props, null, 2));
</script>

<style scoped>
.fallback {
  background: rgba(15, 23, 42, 0.05);
  padding: 16px;
  border-radius: 12px;
  white-space: pre-wrap;
}
</style>
