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
        <SearchCategorySelect v-for="(searchCategory, key) in searchCategories"
          v-bind:categoryOptions="searchCategory"
          v-bind:categoryKey="key"
          v-bind:selectedOptions="selectedOptions"
          v-bind:key="key"
          v-on:select-category-option="onSelectCategoryOption">
        </SearchCategorySelect>
      <input class="search__submit" type="submit" value="Show Dimensions">
    </form>
  </div>
</template>

<script>
import SearchService from '../services/searchService'
import SearchCategorySelect from './SearchCategorySelect.vue'

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
    'searchCategories'
  ],
  methods: {
    onSelectCategoryOption: function (selectedIndex, categoryKey) {
      this.selectedOptions[categoryKey] = selectedIndex
      switch (categoryKey) {
        case 'make':
          this.selectedOptions.model = ''
          this.selectedOptions.year = ''

          this.searchService.updateCategoryModel(
            this.searchCategories,
            this.searchFormFeedback,
            selectedIndex
          )
          break
        case 'model':
          this.selectedOptions.year = ''

          this.searchService.updateCategoryYear(
            this.searchCategories,
            this.searchFormFeedback,
            this.selectedOptions,
            selectedIndex
          )
          break
        case 'year':
          break
        default:
      }
    }
  },
  components: {
    SearchCategorySelect
  },
  mounted () {
    this.searchService.initiateSearchForm(this.searchCategories, this.searchFormFeedback)
  }
}
</script>
