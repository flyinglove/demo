import { ref } from 'vue';

export const hoveredContainerId = ref<string | null>(null);

export function setHoveredContainer(id: string | null) {
  hoveredContainerId.value = id;
}
