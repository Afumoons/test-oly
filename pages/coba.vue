<script setup>
import { ref } from 'vue'

const positionX = ref(0)
const positionZ = ref(0)

onMounted(() => {
    setInterval(() => {
        positionX.value -= 0.001
        positionZ.value -= 0.001
    }, 100)
})
</script>

<template>

    <TresCanvas render-mode="on-demand">

        <OrbitControls />

        <TresMesh :position-x="positionX" :position-z="positionZ">
            <TresBoxGeometry />
            <TresMeshBasicMaterial color="teal" />
        </TresMesh>
    </TresCanvas>
</template>