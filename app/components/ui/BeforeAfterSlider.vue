<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  beforeSrc: string
  afterSrc: string
  beforeLabel?: string
  afterLabel?: string
}>()

const placeholderBefore = computed(() =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#e2e8f0"/>
          <stop offset="100%" stop-color="#cbd5e1"/>
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#bg)"/>
      <rect x="60" y="80" width="200" height="140" rx="12" fill="#b8c4d0" opacity="0.6"/>
      <rect x="280" y="80" width="460" height="140" rx="12" fill="#b8c4d0" opacity="0.4"/>
      <rect x="60" y="240" width="680" height="80" rx="12" fill="#b8c4d0" opacity="0.5"/>
      <rect x="60" y="340" width="680" height="80" rx="12" fill="#b8c4d0" opacity="0.4"/>
      <rect x="60" y="440" width="300" height="80" rx="12" fill="#b8c4d0" opacity="0.3"/>
      <text x="50%" y="52%" text-anchor="middle" fill="#64748B" font-size="22" font-family="sans-serif" font-weight="600">До уборки</text>
    </svg>`,
  )}`,
)

const placeholderAfter = computed(() =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
      <defs>
        <linearGradient id="bg2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#d1fae5"/>
          <stop offset="100%" stop-color="#a7f3d0"/>
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#bg2)"/>
      <rect x="60" y="80" width="200" height="140" rx="12" fill="#6ee7b7" opacity="0.5"/>
      <rect x="280" y="80" width="460" height="140" rx="12" fill="#6ee7b7" opacity="0.35"/>
      <rect x="60" y="240" width="680" height="80" rx="12" fill="#6ee7b7" opacity="0.4"/>
      <rect x="60" y="340" width="680" height="80" rx="12" fill="#6ee7b7" opacity="0.3"/>
      <rect x="60" y="440" width="300" height="80" rx="12" fill="#6ee7b7" opacity="0.25"/>
      <circle cx="680" cy="480" r="60" fill="#10B981" opacity="0.15"/>
      <text x="50%" y="48%" text-anchor="middle" fill="#059669" font-size="22" font-family="sans-serif" font-weight="600">После уборки</text>
      <text x="50%" y="57%" text-anchor="middle" fill="#10B981" font-size="14" font-family="sans-serif">Фото будут добавлены</text>
    </svg>`,
  )}`,
)

const beforeSrcFinal = ref(props.beforeSrc)
const afterSrcFinal = ref(props.afterSrc)

function onBeforeError() { beforeSrcFinal.value = placeholderBefore.value }
function onAfterError() { afterSrcFinal.value = placeholderAfter.value }

const sliderRef = ref<HTMLElement | null>(null)
const position = ref(50)
const isDragging = ref(false)

function getPositionFromEvent(e: MouseEvent | TouchEvent): number {
  if (!sliderRef.value) return 50
  const rect = sliderRef.value.getBoundingClientRect()
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
  return Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 0), 100)
}

function startDrag(e: MouseEvent | TouchEvent) {
  isDragging.value = true
  position.value = getPositionFromEvent(e)
}

function onDrag(e: MouseEvent | TouchEvent) {
  if (!isDragging.value) return
  position.value = getPositionFromEvent(e)
}

function stopDrag() { isDragging.value = false }

onMounted(() => {
  window.addEventListener('mousemove', onDrag)
  window.addEventListener('mouseup', stopDrag)
  window.addEventListener('touchmove', onDrag, { passive: true })
  window.addEventListener('touchend', stopDrag)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
  window.removeEventListener('touchmove', onDrag)
  window.removeEventListener('touchend', stopDrag)
})
</script>

<template>
  <div
    ref="sliderRef"
    class="relative overflow-hidden rounded-2xl aspect-[4/3] bg-surface select-none cursor-col-resize"
    @mousedown="startDrag"
    @touchstart.prevent="startDrag"
  >
    <!-- Before image -->
    <img
      :src="beforeSrcFinal"
      alt="До уборки"
      class="absolute inset-0 w-full h-full object-cover"
      draggable="false"
      @error="onBeforeError"
    />

    <!-- After image (clipped from left) -->
    <div
      class="absolute inset-0 overflow-hidden"
      :style="{ clipPath: `inset(0 ${100 - position}% 0 0)` }"
    >
      <img
        :src="afterSrcFinal"
        alt="После уборки"
        class="w-full h-full object-cover"
        draggable="false"
        @error="onAfterError"
      />
    </div>

    <!-- Divider -->
    <div
      class="absolute top-0 bottom-0 w-0.5 bg-white z-10 pointer-events-none"
      :style="{ left: `${position}%` }"
    >
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full shadow-lg flex items-center justify-center">
        <Icon name="mdi:arrow-left-right" class="text-ink text-lg" />
      </div>
    </div>

    <!-- Labels -->
    <span class="absolute bottom-3 left-3 z-20 text-xs font-bold text-white bg-black/50 backdrop-blur-sm rounded-md px-2 py-1 pointer-events-none">
      {{ beforeLabel ?? 'До' }}
    </span>
    <span class="absolute bottom-3 right-3 z-20 text-xs font-bold text-white bg-accent/80 backdrop-blur-sm rounded-md px-2 py-1 pointer-events-none">
      {{ afterLabel ?? 'После' }}
    </span>
  </div>
</template>
