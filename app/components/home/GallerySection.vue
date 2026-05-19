<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const swiperModules = [Pagination, Autoplay]

const categories = [
  {
    id: 1,
    number: '01',
    icon: 'mdi:broom',
    title: 'Генеральная уборка',
    description: 'Глубокая чистка после ремонта, переезда или долгого отсутствия.',
    photos: [
      '/images/gallery/general-1.jpg',
      '/images/gallery/general-2.jpg',
      '/images/gallery/general-3.jpg',
    ],
    placeholder: 'from-slate-700 to-slate-900',
    placeholderIcon: 'mdi:broom',
    accentColor: 'text-accent',
    accentBg: 'bg-accent/25',
    numberColor: 'text-white/[0.05]',
    overlayGradient: 'from-black/80 via-black/30 to-transparent',
    wide: false,
  },
  {
    id: 2,
    number: '02',
    icon: 'mdi:calendar-check',
    title: 'Поддерживающая уборка',
    description: 'Регулярный уход за вашим пространством — чисто всегда.',
    photos: [
      '/images/gallery/regular-1.jpg',
      '/images/gallery/regular-2.jpg',
      '/images/gallery/regular-3.jpg',
    ],
    placeholder: 'from-emerald-700 to-emerald-950',
    placeholderIcon: 'mdi:calendar-check',
    accentColor: 'text-emerald-400',
    accentBg: 'bg-emerald-500/25',
    numberColor: 'text-emerald-400/15',
    overlayGradient: 'from-emerald-950/80 via-emerald-900/30 to-transparent',
    wide: true,
  },
  {
    id: 3,
    number: '03',
    icon: 'mdi:window-closed-variant',
    title: 'Мытьё окон',
    description: 'Стёкла, рамы и подоконники — без разводов и пятен.',
    photos: [
      '/images/gallery/windows-1.jpg',
      '/images/gallery/windows-2.jpg',
      '/images/gallery/windows-3.jpg',
    ],
    placeholder: 'from-sky-700 to-sky-950',
    placeholderIcon: 'mdi:window-closed-variant',
    accentColor: 'text-sky-400',
    accentBg: 'bg-blue-500/25',
    numberColor: 'text-sky-400/15',
    overlayGradient: 'from-sky-950/80 via-sky-900/30 to-transparent',
    wide: true,
  },
  {
    id: 4,
    number: '04',
    icon: 'mdi:sofa',
    title: 'Химчистка мебели',
    description: 'Диваны, кресла и матрасы — пятна и запахи уходят.',
    photos: [
      '/images/gallery/sofa-1.jpg',
      '/images/gallery/sofa-2.jpg',
      '/images/gallery/sofa-3.jpg',
    ],
    placeholder: 'from-violet-700 to-violet-950',
    placeholderIcon: 'mdi:sofa',
    accentColor: 'text-violet-400',
    accentBg: 'bg-violet-500/25',
    numberColor: 'text-violet-400/15',
    overlayGradient: 'from-violet-950/80 via-violet-900/35 to-transparent',
    wide: false,
  },
]

function scrollToContact(service?: string) {
  if (service) useState('preselected-service', () => '').value = service
  const el = document.querySelector('#contact')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const headerRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
useIntersectionObserver(headerRef, ([entry]) => {
  if (entry.isIntersecting) isVisible.value = true
}, { threshold: 0.2 })
</script>

<template>
  <section id="gallery" class="py-14 lg:py-24 bg-blue-50">
    <div class="container-site">

      <!-- Header -->
      <div
        ref="headerRef"
        class="text-center mb-10 reveal-item"
        :class="{ 'is-revealed': isVisible }"
      >
        <p class="section-label mb-3">Портфолио</p>
        <h2 class="font-heading text-display-lg text-ink mb-4">Примеры наших работ</h2>
        <p class="text-muted text-lg max-w-xl mx-auto">
          Реальные результаты по каждому направлению — листайте фотографии внутри.
        </p>
      </div>

      <!-- Bento grid — mirrored layout -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        <template v-for="(cat, i) in categories" :key="cat.id">
          <div
            :class="cat.wide ? 'sm:col-span-2 lg:col-span-2' : 'lg:col-span-1'"
            class="relative"
          >
            <div
              class="reveal-item relative rounded-3xl overflow-hidden"
              :class="[
                cat.wide ? 'min-h-[320px]' : 'min-h-[320px]',
                { 'is-revealed': isVisible },
              ]"
              :style="{ transitionDelay: isVisible ? (i * 0.12) + 's' : '0s' }"
            >

              <!-- Photo swiper as background -->
              <Swiper
                :modules="swiperModules"
                :slides-per-view="1"
                :loop="true"
                :autoplay="{ delay: 3500, disableOnInteraction: true, pauseOnMouseEnter: true }"
                :pagination="{ clickable: true }"
                class="absolute inset-0 w-full h-full gallery-swiper"
              >
                <SwiperSlide v-for="(photo, pi) in cat.photos" :key="pi" class="relative">
                  <!-- Placeholder -->
                  <div
                    class="absolute inset-0 bg-gradient-to-br flex items-center justify-center"
                    :class="cat.placeholder"
                  >
                    <Icon :name="cat.placeholderIcon" class="text-white/15" style="font-size: 80px" />
                  </div>
                  <!-- Real photo -->
                  <img
                    :src="photo"
                    alt=""
                    class="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </SwiperSlide>
              </Swiper>

              <!-- Gradient overlay -->
              <div
                class="absolute inset-0 bg-gradient-to-t pointer-events-none z-10"
                :class="cat.overlayGradient"
              />

              <!-- Decorative number -->
              <span
                class="absolute right-4 -top-2 font-heading font-black leading-none select-none pointer-events-none z-10"
                :class="cat.numberColor"
                :style="{ fontSize: cat.wide ? '130px' : '110px' }"
              >{{ cat.number }}</span>

              <!-- Content -->
              <div class="absolute bottom-0 left-0 right-0 p-6 z-20 pointer-events-none">
                <div
                  class="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  :class="cat.accentBg"
                >
                  <Icon :name="cat.icon" class="text-lg" :class="cat.accentColor" />
                </div>
                <h3
                  class="font-heading font-bold text-white mb-1"
                  :class="cat.wide ? 'text-xl' : 'text-lg'"
                >{{ cat.title }}</h3>
                <p class="text-white/60 text-sm leading-relaxed" :class="cat.wide ? 'max-w-md' : ''">
                  {{ cat.description }}
                </p>
              </div>

            </div>

            <!-- Notch button -->
            <div class="absolute bottom-0 right-0 z-30 bg-blue-50 rounded-tl-3xl pt-3 pl-3">
              <button class="btn-primary text-sm shadow-lg" @click="scrollToContact(cat.title)">
                <Icon name="mdi:send" /> Заказать
              </button>
            </div>
          </div>
        </template>

      </div>
    </div>
  </section>
</template>

<style>
.gallery-swiper .swiper-pagination {
  bottom: 14px;
  z-index: 30;
}
.gallery-swiper .swiper-pagination-bullet {
  background: white;
  opacity: 0.5;
  width: 6px;
  height: 6px;
}
.gallery-swiper .swiper-pagination-bullet-active {
  background: white;
  opacity: 1;
  width: 18px;
  border-radius: 3px;
}
</style>
