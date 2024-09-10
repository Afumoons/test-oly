<script setup lang="ts">
// Define types for movie details
interface MovieDetails {
  Title: string;
  Year: string;
  Rated: string;
  Runtime: string;
  imdbRating: string;
  Poster: string;
  Plot: string;
  Director: string;
  Writer: string;
  Actors: string;
}

// Define the type for route parameters
interface RouteParams {
  imdbID: string;
}

// State variables
const movie = ref<MovieDetails | null>(null);
const isLoading = ref(true);
const route = useRoute();
const config = useRuntimeConfig();
const imdbID = (route.params as RouteParams).imdbID as string;

// Function to fetch movie details using useFetch
const fetchMovieDetails = async () => {
  isLoading.value = true;

  const { data, error } = await useFetch<MovieDetails>(
    `https://www.omdbapi.com/?apikey=${config.public.omdbApiKey}&i=${imdbID}`
  );

  if (error.value) {
    console.error("Error fetching movie details:", error.value);
  } else if (data.value) {
    movie.value = data.value;
  }

  isLoading.value = false;
};

// Fetch movie details when the component is mounted
onMounted(fetchMovieDetails);

useSeoMeta({
  title: "Movie Details",
  ogTitle: "Movie Details",
});
</script>

<template>
  <div v-if="isLoading" class="text-center w-full">
    Loading movie details...
  </div>
  <div v-else-if="movie" class="w-full h-full">
    <div
      class="flex flex-col items-center gap-4 p-4 w-full relative z-20 backdrop-blur-xl rounded-sm"
    >
      <div class="grid gap-4 w-full p-4">
        <h1 class="title text-center md:text-left text-3xl font-bold">
          {{ movie?.Title }}
        </h1>
        <div class="other">
          <ul class="flex flex-col md:flex-row list-none gap-2">
            <li><strong>Year: </strong>{{ movie?.Year }}</li>
            <li><strong>Rated: </strong>{{ movie?.Rated }}</li>
            <li><strong>Runtime: </strong>{{ movie?.Runtime }}</li>
          </ul>
        </div>
        <div class="imdb flex flex-col items-center">
          <p>IMDB Rating</p>
          <div class="flex flex-row items-end">
            <p class="text-3xl font-bold">{{ movie?.imdbRating }}</p>
            <p>/10</p>
          </div>
        </div>
      </div>
      <div class="flex flex-col md:flex-row gap-4 w-full">
        <NuxtImg
          :src="movie.Poster"
          format="webp"
          alt="Movie Poster"
          loading="lazy"
          class="w-full md:w-auto h-auto md:h-96 xl:h-[500px] object-cover rounded-sm"
        />
        <div class="flex flex-col p-4">
          <p class="mb-4">{{ movie?.Plot }}</p>
          <p><strong>Director:</strong> {{ movie?.Director }}</p>
          <p><strong>Writers:</strong> {{ movie?.Writer }}</p>
          <p><strong>Actors:</strong> {{ movie?.Actors }}</p>
        </div>
      </div>
    </div>
    <NuxtImg
      :src="movie.Poster"
      class="absolute bottom-0 top-0 left-0 right-0 w-full h-full z-[-10] object-cover"
      loading="lazy"
    />
  </div>
  <div v-else class="flex flex-col items-center gap-4 w-full">
    <p class="text-center text-red-500">Movie details not found.</p>
    <PrimaryButton label="Back to Home" type="link" link="/" onClick="true" />
  </div>
</template>

<style scoped>
.container {
  max-width: 1024px;
}
.grid {
  /* Default (Mobile) Layout */
  grid-template-areas:
    "title title"
    "other imdb";
  grid-template-columns: 1fr auto; /* Adjust as needed */
}

/* Responsive Layout for Desktop */
@media (min-width: 768px) {
  /* Adjust the min-width to match your breakpoint */
  .grid {
    grid-template-areas:
      "title imdb"
      "other imdb";
    grid-template-columns: 2fr 1fr; /* Adjust as needed */
  }
}

.title {
  grid-area: title;
}

.imdb {
  grid-area: imdb;
}

.other {
  grid-area: other;
}
</style>
