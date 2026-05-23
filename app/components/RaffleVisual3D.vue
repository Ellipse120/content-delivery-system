<template>
  <div class="relative w-full h-125 bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
    <!-- TresJS 3D 画布 -->
    <TresCanvas
      clear-color="#020617"
      shadows
    >
      <TresPerspectiveCamera :position="[0, 0, 10]" />
      <OrbitControls />
      <TresAmbientLight :intensity="0.5" />
      <TresDirectionalLight
        :position="[5, 5, 5]"
        :intensity="1"
      />

      <!-- 3D 名字粒子群 (用球体分布模拟) -->
      <TresGroup ref="ballGroupRef">
        <TresMesh
          v-for="(pos, idx) in particlePositions"
          :key="idx"
          :position="pos"
        >
          <TresSphereGeometry :args="[0.1, 16, 16]" />
          <TresMeshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
          />
        </TresMesh>
      </TresGroup>
    </TresCanvas>

    <!-- 浮动文字大屏：展示当前中奖人 -->
    <div
      v-if="isRolling || luckyWinners.length"
      class="absolute inset-0 flex flex-col items-center justify-center bg-black/40 pointer-events-none"
    >
      <div
        v-if="isRolling"
        class="text-4xl font-extrabold text-amber-400 animate-pulse"
      >
        正在滚动名单...
      </div>
      <div
        v-else-if="luckyWinners.length"
        class="text-center space-y-4"
      >
        <h4 class="text-xl text-white font-bold">
          🎉 恭喜中奖 🎉
        </h4>
        <div class="flex flex-wrap justify-center gap-4">
          <div
            v-for="w in luckyWinners"
            :key="w.id"
            class="bg-amber-500 text-slate-900 px-6 py-3 rounded-xl font-black text-2xl shadow-lg scale-110 transition-transform"
          >
            {{ w.name }}
            <span class="text-xs block font-normal opacity-70">{{ w.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLoop } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'

const props = defineProps<{ isRolling: boolean, luckyWinners: User[] }>()
const ballGroupRef = ref<any>(null)

// 动态生成球体表面点位
const particlePositions = computed<[number, number, number][]>(() => {
  const count = 100
  const points: [number, number, number][] = []
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(-1 + (2 * i) / count)
    const theta = Math.sqrt(count * Math.PI) * phi

    const x = 3 * Math.sin(phi) * Math.cos(theta)
    const y = 3 * Math.sin(phi) * Math.sin(theta)
    const z = 3 * Math.cos(phi)

    points.push([
      x, y, z,
    ])
  }
  return points
})

// 使用 TresJS 的渲染主循环控制旋转速度
// const { onLoop } = useLoop()
// onLoop(({ delta }) => {
//   if (!ballGroupRef.value) return
//   if (props.isRolling) {
//     // 抽奖时高速旋转
//     ballGroupRef.value.rotation.y += delta * 10
//     ballGroupRef.value.rotation.x += delta * 5
//   }
//   else {
//     // 平时怠速旋转
//     ballGroupRef.value.rotation.y += delta * 0.5
//   }
// })
</script>
