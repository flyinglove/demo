<template>
  <aside class="inspector">
    <header>
      <h2>属性面板</h2>
      <p v-if="!selected">请选择容器或组件查看配置。</p>
      <p v-else>正在编辑：{{ title }}</p>
    </header>

    <section v-if="selected && selected.type === 'container'" class="panel">
      <h3>布局</h3>
      <div class="field">
        <label>方向</label>
        <select :value="selected.props.layout" @change="onContainerChange('layout', readString($event) as ContainerNode['props']['layout'])">
          <option value="column">纵向（column）</option>
          <option value="row">横向（row）</option>
        </select>
      </div>
      <div class="field">
        <label>主轴对齐</label>
        <select :value="selected.props.justify" @change="onContainerChange('justify', readString($event) as ContainerNode['props']['justify'])">
          <option value="flex-start">起始</option>
          <option value="center">居中</option>
          <option value="flex-end">末尾</option>
          <option value="space-between">两端对齐</option>
          <option value="space-around">均匀分布</option>
        </select>
      </div>
      <div class="field">
        <label>交叉轴对齐</label>
        <select :value="selected.props.align" @change="onContainerChange('align', readString($event) as ContainerNode['props']['align'])">
          <option value="stretch">拉伸</option>
          <option value="flex-start">起始</option>
          <option value="center">居中</option>
          <option value="flex-end">末尾</option>
        </select>
      </div>
      <div class="field">
        <label>子元素间距</label>
        <input type="number" :value="selected.props.gap" min="0" @input="onContainerChange('gap', readNumber($event))" />
      </div>

      <h3>尺寸与样式</h3>
      <div class="field">
        <label>宽度</label>
        <input type="text" :value="selected.props.width" placeholder="例如 100% 或 800px" @input="onContainerChange('width', readString($event))" />
      </div>
      <div class="field">
        <label>高度</label>
        <input type="text" :value="selected.props.height" placeholder="auto" @input="onContainerChange('height', readString($event))" />
      </div>
      <div class="field">
        <label>内边距</label>
        <input type="text" :value="selected.props.padding" placeholder="例如 24px" @input="onContainerChange('padding', readString($event))" />
      </div>
      <div class="field">
        <label>背景色</label>
        <input type="color" :value="selected.props.background" @input="onContainerChange('background', readString($event))" />
      </div>
    </section>

    <section v-else-if="selected && selected.type === 'component'" class="panel">
      <template v-if="componentDefinition">
        <h3>{{ componentDefinition.label }} 属性</h3>
        <div v-for="field in componentDefinition.fields" :key="field.key" class="field">
          <label>{{ field.label }}</label>
          <textarea
            v-if="field.type === 'textarea'"
            :value="selected.props[field.key]"
            :placeholder="field.placeholder"
            rows="4"
            @input="onComponentChange(field.key, readString($event))"
          />
          <input
            v-else-if="field.type === 'image'"
            type="url"
            :value="selected.props[field.key]"
            :placeholder="field.placeholder"
            @input="onComponentChange(field.key, readString($event))"
          />
          <input
            v-else
            type="text"
            :value="selected.props[field.key]"
            :placeholder="field.placeholder"
            @input="onComponentChange(field.key, readString($event))"
          />
        </div>
      </template>
      <template v-else>
        <p>当前组件暂不支持可视化配置，请通过导出的 JSON 进行调整。</p>
      </template>
    </section>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ComponentDefinition, ComponentNode, ContainerNode, PageNode } from '../types';

const props = defineProps<{ selected?: PageNode; componentDefinition?: ComponentDefinition }>();

const emit = defineEmits<{
  (event: 'update-container', node: ContainerNode, patch: Partial<ContainerNode['props']>): void;
  (event: 'update-component', node: ComponentNode, patch: Record<string, any>): void;
}>();

const title = computed(() => {
  if (!props.selected) return '';
  if (props.selected.type === 'container') return `容器 ${props.selected.id}`;
  return `${props.componentDefinition?.label ?? props.selected.component}`;
});

function readString(event: Event): string {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement;
  return target.value;
}

function readNumber(event: Event): number {
  const target = event.target as HTMLInputElement;
  const value = Number(target.value);
  return Number.isFinite(value) ? value : 0;
}

function onContainerChange<K extends keyof ContainerNode['props']>(key: K, value: ContainerNode['props'][K]) {
  if (!props.selected || props.selected.type !== 'container') return;
  emit('update-container', props.selected, { [key]: value } as Partial<ContainerNode['props']>);
}

function onComponentChange(key: string, value: any) {
  if (!props.selected || props.selected.type !== 'component') return;
  emit('update-component', props.selected, { [key]: value });
}
</script>

<style scoped>
.inspector {
  background: #ffffff;
  border-left: 1px solid #e5e7eb;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
}

header h2 {
  margin: 0;
}

header p {
  margin: 4px 0 0;
  color: #6b7280;
}

.panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-size: 0.85rem;
  color: #475569;
}

input,
select,
textarea {
  font: inherit;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #cbd5f5;
  background: #f8fafc;
}

textarea {
  resize: vertical;
}
</style>
