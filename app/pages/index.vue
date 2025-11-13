<script lang="ts" setup>
</script>

<template>
  <div>
    <USeparator
      color="primary"
      type="dashed"
      size="lg"
      class="text-4xl"
    >
      Main Page
    </USeparator>

    <UButton @click="navigateTo('/demo/ollama-chat')">
      To Local Ollama Chat Demo Page And Play
    </UButton>
  </div>
</template>

<style></style>
