<script setup lang="ts">
useSeoMeta({
  title: 'Чистый Дом — профессиональный клининг квартир и домов',
  ogTitle: 'Чистый Дом — профессиональный клининг',
  description:
    'Генеральная и поддерживающая уборка квартир, домов и офисов. Мытьё окон, химчистка мебели. Гарантия качества. Звоните: +7 928 196-45-95.',
  ogDescription:
    'Профессиональный клининг с гарантией. Генеральная уборка, мытьё окон, химчистка мебели.',
  ogType: 'website',
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://cleanpro.ru' },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'Чистый Дом',
        description: 'Профессиональный клининг квартир, домов и коммерческих помещений',
        telephone: '+79281964595',
        url: 'https://cleanpro.ru',
        priceRange: '₽₽',
        serviceType: [
          'Генеральная уборка',
          'Поддерживающая уборка',
          'Мытьё окон',
          'Химчистка мебели',
        ],
      }),
    },
  ],
})
</script>

<template>
  <div>
    <HomeHeroSection />
    <HomeServicesSection />
    <HomeBeforeAfterSection />
    <HomeGallerySection />
    <HomeReviewsSection />
    <HomeWhyUsSection />
    <HomeProcessSection />
    <HomeFAQSection />
    <HomeContactSection />
  </div>
</template>
