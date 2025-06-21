<template>
    <NuxtLoadingIndicator />
    <UApp>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </UApp>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Content Delivery System',
  description:
    'Content Delivery System could push contents to different client-side content.',
  ogSiteName: 'Content Delivery System',
  ogType: 'website',
})
</script>
