<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const { form, phoneSuffix, errors, status, services, submit, formatPhone } = useLeadForm()

const phone = '+7 928 196-45-95'
const phoneTel = 'tel:+79281964595'

const headerRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
useIntersectionObserver(headerRef, ([entry]) => {
  if (entry.isIntersecting) isVisible.value = true
}, { threshold: 0.2 })
</script>

<template>
  <section id="contact" class="py-section bg-bg relative overflow-hidden">

    <!-- Decorative -->
    <div class="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />

    <div class="container-site relative z-10">

      <!-- Header -->
      <div
        ref="headerRef"
        class="text-center mb-12 reveal-item"
        :class="{ 'is-revealed': isVisible }"
      >
        <p class="section-label mb-3">Заявка</p>
        <h2 class="font-heading text-display-lg text-ink mb-4">
          Оставьте заявку
        </h2>
        <p class="text-muted text-lg max-w-xl mx-auto">
          Перезвоним в течение 15 минут, уточним детали и назовём точную стоимость.
        </p>
      </div>

      <div
        class="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start reveal-item"
        :class="{ 'is-revealed': isVisible }"
        :style="{ transitionDelay: isVisible ? '0.15s' : '0s' }"
      >

        <!-- Form -->
        <div class="contact-form-wrap lg:col-span-3 bg-white rounded-2xl shadow-card overflow-hidden">

          <!-- Form header stripe -->
          <div class="bg-gradient-to-r from-accent to-sky-600 px-8 py-4 flex items-center gap-3">
            <Icon name="mdi:send" class="text-white text-xl" />
            <p class="text-white font-semibold">Бесплатный расчёт стоимости</p>
            <span class="ml-auto text-white/70 text-sm hidden sm:block">Ответим за 15 мин</span>
          </div>

          <div class="p-8">
            <Transition name="fade-slide" mode="out-in">

              <!-- Success -->
              <div v-if="status === 'success'" class="flex flex-col items-center text-center py-10">
                <div class="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-5">
                  <Icon name="mdi:check-circle" class="text-accent text-5xl" />
                </div>
                <h3 class="font-heading font-bold text-2xl text-ink mb-2">Заявка принята!</h3>
                <p class="text-muted mb-1">Перезвоним вам в течение 15 минут.</p>
                <p class="text-muted text-sm">Проверьте, что телефон доступен.</p>
              </div>

              <!-- Error -->
              <div v-else-if="status === 'error'" class="flex flex-col items-center text-center py-10">
                <div class="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center mb-5">
                  <Icon name="mdi:alert-circle" class="text-rose-500 text-5xl" />
                </div>
                <h3 class="font-heading font-bold text-2xl text-ink mb-2">Ошибка отправки</h3>
                <p class="text-muted mb-1">Не удалось отправить заявку.</p>
                <p class="text-muted text-sm">Позвоните нам напрямую: <a href="tel:+79281964595" class="text-accent font-semibold">+7 928 196-45-95</a></p>
              </div>

              <!-- Form -->
              <form v-else class="space-y-5" @submit.prevent="submit">

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <!-- Name -->
                  <div>
                    <label class="block text-sm font-medium text-ink mb-1.5">
                      Ваше имя <span class="text-rose-500">*</span>
                    </label>
                    <input
                      v-model="form.name"
                      type="text"
                      placeholder="Иван Иванов"
                      class="w-full px-4 py-3 rounded-xl border text-ink placeholder:text-muted/50 outline-none transition-all duration-200"
                      :class="errors.name
                        ? 'border-rose-400 bg-rose-50 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                        : 'border-surface bg-bg focus:border-accent focus:ring-2 focus:ring-accent/20'"
                    />
                    <p v-if="errors.name" class="text-rose-500 text-xs mt-1">{{ errors.name }}</p>
                  </div>

                  <!-- Phone -->
                  <div>
                    <label class="block text-sm font-medium text-ink mb-1.5">
                      Телефон <span class="text-rose-500">*</span>
                    </label>
                    <div
                      class="flex items-center rounded-xl border overflow-hidden transition-all duration-200"
                      :class="errors.phone
                        ? 'border-rose-400 bg-rose-50 focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-200'
                        : 'border-surface bg-bg focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20'"
                    >
                      <span class="pl-4 pr-3 py-3 text-ink font-semibold text-sm select-none border-r border-surface shrink-0">+7</span>
                      <input
                        :value="phoneSuffix"
                        type="tel"
                        inputmode="tel"
                        placeholder="928 196-45-95"
                        maxlength="13"
                        class="flex-1 px-3 py-3 bg-transparent text-ink placeholder:text-muted/50 outline-none"
                        @input="formatPhone"
                      />
                    </div>
                    <p v-if="errors.phone" class="text-rose-500 text-xs mt-1">{{ errors.phone }}</p>
                  </div>
                </div>

                <!-- Service -->
                <div>
                  <label class="block text-sm font-medium text-ink mb-1.5">
                    Тип услуги <span class="text-rose-500">*</span>
                  </label>
                  <select
                    v-model="form.service"
                    class="w-full px-4 py-3 rounded-xl border outline-none transition-all duration-200 appearance-none cursor-pointer text-ink"
                    :class="errors.service
                      ? 'border-rose-400 bg-rose-50 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                      : 'border-surface bg-bg focus:border-accent focus:ring-2 focus:ring-accent/20'"
                  >
                    <option value="" disabled>Выберите услугу</option>
                    <option v-for="s in services" :key="s" :value="s">{{ s }}</option>
                  </select>
                  <p v-if="errors.service" class="text-rose-500 text-xs mt-1">{{ errors.service }}</p>
                </div>

                <!-- Comment -->
                <div>
                  <label class="block text-sm font-medium text-ink mb-1.5">Комментарий</label>
                  <textarea
                    v-model="form.comment"
                    rows="3"
                    placeholder="Площадь, адрес, пожелания..."
                    class="w-full px-4 py-3 rounded-xl border border-surface bg-bg text-ink placeholder:text-muted/50 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-200 resize-none"
                  />
                </div>

                <!-- Submit -->
                <button
                  type="submit"
                  :disabled="status === 'loading'"
                  class="btn-primary w-full py-4 text-base justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <Icon v-if="status === 'loading'" name="mdi:loading" class="animate-spin" />
                  <Icon v-else name="mdi:send" />
                  {{ status === 'loading' ? 'Отправляем...' : 'Оставить заявку' }}
                </button>

                <p class="text-xs text-muted/50 text-center">
                  Нажимая кнопку, вы соглашаетесь с
                  <NuxtLink to="/policy" target="_blank" class="underline underline-offset-2 hover:text-accent transition-colors duration-200">
                    политикой конфиденциальности
                  </NuxtLink>
                </p>
              </form>
            </Transition>
          </div>
        </div>

        <!-- Info panel -->
        <div class="contact-info-wrap lg:col-span-2 flex flex-col gap-5">

          <!-- Phone card -->
          <div class="bg-ink rounded-2xl p-7 text-white relative overflow-hidden">
            <div class="absolute right-0 top-0 w-32 h-32 bg-accent/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl" />
            <p class="text-white/60 text-sm mb-2">Позвоните прямо сейчас</p>
            <a :href="phoneTel" class="font-heading font-bold text-2xl hover:text-accent transition-colors duration-200 block mb-5">
              {{ phone }}
            </a>
            <a :href="phoneTel" class="inline-flex items-center gap-2 bg-accent text-white font-semibold text-sm px-5 py-3 rounded-xl hover:bg-sky-600 transition-colors duration-200">
              <Icon name="mdi:phone" />
              Позвонить
            </a>
            <!-- Working hours -->
            <div class="flex items-center gap-2 mt-5 pt-5 border-t border-white/10">
              <Icon name="mdi:clock-outline" class="text-white/40 text-lg shrink-0" />
              <p class="text-white/50 text-sm">Работаем ежедневно <span class="text-white/80 font-medium">8:00 – 22:00</span></p>
            </div>
          </div>

          <!-- Guarantee -->
          <div class="flex items-start gap-4 bg-accent/5 border border-accent/20 rounded-2xl p-5">
            <div class="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
              <Icon name="mdi:shield-check" class="text-accent text-xl" />
            </div>
            <div>
              <p class="font-semibold text-ink text-sm mb-1">Гарантия качества</p>
              <p class="text-sm text-muted leading-relaxed">
                Если что-то не устроит — исправим бесплатно в течение 24 часов.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
