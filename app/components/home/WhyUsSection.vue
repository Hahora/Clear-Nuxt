<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { Icon } from '@iconify/vue'

const advantages = [
  {
    icon: 'mdi:shield-account',
    title: 'Проверенные специалисты',
    description: 'Аккуратные сотрудники с опытом и рекомендациями. Всегда в форме, всегда вежливые.',
    color: 'text-accent',
    bg: 'bg-accent/15',
  },
  {
    icon: 'mdi:flask-outline',
    title: 'Профессиональная химия',
    description: 'Сертифицированные средства, безопасные для детей, животных и любых покрытий.',
    color: 'text-primary',
    bg: 'bg-primary/15',
  },
  {
    icon: 'mdi:hand-heart-outline',
    title: 'Бережное отношение',
    description: 'Аккуратно с мебелью, техникой и личными вещами. Ничего не сдвигаем без необходимости.',
    color: 'text-rose-400',
    bg: 'bg-rose-500/15',
  },
  {
    icon: 'mdi:clock-check-outline',
    title: 'Приезжаем вовремя',
    description: 'Точно в условленный час. Заканчиваем в срок — без задержек и переносов.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/15',
  },
  {
    icon: 'mdi:calendar-sync-outline',
    title: 'Разовая или регулярная',
    description: 'Одна генеральная или еженедельное обслуживание по вашему расписанию.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/15',
  },
  {
    icon: 'mdi:tag-check-outline',
    title: 'Цена без сюрпризов',
    description: 'Говорим стоимость сразу, после осмотра. Никаких скрытых доплат по факту.',
    color: 'text-sky-400',
    bg: 'bg-sky-500/15',
  },
]

const headerRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
useIntersectionObserver(headerRef, ([entry]) => {
  if (entry.isIntersecting) isVisible.value = true
}, { threshold: 0.3 })

function scrollToContact() {
  const el = document.querySelector('#contact')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="why-us" class="py-section bg-emerald-50 relative overflow-hidden">

    <!-- Background decorations -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-accent/8 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
    <div class="absolute bottom-0 left-0 w-80 h-80 bg-primary/8 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />

    <div class="container-site relative z-10">

      <!-- Header -->
      <div
        ref="headerRef"
        class="text-center mb-12 reveal-item"
        :class="{ 'is-revealed': isVisible }"
      >
        <p class="section-label mb-3">Преимущества</p>
        <h2 class="font-heading text-display-lg text-ink mb-4">
          Почему выбирают нас
        </h2>
        <p class="text-muted text-lg max-w-xl mx-auto">
          Шесть причин, по которым клиенты возвращаются снова и советуют нас друзьям.
        </p>
      </div>

      <!-- Grid -->
      <div class="why-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
        <div
          v-for="(item, i) in advantages"
          :key="i"
          class="why-card reveal-item group relative bg-white rounded-2xl p-6 overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300"
          :class="{ 'is-revealed': isVisible }"
          :style="{ transitionDelay: isVisible ? (i * 0.1) + 's' : '0s' }"
        >
          <!-- Decorative number -->
          <span
            class="absolute right-3 -top-1 font-heading font-black text-ink/[0.04] leading-none select-none pointer-events-none"
            style="font-size: 80px;"
          >{{ String(i + 1).padStart(2, '0') }}</span>

          <!-- Icon -->
          <div
            class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 relative z-10"
            :class="item.bg"
          >
            <Icon :icon="item.icon" class="text-2xl" :class="item.color" />
          </div>

          <h3 class="font-heading font-semibold text-ink text-base mb-2 relative z-10">
            {{ item.title }}
          </h3>
          <p class="text-muted text-sm leading-relaxed relative z-10">
            {{ item.description }}
          </p>
        </div>
      </div>

      <!-- Bottom CTA -->
      <div
        class="reveal-item text-center"
        :class="{ 'is-revealed': isVisible }"
        :style="{ transitionDelay: isVisible ? '0.65s' : '0s' }"
      >
        <div class="inline-flex flex-col sm:flex-row items-center gap-4 bg-white rounded-2xl px-8 py-5 shadow-card">
          <div class="text-left">
            <p class="text-ink font-semibold">Хотите убедиться лично?</p>
            <p class="text-muted text-sm">Закажите первую уборку и оцените результат</p>
          </div>
          <button class="btn-primary shrink-0 whitespace-nowrap" @click="scrollToContact">
            <Icon icon="mdi:send" />
            Оставить заявку
          </button>
        </div>
      </div>

    </div>
  </section>
</template>
