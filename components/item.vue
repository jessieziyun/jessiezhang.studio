<template>
  <div>
    <img
      v-if="item.type == 'image'"
      :src="item.path"
      :alt="item.alt"
      class="w-full h-auto"
    />
    <vimeo v-if="item.type == 'vimeo'" :data="item" />
    <audio-image v-if="item.type == 'audio-image'" :data="item" />
    <video
      v-if="item.type == 'video'"
      :src="item.path"
      playsinline
      webkit-playsinline
      autoplay
      muted
      loop
    ></video>
    <div
      v-if="item.type == 'group'"
      class="flex gap-2"
      :class="item.wrap && expandInfo ? 'flex-col' : 'flex-row'"
    >
      <div v-for="item in item.items" :key="item.path">
        <img
          v-if="item.type == 'image'"
          :src="item.path"
          :alt="item.alt"
          class="w-full h-auto"
        />
        <video
          v-if="item.type == 'video'"
          :src="item.path"
          playsinline
          webkit-playsinline
          autoplay
          muted
          loop
        ></video>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["item", "expandInfo"]);
</script>
