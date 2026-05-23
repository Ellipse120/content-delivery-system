<script setup lang="ts">
const { users, prizes, winners, currentPrizeId, draw } = useRaffle()

const drawCount = ref(1)
const isRolling = ref(false)
const luckyWinners = ref<any[]>([])

const getPrizeName = (id: string) => {
  const match = prizes.value.find(p => p.id === id)
  return match ? `${match.level} · ${match.name}` : '未知奖项'
}

const toggleDraw = () => {
  if (isRolling.value) {
    // Stop: compute winners via composable and stop rolling animation
    luckyWinners.value = draw(drawCount.value)
    isRolling.value = false
  }
  else {
    // Start: clear transient layout array and ignite 3D rolling speed
    luckyWinners.value = []
    isRolling.value = true
  }
}
</script>

<template>
  <UContainer class="py-8 space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-primary-500 to-amber-500">
        企业 3D 互动抽奖系统
      </h1>
      <UBadge
        size="lg"
        :color="users.length ? 'primary' : 'secondary'"
      >
        池内人数: {{ users.length }}
      </UBadge>
    </div>

    <!-- Upper Section: 3D Canvas Container & Trigger Button -->
    <div class="grid grid-cols-3 gap-6">
      <div class="col-span-2 space-y-4">
        <!-- <TresCanvas>
          <RaffleVisual3D
            :is-rolling="isRolling"
            :lucky-winners="luckyWinners"
          />
        </TresCanvas> -->

        <div class="flex justify-center">
          <UButton
            :color="isRolling ? 'error' : 'warning'"
            size="xl"
            class="px-16 py-4 text-xl font-bold tracking-widest rounded-full shadow-2xl transition-transform transform active:scale-95"
            :disabled="!currentPrizeId || users.length === 0"
            @click="toggleDraw"
          >
            {{ isRolling ? '停 止' : '开 始 抽 奖' }}
          </UButton>
        </div>
      </div>

      <!-- Settings Panel -->
      <div class="col-span-1">
        <RaffleConfig v-model:draw-count="drawCount" />
      </div>
    </div>

    <!-- Lower Section: Entries Input & Results Dashboard -->
    <div class="grid grid-cols-2 gap-6">
      <RaffleUserImport />

      <!-- Live Leaderboard -->
      <UCard>
        <template #header>
          <h3 class="text-lg font-bold">
            🎯 中奖红榜
          </h3>
        </template>
        <div class="space-y-4 max-h-75 overflow-y-auto">
          <div
            v-for="(userList, pId) in winners"
            :key="pId"
            class="border-b pb-3 last:border-0"
          >
            <span class="font-bold text-amber-500 text-sm">{{ getPrizeName(pId) }}:</span>
            <div class="flex flex-wrap gap-2 mt-2">
              <UBadge
                v-for="u in userList"
                :key="u.id"
                color="primary"
                variant="subtle"
              >
                {{ u.name }} <span class="opacity-60 text-xs ml-1">({{ u.jobId || '无工号' }})</span>
              </UBadge>
            </div>
          </div>
          <div
            v-if="Object.keys(winners).length === 0"
            class="text-center text-gray-400 py-8 text-sm"
          >
            暂无中奖数据，赶紧配置抽一个吧！
          </div>
        </div>
      </UCard>
    </div>
  </UContainer>
</template>
