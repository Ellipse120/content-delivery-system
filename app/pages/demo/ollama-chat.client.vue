<script setup>
const text = shallowRef('')

const question = ref('Hi')
const chating = ref(false)
const modelName = ref('')
const abortController = new AbortController()

const { data: models } = await useLazyFetch('/api/ai/models', {
  transform: (data) => {
    const modelNames = data.models.map((model => model.name))
    modelName.value = modelNames[0]
    return modelNames
  }
})

const toggleChating = () => {
  chating.value = !chating.value
}

defineShortcuts({
  meta_enter: {
    usingInput: 'questionInput',
    handler: () => {
      handleStream()
    }
  }
})

const handleStream = async () => {
  text.value = ''
  toggleChating()
  const r = await $fetch.raw('/api/ai', {
    query: {
      message: question.value,
      modelName: modelName.value,
    },
    signal: abortController.signal,
    responseType: 'stream'
  })
    .catch(() => {})
    .finally(() => {
      toggleChating()
    })

  const reader = r.body.getReader()

  while (true) {
    const { done, value } = await reader.read()

    if (done) {
      question.value = ''
      break
    } else {
      const chunk = new TextDecoder("utf-8").decode(value)
      text.value += chunk
    }
  }
}

const abortStream = async () => {
  // abortController.abort()
  await $fetch('/api/ai', {
    method: 'DELETE'
  })
}
</script>

<template>
  <div>
    <UCard>
      <template #header>
        <span class="text-3xl text-(--ui-primary) font-bold">Talk To Local Ollama</span>
      </template>

      <div class="grid grid-cols-[4fr_1fr] gap-4">
        <div class="flex flex-col gap-2">
          <div class="text-xl font-bold">Response From Local Ollama</div>
          <MDC :value="text" tag="article" class="border border-slate-800 min-h-16 max-h-screen rounded-[calc(var(--ui-radius)*1.5)] text-xl" />
        </div>

        <div class="flex flex-col gap-2">
          <div class="text-xl font-bold">Your Question</div>
          <UTextarea v-model="question" class="w-full" placeholder="Input your question" name="questionInput" />

          <div class="flex gap-2">
            <USelect v-model="modelName" selected-icon="simple-icons:ollama" size="md" :items="models" class="w-48" />
            <UButton :loading="chating" block icon="i-lucide-rocket" @click="handleStream">Chat</UButton>
            <UButton color="warning" block icon="i-lucide-circle-stop" @click="abortStream">Abort</UButton>
          </div>

          <div class="flex items-center justify-center gap-2 font-bold">
            Press
            <UKbd variant="subtle" size="lg">Ctrl</UKbd>+
            <UKbd variant="subtle" size="lg">Enter</UKbd> To Start Chat
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>

<style>

</style>