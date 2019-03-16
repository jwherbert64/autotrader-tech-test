<template>
  <div class="search">
    <p class="search__title">{{ title }}</p>
    <form class="search__form" v-on:submit="onSubmitSearchForm">
      <SearchSelect v-for="(searchCategory, index) in searchCategories"
        v-bind:categoryOptions="searchCategory.options"
        v-bind:categoryType="index"
        v-bind:key="index"
        v-on:select-category-option="onSelectCategoryOption">
      </SearchSelect>
      <input class="search__submit" type="submit" value="Show Dimensions">
    </form>
    <div>Make: {{ selectedOptions.make }}</div>
    <div>Model: {{ selectedOptions.model }}</div>
    <div>Year: {{ selectedOptions.year }}</div>
  </div>
</template>

<script>
import SearchSelect from './SearchSelect.vue'

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
      },
      selectedOptions: {
        make: null,
        model: null,
        year: null
      }
    }
  },
  methods: {
    onSelectCategoryOption: function (selectedOption, categoryType) {
      this.selectedOptions[categoryType] = selectedOption
    },
    onSubmitSearchForm: function () {

    }
  },
  components: {
    SearchSelect
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
