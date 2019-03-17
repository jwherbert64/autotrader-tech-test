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
        {{ searchResults.result }}
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
        dimensions: [{
          length: null,
          width: null,
          height: null,
          kerb_weight: null,
          variant: null
        }],
        minimums: {
          length: null,
          width: null,
          height: null,
          kerb_weight: null
        },
        maximums: {
          length: null,
          width: null,
          height: null,
          kerb_weight: null
        }
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
      this.searchResultsFeedback.isLoading = true
      this.searchService.fetchSearchResults(
        this.selectedOptions,
        this.searchResults,
        this.searchResultsFeedback,
        searchOptions
      )
    }
  }
}
</script>
