<template>
  <div class="search">
    <p class="search__title">{{ title }}</p>
    <div v-if="hasError">
      <p>An error has occurred...</p>
    </div>
    <div v-else-if="isLoading">
      <p>Loading...</p>
    </div>
    <SearchForm v-else
      v-bind:searchCategories="searchCategories"
      v-bind:searchYears="searchYears"
      v-on:submit-search-form="onSubmitSearchForm">
    </SearchForm>
  </div>
</template>

<script>
import axios from 'axios'
import SearchForm from './SearchForm.vue'

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
      searchYears: [],
      isLoading: true,
      hasError: false
    }
  },
  methods: {
    onSubmitSearchForm: function (selectedOptions) {
      console.log('selectedOptions: ', selectedOptions)
    }
  },
  components: {
    SearchForm
  },
  mounted () {
    const categoryKeys = Object.keys(this.searchCategories)
    categoryKeys.map(categoryKey =>
      axios.get('https://vehicles-staging.platform.autotrader.com.au/api/v1/' + categoryKey + 's?')
        .then(response => {
          let searchResults = response.data.data
          let searchCategory = this.searchCategories[categoryKey]
          searchCategory.names = searchResults.map(searchCategory => searchCategory.name)
          searchResults.forEach(function (searchResult) {
            searchCategory.names.push(searchResult.name)
            searchCategory.ids.push(searchResult.id)
          })
        })
        .catch(error => {
          console.log(error)
          this.hasError = true
        })
        .finally(() => {
          this.isLoading = false
        })
    )
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
