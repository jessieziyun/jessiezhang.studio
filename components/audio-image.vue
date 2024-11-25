<template>
  <div class="relative">
    <img :src="data.image.path" :alt="data.image.alt" class="w-full h-auto" />
    <audio
      controls
      :src="data.audio.path"
      class="absolute w-4/5 sm:w-2/3 md:w-1/2 lg:w-1/3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    ></audio>
  </div>
</template>

<script setup>
const props = defineProps(["data"]);
</script>
