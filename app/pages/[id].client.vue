<script setup>
const { id } = useRoute().params
const toast = useToast()

// const { data } = await useFetch(`/api/clients/${id}`)
const assetIds = ref([])
const assets = ref([])
async function handleSse() {
  const eventSource = new EventSource(`/api/clients/sse/${id}`)

  eventSource.onmessage = (event) => {    
    toast.add({
      title: 'Success!',
      description: `Got sse response: ${event.data}`
    })
    assetIds.value = JSON.parse(event.data)
  }
}

const getAssetsInfo = async (ids) => {
  const p = await Promise.all(ids.map((id) => $fetch(`/api/assets/${id}`)))

  assets.value = p.map(o => o.value)
}

watch(
  assetIds,
  async (value) => {
    await getAssetsInfo(value)
  },
  {
    deep: true
  }
)

onMounted(() => {
  handleSse()
})
</script>

<template>
   <UContainer>
    <USeparator color="primary" type="dashed" size="lg">
      Client Of {{id }}
    </USeparator>

    <UCarousel
      v-slot="{ item }"
      :items="assets" 
      loop
      arrows
      dots
      :autoplay="{ delay: 5000 }"
      class="w-full max-w-xs mx-auto"
    >
      <!-- TODO: Carousel Video -->
      <video width="320" height="240" controls autoplay>
        <source :src="item.videoUrl" :alt="`${item.description}-${item.name}`">
        Your browser does not support the video tag.
      </video>
    </UCarousel>

    <UCarousel 
      v-slot="{ item }"
      :items="assets" 
      loop
      dots
      :autoplay="{ delay: 2000 }"
      class="w-full max-w-xs mx-auto"
    >
      <img :src="item.imgUrl" :alt="`${item.description}-${item.name}`" width="320" height="320" class="rounded-lg">
    </UCarousel>
  </UContainer>
</template>
