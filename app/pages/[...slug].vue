<script setup lang="ts">
const route = useRoute()
if (!/\.[a-z0-9]+$/i.test(route.path)) {
  throw createError({ statusCode: 404, fatal: true })
}
</script>

<template><div /></template>
