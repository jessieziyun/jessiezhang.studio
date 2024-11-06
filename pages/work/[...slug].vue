<template>
  <div class="p-2 mt-32">
    <div v-if="project">
      <div class="md:grid grid-cols-2 gap-4 whitespace-pre-line px-1 space-y-20 md:space-y-0">
        <div>
          <h1>{{ project.title }}</h1>
          <p>{{ project.type }}, {{ project.date }}</p>
        </div>
        <p>{{ project.description }}</p>
        <div class="underline cursor-pointer"></div>
      </div>
      <item class="mt-24" :item="project.hero" />
      <div class="pt-20 space-y-20" ref="portfolioView">
        <transition mode="out-in"
          ><div
            v-if="!expandInfo"
            class="md:grid md:grid-cols-2 gap-2 whitespace-pre-line"
          >
            <div
              class="space-y-3 mb-20 px-1"
              :class="expandInfo ? 'col-start-1' : 'col-start-2'"
            >
              <div class="space-y-5">
                <p>{{ project.info.summary }}</p>
                <button @click="expandInfo = true" class="underline">
                  Read more
                </button>
              </div>
            </div>
            <div class="space-y-2 col-span-2">
              <item
                v-if="project.items"
                v-for="item in project.items"
                :key="item.path || item.placeholder"
                :item="item"
                :expandInfo="expandInfo"
              />
            </div></div
        ></transition>
        <transition mode="out-in"
          ><div
            v-if="expandInfo"
            class="p-1 md:grid grid-cols-2 gap-2 whitespace-pre-line relative"
          >
            <div class="space-y-12 md:sticky self-start top-24 mb-24 md:mb-0">
              <div class="space-y-5">
                <p
                  v-for="paragraph in project.info.full"
                  :key="paragraph"
                  class="pr-1"
                >
                  {{ paragraph }}
                </p>
              </div>

              <div v-if="project.info.detail" class="grid grid-cols-2 gap-2">
                <div
                  v-for="detail in project.info.detail"
                  :key="detail.heading"
                >
                  <h3 class="italic">{{ detail.heading }}</h3>
                  <p v-for="content in detail.content" :key="content">
                    {{ content }}
                  </p>
                </div>
              </div>

              <button @click="collapse" class="underline">
                Portfolio view
              </button>
            </div>
            <div class="space-y-2">
              <item
                v-if="project.items"
                v-for="item in project.items"
                :key="item.path || item.placeholder"
                :item="item"
                :expandInfo="expandInfo"
              />
            </div></div
        ></transition>
      </div>
      <div class="mt-24 flex justify-between p-1 underline">
        <nuxt-link :to="prevProject._path">Prev</nuxt-link>
        <nuxt-link :to="nextProject._path">Next</nuxt-link>
      </div>
    </div>
    <div v-else class="text-center">
      <p>Page does not exist</p>
      <nuxt-link to="/" class="link">Go to homepage</nuxt-link>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const { data: project, error } = await useAsyncData("project", () =>
  queryContent("work")
    .where({ _path: `/work/${route.params.slug[0]}` })
    .findOne()
);

const expandInfo = ref(false);
const portfolioView = ref(null);

const collapse = () => {
  expandInfo.value = false;
  // portfolioView.value?.scrollIntoView();
  const y =
    portfolioView.value?.getBoundingClientRect().top + window.scrollY - 64;
  window.scrollTo({ top: y, behavior: "instant" });
};

const { data: projectTitlesData, error: titleError } = await useAsyncData(
  "titles",
  () => queryContent("work/project-index").findOne()
);

const projectTitles = projectTitlesData?.value?.titles || [];
const projectIndex = projectTitles.indexOf(project?.value?.title);
const nextProjectTitle =
  projectIndex + 1 < projectTitles.length
    ? projectTitles[projectIndex + 1]
    : projectTitles[0];
const prevProjectTitle =
  projectIndex - 1 >= 0
    ? projectTitles[projectIndex - 1]
    : projectTitles[projectTitles.length - 1];

const { data: nextProject } = await useAsyncData("next", () =>
  queryContent("work").where({ title: nextProjectTitle }).findOne()
);
const { data: prevProject } = await useAsyncData("prev", () =>
  queryContent("work").where({ title: prevProjectTitle }).findOne()
);
</script>
