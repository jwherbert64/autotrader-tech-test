<template>
  <form class="search__form"
    v-on:submit="$emit('submit-search-form', selectedOptions)">
    <SearchFormSelect v-for="(searchCategory, index) in searchCategories"
      v-bind:categoryOptions="searchCategory.options"
      v-bind:categoryType="index"
      v-bind:key="index"
      v-on:select-category-option="onSelectCategoryOption">
    </SearchFormSelect>
    <input class="search__submit" type="submit" value="Show Dimensions">
    <div>Make: {{ selectedOptions.make }}</div>
    <div>Model: {{ selectedOptions.model }}</div>
    <div>Year: {{ selectedOptions.year }}</div>
  </form>
</template>

<script>
import SearchFormSelect from './SearchFormSelect.vue'

export default {
  name: 'SearchForm',
  data: function () {
    let data = {
      selectedOptions: {
        make: null,
        model: null,
        year: null
      }
    }
    data = Object.assign({}, data, this.searchCategories)
    return data
  },
  props: [
    'searchCategories'
  ],
  methods: {
    onSelectCategoryOption: function (selectedOption, categoryType) {
      this.selectedOptions[categoryType] = selectedOption
    }
  },
  components: {
    SearchFormSelect
  }
}
</script>
