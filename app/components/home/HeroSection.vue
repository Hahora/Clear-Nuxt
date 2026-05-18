<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'

const phone = '+7 928 196-45-95'
const phoneTel = 'tel:+79281964595'

function scrollTo(href: string) {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const isScrolled = ref(false)

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .from('.hero-text', { opacity: 0, y: 30, duration: 0.7 })
    .from('.hero-img-col', { opacity: 0, y: 50, duration: 0.9 }, '-=0.4')

  const handleScroll = () => { isScrolled.value = window.scrollY > 300 }
  window.addEventListener('scroll', handleScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', handleScroll))
})
</script>

<template>
  <section class="relative pt-20 pb-8 lg:min-h-screen lg:flex lg:flex-col lg:justify-center">

    <!-- Background -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute inset-0 bg-gradient-to-br from-bg via-green-50/30 to-green-50/30" />
      <div class="absolute inset-0 opacity-[0.18] sm:opacity-[0.28]"
           style="background-image: radial-gradient(circle, #cbd5e1 1px, transparent 1px); background-size: 32px 32px;" />
      <div class="absolute top-1/3 right-0 w-[500px] h-[500px] bg-primary/6 rounded-full translate-x-1/2 blur-3xl" />
      <div class="absolute bottom-1/4 left-0 w-80 h-80 bg-accent/6 rounded-full -translate-x-1/2 blur-3xl" />
    </div>

    <div class="container-site relative z-10">
      <div class="grid lg:grid-cols-2 lg:gap-14 lg:items-center">

        <!-- Left: text -->
        <div class="hero-text mb-6 lg:mb-0">
          <h1 class="font-heading text-display-lg text-ink leading-tight mb-4">
            Уборка квартир,&nbsp;домов
            и&nbsp;коммерческих помещений
            в&nbsp;Ростове-на-Дону <span class="text-accent">от&nbsp;150&nbsp;₽/м²</span>
          </h1>
          <p class="text-muted text-base leading-relaxed mb-7 max-w-md">
            Используем только профессиональное оборудование и экологичные средства.
            Команда опытных специалистов знает, как эффективно убирать помещения.
          </p>
          <div class="flex flex-wrap items-center gap-4">
            <button class="btn-primary" @click="scrollTo('#contact')">
              <Icon name="mdi:calculator-variant-outline" />
              Рассчитать стоимость
            </button>
            <a
              :href="phoneTel"
              class="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-accent transition-colors duration-200"
            >
              <Icon name="mdi:phone" class="text-accent text-base" />
              {{ phone }}
            </a>
          </div>
        </div>

        <!-- Right: photo -->
        <div class="hero-img-col relative">
          <div class="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] bg-slate-100">

            <!-- Placeholder -->
            <div class="absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-100 to-green-50/60 flex items-center justify-center">
              <div class="text-center select-none">
                <Icon name="mdi:broom" class="text-slate-300 mb-3" style="font-size: 72px" />
                <p class="text-slate-400 font-medium">Фото уборки</p>
                <p class="text-slate-300 text-xs mt-1">public/images/hero/cleaning-hero.jpg</p>
              </div>
            </div>

            <!-- Real photo -->
            <img
              src="/images/hero/cleaning-hero.jpg"
              alt="Профессиональная уборка"
              class="absolute inset-0 w-full h-full object-cover object-center"
            />

            <!-- Bottom gradient -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </div>

          <!-- Вырез сверху-справа: кнопка -->
          <div class="absolute top-0 right-0 z-20 bg-bg rounded-bl-2xl sm:rounded-bl-3xl pb-3 pl-3 sm:pb-5 sm:pl-5">
            <button
              class="btn-primary px-4 py-2 text-xs sm:px-6 sm:py-3 sm:text-sm shadow-lg"
              @click="scrollTo('#contact')"
            >
              Заказать
              <Icon name="mdi:arrow-right" />
            </button>
          </div>

          <!-- Вырез снизу-слева: телефон (только мобайл/планшет) -->
          <div class="absolute bottom-0 left-0 z-20 lg:hidden bg-bg rounded-tr-2xl sm:rounded-tr-3xl pt-3 pr-3 sm:pt-5 sm:pr-5">
            <a
              :href="phoneTel"
              class="inline-flex items-center gap-2.5 bg-white rounded-xl px-3 py-2 shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div class="w-7 h-7 rounded-lg bg-accent flex items-center justify-center shrink-0">
                <Icon name="mdi:phone" class="text-white text-xs" />
              </div>
              <div>
                <p class="text-[10px] text-muted leading-none mb-0.5">Позвонить</p>
                <p class="text-xs font-bold text-ink leading-none">{{ phone }}</p>
              </div>
            </a>
          </div>

        </div>
      </div>
    </div>

    <!-- Scroll / Back to top -->
    <button
      class="hidden lg:flex fixed right-10 xl:right-14 bottom-10 z-50 w-12 h-12 rounded-full bg-accent items-center justify-center text-white shadow-lg hover:bg-green-800 hover:scale-105 transition-all duration-200"
      :class="{ 'animate-bounce': !isScrolled }"
      :aria-label="isScrolled ? 'Наверх' : 'Прокрутить вниз'"
      @click="isScrolled ? scrollToTop() : scrollTo('#services')"
    >
      <Icon
        :name="isScrolled ? 'mdi:chevron-up' : 'mdi:chevron-down'"
        class="text-xl transition-transform duration-300"
      />
    </button>
  </section>
</template>
