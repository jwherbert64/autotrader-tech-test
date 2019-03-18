'use strict'
import axios from 'axios'

const API = 'https://vehicles-staging.platform.autotrader.com.au/api/v1/'

class SearchService {
  initiateSearchForm (searchCategories, searchFeedback) {
    const categoryKeys = ['make', 'model']
    categoryKeys.map(categoryKey =>
      axios.get(API + categoryKey + 's?')
        .then(response => {
          let searchResponse = response.data.data
          searchResponse.forEach(function (searchOption) {
            let option = {}
            option.name = searchOption.name
            option.id = searchOption.id
            searchCategories[categoryKey].push(option)
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

  updateCategoryModel (searchCategories, searchFeedback, selectedIndex) {
    axios.get(API + 'models?make_id=' +
      searchCategories.make[selectedIndex].id
    )
      .then(response => {
        let searchResponse = response.data.data
        searchCategories.model = []
        searchResponse.forEach(function (searchOption) {
          let option = {}
          option.name = searchOption.name
          option.id = searchOption.id
          searchCategories.model.push(option)
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

  updateCategoryYear (searchCategories, searchFeedback, selectedOptions, selectedIndex) {
    axios.get(API + 'vehicles/years?make_id=' +
      searchCategories.make[selectedOptions.make].id + '&model_id=' +
      searchCategories.model[selectedIndex].id
    )
      .then(response => {
        let searchResponse = response.data.data
        searchCategories.year = searchResponse.map(searchOption => searchOption)
      })
      .catch(error => {
        console.log(error)
        searchFeedback.hasError = true
      })
      .finally(() => {
        searchFeedback.isLoading = false
      })
  }

  fetchSearchResults (searchResults, resultsFeedback, searchOptions) {
    axios.get(API + 'dimensions?make=' +
        searchOptions['make'] + '&model=' +
        searchOptions['model'] + '&year=' +
        searchOptions['year']// + '&cleanse=true'
    )
      .then(response => {
        resultsFeedback.isLoading = true

        let searchResponse = response.data.data

        searchResponse.dimensions.forEach(function (searchDimension) {
          let dimension = {}
          dimension.length = searchDimension.length
          dimension.width = searchDimension.width
          dimension.height = searchDimension.height
          dimension.kerbWeight = searchDimension.kerb_weight
          dimension.variant = searchDimension.variant
          searchResults.dimensions.push(dimension)
        })

        const searchMinimums = searchResponse.minimums
        searchResults.minimums.length = searchMinimums.length
        searchResults.minimums.width = searchMinimums.width
        searchResults.minimums.height = searchMinimums.height
        searchResults.minimums.kerbWeight = searchMinimums.kerb_weight

        const searchMaximums = searchResponse.maximums
        searchResults.maximums.length = searchMaximums.length
        searchResults.maximums.width = searchMaximums.width
        searchResults.maximums.height = searchMaximums.height
        searchResults.maximums.kerbWeight = searchMaximums.kerb_weight

        resultsFeedback.hasLoaded = true
      })
      .catch(error => {
        console.log(error)
        resultsFeedback.hasError = true
      })
      .finally(() => {
        resultsFeedback.isLoading = false
      })
  }
}

export default SearchService
