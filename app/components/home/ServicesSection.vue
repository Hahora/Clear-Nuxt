<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const services = [
  {
    id: 'general',
    icon: 'mdi:broom',
    title: 'Генеральная уборка',
    description: 'Глубокая уборка после ремонта, переезда или длительного проживания.',
    price: '3 500 ₽',
    duration: '3 ч',
    items: [
      'Мытьё полов, плинтусов и поверхностей',
      'Чистка кухни, плиты и вытяжки',
      'Уборка санузлов, удаление налёта',
      'Труднодоступные места: за мебелью',
      'Протирка мебели и дверей',
      'Мытьё зеркал и стёкол',
    ],
  },
  {
    id: 'regular',
    icon: 'mdi:calendar-check',
    title: 'Поддерживающая уборка',
    description: 'Регулярная уборка по удобному графику — разовая или еженедельная.',
    price: '1 500 ₽',
    duration: '2 ч',
    items: [
      'Пылесос и мытьё полов',
      'Пыль со всех поверхностей',
      'Уборка кухни и санузлов',
      'Вынос мусора',
      'Протирка техники',
      'Уборка балкона',
    ],
  },
  {
    id: 'windows',
    icon: 'mdi:window-closed-variant',
    title: 'Мытьё окон',
    description: 'Стёкла изнутри и снаружи, рамы, откосы и подоконники. Без разводов.',
    price: '1 800 ₽',
    duration: '1.5 ч',
    items: [
      'Стёкла изнутри и снаружи',
      'Рамы и подоконники',
      'Москитные сетки',
      'Стеклянные перегородки',
    ],
  },
  {
    id: 'upholstery',
    icon: 'mdi:sofa',
    title: 'Химчистка мебели',
    description: 'Химчистка диванов, кресел и матрасов. Удаляем пятна, запахи.',
    price: '2 000 ₽',
    duration: '4 ч',
    items: [
      'Диваны и кресла',
      'Матрасы — пятна и запахи',
      'Стулья, пуфы, изголовья',
      'Антибактериальная обработка',
      'Профессиональная химия',
      'Быстрое высыхание',
    ],
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
}, { threshold: 0.3 })
</script>

<template>
  <section id="services" class="py-14 lg:py-24 bg-blue-50">
    <div class="container-site">

      <!-- Header -->
      <div
        ref="headerRef"
        class="text-center mb-10 reveal-item"
        :class="{ 'is-revealed': isVisible }"
      >
        <p class="section-label mb-3">Услуги</p>
        <h2 class="font-heading text-display-lg text-ink mb-4">Что мы делаем</h2>
        <p class="text-muted text-lg max-w-2xl mx-auto">
          Четыре направления клининга — от разовой генеральной до регулярной поддерживающей.
        </p>
      </div>

      <!-- Bento grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        <!-- [1] Генеральная — hero card dark -->
        <div class="sm:col-span-2 lg:col-span-2 relative">
          <div
            class="reveal-item bg-ink rounded-3xl p-6 relative overflow-hidden flex flex-col h-full"
            :class="{ 'is-revealed': isVisible }"
            :style="{ transitionDelay: isVisible ? '0.1s' : '0s' }"
          >
            <span class="absolute right-4 -top-2 font-heading font-black text-white/[0.04] leading-none select-none pointer-events-none"
                  style="font-size: 110px;">01</span>

            <img
              src="/images/services/cleaner.png"
              alt=""
              aria-hidden="true"
              class="hidden sm:block absolute bottom-0 right-0 h-[90%] object-contain object-bottom pointer-events-none select-none"
            />

            <div class="w-11 h-11 rounded-xl bg-accent/20 flex items-center justify-center mb-3 shrink-0">
              <Icon name="mdi:broom" class="text-accent text-xl" />
            </div>

            <span class="inline-flex items-center gap-1.5 bg-accent/25 text-accent text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full w-fit mb-3">
              <Icon name="mdi:star" class="text-[10px]" /> Популярно
            </span>

            <h3 class="font-heading font-bold text-xl text-white mb-2 sm:max-w-[52%]">{{ services[0].title }}</h3>
            <p class="text-white/55 text-sm leading-relaxed mb-4 sm:max-w-[52%]">{{ services[0].description }}</p>

            <div class="grid grid-cols-2 gap-x-4 gap-y-2 mb-auto relative z-10 sm:max-w-[52%]">
              <div v-for="item in services[0].items" :key="item" class="flex items-start gap-1.5 text-sm text-white/65">
                <Icon name="mdi:check" class="text-accent shrink-0 mt-0.5 text-sm" />
                {{ item }}
              </div>
            </div>

            <div class="flex items-center gap-6 mt-4 pt-3 border-t border-white/10 relative z-10 sm:max-w-[52%]">
              <div>
                <p class="text-white/40 text-xs mb-0.5">Стоимость</p>
                <p class="text-white font-heading font-bold text-sm">от {{ services[0].price }}</p>
              </div>
              <div>
                <p class="text-white/40 text-xs mb-0.5">Время работы</p>
                <p class="text-white font-heading font-bold text-sm">от {{ services[0].duration }}</p>
              </div>
            </div>
          </div>

          <div class="absolute bottom-0 right-0 z-20 bg-blue-50 rounded-tl-3xl pt-3 pl-3">
            <button class="btn-primary text-sm shadow-lg" @click="scrollToContact(services[0].title)">
              <Icon name="mdi:send" />
              Заказать
            </button>
          </div>
        </div>

        <!-- [2] Поддерживающая -->
        <div
          class="reveal-item bg-white rounded-3xl p-6 relative overflow-hidden flex flex-col"
          :class="{ 'is-revealed': isVisible }"
          :style="{ transitionDelay: isVisible ? '0.22s' : '0s' }"
        >
          <span class="absolute right-3 -top-2 font-heading font-black text-emerald-400/10 leading-none select-none pointer-events-none"
                style="font-size: 90px;">02</span>

          <div class="w-11 h-11 rounded-xl bg-emerald-500/15 flex items-center justify-center mb-4 shrink-0">
            <Icon name="mdi:calendar-check" class="text-emerald-500 text-xl" />
          </div>
          <h3 class="font-heading font-bold text-lg text-ink mb-1.5">{{ services[1].title }}</h3>
          <p class="text-muted text-sm leading-relaxed mb-4">{{ services[1].description }}</p>

          <ul class="space-y-2 mb-4">
            <li v-for="item in services[1].items" :key="item" class="flex items-center gap-2 text-sm text-ink/75">
              <Icon name="mdi:check-circle" class="text-emerald-500 shrink-0 text-base" />
              {{ item }}
            </li>
          </ul>

          <div class="flex items-center justify-between pt-3 border-t border-ink/10 mt-auto">
            <div>
              <p class="text-muted/60 text-xs">от</p>
              <p class="font-heading font-bold text-ink">{{ services[1].price }}</p>
            </div>
            <button
              class="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 transition-all duration-200 hover:gap-2.5"
              @click="scrollToContact(services[1].title)"
            >
              Заказать <Icon name="mdi:arrow-right" />
            </button>
          </div>
        </div>

        <!-- [3] Мытьё окон -->
        <div
          class="reveal-item bg-white rounded-3xl p-6 relative overflow-hidden flex flex-col"
          :class="{ 'is-revealed': isVisible }"
          :style="{ transitionDelay: isVisible ? '0.34s' : '0s' }"
        >
          <span class="absolute right-3 -top-2 font-heading font-black text-sky-300/40 leading-none select-none pointer-events-none"
                style="font-size: 90px;">03</span>

          <div class="w-11 h-11 rounded-xl bg-sky-100 flex items-center justify-center mb-4 shrink-0">
            <Icon name="mdi:window-closed-variant" class="text-sky-600 text-xl" />
          </div>
          <h3 class="font-heading font-bold text-lg text-ink mb-1.5">{{ services[2].title }}</h3>
          <p class="text-muted text-sm leading-relaxed mb-4">{{ services[2].description }}</p>

          <ul class="space-y-2 mb-4 flex-1">
            <li v-for="item in services[2].items" :key="item" class="flex items-center gap-2 text-sm text-ink/75">
              <Icon name="mdi:check-circle" class="text-sky-500 shrink-0 text-base" />
              {{ item }}
            </li>
          </ul>

          <div class="flex items-center justify-between pt-3 border-t border-ink/10">
            <div>
              <p class="text-muted/60 text-xs">от</p>
              <p class="font-heading font-bold text-ink">{{ services[2].price }}</p>
            </div>
            <button
              class="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 transition-all duration-200 hover:gap-2.5"
              @click="scrollToContact(services[2].title)"
            >
              Заказать <Icon name="mdi:arrow-right" />
            </button>
          </div>
        </div>

        <!-- [4] Химчистка мебели -->
        <div class="sm:col-span-2 lg:col-span-2 relative">
          <div
            class="reveal-item bg-white rounded-3xl p-6 relative overflow-hidden h-full flex flex-col"
            :class="{ 'is-revealed': isVisible }"
            :style="{ transitionDelay: isVisible ? '0.46s' : '0s' }"
          >
            <span class="absolute right-4 -top-2 font-heading font-black text-violet-300/30 leading-none select-none pointer-events-none"
                  style="font-size: 120px;">04</span>

            <div class="w-11 h-11 rounded-xl bg-violet-100 flex items-center justify-center mb-4 shrink-0">
              <Icon name="mdi:sofa" class="text-violet-600 text-xl" />
            </div>
            <h3 class="font-heading font-bold text-lg text-ink mb-1.5">{{ services[3].title }}</h3>
            <p class="text-muted text-sm leading-relaxed mb-4">{{ services[3].description }}</p>

            <div class="grid grid-cols-2 gap-x-6 gap-y-2 mb-4">
              <div v-for="item in services[3].items" :key="item" class="flex items-start gap-2 text-sm text-ink/75">
                <Icon name="mdi:check-circle" class="text-violet-500 shrink-0 text-base mt-0.5" />
                {{ item }}
              </div>
            </div>

            <div class="flex items-center gap-6 pt-3 border-t border-ink/10 mt-auto">
              <div>
                <p class="text-muted/60 text-xs">от</p>
                <p class="font-heading font-bold text-ink">{{ services[3].price }}</p>
              </div>
              <div>
                <p class="text-muted/60 text-xs">Время работы</p>
                <p class="font-heading font-bold text-ink">от {{ services[3].duration }}</p>
              </div>
            </div>
          </div>

          <div class="absolute bottom-0 right-0 z-20 bg-blue-50 rounded-tl-3xl pt-3 pl-3">
            <button class="btn-primary text-sm shadow-lg" @click="scrollToContact(services[3].title)">
              <Icon name="mdi:send" />
              Заказать
            </button>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
