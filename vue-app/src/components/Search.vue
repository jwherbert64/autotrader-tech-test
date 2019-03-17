<template>
  <div class="search">
    <p class="search__title">{{ title }}</p>
    <SearchForm v-bind:searchCategories="searchCategories"
      v-bind:searchYears="searchYears"
      v-bind:selectedOptions="selectedOptions"
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
      title: 'Car Dimensions',
      searchCategories: {
        make: {
          names: [],
          ids: []
        },
        model: {
          names: [],
          ids: []
        }
      },
      searchYears: {
        values: []
      },
      selectedOptions: {
        make: '',
        model: '',
        year: ''
      }
    }
  },
  methods: {
    onSubmitSearchForm: function (newSelectedOptions) {
      this.selectedOptions = newSelectedOptions
      let selectedOptions = this.selectedOptions
      let searchCategories = this.searchCategories
      const categoryKeys = Object.keys(this.searchCategories)
      categoryKeys.forEach(function (categoryKey) {
        selectedOptions[categoryKey] = searchCategories[categoryKey].names[newSelectedOptions[categoryKey]]
      })
      let searchYears = this.searchYears
      selectedOptions['year'] = searchYears.values[newSelectedOptions['year']]
    }
  },
  components: {
    SearchForm,
    SearchResults
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
