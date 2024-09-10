<script lang="ts" setup>
interface Props {
  label: string;
  type: "link" | "button";
  link: string;
  // optional onclick
  onClick: () => void;
}

defineProps<Props>();
</script>
<template>
  <button
    v-if="type === 'button'"
    @click="onClick"
    class="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
  >
    {{ label }}
  </button>
  <NuxtLink
    v-else-if="type === 'link'"
    :to="link"
    class="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
    >{{ label }}</NuxtLink
  >
</template>
