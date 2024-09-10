<script setup lang="ts">
// Define types for fetched data
interface Series {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

// Props to receive series data from the parent component
const props = defineProps<{
  series: Series[];
}>();

// Computed property to chunk series data for slider slides
const sliderSlides = computed(() => {
  const chunkSize = 2; // 2x2 layout for desktop
  const slides = [];

  for (let i = 0; i < props.series.length; i += chunkSize) {
    slides.push(props.series.slice(i, i + chunkSize));
  }

  return slides;
});
</script>

<template>
  <div v-if="series.length" class="mt-8 mb-4">
    <h2 class="text-2xl font-bold mb-4 text-center">Series Results</h2>
    <Swiper
      :slides-per-view="1"
      :space-between="20"
      class="swiper-container"
      :breakpoints="{
        768: { slidesPerView: 2, spaceBetween: 30 },
      }"
      :modules="[SwiperAutoplay, SwiperEffectCreative]"
      :loop="true"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }"
      :effect="'fade'"
      :fade-effect="{
        crossFade: true,
      }"
    >
      <SwiperSlide
        v-for="(slide, index) in sliderSlides"
        :key="index"
        class="swiper-slide"
      >
        <div class="grid grid-cols-1 gap-4">
          <div
            v-for="series in slide"
            :key="series.imdbID"
            class="relative rounded-lg overflow-hidden shadow-md"
          >
            <NuxtImg
              :src="series.Poster"
              alt="Series Poster"
              class="w-full h-48 object-cover"
              loading="lazy"
            />
            <div class="p-2 bg-white dark:bg-gray-950 text-center">
              <h3 class="font-semibold text-sm">{{ series.Title }}</h3>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped>
.swiper-container {
  width: 100%;
  padding: 16px 0;
}
</style>
