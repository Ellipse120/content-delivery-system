<template>
  <NuxtLoadingIndicator />
  <UApp>
    <NuxtRouteAnnouncer />

    <UContainer>
      <UNavigationMenu
        highlight
        highlight-color="success"
        orientation="horizontal"
        :items="items"
        trailing-icon="i-lucide-arrow-down"
        class="data-[orientation=horizontal]:border-b border-(--ui-border) data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-48"
      />
      <NuxtPage />
    </UContainer>
  </UApp>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

useSeoMeta({
  title: 'Content Delivery System',
  description:
    'Content Delivery System could push contents to different client-side content.',
  ogSiteName: 'Content Delivery System',
  ogType: 'website',
})

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
    {
      label: 'Misc',
      icon: 'i-lucide-microscope',
      children: [
        {
          label: '2073 Page',
          description: 'Fetch doctor scheduling infomation of some special day',
          icon: 'i-lucide-hospital',
          to: '/2073',
        },
        {
          label: 'Local Ollama',
          description: 'Interactive with local ollama, call it\'s embeded API points',
          icon: 'i-lucide-flask-round',
          to: '/demo/ollama-chat',
        },
      ],
    },
  ],
])
</script>
