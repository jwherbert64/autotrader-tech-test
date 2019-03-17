<template>
  <div class="search__form-wrapper">
    <div v-if="searchFormFeedback.hasError">
      <p>An error has occurred...</p>
    </div>
    <div v-else-if="searchFormFeedback.isLoading">
      <p>Loading...</p>
    </div>
    <form class="search__form"
      v-else
      v-on:submit="$emit('submit-search-form', selectedOptions)">
      <SearchFormSelect v-for="(searchCategory, index) in searchCategories"
        v-bind:categoryOptions="searchCategory.names"
        v-bind:categoryKey="index"
        v-bind:selectedOptions="selectedOptions"
        v-bind:key="index"
        v-on:select-category-option="onSelectCategoryOption">
      </SearchFormSelect>
      <SearchFormSelect v-bind:categoryOptions="searchYears.values"
        v-bind:categoryKey="'year'"
        v-bind:selectedOptions="selectedOptions"
        v-bind:key="'year'"
        v-on:select-category-option="onSelectCategoryOption">
      </SearchFormSelect>
      <input class="search__submit" type="submit" value="Show Dimensions">
    </form>
  </div>
</template>

<script>
import SearchService from '../services/searchService'
import SearchFormSelect from './SearchFormSelect.vue'

export default {
  name: 'SearchForm',
  data: function () {
    return {
      searchService: new SearchService(),
      selectedOptions: {
        make: '',
        model: '',
        year: ''
      },
      searchFormFeedback: {
        hasError: false,
        isLoading: true
      }
    }
  },
  props: [
    'searchCategories',
    'searchYears'
  ],
  methods: {
    onSelectCategoryOption: function (selectedIndex, categoryKey) {
      this.selectedOptions[categoryKey] = selectedIndex
      switch (categoryKey) {
        case 'make':
          this.selectedOptions['model'] = ''
          this.selectedOptions['year'] = ''

          this.searchService.updateCategoryModels(
            this.searchCategories,
            this.searchFormFeedback,
            selectedIndex,
            categoryKey
          )
          break
        case 'model':
          this.selectedOptions['year'] = ''

          this.searchService.updateCategoryYears(
            this.searchCategories,
            this.searchYears,
            this.searchFormFeedback,
            this.selectedOptions,
            selectedIndex,
            categoryKey
          )
          break
        case 'year':
          break
        default:
      }
    }
  },
  components: {
    SearchFormSelect
  },
  mounted () {
    this.searchService.initiateSearchForm(this.searchCategories, this.searchFormFeedback)
  }
}
</script>
