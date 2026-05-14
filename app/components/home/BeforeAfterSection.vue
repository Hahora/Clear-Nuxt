<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const modules = [Pagination, A11y]

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
]

const headerRef = ref<HTMLElement | null>(null)
const swiperRef = ref<HTMLElement | null>(null)
const headerVisible = ref(false)
const swiperVisible = ref(false)

useIntersectionObserver(headerRef, ([entry]) => {
  if (entry.isIntersecting) headerVisible.value = true
}, { threshold: 0.3 })

useIntersectionObserver(swiperRef, ([entry]) => {
  if (entry.isIntersecting) swiperVisible.value = true
}, { threshold: 0.1 })
</script>

<template>
  <section id="before-after" class="py-section bg-bg">
    <div class="container-site">

      <!-- Header -->
      <div
        ref="headerRef"
        class="text-center mb-12 reveal-item"
        :class="{ 'is-revealed': headerVisible }"
      >
        <p class="section-label mb-3">Результаты</p>
        <h2 class="font-heading text-display-lg text-ink mb-4">До и после</h2>
        <p class="text-muted text-lg max-w-xl mx-auto">
          Перетащите разделитель, чтобы увидеть разницу. Реальные примеры нашей работы.
        </p>
      </div>

      <!-- Swiper -->
      <div
        ref="swiperRef"
        class="reveal-item ba-swiper"
        :class="{ 'is-revealed': swiperVisible }"
      >
        <Swiper
          :modules="modules"
          :slides-per-view="1.1"
          :space-between="16"
          :breakpoints="{
            640:  { slidesPerView: 1.6, spaceBetween: 20 },
            1024: { slidesPerView: 3,   spaceBetween: 24 },
          }"
          :pagination="{ clickable: true }"
          class="pb-10"
        >
          <SwiperSlide v-for="example in examples" :key="example.id">
            <div class="flex flex-col gap-3">
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
          </SwiperSlide>
        </Swiper>
      </div>

    </div>
  </section>
</template>

<style>
.ba-swiper .swiper-pagination-bullet {
  background: #cbd5e1;
  opacity: 1;
  width: 8px;
  height: 8px;
}
.ba-swiper .swiper-pagination-bullet-active {
  background: #10B981;
  width: 24px;
  border-radius: 4px;
}
</style>
