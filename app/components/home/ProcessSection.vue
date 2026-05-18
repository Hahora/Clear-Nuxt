<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const steps = [
  {
    icon: 'mdi:phone-incoming-outline',
    title: 'Заявка',
    description: 'Позвоните или заполните форму — ответим быстро.',
    color: 'bg-accent/15 text-accent',
    dot: 'bg-accent',
  },
  {
    icon: 'mdi:clipboard-text-outline',
    title: 'Уточняем детали',
    description: 'Обсудим тип помещения, объём и удобное время.',
    color: 'bg-primary/15 text-primary',
    dot: 'bg-primary',
  },
  {
    icon: 'mdi:handshake-outline',
    title: 'Согласование',
    description: 'Называем точную стоимость и подтверждаем дату.',
    color: 'bg-violet-500/15 text-violet-400',
    dot: 'bg-violet-500',
  },
  {
    icon: 'mdi:broom',
    title: 'Уборка',
    description: 'Приезжаем в срок, тщательно убираем и уходим.',
    color: 'bg-amber-500/15 text-amber-500',
    dot: 'bg-amber-500',
  },
  {
    icon: 'mdi:check-decagram-outline',
    title: 'Результат',
    description: 'Вы принимаете работу. Любые недочёты исправим.',
    color: 'bg-accent/15 text-accent',
    dot: 'bg-accent',
  },
]

const headerRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
useIntersectionObserver(headerRef, ([entry]) => {
  if (entry.isIntersecting) isVisible.value = true
}, { threshold: 0.3 })
</script>

<template>
  <section id="process" class="py-section bg-bg relative overflow-hidden">

    <!-- Decorative blobs -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/4 rounded-full blur-3xl pointer-events-none" />

    <div class="container-site relative z-10">

      <!-- Header -->
      <div
        ref="headerRef"
        class="text-center mb-12 reveal-item"
        :class="{ 'is-revealed': isVisible }"
      >
        <p class="section-label mb-3">Как работаем</p>
        <h2 class="font-heading text-display-lg text-ink mb-4">
          Пять простых шагов
        </h2>
        <p class="text-muted text-lg max-w-xl mx-auto">
          Звоните — договариваемся — убираем. Всё прозрачно и по-человечески.
        </p>
      </div>

      <!-- Steps -->
      <div class="relative">

        <!-- Connector line desktop -->
        <div class="hidden lg:block absolute top-10 left-[10%] right-[10%] h-px z-0"
             style="background: linear-gradient(to right, #10B981, #0EA5E9, #8B5CF6, #F59E0B, #10B981)" />

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          <div
            v-for="(step, i) in steps"
            :key="step.title"
            class="process-step reveal-item relative z-10 flex flex-col items-center text-center"
            :class="{ 'is-revealed': isVisible }"
            :style="{ transitionDelay: isVisible ? (i * 0.13) + 's' : '0s' }"
          >
            <!-- Circle -->
            <div class="relative mb-5">
              <div
                class="w-16 h-16 rounded-full bg-white shadow-card border-2 border-surface/80 flex items-center justify-center transition-all duration-300 hover:shadow-card-hover hover:scale-105"
                :class="step.color.split(' ')[0].replace('15', '10')"
              >
                <Icon :name="step.icon" class="text-2xl" :class="step.color.split(' ')[1]" />
              </div>
              <!-- Number badge -->
              <span
                class="absolute -top-1 -right-1 w-7 h-7 rounded-full text-white text-xs font-bold flex items-center justify-center font-heading shadow-sm"
                :class="step.dot"
              >
                {{ i + 1 }}
              </span>
            </div>

            <h3 class="font-heading font-bold text-ink text-base mb-2">{{ step.title }}</h3>
            <p class="text-muted text-sm leading-relaxed">{{ step.description }}</p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
