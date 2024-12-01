<template>
  <div class="sm:w-4/5 md:w-1/2 lg:w-1/3">
    <div>
      This website is a work in progress. I've prioritised speed in this iteration so there's a lot left to do.
    </div>
    <br />
    <div class="italic">On my list</div>
    <ul>
      <li>Implement lazy loading for images</li>
      <li>Add page transitions</li>
      <li>Improve accessibility</li>
      <li>Improve mobile experience</li>
      <li>Reduce carbon impact (build a solar server?)</li>
    </ul>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "home",
});
</script>
