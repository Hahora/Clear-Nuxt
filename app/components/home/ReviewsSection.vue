<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const swiperModules = [Pagination, Autoplay]

const reviews = [
  {
    name: 'Анна Козлова',
    city: 'Ростов-на-Дону',
    rating: 5,
    date: 'апрель 2025',
    service: 'Генеральная уборка',
    text: 'Заказывала генеральную после ремонта — пришли вдвоём, убрали за 4 часа. Строительная пыль, разводы на окнах, налёт в ванной — всё вычистили идеально. Теперь вызываем каждые две недели.',
    initials: 'АК',
    color: 'bg-accent',
  },
  {
    name: 'Дмитрий Петров',
    city: 'Ростов-на-Дону',
    rating: 5,
    date: 'март 2025',
    service: 'Поддерживающая уборка',
    text: 'Пользуемся раз в неделю уже три месяца. Приходят в одно и то же время, всё делают аккуратно. Особенно нравится, что не нужно напоминать про мелочи — запомнили все наши пожелания.',
    initials: 'ДП',
    color: 'bg-[#0D2167]',
  },
  {
    name: 'Мария Соколова',
    city: 'Ростов-на-Дону',
    rating: 5,
    date: 'апрель 2025',
    service: 'Мытьё окон',
    text: 'Четыре больших окна и балкон — без единого развода. Заодно вымыли рамы и подоконники, о которых я даже не просила. Цена за качество отличная, рекомендую.',
    initials: 'МС',
    color: 'bg-violet-500',
  },
  {
    name: 'Игорь Новиков',
    city: 'Ростов-на-Дону',
    rating: 5,
    date: 'февраль 2025',
    service: 'Химчистка мебели',
    text: 'Диван после котёнка — это отдельная история. Думал, уже не спасти. Ребята справились за 3 часа, запах ушёл полностью, пятна тоже. Дивану 5 лет, выглядит как новый.',
    initials: 'ИН',
    color: 'bg-amber-500',
  },
  {
    name: 'Светлана Архипова',
    city: 'Ростов-на-Дону',
    rating: 5,
    date: 'март 2025',
    service: 'Генеральная уборка',
    text: 'Переезжали в новую квартиру, заказали уборку перед заселением. Всё прошло без проблем: приехали вовремя, работали чисто, лишних вопросов не задавали. Квартира сверкала.',
    initials: 'СА',
    color: 'bg-rose-500',
  },
  {
    name: 'Алексей Воронов',
    city: 'Ростов-на-Дону',
    rating: 5,
    date: 'январь 2025',
    service: 'Поддерживающая уборка',
    text: 'Честно — не верил, что будет хорошо. Ошибся. Приятный персонал, всё по делу, ничего лишнего. Цена честная, сюрпризов нет. Теперь постоянный клиент.',
    initials: 'АВ',
    color: 'bg-teal-500',
  },
]

const headerRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
useIntersectionObserver(headerRef, ([entry]) => {
  if (entry.isIntersecting) isVisible.value = true
}, { threshold: 0.2 })
</script>

<template>
  <section id="reviews" class="py-14 lg:py-24 bg-bg">
    <div class="container-site">

      <!-- Header -->
      <div
        ref="headerRef"
        class="text-center mb-12 reveal-item"
        :class="{ 'is-revealed': isVisible }"
      >
        <p class="section-label mb-3">Отзывы</p>
        <h2 class="font-heading text-display-lg text-ink mb-4">Что говорят клиенты</h2>
        <p class="text-muted text-lg max-w-xl mx-auto">
          Реальные отзывы людей, которые уже воспользовались нашими услугами.
        </p>
      </div>

      <!-- Carousel -->
      <div
        class="reveal-item"
        :class="{ 'is-revealed': isVisible }"
        :style="{ transitionDelay: isVisible ? '0.15s' : '0s' }"
      >
        <Swiper
          :modules="swiperModules"
          :slides-per-view="1"
          :space-between="16"
          :breakpoints="{
            640:  { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }"
          :autoplay="{ delay: 4000, disableOnInteraction: true, pauseOnMouseEnter: true }"
          :pagination="{ clickable: true }"
          :loop="true"
          class="reviews-swiper pb-12"
        >
          <SwiperSlide v-for="review in reviews" :key="review.name" class="h-auto">
            <div class="bg-white rounded-2xl p-6 shadow-card flex flex-col gap-4 h-full">

              <!-- Top: avatar + name + stars -->
              <div class="flex items-start gap-3">
                <div
                  class="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                  :class="review.color"
                >
                  {{ review.initials }}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-ink text-sm leading-tight">{{ review.name }}</p>
                  <p class="text-xs text-muted">{{ review.city }}</p>
                </div>
                <div class="flex gap-0.5 shrink-0">
                  <Icon v-for="n in 5" :key="n" name="mdi:star" class="text-amber-400 text-sm" />
                </div>
              </div>

              <!-- Text -->
              <p class="text-sm text-ink/75 leading-relaxed flex-1">{{ review.text }}</p>

              <!-- Bottom: service + date -->
              <div class="flex items-center justify-between pt-3 border-t border-surface">
                <span class="text-xs font-medium text-accent bg-accent/10 px-2.5 py-1 rounded-full">
                  {{ review.service }}
                </span>
                <span class="text-xs text-muted">{{ review.date }}</span>
              </div>

            </div>
          </SwiperSlide>
        </Swiper>
      </div>

    </div>
  </section>
</template>

<style>
.reviews-swiper .swiper-pagination-bullet {
  background: #cbd5e1;
  opacity: 1;
  width: 8px;
  height: 8px;
}
.reviews-swiper .swiper-pagination-bullet-active {
  background: #0D2167;
  width: 24px;
  border-radius: 4px;
}
.reviews-swiper .swiper-slide {
  height: auto;
}
</style>
