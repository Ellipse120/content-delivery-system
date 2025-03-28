<script setup lang="ts">
const { data, status } = await useFetch('/api/assets')

const loading = computed(() => status.value === 'pending')

// const handleDelete = async (id: string) => {
//   await $fetch(`/api/assets/${id}`, {
//     method: 'DELETE',
//   })
//   await refresh()
// }

const columns = [
  {
    accessorKey: 'value',
    header: 'Value'
  },
  {
    accessorKey: 'versionstamp',
    header: '# Versionstamp'
  },
]

const doAdd = () => {
  navigateTo('/assets/form')
}
</script>

<template>
  <UContainer>
    <USeparator color="primary" type="dashed" size="lg" class="text-4xl">
      Assets Admin
    </USeparator>

    <UButton @click="doAdd">Add</UButton>

    <UTable
      :data="data"
      :columns="columns"
      :loading="loading"
    >
      <template #expanded="{ row }">
        <pre>{{ row.original }}</pre>
      </template>
      <template #value-cell="{ row }">
        <span>{{ row.original.value.id }}</span>
      </template>
    </UTable>
  </UContainer>
</template>

<style scoped>

</style>
