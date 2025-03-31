<script setup>
// import type { FormSubmitEvent } from '@nuxt/ui'
// import type { z } from 'zod'
import { parseDateTime } from '@internationalized/date'
import { assertInfoSchema } from '#shared/zschema/index'

// type Schema = z.output<typeof assertInfoSchema>

const toast = useToast()
const route = useRoute()

const id = route.query.id

let state = reactive({
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
const expirationDate = shallowRef(formatDate(new Date()))
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

if (id) {
  const { data } = await useAsyncData('item', () => $fetch(`/api/assets/${id}`))

  if (data.value?.value) {
    state = data.value?.value
    expirationDate.value = parseDateTime(formatDate(data.value?.value?.expirationDate))
  }
}

const onSubmit = async (event) => {
  const v = {
    ...event.data,
    expirationDate: expirationDate.value.toString()
  }

  await $fetch(id ? `/api/assets/${id}` : '/api/assets', {
    method: id ? 'PATCH' : 'POST',
    body: v
  })

  toast.add({
    title: 'Success',
    description: 'Form Submitted',
    color: 'success',
  })
  goBack()
}

const onCreateVideo = (item) => {
  videoList.value.push(item)
  state.videoUrl = [...state.videoUrl, item]
}

const onCreateImg = (item) => {
  imgList.value.push(item)
  state.imgUrl = [...state.imgUrl, item]
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
        <USelectMenu
          v-model="state.videoUrl"
          multiple
          create-item
          :items="videoList"
          class="w-48"
          @create="onCreateVideo"
        />
      </UFormField>

      <UFormField label="Image" name="imgUrl">
        <USelectMenu
          v-model="state.imgUrl"
          multiple
          create-item
          :items="imgList"
          class="w-48"
          @create="onCreateImg"
         />
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
