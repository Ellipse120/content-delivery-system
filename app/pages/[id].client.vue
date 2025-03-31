<script setup>
const { id } = useRoute().params
const toast = useToast()

const { data } = await useFetch(`/api/clients/${id}`)

async function handleSse() {
  const eventSource = new EventSource(`/api/clients/sse/${id}`)

  eventSource.onmessage = (event) => {    
    toast.add({
      title: 'Success!',
      description: `Got sse response: ${event.data}`
    })
  }
}

onMounted(() => {
  handleSse()
})
</script>

<template>
  <div class="xxx">{{data}}</div>
</template>
