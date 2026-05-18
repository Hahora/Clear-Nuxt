<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const isMenuOpen = ref(false)
const isScrolled = ref(false)

const navLinks = [
  { label: 'Услуги', href: '#services' },
  { label: 'До / После', href: '#before-after' },
  { label: 'Портфолио', href: '#gallery' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'О нас', href: '#why-us' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Контакты', href: '#contact' },
]

const phone = '+7 928 196-45-95'
const phoneTel = 'tel:+79281964595'

onMounted(() => {
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 20
  }
  window.addEventListener('scroll', handleScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', handleScroll))
})

function scrollTo(href: string) {
  isMenuOpen.value = false
  if (route.path !== '/') {
    router.push('/' + href)
    return
  }
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <header
    class="fixed z-50 top-0 left-0 right-0 transition-all duration-300"
    :class="isScrolled ? 'pt-3 backdrop-blur-2xl' : ''"
  >
    <div
      class="container-site transition-all duration-300"
      :class="isScrolled ? 'bg-white shadow-lg rounded-2xl' : ''"
    >
      <nav class="flex items-center justify-between h-16 lg:h-20">

        <!-- Logo -->
        <a href="/" @click.prevent="route.path === '/' ? scrollTo('#') : router.push('/')" class="flex items-center gap-2.5 group">
          <div class="w-9 h-9 rounded-xl bg-accent flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200">
            <Icon name="mdi:broom" class="text-white text-xl" />
          </div>
          <span class="font-heading font-bold text-lg text-ink leading-tight">
            Чистый<br class="hidden" /><span class="text-accent"> Дом</span>
          </span>
        </a>

        <!-- Desktop nav -->
        <ul class="hidden lg:flex items-center gap-8">
          <li v-for="link in navLinks" :key="link.href">
            <button
              class="nav-link text-sm font-medium pb-0.5"
              @click="scrollTo(link.href)"
            >
              {{ link.label }}
            </button>
          </li>
        </ul>

        <!-- Desktop CTA -->
        <div class="hidden lg:flex items-center gap-4">
          <a :href="phoneTel" class="text-sm font-semibold text-ink hover:text-accent transition-colors duration-200">
            {{ phone }}
          </a>
          <button class="btn-primary text-sm py-2.5" @click="scrollTo('#contact')">
            Оставить заявку
          </button>
        </div>

        <!-- Mobile: phone + burger -->
        <div class="flex items-center gap-3 lg:hidden">
          <a :href="phoneTel" class="flex items-center justify-center w-10 h-10 rounded-xl bg-accent text-white">
            <Icon name="mdi:phone" class="text-xl" />
          </a>
          <button
            class="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-surface transition-colors duration-200"
            @click="isMenuOpen = !isMenuOpen"
            aria-label="Меню"
          >
            <Icon :name="isMenuOpen ? 'mdi:close' : 'mdi:menu'" class="text-2xl text-ink" />
          </button>
        </div>

      </nav>

      <!-- Mobile menu -->
      <Transition name="mobile-menu">
        <div v-if="isMenuOpen" class="lg:hidden border-t border-surface">
          <div class="py-4 flex flex-col gap-1">
          <button
            v-for="link in navLinks"
            :key="link.href"
            class="text-left px-4 py-3 rounded-xl font-medium text-ink hover:bg-surface hover:text-accent transition-colors duration-200"
            @click="scrollTo(link.href)"
          >
            {{ link.label }}
          </button>
          <div class="pt-3 mt-2 border-t border-surface">
            <a :href="phoneTel" class="flex items-center gap-2 px-4 py-3 text-ink font-semibold">
              <Icon name="mdi:phone" class="text-accent" />
              {{ phone }}
            </a>
            <button class="btn-primary w-full mt-2 mx-0" @click="scrollTo('#contact')">
              Оставить заявку
            </button>
          </div>
        </div>
      </div>
      </Transition>
    </div>
  </header>
</template>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
