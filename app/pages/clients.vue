<script setup>
const { data, refresh, status } = await useFetch('/api/clients')

const loading = computed(() => status.value === 'pending')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UButton = resolveComponent('UButton')
const expanded = ref({ 0: true, 1: false })

const handleDelete = async (id) => {
  await $fetch(`/api/clients/${id}`, {
    method: 'DELETE',
  })
  await refresh()
}

const columns = [
  {
    id: 'expand',
    header: 'Expand',
    cell: ({ row }) => {
      return h(UButton, {
        color: 'success',
        icon: 'i-lucide-chevron-down',
        ui: {
          leadingIcon: [
            'transition-transform',
            row.getIsExpanded() ? 'duration-200 rotate-180' : ''
          ]
        },
        onClick: () => row.toggleExpanded()
      })
    }
  },
  {
    accessorKey: 'key',
    header: 'Index',
    cell: ({ row }) => row.id,
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
        [
          { label: 'Goto', icon: 'i-lucide-link', to: `/${row.getValue('value').id}` }
        ],
        [
          {
            label: 'Delete',
            color: 'error',
            icon: 'i-lucide-trash',
            async onSelect() {
              await handleDelete(row.getValue('value').id)
            }
          }
        ],
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

</script>

<template>
  <UContainer>
    <USeparator color="primary" type="dashed" size="lg" class="text-4xl">
      Clients Admin
    </USeparator>

    <UTable
      v-model:expanded="expanded"
      :ui="{ tr: 'data-[expanded=true]:bg-(--ui-bg-elevated)/50' }"
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
