<template>
  <form class="search__form"
    v-on:submit="$emit('submit-search-form', selectedOptions)">
    <SearchFormSelect v-for="(searchCategory, index) in searchCategories"
      v-bind:categoryOptions="searchCategory.names"
      v-bind:categoryType="index"
      v-bind:key="index"
      v-on:select-category-option="onSelectCategoryOption">
    </SearchFormSelect>
    <SearchFormSelect v-bind:categoryOptions="searchYears"
      v-bind:categoryType="yearType"
      v-bind:key="yearType"
      v-on:select-category-option="onSelectCategoryOption">
    </SearchFormSelect>
    <input class="search__submit" type="submit" value="Show Dimensions">
    <div>Make: {{ selectedOptions.make }}</div>
    <div>Model: {{ selectedOptions.model }}</div>
    <div>Year: {{ selectedOptions.year }}</div>
  </form>
</template>

<script>
import axios from 'axios'
import SearchFormSelect from './SearchFormSelect.vue'

export default {
  name: 'SearchForm',
  data: function () {
    let data = {
      yearType: 'year',
      selectedOptions: {
        make: null,
        model: null,
        year: null
      }
    }
    data = Object.assign({}, data, this.searchCategories, this.searchYears)
    return data
  },
  props: [
    'searchCategories',
    'searchYears'
  ],
  methods: {
    onSelectCategoryOption: function (selectedIndex, categoryType) {
      this.selectedOptions[categoryType] = selectedIndex
      console.log('categoryType: ', categoryType)

      switch (categoryType) {
        case 'make':
          console.log('make')
          break
        case 'model':
          console.log('model')
          break
        default:
          console.log('default')
      }
    }
  },
  components: {
    SearchFormSelect
  }
}
</script>
