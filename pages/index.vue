<script setup lang="ts">
// State variables
const query = ref("");
const movies = ref([]);

// Access runtime configuration
const config = useRuntimeConfig();

// Function to fetch movies using useFetch
const fetchMovies = async () => {
  if (!query.value) return; // Prevent empty queries

  // Using useFetch to fetch data from the OMDb API
  const { data, error } = await useFetch(
    `https://www.omdbapi.com/?apikey=${config.public.omdbApiKey}&s=${encodeURIComponent(query.value)}&type=movie`
  );

  // Handling data and errors
  if (error.value) {
    console.error("Error fetching movies:", error.value);
  } else if (data.value?.Search) {
    movies.value = data.value.Search;
  } else {
    movies.value = []; // Clear movies if no results found
  }
};

//SEO Meta configuration
useSeoMeta({
  title: "Olympic Front End Test",
  ogTitle: "IMDB Movie Crawler",
});
</script>

<template>
  <div class="">
    <h1 class="text-3xl font-bold text-center mb-6">IMDB Movie Search</h1>
    <div class="flex justify-center mb-6">
      <input
        type="text"
        v-model="query"
        class="w-full max-w-md p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        @keyup.enter="fetchMovies"
        placeholder="Search for movies..."
      />
      <button
        @click="fetchMovies"
        class="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Search
      </button>
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <NuxtLink
        :to="'movie/' + movie.imdbID"
        v-for="movie in movies"
        :key="movie.imdbID"
        class="border border-gray-200 rounded-lg overflow-hidden shadow-md"
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
  </div>
</template>
