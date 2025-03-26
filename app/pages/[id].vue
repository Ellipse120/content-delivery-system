<script setup>
const { id } = useRoute().params
const toast = useToast()

const { data } = await useFetch(`/api/clients/${id}`)
toast.add({
  title: 'Success!',
  description: `Added client: ${id}`
})
</script>

<template>
  <div class="xxx">{{data}}</div>
</template>
