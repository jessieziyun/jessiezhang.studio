<template>
  <div class="mt-40 text-white px-3">
    <div class="space-y-36">
      <div v-for="experiment in experiments" class="space-y-12">
        <div class="sm:w-4/5 md:w-1/2 lg:w-1/3 sm:pr-1">
          <h2 class="mb-3 italic">{{ experiment.title }}, {{ experiment.date }}</h2>
          <p>{{ experiment.description }}</p>
        </div>
        <div class="space-y-2 md:space-y-0 md:grid grid-cols-4 gap-2">
          <item
            v-if="experiment.items"
            v-for="item in experiment.items"
            :class="`col-span-${item.col_span} ${
              item.col_start ? `col-start-${item.col_start}` : ''
            }`"
            :key="item.path || item.placeholder"
            :item="item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  colorMode: "dark",
});

const { data: experiments, error } = await useAsyncData("experiments", () =>
  queryContent("/experiments").find()
);

onMounted(() => {
  experiments?.value?.sort((a, b) => b.index - a.index);
});
</script>

<style scoped>
body {
  background-color: #1a1a1a;
}
</style>
