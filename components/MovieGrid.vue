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
    <ULink
      :to="'movie/' + movie.imdbID"
      v-for="movie in movies"
      :key="movie.imdbID"
      class="border border-gray-200 dark:border-none dark:bg-gray-950 rounded-lg overflow-hidden shadow-md flex flex-row sm:flex-col"
      data-aos="fade-in"
    >
      <NuxtImg
        :src="movie.Poster"
        format="webp"
        alt="Movie Poster"
        class="w-full h-64 object-cover poster"
        loading="lazy"
      />
      <div class="p-4 description">
        <h2 class="text-lg font-semibold">{{ movie.Title }}</h2>
        <p class="text-gray-600">{{ movie.Year }}</p>
      </div>
    </ULink>
  </div>
</template>

<style>
/* Default (Mobile) Layout */
.poster {
  flex: 3;
}
.description {
  flex: 2;
}

/* Responsive Layout for Desktop */
@media (min-width: 640px) {
  /* Adjust the min-width to match your breakpoint */
  .poster {
    flex: auto;
  }
  .description {
    flex: auto;
  }
}
</style>
