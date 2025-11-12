<template>
  <section :style="containerStyle" class="render-container">
    <template v-for="child in node.children" :key="child.id">
      <RenderContainer v-if="child.type === 'container'" :node="child" />
      <RenderComponent v-else :node="child" />
    </template>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import RenderComponent from './RenderComponent.vue';
import type { ContainerNode } from '~/lib/types';

defineOptions({ name: 'RenderContainer' });

const props = defineProps<{ node: ContainerNode }>();

const containerStyle = computed(() => ({
  display: 'flex',
  flexDirection: props.node.props.layout,
  justifyContent: props.node.props.justify,
  alignItems: props.node.props.align,
  gap: `${props.node.props.gap}px`,
  padding: props.node.props.padding,
  width: props.node.props.width,
  minHeight: props.node.props.height === 'auto' ? undefined : props.node.props.height,
  background: props.node.props.background,
  borderRadius: '24px'
}));
</script>

<style scoped>
.render-container {
  width: 100%;
  box-sizing: border-box;
}
</style>
