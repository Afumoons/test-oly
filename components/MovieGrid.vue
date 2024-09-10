<script lang="ts" setup>
interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

// Props to receive series data from the parent component
const props = defineProps<{
  movies: Movie[];
}>();
</script>

<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
  >
    <NuxtLink
      :to="'movie/' + movie.imdbID"
      v-for="movie in movies"
      :key="movie.imdbID"
      class="border border-gray-200 rounded-lg overflow-hidden shadow-md"
      data-aos="fade-in"
    >
      <NuxtImg
        :src="movie.Poster"
        format="webp"
        alt="Movie Poster"
        class="w-full h-64 object-cover"
        loading="lazy"
      />
      <div class="p-4">
        <h2 class="text-lg font-semibold">{{ movie.Title }}</h2>
        <p class="text-gray-600">{{ movie.Year }}</p>
      </div>
    </NuxtLink>
  </div>
</template>
