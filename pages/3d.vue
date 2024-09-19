<script setup>
const fbxPath = "/koltuk2.fbx";
</script>

<template>
  <div class="w-full px-4">
    <TresCanvas render-mode="on-demand" window-size>
      <TresPerspectiveCamera :position="[11, 11, 15]" />
      <OrbitControls />
      <Suspense>
        <FBXModel :path="fbxPath" :scale="0.1" />
      </Suspense>
      <TresDirectionalLight :intensity="2" :position="[3, 3, 3]" />
      <TresAmbientLight />
    </TresCanvas>
  </div>
</template>

<style scoped>
/* Basic styling */
</style>
