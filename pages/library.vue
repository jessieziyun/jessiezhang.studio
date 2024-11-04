<template>
  <div class="px-3 mt-32 mb-32 space-y-24">
    <div class="md:grid grid-cols-2 gap-2 whitespace-pre-line md:space-y-0">
      <h1 class="hidden md:block">Library</h1>
      <p>Books I am currently reading and books I have read</p>
    </div>
    <div>
      <div class="flex gap-1.5 mb-2">
        <div class="italic">Filter:</div>
        <div
          v-for="(tag, index) in tags"
          class="link"
          :key="tag"
          @click="selectedTagIndex = index"
        >
          <span :class="selectedTagIndex === index ? 'italic' : ''">{{
            tag
          }}</span>
          <span v-if="index < tags.length - 1">,</span>
        </div>
      </div>
      <transition mode="out-in">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-x-2 gap-y-12 md:gap-y-24" :key="selectedTagIndex">
          <div
            v-for="book in library"
            v-show="
              selectedTagIndex === 0
                ? true
                : book.tags.some((tag) => tag === tags[selectedTagIndex])
            "
            :key="book.title + book.author"
          >
            <div class="space-y-2">
              <img :src="book.cover.path" alt="" class="w-full h-auto" />
              <div>
                <div>{{ book.title }}</div>
                <div class="italic mb-2">{{ book.author }}</div>
                <div class="text-sm">{{ book.read.display }}</div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="w-1/2">
      I began documenting my reading in May 2023 and as such, this catalogue is
      not comprehensive. As with the rest of this website, this page is a work
      in progress.
    </div>
  </div>
</template>

<script setup>
const nuxtApp = useNuxtApp()
const { data: library, error} = await useFetch('https://jessieziyun.github.io/library/library.json', {
  key: 'books',
  getCachedData(key) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
  }
})

const formatDate = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join(".");
};

library?.value?.forEach((book) => {
  book.read.display = book.read.end
    ? `${formatDate(book.read.start)}—${formatDate(book.read.end)}`
    : `${formatDate(book.read.start)}—`;
});

const selectedTagIndex = ref(0);
const tags = ["All", "Fiction", "Non fiction"];
</script>
