<template>
  <div class="search__form-wrapper">
    <div v-if="hasError">
      <p>An error has occurred...</p>
    </div>
    <div v-else-if="isLoading">
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
        v-bind:categoryKey="yearKey"
        v-bind:selectedOptions="selectedOptions"
        v-bind:key="yearKey"
        v-on:select-category-option="onSelectCategoryOption">
      </SearchFormSelect>
      <input class="search__submit" type="submit" value="Show Dimensions">
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import SearchFormSelect from './SearchFormSelect.vue'

export default {
  name: 'SearchForm',
  data: function () {
    return {
      yearKey: 'year',
      selectedOptions: {
        make: '',
        model: '',
        year: ''
      },
      hasError: false,
      isLoading: true
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

          axios.get('https://vehicles-staging.platform.autotrader.com.au/api/v1/models?make_id=' +
            this.searchCategories[categoryKey].ids[selectedIndex])
            .then(response => {
              let searchOptions = response.data.data
              let searchCategory = this.searchCategories['model']
              searchCategory.names = []
              searchCategory.ids = []
              searchOptions.forEach(function (searchOption) {
                searchCategory.names.push(searchOption.name)
                searchCategory.ids.push(searchOption.id)
              })
            })
            .catch(error => {
              console.log(error)
              this.hasError = true
            })
            .finally(() => {
              this.isLoading = false
            })
          break
        case 'model':
          this.selectedOptions['year'] = ''

          axios.get('https://vehicles-staging.platform.autotrader.com.au/api/v1/vehicles/years?make_id=' +
            this.searchCategories['make'].ids[this.selectedOptions['make']] +
            '&model_id=' + this.searchCategories[categoryKey].ids[selectedIndex])
            .then(response => {
              let searchOptions = response.data.data
              let searchYears = this.searchYears
              searchYears.values = searchOptions.map(searchYear => searchYear)
            })
            .catch(error => {
              console.log(error)
              this.hasError = true
            })
            .finally(() => {
              this.isLoading = false
            })
          break
        case 'year':
          console.log(categoryKey)
          break
        default:
          console.log(categoryKey)
      }
    }
  },
  components: {
    SearchFormSelect
  },
  mounted () {
    const categoryKeys = Object.keys(this.searchCategories)
    categoryKeys.map(categoryKey =>
      axios.get('https://vehicles-staging.platform.autotrader.com.au/api/v1/' +
        categoryKey + 's?')
        .then(response => {
          let searchOptions = response.data.data
          let searchCategory = this.searchCategories[categoryKey]
          searchOptions.forEach(function (searchOption) {
            searchCategory.names.push(searchOption.name)
            searchCategory.ids.push(searchOption.id)
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
