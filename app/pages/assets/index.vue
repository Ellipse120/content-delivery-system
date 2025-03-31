<script setup lang="ts">
import type { TableColumn, DropdownMenuItem } from '@nuxt/ui'

const toast = useToast()

const { data, status, refresh } = await useFetch('/api/assets', {
  transform: (value) => value.map(o => o.value)
})

const loading = computed(() => status.value === 'pending')

const columns: TableColumn<AssetInfo>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'description',
    header: 'Description'
  },
  {
    accessorKey: 'valid',
    header: 'Valid Status'
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At'
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At'
  },
  {
    id: 'action'
  }
]

function getDropdownActions(asset: AssetInfo): DropdownMenuItem[][] {
  return [
    [
      {
        label: 'Copy Asset Id',
        icon: 'i-lucide-copy',
        onSelect: () => {
          navigator.clipboard.writeText(asset.id.toString())
          toast.add({
            title: 'Asset ID copied to clipboard!',
            color: 'success',
            icon: 'i-lucide-circle-check'
          })
        }
      }
    ],
    [
      {
        label: 'Edit',
        icon: 'i-lucide-edit',
        onSelect: () => {
          navigateTo(`/assets/form?id=${asset.id}`)
        }
      },
      {
        label: 'Delete',
        icon: 'i-lucide-trash',
        color: 'error',
        onSelect: async () => {
          await $fetch(`/api/assets/${asset.id}`, {
            method: 'DELETE'
          })
          await refresh()
        }
      }
    ]
  ]
}

const doAdd = () => {
  navigateTo('/assets/form')
}
</script>

<template>
  <UContainer>
    <USeparator color="primary" type="dashed" size="lg" class="text-4xl">
      Assets Admin
    </USeparator>

    <div class="flex gap-4">
      <UButton color="warning" @click="navigateTo('/clients')">Go To Clients</UButton>
      <UButton @click="doAdd">Add New Asset</UButton>
    </div>
    
    <UTable
      :data="data"
      :columns="columns"
      :loading="loading"
    >
      <template #action-cell="{ row }">
        <UDropdownMenu :items="getDropdownActions(row.original)">
          <UButton
            icon="i-lucide-ellipsis-vertical"
            color="neutral"
            variant="ghost"
            aria-label="Actions"
          />
        </UDropdownMenu>
      </template>
    </UTable>
  </UContainer>
</template>

<style scoped>

</style>
