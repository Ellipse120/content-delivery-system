<script lang="ts" setup>
type R = { msg:string, remainNum: number }
const logs = ref < { id: number, response: R }[]>([])
const count = ref(1)
const { play, stop } = useSound('/sounds/fanfare.mp3')
const { play: playWarn } = useSound('/sounds/warn.mp3')
const interval = 300000
const { isSupported, isActive, request, release } = useWakeLock()

const fn = async () => {
  const data = await $fetch<R>('/api/fetch-2073')

  logs.value.unshift({
    id: count.value++,
    response: data,
  })

  if (data.remainNum) {
    play()
  }

  if (data.msg.includes('token')) {
    playWarn()

  }
}

fn()

useIntervalFn(fn, interval)
</script>

<template>
  <div class="px-4">
    <h1 class="text-red-500 text-3xl text-center p-6 bg-primary" @click="stop()">Doctor of 2073 ({{ interval }}s)</h1>
    <div v-if="isSupported" class="flex gap-4 items-center justify-center border-2 border-pink-500 p-2 rounded">
      <div class="text-green-500">{{ `Wake Lock ${isActive? 'On' : 'Off'}` }}</div>
      <UButton color="error" label="阻止电脑休眠" @click="request('screen')" />
      <UButton label="电脑休眠" @click="release()" />
    </div>

    <div class="max-h-dvh overflow-y-auto">
      <div v-for="(item) in logs" :key="item.id" class="p-4">
        <span>{{ item.id }}</span>、  <span :class="item.response.remainNum > 0 ? 'text-red-500': ''">{{ item.response.remainNum }}</span> || <span>{{ item.response.msg }}</span>
      </div>
    </div>
  </div>
</template>

<style>

</style>