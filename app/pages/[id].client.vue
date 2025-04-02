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

  assets.value.forEach(asset => {
      const videoRef = useTemplateRef(`videoRef-${asset.id}`)
      if (!videoRef.value) return
      //todo: control video playing  and carousel state
      const { playing, ended } = useMediaControls(videoRef, {
        src: asset.videoUrl,
      })

      console.log(playing.value, ended.value)

      // watchEffect(() => {

      // })
    })
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
      <video :ref="`videoRef-${item.id}`" controls autoplay :src="item.videoUrl" :alt="`${item.description}-${item.name}`" />

      <img :src="item.imgUrl" :alt="`${item.description}-${item.name}`" width="320" height="320" class="rounded-lg">
    </UCarousel>
  </UContainer>
</template>
