'use strict'
import axios from 'axios'

const API = 'https://vehicles-staging.platform.autotrader.com.au/api/v1/'

class SearchService {
  initiateSearchForm (searchCategories, searchFeedback) {
    const categoryKeys = Object.keys(searchCategories)
    categoryKeys.map(categoryKey =>
      axios.get(API + categoryKey + 's?')
        .then(response => {
          let searchOptions = response.data.data
          let searchCategory = searchCategories[categoryKey]
          searchOptions.forEach(function (searchOption) {
            searchCategory.names.push(searchOption.name)
            searchCategory.ids.push(searchOption.id)
          })
        })
        .catch(error => {
          console.log(error)
          searchFeedback.hasError = true
        })
        .finally(() => {
          searchFeedback.isLoading = false
        })
    )
  }

  updateCategoryModels (searchCategories, searchFeedback, selectedIndex, categoryKey) {
    axios.get(API + 'models?make_id=' +
      searchCategories[categoryKey].ids[selectedIndex]
    )
      .then(response => {
        let searchOptions = response.data.data
        let searchCategory = searchCategories['model']
        searchCategory.names = []
        searchCategory.ids = []
        searchOptions.forEach(function (searchOption) {
          searchCategory.names.push(searchOption.name)
          searchCategory.ids.push(searchOption.id)
        })
      })
      .catch(error => {
        console.log(error)
        searchFeedback.hasError = true
      })
      .finally(() => {
        searchFeedback.isLoading = false
      })
  }

  updateCategoryYears (searchCategories, searchYears, searchFeedback, selectedOptions, selectedIndex, categoryKey) {
    axios.get(API + 'vehicles/years?make_id=' +
      searchCategories['make'].ids[selectedOptions['make']] + '&model_id=' +
      searchCategories[categoryKey].ids[selectedIndex]
    )
      .then(response => {
        let searchOptions = response.data.data
        searchYears.values = searchOptions.map(searchYear => searchYear)
      })
      .catch(error => {
        console.log(error)
        searchFeedback.hasError = true
      })
      .finally(() => {
        searchFeedback.isLoading = false
      })
  }

  fetchSearchResults (selectedOptions, searchResults, searchResultsFeedback, searchOptions) {
    axios.get(API + 'dimensions?make=' +
        selectedOptions['make'] + '&model=' +
        selectedOptions['model'] + '&year=' +
        selectedOptions['year']
    )
      .then(response => {
        searchResults.result = response.data.data
      })
      .catch(error => {
        console.log(error)
        searchResultsFeedback.hasError = true
      })
      .finally(() => {
        searchResultsFeedback.isLoading = false
      })
  }
}

export default SearchService
