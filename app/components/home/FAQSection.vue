<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const faqs = [
  {
    q: 'Сколько стоит уборка?',
    a: 'Стоимость зависит от типа услуги и площади. Поддерживающая уборка — от 1 500 ₽, генеральная — от 3 500 ₽. Точную цену называем после уточнения деталей, без скрытых доплат.',
  },
  {
    q: 'Как быстро можно записаться?',
    a: 'Обычно принимаем заявки на ближайшие 1–2 дня. В пиковый сезон — до 3 дней. Оставьте заявку или позвоните — уточним свободные слоты прямо в разговоре.',
  },
  {
    q: 'Нужно ли быть дома во время уборки?',
    a: 'Нет, необязательно. Многие клиенты оставляют ключи. После окончания работы пришлём фотоотчёт. Если хотите присутствовать — пожалуйста, мешать не будем.',
  },
  {
    q: 'Какие средства вы используете?',
    a: 'Только профессиональную сертифицированную химию — безопасную для детей, животных и любых поверхностей. Всё оборудование и материалы привозим с собой.',
  },
  {
    q: 'Что если меня что-то не устроит?',
    a: 'Гарантируем качество: если найдёте недочёт в течение 24 часов — приедем и исправим бесплатно. Такое бывает редко, но мы всегда на связи.',
  },
  {
    q: 'Убираете ли в выходные и праздники?',
    a: 'Да, работаем ежедневно с 8:00 до 22:00, включая выходные и праздники. Стоимость при этом не меняется.',
  },
  {
    q: 'Нужно ли как-то готовиться к уборке?',
    a: 'Достаточно убрать вещи с пола и освободить доступ к поверхностям. Всё остальное — наша забота. Если есть ценные или хрупкие предметы — просто предупредите нас.',
  },
  {
    q: 'Работаете ли с офисами и коммерческими помещениями?',
    a: 'Да, берёмся за офисы, магазины, салоны и другие коммерческие объекты. Можем работать в нерабочие часы — рано утром или поздно вечером.',
  },
]

const openIndex = ref<number | null>(0)

function toggle(i: number) {
  openIndex.value = openIndex.value === i ? null : i
}

function scrollToContact() {
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
  <section id="faq" class="py-14 lg:py-24 bg-blue-50">
    <div class="container-site">

      <!-- Header -->
      <div
        ref="headerRef"
        class="text-center mb-12 reveal-item"
        :class="{ 'is-revealed': isVisible }"
      >
        <p class="section-label mb-3">FAQ</p>
        <h2 class="font-heading text-display-lg text-ink mb-4">Частые вопросы</h2>
        <p class="text-muted text-lg max-w-xl mx-auto">
          Если не нашли ответ — напишите нам, ответим быстро.
        </p>
      </div>

      <!-- Accordion -->
      <div class="max-w-3xl mx-auto space-y-3 reveal-item" :class="{ 'is-revealed': isVisible }" :style="{ transitionDelay: isVisible ? '0.1s' : '0s' }">
        <div
          v-for="(faq, i) in faqs"
          :key="i"
          class="bg-white rounded-2xl overflow-hidden shadow-card"
        >
          <button
            class="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 hover:bg-surface/40"
            @click="toggle(i)"
          >
            <span class="font-semibold text-ink text-sm sm:text-base">{{ faq.q }}</span>
            <span
              class="w-8 h-8 rounded-full bg-surface flex items-center justify-center shrink-0 transition-transform duration-300"
              :class="openIndex === i ? 'rotate-45 bg-accent/15' : ''"
            >
              <Icon name="mdi:plus" class="text-ink text-sm" :class="openIndex === i ? 'text-accent' : ''" />
            </span>
          </button>

          <Transition
            enter-active-class="transition-all duration-300 ease-smooth overflow-hidden"
            leave-active-class="transition-all duration-300 ease-smooth overflow-hidden"
            enter-from-class="max-h-0 opacity-0"
            enter-to-class="max-h-96 opacity-100"
            leave-from-class="max-h-96 opacity-100"
            leave-to-class="max-h-0 opacity-0"
          >
            <div v-if="openIndex === i" class="px-6 pb-5">
              <p class="text-muted text-sm leading-relaxed">{{ faq.a }}</p>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Ask a question CTA -->
      <div
        class="max-w-3xl mx-auto mt-6 reveal-item"
        :class="{ 'is-revealed': isVisible }"
        :style="{ transitionDelay: isVisible ? '0.3s' : '0s' }"
      >
        <div class="bg-white rounded-2xl shadow-card px-6 py-5 flex flex-col sm:flex-row items-center gap-4">
          <div class="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
            <Icon name="mdi:chat-question-outline" class="text-accent text-xl" />
          </div>
          <div class="flex-1 text-center sm:text-left">
            <p class="font-semibold text-ink">Не нашли ответ?</p>
            <p class="text-muted text-sm">Задайте свой вопрос — ответим в течение 15 минут.</p>
          </div>
          <button class="btn-primary shrink-0 whitespace-nowrap" @click="scrollToContact">
            <Icon name="mdi:send" />
            Задать вопрос
          </button>
        </div>
      </div>

    </div>
  </section>
</template>

