<script setup>
const {data} = await useFetch('/api/clients')
</script>

<template>
  <UContainer>
    <UTable :data="data" class="flex-1" />
  </UContainer>
</template>
