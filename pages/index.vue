<template>
  <div class="px-2 mt-36 mb-24 md:mt-72 md:mb-64">
    <div class="grid md:grid-cols-2 gap-x-2 gap-y-8">
      <div v-for="project in projects" :key="project._path">
        <nuxt-link :to="project._path">
          <img :src="project.thumbnail?.path" :alt="project.thumbnail?.alt" />
          <div class="mt-2 px-1 flex justify-between">
            <h2>{{ project.title }}</h2>
            <p class="italic">{{ project.type }}</p>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: projectTitlesData, error: titleError } = await useAsyncData(
  "titles",
  () => queryContent("work/project-index").findOne()
);
const projectTitles = projectTitlesData?.value?.titles || [];

const { data: projects, error } = await useAsyncData("projects", async () => {
  if (projectTitles.length === 0) {
    return [];
  }

  const fetchedProjects = await queryContent("work")
    .where({ title: { $containsAny: projectTitles } })
    .find();

  return fetchedProjects.sort((a, b) => {
    return projectTitles.indexOf(a.title) - projectTitles.indexOf(b.title);
  });
});
</script>
