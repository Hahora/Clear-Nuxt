<script setup lang="ts">
import { ref, onMounted } from "vue";

const props = defineProps<{
  error: { statusCode: number; statusMessage?: string };
}>();

const visible = ref(false);
onMounted(() =>
  setTimeout(() => {
    visible.value = true;
  }, 50)
);

function goHome() {
  clearError({ redirect: "/" });
}

function goContact() {
  clearError({ redirect: "/#contact" });
}
</script>

<template>
  <div
    class="bg-bg min-h-screen flex flex-col items-center justify-center overflow-hidden relative px-4"
  >
    <!-- Декоративный «404» -->
    <span
      class="absolute font-heading font-black text-ink/[0.03] select-none pointer-events-none leading-none"
      style="
        font-size: clamp(200px, 40vw, 480px);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      "
      >{{ props.error.statusCode }}</span
    >

    <div
      class="relative z-10 text-center transition-all duration-700 ease-out"
      :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
    >
      <!-- Логотип -->
      <a href="/" class="inline-flex items-center gap-2.5 mb-12 group">
        <div
          class="w-9 h-9 rounded-xl bg-accent flex items-center justify-center group-hover:scale-105 transition-transform duration-200"
        >
          <Icon name="mdi:broom" class="text-white text-xl" />
        </div>
        <span class="font-heading font-bold text-lg text-ink">
          Чистый <span class="text-accent">Дом</span>
        </span>
      </a>

      <!-- Число -->
      <p
        class="font-heading font-black text-accent mb-3"
        style="font-size: clamp(3rem, 10vw, 6rem); line-height: 1"
      >
        {{ props.error.statusCode }}
      </p>

      <!-- Заголовок -->
      <h1 class="font-heading font-bold text-2xl sm:text-3xl text-ink mb-4">
        {{
          props.error.statusCode === 404
            ? "Страница не найдена"
            : "Что-то пошло не так"
        }}
      </h1>

      <!-- Подзаголовок -->
      <p class="text-muted text-base max-w-sm mx-auto mb-10 leading-relaxed">
        {{
          props.error.statusCode === 404
            ? "Мы убрали эту страницу так чисто, что она исчезла."
            : "Произошла непредвиденная ошибка. Попробуйте позже."
        }}
      </p>

      <!-- Кнопки -->
      <div class="flex flex-wrap items-center justify-center gap-4">
        <button class="btn-primary" @click="goHome">
          <Icon name="mdi:home" />
          На главную
        </button>
        <button
          class="inline-flex items-center gap-2 font-semibold text-sm text-ink hover:text-accent border-2 border-surface hover:border-accent px-6 py-3.5 rounded-xl transition-all duration-200"
          @click="goContact"
        >
          <Icon name="mdi:send" />
          Оставить заявку
        </button>
      </div>
    </div>
  </div>
</template>
