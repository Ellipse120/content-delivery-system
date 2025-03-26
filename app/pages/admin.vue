<script setup>
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UButton = resolveComponent('UButton')

const columns = [
  {
    accessorKey: 'key',
    header: 'Key'
  },
  {
    accessorKey: 'value',
    header: 'Value'
  },
  {
    accessorKey: 'versionstamp',
    header: '# Versionstamp'
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const items = [
        { label: 'Goto' },
        { label: 'Delete' },
      ]

      return h('div', {}, h(UDropdownMenu, {
        items,
      }, () => h(UButton, {
        'icon': 'i-lucide-ellipsis-vertical',
        'color': 'neutral',
        'variant': 'ghost',
        'class': 'ml-auto',
        'aria-label': 'Actions dropdown'
      })))
    }
  }
]
const {data} = await useFetch('/api/clients')
</script>

<template>
  <UContainer>
    <UTable :data="data" :columns="columns">
      <template #value-cell="{ row }">
        <span>{{ row.original.value }}</span>
      </template>
    </UTable>
  </UContainer>
</template>
