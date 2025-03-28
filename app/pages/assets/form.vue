<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import { assertInfoSchema } from '#shared/zschema/index'
import type { z } from 'zod'

type Schema = z.output<typeof assertInfoSchema>

const state = reactive<Partial<Schema>>({
  id: '',
  name: '',
  description: '',
  videoUrl: [],
  imgUrl: [],
  expirationDate: undefined,
  valid: true,
  createdAt: '',
  updatedAt: '',
})
const expirationDate = shallowRef()
const videoList = ref([
  {
    type: 'label',
    label: 'Fruits'
  },
  'Apple',
  'Samsung',
])
const imgList = ref([
  {
    type: 'label',
    label: 'Fruits'
  },
  'Apple',
])
const toast = useToast()

const onSubmit = (event: FormSubmitEvent<Schema>) => {
  toast.add({
    title: 'Success',
    description: 'Form Submitted',
    color: 'success',
  })
  console.log(event.data)
}

const goBack = () => {
  navigateTo('/assets')
}
</script>

<template>
  <UContainer>
    <USeparator color="primary" type="dashed" size="lg" class="text-4xl">
      Assets Manage
    </USeparator>

    <UForm
      :schema="assertInfoSchema"
      :state="state"
      class="gap-4 flex flex-col"
      @submit="onSubmit"
    >
      <UFormField label="Name" name="name">
        <UInput v-model="state.name" />
      </UFormField>

      <UFormField label="Description" name="description">
        <UTextarea v-model="state.description" />
      </UFormField>

      <UFormField label="Video" name="videoUrl">
        <USelectMenu v-model="state.videoUrl" multiple :items="videoList" class="w-48" />
      </UFormField>

      <UFormField label="Image" name="imgUrl">
        <USelectMenu v-model="state.imgUrl" multiple :items="imgList" class="w-48" />
      </UFormField>

      <UFormField label="Expiration Date" name="expirationDate">
        <UPopover>
          <UButton color="neutral" variant="subtle" icon="i-lucide-calendar">
            {{ expirationDate ? formatDate(expirationDate) : 'Select a date' }}
          </UButton>

          <template #content>
            <UCalendar v-model="expirationDate" />
          </template>
        </UPopover>
      </UFormField>

      <UFormField label="Valid Status" name="valid">
        <USwitch v-model="state.valid" :label="state.valid ? 'valid' : 'invalid'" />
      </UFormField>

      <div class="flex gap-4 w-60">
        <UButton type="submit">Submit</UButton>
        <UButton color="neutral" @click="goBack">Back</UButton>
      </div>
    </UForm>
  </UContainer>
</template>
