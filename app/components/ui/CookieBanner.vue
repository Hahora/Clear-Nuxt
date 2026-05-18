<script setup lang="ts">
import { ref, onMounted } from 'vue'

const { $initMetrika } = useNuxtApp()

const visible = ref(false)

onMounted(() => {
  if (localStorage.getItem('cookie_consent') !== 'true') {
    visible.value = true
  }
})

function accept() {
  localStorage.setItem('cookie_consent', 'true')
  visible.value = false
  ;($initMetrika as () => void)()
}
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-500 ease-out"
    leave-active-class="transition-all duration-300 ease-in"
    enter-from-class="translate-y-full opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-full opacity-0"
  >
    <div
      v-if="visible"
      class="fixed bottom-0 left-0 right-0 z-[100] bg-ink/95 backdrop-blur-sm border-t border-white/10"
    >
      <div class="container-site py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div class="flex items-start gap-3 flex-1">
          <Icon name="mdi:cookie" class="text-accent text-xl shrink-0 mt-0.5" />
          <p class="text-white/80 text-sm leading-relaxed">
            Мы используем файлы cookie и сервис Яндекс.Метрика для анализа посещаемости.
            Продолжая пользоваться сайтом, вы соглашаетесь с нашей
            <NuxtLink to="/policy" class="text-accent underline underline-offset-2 hover:text-sky-300 transition-colors duration-200">
              политикой конфиденциальности
            </NuxtLink>.
          </p>
        </div>
        <div class="flex items-center gap-3 shrink-0">
          <NuxtLink
            to="/policy"
            class="text-white/50 text-sm hover:text-white transition-colors duration-200 whitespace-nowrap"
          >
            Подробнее
          </NuxtLink>
          <button
            class="btn-primary text-sm px-5 py-2.5 whitespace-nowrap"
            @click="accept"
          >
            <Icon name="mdi:check" />
            Принять
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
