<template>
  <UCard>
    <template #header>
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-bold">
          人员名单管理 (当前: {{ users.length }}人)
        </h3>
        <div class="flex gap-2">
          <UButton
            icon="i-heroicons-qr-code"
            color="primary"
            @click="showQrModal = true"
          >
            扫码录入
          </UButton>
          <UButton
            icon="i-heroicons-arrow-up-tray"
            @click="triggerFileInput"
          >
            批量导入
          </UButton>
          <input
            ref="fileInput"
            type="file"
            class="hidden"
            accept=".xlsx,.xls"
            @change="handleExcelImport"
          >
        </div>
      </div>
    </template>

    <!-- Manual input form -->
    <UForm
      :state="form"
      class="space-y-4"
      @submit="onSingleSubmit"
    >
      <div class="grid grid-cols-3 gap-4">
        <UFormField
          label="姓名"
          required
        >
          <UInput v-model="form.name" />
        </UFormField>
        <UFormField
          label="手机号"
          required
        >
          <UInput v-model="form.phone" />
        </UFormField>
        <UFormField label="工号">
          <UInput v-model="form.jobId" />
        </UFormField>
      </div>
      <UButton
        type="submit"
        color="primary"
        block
      >
        手动添加
      </UButton>
    </UForm>

    <!-- QR Code Scan Modal -->
    <UModal v-model="showQrModal">
      <div class="p-6 text-center space-y-4">
        <h4 class="font-bold">
          微信/浏览器扫码录入
        </h4>
        <div class="w-48 h-48 bg-gray-200 mx-auto flex items-center justify-center text-gray-400">
          QR Code
        </div>
        <p class="text-xs text-gray-500">
          访问地址: {{ registerUrl }}
        </p>
      </div>
    </UModal>
  </UCard>
</template>

<script setup lang="ts">
import * as XLSX from 'xlsx'

const { users, addUser, importUsers } = useRaffle()

const fileInput = ref<HTMLInputElement | null>(null)
const showQrModal = ref(false)
const registerUrl = ref('')

onMounted(() => {
  registerUrl.value = `${window.location.origin}/register`
})

const form = ref({ name: '', phone: '', jobId: '' })

const onSingleSubmit = () => {
  if (!form.value.name || !form.value.phone) return
  addUser({ ...form.value })
  form.value = { name: '', phone: '', jobId: '' }
}

const triggerFileInput = () => fileInput.value?.click()

const handleExcelImport = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (!target.files?.[0]) return

  const reader = new FileReader()
  reader.onload = (evt) => {
    const data = evt.target?.result
    const workbook = XLSX.read(data, { type: 'binary' })
    const sheetName = workbook.SheetNames[0]
    const sheet = workbook.Sheets[sheetName]
    const rows = XLSX.utils.sheet_to_json(sheet) as any[]

    const parsedUsers = rows.map(row => ({
      name: String(row['姓名'] || row['name'] || ''),
      phone: String(row['手机号'] || row['phone'] || ''),
      jobId: String(row['工号'] || row['jobId'] || ''),
    }))
    importUsers(parsedUsers)
  }
  reader.readAsBinaryString(target.files[0])
}
</script>
