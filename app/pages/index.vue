<script lang="ts" setup>
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'Sites Map',
      icon: 'i-lucide-book-open',
      active: true,
      children: [
        {
          label: 'Clients Page',
          description: 'Manage All Clients Information',
          icon: 'i-lucide-house',
          to: '/clients',
        },
        {
          label: 'Assets Page',
          description: 'Manage All Assets, including ads image and video link',
          icon: 'i-lucide-cloud-download',
          to: '/assets',
        },
      ],
    },
  ],
])
</script>

<template>
  <UContainer>
    <UNavigationMenu
      highlight
      highlight-color="success"
      orientation="horizontal"
      :items="items"
      trailing-icon="i-lucide-arrow-down"
      class="data-[orientation=horizontal]:border-b border-(--ui-border) data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-48"
    />
    <USeparator
      color="primary"
      type="dashed"
      size="lg"
      class="text-4xl"
    >
      Main Page
    </USeparator>

    <UButton @click="navigateTo('/demo/ollama-chat')">
      To Local Ollama Chat Demo Page
    </UButton>
  </UContainer>
</template>

<style></style>
