<template>
  <div class="search">
    <p class="search__title">{{ title }}</p>
    <SearchForm v-bind:searchCategories="searchCategories"
      v-on:submit-search-form="onSubmitSearchForm">
    </SearchForm>
  </div>
</template>

<script>
import SearchForm from './SearchForm.vue'

export default {
  name: 'Search',
  data: function () {
    return {
      title: 'Car Dimensions',
      searchCategories: {
        make: {
          options: [
            'Abarth',
            'Asia',
            'Audi'
          ]
        },
        model: {
          options: [
            'A4',
            'B17',
            'X9'
          ]
        },
        year: {
          options: [
            '1990',
            '2000',
            '2010'
          ]
        }
      }
    }
  },
  methods: {
    onSubmitSearchForm: function (selectedOptions) {
      console.log('selectedOptions: ', selectedOptions)
    }
  },
  components: {
    SearchForm
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
