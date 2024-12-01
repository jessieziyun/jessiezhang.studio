<template>
  <div
    class="fixed z-50 top-0 p-3 w-full grid grid-cols-4 gap-4 text-white mix-blend-exclusion"
  >
    <h1 class="col-span-2">
      <nuxt-link to="/" class="link name">Jessie Zhang</nuxt-link>
    </h1>
    <div class="flex flex-col sm:flex-row">
      <nuxt-link to="/" class="link">Work,&nbsp;</nuxt-link>
      <nuxt-link to="/experiments" class="link">Experiments,&nbsp;</nuxt-link>
      <nuxt-link to="/library" class="link">Library</nuxt-link>
    </div>
    <div class="text-right">
      <nuxt-link to="/about" class="link">About</nuxt-link>
    </div>
  </div>
</template>

<script setup></script>

<style>
.router-link-active:not(.name) {
  @apply italic;
}
</style>