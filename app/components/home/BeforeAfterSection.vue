<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const examples = [
  {
    id: 1,
    title: 'Генеральная уборка квартиры',
    description: '3-комнатная квартира, 80 м²',
    before: '/images/before-after/before-1.jpg',
    after: '/images/before-after/after-1.jpg',
  },
  {
    id: 2,
    title: 'Кухня после ремонта',
    description: 'Строительный мусор и налёт',
    before: '/images/before-after/before-2.jpg',
    after: '/images/before-after/after-2.jpg',
  },
  {
    id: 3,
    title: 'Ванная комната',
    description: 'Удаление известкового налёта',
    before: '/images/before-after/before-3.jpg',
    after: '/images/before-after/after-3.jpg',
  },
  {
    id: 4,
    title: 'Химчистка дивана',
    description: 'Пятна и запахи — до и после',
    before: '/images/before-after/before-4.jpg',
    after: '/images/before-after/after-4.jpg',
  },
]

const headerRef = ref<HTMLElement | null>(null)
const gridRef = ref<HTMLElement | null>(null)
const headerVisible = ref(false)
const gridVisible = ref(false)

useIntersectionObserver(headerRef, ([entry]) => {
  if (entry.isIntersecting) headerVisible.value = true
}, { threshold: 0.3 })

useIntersectionObserver(gridRef, ([entry]) => {
  if (entry.isIntersecting) gridVisible.value = true
}, { threshold: 0.1 })
</script>

<template>
  <section id="before-after" class="py-14 lg:py-24 bg-bg">
    <div class="container-site">

      <!-- Header -->
      <div
        ref="headerRef"
        class="text-center mb-10 reveal-item"
        :class="{ 'is-revealed': headerVisible }"
      >
        <p class="section-label mb-3">Результаты</p>
        <h2 class="font-heading text-display-lg text-ink mb-4">До и после</h2>
        <p class="text-muted text-lg max-w-xl mx-auto">
          Перетащите разделитель, чтобы увидеть разницу. Реальные примеры нашей работы.
        </p>
      </div>

      <!-- Grid 2 cols -->
      <div
        ref="gridRef"
        class="grid grid-cols-2 gap-4 lg:gap-6"
      >
        <div
          v-for="(example, i) in examples"
          :key="example.id"
          class="reveal-item flex flex-col gap-2"
          :class="{ 'is-revealed': gridVisible }"
          :style="{ transitionDelay: gridVisible ? (i * 0.12) + 's' : '0s' }"
        >
          <UiBeforeAfterSlider
            :before-src="example.before"
            :after-src="example.after"
            before-label="До"
            after-label="После"
          />
          <div>
            <p class="font-heading font-semibold text-ink text-sm">{{ example.title }}</p>
            <p class="text-xs text-muted">{{ example.description }}</p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
