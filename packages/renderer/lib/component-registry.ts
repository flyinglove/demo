import type { Component } from 'vue';

import HeroBanner from '~/components/render/HeroBanner.vue';
import TextBlock from '~/components/render/TextBlock.vue';
import FeatureList from '~/components/render/FeatureList.vue';
import ImageBanner from '~/components/render/ImageBanner.vue';

export const componentRegistry: Record<string, Component> = {
  'hero-banner': HeroBanner,
  'text-block': TextBlock,
  'feature-list': FeatureList,
  'image-banner': ImageBanner
};

export function resolveComponent(type: string): Component | undefined {
  return componentRegistry[type];
}
