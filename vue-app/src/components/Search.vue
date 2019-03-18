<template>
  <div class="search">
    <div class="search__hero">
      <h2>{{ searchTitle }}</h2>
      <p v-if="!searchSubmitted">
        Ever wanted to know the dimensions of a car? It's useful to determine if a car will fit in your garage,
        for parking and car park restrictions and to know if there is space in the car for all your daily needs.
        We have provided the dimensions for a wide range of makes and models by year for you to easily and
        quickly view all you need to know.
      </p>
    </div>
    <SearchForm v-bind:searchCategories="searchCategories"
      v-on:submit-search-form="onSubmitSearchForm">
    </SearchForm>
    <SearchResults v-bind:selectedOptions="selectedOptions">
    </SearchResults>
  </div>
</template>

<script>
import SearchForm from './SearchForm.vue'
import SearchResults from './SearchResults.vue'

export default {
  name: 'Search',
  data: function () {
    return {
      searchCategories: {
        make: [],
        model: [],
        year: []
      },
      selectedOptions: {
        make: '',
        model: '',
        year: ''
      },
      searchSubmitted: false,
      searchTitle: 'Car Dimensions'
    }
  },
  methods: {
    onSubmitSearchForm: function (newSelectedOptions) {
      this.selectedOptions = {}
      let selectedOptions = this.selectedOptions
      let searchCategories = this.searchCategories
      const categoryKeys = Object.keys(this.searchCategories)

      categoryKeys.forEach(function (categoryKey) {
        if (searchCategories[categoryKey][newSelectedOptions[categoryKey]].hasOwnProperty('name')) {
          selectedOptions[categoryKey] = searchCategories[categoryKey][newSelectedOptions[categoryKey]].name
        } else {
          selectedOptions[categoryKey] = searchCategories[categoryKey][newSelectedOptions[categoryKey]]
        }
      })

      this.searchTitle = selectedOptions.year + ' ' +
        selectedOptions.make + ' ' +
        selectedOptions.model + ' Car Dimensions'
      this.searchSubmitted = true
    }
  },
  components: {
    SearchForm,
    SearchResults
  }
}
</script>
