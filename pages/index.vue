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
  </div>
</template>
