<template>
  <div class="search__results-wrapper">
    <div v-if="searchResultsFeedback.hasError">
      <p>An error has occurred...</p>
    </div>
    <div v-else-if="searchResultsFeedback.isLoading">
      <p>Loading...</p>
    </div>
    <div class="search__results" v-else>
      <div>
        {{ selectedOptions }}
      </div>
      <div>
        {{ searchResults }}
      </div>
    </div>
  </div>
</template>

<script>
import SearchService from '../services/searchService'

export default {
  name: 'SearchResults',
  data: function () {
    return {
      searchService: new SearchService(),
      searchResults: {
        dimensions: [],
        minimums: {},
        maximums: {}
      },
      searchResultsFeedback: {
        hasError: false,
        isLoading: false
      }
    }
  },
  props: [
    'selectedOptions'
  ],
  watch: {
    selectedOptions: function (searchOptions) {
      this.searchResults.dimensions = []
      this.searchResults.minimums = {}
      this.searchResults.maximums = {}
      this.searchResultsFeedback.isLoading = true
      this.searchService.fetchSearchResults(
        this.searchResults,
        this.searchResultsFeedback,
        searchOptions
      )
    }
  }
}
</script>
