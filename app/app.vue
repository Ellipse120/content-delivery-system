<template>
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
  // ogImage: 'https://nuxt-todos-kv.deno.dev/social-image.png',
  // twitterImage: 'https://nuxt-guestbook.pages.dev/social-image.png',
  // twitterCard: 'summary_large_image'
})
</script>
