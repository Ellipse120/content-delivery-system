<script setup>
const toast = useToast()

const { data, refresh, status } = await useFetch('/api/clients')
const { data: assets } = await useFetch('/api/assets', {
  transform: (value) => value.map(o => o.value)
})

const UDropdownMenu = resolveComponent('UDropdownMenu')
const UButton = resolveComponent('UButton')
const UCheckbox = resolveComponent('UCheckbox')

const loading = computed(() => status.value === 'pending')
const expanded = ref(false)

const handleDelete = async (id) => {
  await $fetch(`/api/clients/${id}`, {
    method: 'DELETE',
  })
  await refresh()
}

// const assets = {
//   videoUrls: [
//     'https://v3-web.douyinvod.com/f89e3ecc531771ed6098b4f64135d104/67e71c5a/video/tos/cn/tos-cn-ve-15/oEeKBz8MGQ1G7xPBfx84ugf1GCcAtQEMXgC1IA/?a=6383&ch=26&cr=3&dr=0&lr=all&cd=0%7C0%7C0%7C3&cv=1&br=599&bt=599&cs=2&ft=pEaFx4hZffPdOW~-N12NvAq-antLjrKzPY4NRkaHTbr5ejVhWL6&mime_type=video_mp4&qs=15&rc=OjtkZ2g6Nzo1ZjNkOTY7PEBpM3ltdng5cjl0eTMzNGkzM0AtYzJhMS5jNjUxMmMuLzVgYSNybGlrMmRrZS1gLS1kLTBzcw%3D%3D&btag=80000e00010000&dy_q=1743188507&feature_id=10cf95ef75b4f3e7eac623e4ea0ea691&l=20250329030147AE530CB6990B4F11BDD9&__vid=7476441667722054951',
//     'https://v3-web.douyinvod.com/6a5f50f594931a8ec2f683aa05e6a47e/67e71d16/video/tos/cn/tos-cn-ve-15/o4f9QAmg2qom2eCp2OBiIVmmgOFvAmAZqzDNOE/?a=6383&ch=26&cr=3&dr=0&lr=all&cd=0%7C0%7C0%7C3&cv=1&br=255&bt=255&cs=2&ds=6&ft=pEaFx4hZffPdOW~-N12NvAq-antLjrK-TY4NRkaHTbr5ejVhWL6&mime_type=video_mp4&qs=11&rc=NWg8PGRpOzM2M2g6NDlpO0BpanVnM285cmRzdDMzNGkzM0AxMTQvMDEuXjExNmJfXmE1YSNhZ141MmQ0Z2hgLS1kLWFzcw%3D%3D&btag=80000e00010000&dy_q=1743188695&feature_id=8129a1729e50e93a9e951d2e5fa96ae4&l=20250329030455D64FB06298BF3411BD7C&__vid=7397613218245430578'
//   ],
//   imgUrls: [
//     'https://p3-pc-sign.douyinpic.com/tos-cn-i-0813c001/owAezhg5EUzALhA1ICbASCfASDOjUANaCUASmq~tplv-dy-cropcenter:323:430.jpeg?biz_tag=pcweb_cover&from=327834062&lk3s=138a59ce&s=PackSourceEnum_SEARCH&sc=cover&se=true&sh=323_430&x-expires=2058548400&x-signature=g%2FO1LSvdWatJKHpR32qJtuWMx1M%3D',
//     'https://p3-pc-sign.douyinpic.com/image-cut-tos-priv/9e42da288f47bcf6cebbcc57b6054f2e~tplv-dy-resize-origshort-autoq-75:330.jpeg?biz_tag=pcweb_cover&from=327834062&lk3s=138a59ce&s=PackSourceEnum_AWEME_DETAIL&sc=cover&se=false&x-expires=2058548400&x-signature=UW8BfQuPZ8d8AL5GH%2F%2FzX9edjPc%3D'
//   ]
// }
const handleSendAssets = async (id, payload) => {
  await $fetch(`/api/clients/sse/${id}`, {
    method: 'POST',
    body: payload
  })
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
            label: 'Send Test Data',
            color: 'secondary',
            icon: 'i-lucide-send',
            async onSelect() {
              await handleSendAssets(row.getValue('value').id, { test: Date.now() })
            }
          }
        ],
        [
          {
            label: 'Send Assets',
            color: 'warning',
            icon: 'i-lucide-send',
            async onSelect() {
              assetsModal.value = !assetsModal.value
              toWhichClients.value = row.getValue('value').id
            }
          }
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

const assetsModal = ref(false)
const toWhichClients = ref()
defineShortcuts({
  a: () => {
    if (toWhichClients.value) {
      assetsModal.value = !assetsModal.value
    } else {
      toast.add({
        title: 'Need Client Info',
        color: 'info',
        icon: 'i-lucide-info'
      })
    }
  }
})
const assetsSelection = ref()
const assetsColumns = [
{
    id: 'select',
    header: ({ table }) =>
      h(UCheckbox, {
        modelValue: table.getIsSomePageRowsSelected()
          ? 'indeterminate'
          : table.getIsAllPageRowsSelected(),
        'onUpdate:modelValue': (value) =>
          table.toggleAllPageRowsSelected(!!value),
        'aria-label': 'Select all'
      }),
    cell: ({ row }) =>
      h(UCheckbox, {
        modelValue: row.getIsSelected(),
        'onUpdate:modelValue': (value) => row.toggleSelected(!!value),
        'aria-label': 'Select row'
      })
  },
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
  }
]

const confirmSendAssets = async () => {
  if (!toWhichClients.value) return

  await $fetch(`/api/clients/sse/${toWhichClients.value}`, {
    method: 'POST',
    body: Object.keys(assetsSelection.value)
  })

  toast.add({
    title: 'Sent to Client',
    color: 'success',
    icon: 'i-lucide-list-checks'
  })
  assetsModal.value = false
}

const onClientSelect = (row) => {
  toWhichClients.value = row.getValue('value').id
}
</script>

<template>
  <UContainer>
    <USeparator color="primary" type="dashed" size="lg" class="text-4xl">
      Clients Admin
    </USeparator>

    <UButton @click="navigateTo('/assets')">Go To Assets</UButton>

    <UTable
      v-model:expanded="expanded"
      :ui="{ tr: 'data-[expanded=true]:bg-(--ui-bg-elevated)/50' }"
      :data="data"
      :columns="columns"
      :loading="loading"
      @select="onClientSelect"
    >
      <template #expanded="{ row }">
        <pre>{{ row.original }}</pre>
      </template>
      <template #value-cell="{ row }">
        <span>{{ row.original.value.id }}</span>
      </template>
    </UTable>

    <UModal v-model:open="assetsModal" title="Assets Selection">
      <template #body>
        <div>
          <UTable
            v-model:row-selection="assetsSelection"
            :get-row-id="(originalRow) => originalRow.id"
            :data="assets"
            :columns="assetsColumns"
          />
        </div>
      </template>

      <template #footer>
        <UButton label="Cancel" color="neutral" variant="outline" @click="assetsModal = false" />
        <UButton label="Submit" color="neutral" @click="confirmSendAssets" />
      </template>
    </UModal>
  </UContainer>
</template>
