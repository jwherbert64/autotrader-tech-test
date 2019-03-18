<template>
  <div class="search__results-wrapper" v-if="resultsFeedback.hasLoaded">
    <div v-if="resultsFeedback.hasError">
      <p>An error has occurred...</p>
    </div>
    <div v-else-if="resultsFeedback.isLoading">
      <p>Loading...</p>
    </div>
    <div class="search__results" v-else>
      <h2>{{ resultsTitle }}</h2>
      <p>
        {{ resultsParagraph }}
        {{ searchResults.minimums.height }}cm to
        {{ searchResults.maximums.height }}cm depending on the variant. The width ranges from
        {{ searchResults.minimums.width }}cm to
        {{ searchResults.maximums.width }}cm. The length ranges from
        {{ searchResults.minimums.length }}cm to
        {{ searchResults.maximums.length }}cm.
      </p>
      <SearchResultsTable v-bind:resultsDimensions="searchResults.dimensions">
      </SearchResultsTable>
    </div>
  </div>
</template>

<script>
import SearchService from '../services/searchService'
import SearchResultsTable from './SearchResultsTable.vue'

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
      resultsFeedback: {
        hasError: false,
        isLoading: false,
        hasLoaded: false
      },
      resultsTitle: '',
      resultsParagraph: ''
    }
  },
  props: [
    'selectedOptions'
  ],
  components: {
    SearchResultsTable
  },
  watch: {
    selectedOptions: function (searchOptions) {
      this.searchResults.dimensions = []
      this.searchResults.minimums = {}
      this.searchResults.maximums = {}

      this.searchService.fetchSearchResults(
        this.searchResults,
        this.resultsFeedback,
        searchOptions
      )

      this.resultsParagraph = 'The dimensions shown below are the height, width and length of each variant for the ' +
        searchOptions.make + ' ' +
        searchOptions.model + ' ' +
        searchOptions.year + '. The height, measured from ground to top of the car, ranges from '
    }
  }
}
</script>
