<script setup lang="ts">
// Define types for fetched data
interface Series {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface OmdbSeriesResponse {
  Search: Series[];
  totalResults: string;
  Response: string;
}

interface OmdbMovieResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

// State variables
const query = ref("");
const movies = ref<Movie[]>([]);
const series = ref<Series[]>([]);
const movieCurrentPage = ref(1); // Track the current page
const movieTotalResults = ref(0);
const movieIsLoading = ref(false);
const seriesIsLoading = ref(false);

// Access runtime configuration
const config = useRuntimeConfig();

// Function to handle the new search
const handleSearch = () => {
  // Reset state when a new search is triggered
  series.value = [];
  movies.value = [];
  movieCurrentPage.value = 1;
  movieTotalResults.value = 0;
  fetchSeries();
  fetchMovies(1);
};

// Function to fetch series using useFetch
const fetchSeries = async () => {
  if (!query.value || seriesIsLoading.value) return; // Prevent empty queries or multiple requests

  seriesIsLoading.value = true; // Set loading state

  // Fetch data from the OMDb API
  const { data, error } = await useFetch<OmdbSeriesResponse>(
    `https://www.omdbapi.com/?apikey=${config.public.omdbApiKey}&s=${encodeURIComponent(query.value)}&type=series`
  );

  if (error.value) {
    console.error("Error fetching seriess:", error.value);
  } else if (data.value?.Search) {
    series.value = data.value.Search;
  } else {
    series.value = [];
  }

  seriesIsLoading.value = false; // Reset loading state
};

// Function to fetch movies using useFetch
const fetchMovies = async (page = 1) => {
  if (!query.value || movieIsLoading.value) return; // Prevent empty queries or multiple requests

  movieIsLoading.value = true; // Set loading state

  // Fetch data from the OMDb API
  const { data, error } = await useFetch<OmdbMovieResponse>(
    `https://www.omdbapi.com/?apikey=${config.public.omdbApiKey}&s=${encodeURIComponent(query.value)}&type=movie&page=${page}`
  );

  if (error.value) {
    console.error("Error fetching movies:", error.value);
  } else if (data.value?.Search) {
    movies.value.push(...data.value.Search); // Append new results to existing list
    movieTotalResults.value = parseInt(data.value.totalResults, 10);
  } else {
    movies.value = [];
  }

  movieIsLoading.value = false; // Reset loading state
};

// Function to handle scroll event
const handleScroll = () => {
  const scrollPosition = window.innerHeight + window.scrollY;
  const threshold = document.body.offsetHeight - 200;

  // Trigger fetch for next page when scrolled near the bottom
  if (
    scrollPosition >= threshold &&
    movies.value.length < movieTotalResults.value
  ) {
    movieCurrentPage.value++;
    fetchMovies(movieCurrentPage.value);
  }
};

// SEO Meta configuration
useSeoMeta({
  title: "Olympic Front End Test",
  ogTitle: "IMDB Movie Crawler",
});

// Setup scroll listener
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div class="w-full">
    <h1 class="text-3xl font-bold text-center mb-6">IMDB Movie Search</h1>
    <div class="flex justify-center mb-6">
      <UInput
        type="text"
        v-model="query"
        class="w-full max-w-md p-2"
        size="md"
        @keyup.enter="handleSearch"
        placeholder="Search for movies..."
        icon="i-heroicons-magnifying-glass-20-solid"
      />

      <PrimaryButton label="Search" type="button" :onClick="handleSearch" />
    </div>

    <!-- Series Slider Component -->
    <SeriesSlider :series="series" />

    <!-- Movie Grid Component -->
    <MovieGrid :movies="movies" />
  </div>
</template>
