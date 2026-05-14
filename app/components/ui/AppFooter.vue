<script setup lang="ts">
import { Icon } from '@iconify/vue'

const phone = '+7 928 196-45-95'
const phoneTel = 'tel:+79281964595'
const year = new Date().getFullYear()

const navLinks = [
  { label: 'Услуги', href: '#services' },
  { label: 'До / После', href: '#before-after' },
  { label: 'Портфолио', href: '#gallery' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'О нас', href: '#why-us' },
  { label: 'Как работаем', href: '#process' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Контакты', href: '#contact' },
]

const serviceLinks = [
  { label: 'Генеральная уборка' },
  { label: 'Поддерживающая уборка' },
  { label: 'Мытьё окон' },
  { label: 'Химчистка мебели' },
]

function scrollTo(href: string) {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <footer class="bg-ink text-white">
    <div class="container-site py-16">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-white/10">

        <!-- Brand -->
        <div class="sm:col-span-2 lg:col-span-1">
          <div class="flex items-center gap-2.5 mb-4">
            <div class="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
              <Icon icon="mdi:broom" class="text-white text-xl" />
            </div>
            <span class="font-heading font-bold text-lg">
              Чистый <span class="text-accent">Дом</span>
            </span>
          </div>
          <p class="text-white/50 text-sm leading-relaxed max-w-xs mb-4">
            Профессиональный клининг квартир, домов и коммерческих помещений с гарантией качества.
          </p>
          <a :href="phoneTel" class="inline-flex items-center gap-2 text-white font-semibold hover:text-accent transition-colors duration-200">
            <Icon icon="mdi:phone" class="text-accent" />
            {{ phone }}
          </a>
        </div>

        <!-- Разделы -->
        <div>
          <p class="section-label mb-4">Разделы</p>
          <ul class="space-y-2">
            <li v-for="link in navLinks" :key="link.href">
              <button
                class="text-white/60 text-sm hover:text-accent transition-colors duration-200"
                @click="scrollTo(link.href)"
              >
                {{ link.label }}
              </button>
            </li>
          </ul>
        </div>

        <!-- Услуги -->
        <div>
          <p class="section-label mb-4">Услуги</p>
          <ul class="space-y-2">
            <li v-for="service in serviceLinks" :key="service.label">
              <button
                class="text-white/60 text-sm hover:text-accent transition-colors duration-200 text-left"
                @click="scrollTo('#services')"
              >
                {{ service.label }}
              </button>
            </li>
          </ul>
        </div>

        <!-- Обратная связь -->
        <div>
          <p class="section-label mb-4">Обратная связь</p>
          <p class="text-white/50 text-sm leading-relaxed mb-5">
            Оставьте заявку — перезвоним в течение 15 минут и рассчитаем стоимость.
          </p>
          <button
            class="btn-primary w-full justify-center text-sm"
            @click="scrollTo('#contact')"
          >
            <Icon icon="mdi:send" />
            Оставить заявку
          </button>
        </div>

      </div>

      <!-- Bottom row -->
      <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/40 text-xs">
        <div class="flex flex-col items-center sm:items-start gap-1">
          <p>© {{ year }} Чистый Дом. Все права защищены.</p>
          <p>Разработано <a href="https://traffic-rock.com/" target="_blank" rel="noopener" class="text-white/60 font-medium hover:text-accent transition-colors duration-200">Цифровая скала</a></p>
        </div>
        <a href="#" class="hover:text-white transition-colors duration-200">Политика конфиденциальности</a>
      </div>
    </div>
  </footer>
</template>
