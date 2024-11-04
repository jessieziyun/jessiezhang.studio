<template>
  <div
    class="vimeo-player relative overflow-hidden cursor-pointer"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    @mousemove="handleMouseMove"
    @click="isPlaying ? player?.pause() : player?.play()"
  >
    <div ref="video" class="pointer-events-none" />
    <div
      class="absolute text-white mix-blend-exclusion cursor-pointer"
      :class="hover ? 'block' : 'hidden'"
      :style="{ top: `${mouse.y + 6}px`, left: `${mouse.x + 12}px` }"
    >
      {{ isPlaying ? "Pause" : "Play" }}
    </div>
    <div
      class="progress-bar absolute flex bottom-1 h-min px-1 w-full text-white"
      :class="isMouseMoving && playbackPosition ? 'opacity-100' : 'opacity-0'"
    >
      <div class="w-12">{{ playbackPosition?.current }}</div>
      <div class="relative flex-1">
        <div
          class="progress-bar absolute top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-white"
          :style="{ left: progress + '%' }"
        ></div>
      </div>
      <div class="w-14 ml-1 text-right">–{{ playbackPosition?.remaining }}</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["data"]);
const isPlaying = ref(false);
const progress = ref(0);
const playbackPosition = ref(null);

const extractor = (event) => {
  if (typeof Touch !== "undefined" && event instanceof Touch) return null;
  else return [event.offsetX, event.offsetY];
};

const hover = ref(false);
const { width } = useWindowSize();
const parentEl = useParentElement();

const video = ref();
const { onLoaded } = useScriptVimeoPlayer();

let player;

onMounted(() => {
  onLoaded(({ Vimeo }) => {
    player = new Vimeo.Player(video.value, {
      id: props.data.id,
      width: width.value,
      muted: false,
      controls: false,
      loop: true,
      progress_bar: true,
    });
    player.on("play", () => {
      isPlaying.value = true;
    });
    player.on("pause", () => {
      isPlaying.value = false;
    });
    player.on("timeupdate", (e) => {
      progress.value = e.percent * 100;
      playbackPosition.value = {
        current: convertTime(e.seconds),
        remaining: convertTime(e.duration - e.seconds),
      };
    });
  });
});

const mouse = reactive(useMouse({ target: parentEl, type: extractor }));
const isMouseMoving = ref(false);

// Variable to store the timeout reference
let inactivityTimeout = null;

// Function to handle mouse movement
const handleMouseMove = () => {
  isMouseMoving.value = true;

  // Clear any previous timeout
  if (inactivityTimeout) {
    clearTimeout(inactivityTimeout);
  }

  // Set a new timeout to set isMouseMoving to false after inactivity
  inactivityTimeout = setTimeout(() => {
    isMouseMoving.value = false;
  }, 2000); // 2000ms of inactivity before setting to false
};

const padTo2Digits = (num) => {
  return num.toString().padStart(2, "0");
};

const convertTime = (time) => {
  const totalSeconds = Math.floor(time);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
};
</script>

<style>
.vimeo-player iframe {
  height: auto;
  aspect-ratio: 16/9;
  width: 100%;
  max-width: 100% !important;
}

.progress-bar {
  transition: left 0.3s ease-out, opacity 0.3s ease-in-out;
}
</style>
