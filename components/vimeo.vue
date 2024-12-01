<template>
  <div ref="video" class="vimeo-player" />
</template>

<script setup>
const props = defineProps(["data"]);
const { width } = useWindowSize();
const video = ref();
const { onLoaded } = useScriptVimeoPlayer();
let player;

onMounted(() => {
  onLoaded(({ Vimeo }) => {
    player = new Vimeo.Player(video.value, {
      id: props.data.id,
      width: width.value,
      muted: false,
      loop: true,
      progress_bar: true,
    });
  });
});
</script>

<style>
.vimeo-player iframe {
  height: auto;
  aspect-ratio: 16/9;
  width: 100%;
  max-width: 100% !important;
}
</style>
