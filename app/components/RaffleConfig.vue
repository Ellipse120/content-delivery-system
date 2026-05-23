<script setup lang="ts">
const { prizes, currentPrizeId } = useRaffle()
const drawCount = defineModel<number>('drawCount', { default: 1 })

const addPrizeRow = () => {
  prizes.value.push({ id: crypto.randomUUID(), level: '', name: '', count: 1 })
}

const prizeOptions = computed(() =>
  prizes.value.map(p => ({ value: p.id, label: `${p.level} - ${p.name} (共${p.count}个)` })),
)

watch(prizeOptions, (newVal) => {
  if (newVal.length && !currentPrizeId.value) {
    currentPrizeId.value = newVal[0]!.value
  }
}, { immediate: true })
</script>

<template>
  <UCard class="space-y-4">
    <h3 class="text-lg font-bold mb-4">
      抽奖配置
    </h3>
    <div class="space-y-4 max-h-62.5 overflow-y-auto pr-1">
      <div
        v-for="(prize, index) in prizes"
        :key="prize.id"
        class="grid grid-cols-4 gap-2 items-end"
      >
        <UFormField label="等级">
          <UInput v-model="prize.level" />
        </UFormField>
        <UFormField label="奖品">
          <UInput v-model="prize.name" />
        </UFormField>
        <UFormField label="数量">
          <UInput
            v-model.number="prize.count"
            type="number"
          />
        </UFormField>
        <UButton
          color="error"
          variant="ghost"
          icon="i-heroicons-trash"
          @click="prizes.splice(index, 1)"
        />
      </div>
      <UButton
        icon="i-heroicons-plus"
        color="primary"
        variant="outline"
        block
        @click="addPrizeRow"
      >
        添加奖品
      </UButton>
    </div>

    <div class="border-t pt-4 mt-4 grid grid-cols-2 gap-4">
      <UFormField label="当前抽选奖品">
        <USelect
          v-model="currentPrizeId"
          :options="prizeOptions"
          placeholder="请选择"
        />
      </UFormField>
      <UFormField label="单次抽奖人数">
        <UInput
          v-model.number="drawCount"
          type="number"
          min="1"
        />
      </UFormField>
    </div>
  </UCard>
</template>
