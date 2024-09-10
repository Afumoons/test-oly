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
  <UButton
    v-if="type === 'button'"
    :label="label"
    size="sm"
    @click="onClick"
    variant="solid"
  />

  <UButton v-else-if="type === 'link'">
    <ULink :to="link">{{ label }}</ULink>
  </UButton>
</template>
