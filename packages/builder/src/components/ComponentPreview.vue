<template>
  <article class="component" :class="{ selected }" @click.stop="select">
    <header>
      <strong>{{ definition?.label ?? node.component }}</strong>
      <span class="meta">{{ node.id }}</span>
    </header>

    <section class="preview" v-if="node.component === 'hero-banner'">
      <p class="eyebrow">{{ node.props.eyebrow }}</p>
      <h2>{{ node.props.title }}</h2>
      <p class="subtitle">{{ node.props.subtitle }}</p>
      <button>{{ node.props.ctaText }}</button>
    </section>

    <section class="preview" v-else-if="node.component === 'text-block'">
      <p>{{ node.props.content }}</p>
    </section>

    <section class="preview" v-else-if="node.component === 'feature-list'">
      <ul>
        <li v-for="(feature, index) in node.props.features" :key="index">
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </li>
      </ul>
    </section>

    <section class="preview" v-else-if="node.component === 'image-banner'">
      <div class="image" :style="{ backgroundImage: `url(${node.props.src})` }" />
      <span class="caption">{{ node.props.alt }}</span>
    </section>

    <section class="preview" v-else>
      <pre>{{ formattedProps }}</pre>
    </section>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { componentDefinitionMap } from '../registry';
import type { ComponentNode } from '../types';

const props = defineProps<{ node: ComponentNode; selected: boolean }>();
const emit = defineEmits<{ (event: 'select'): void }>();

const definition = computed(() => componentDefinitionMap[props.node.component]);
const formattedProps = computed(() => JSON.stringify(props.node.props, null, 2));

function select() {
  emit('select');
}
</script>

<style scoped>
.component {
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 16px;
  background: #f8fafc;
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;
}

.component.selected {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.25);
}

header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.meta {
  font-size: 0.75rem;
  color: #64748b;
}

.preview {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #1f2937;
}

.preview button {
  align-self: flex-start;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 999px;
  padding: 6px 16px;
}

.preview ul {
  display: grid;
  gap: 12px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.preview li {
  background: white;
  border-radius: 12px;
  padding: 12px;
  border: 1px solid #e2e8f0;
}

.image {
  width: 100%;
  min-height: 160px;
  border-radius: 12px;
  background-size: cover;
  background-position: center;
}

.caption {
  font-size: 0.85rem;
  color: #64748b;
}

pre {
  margin: 0;
  font-size: 0.75rem;
  background: rgba(15, 23, 42, 0.05);
  padding: 12px;
  border-radius: 8px;
}
</style>
