<template>
  <div class="search__results">
    {{ selectedOptions }}
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SearchResults',
  props: [
    'selectedOptions'
  ],
  watch: {
    selectedOptions: function (searchOptions) {
      axios.get('https://vehicles-staging.platform.autotrader.com.au/api/v1/dimensions?make=' +
        this.selectedOptions['make'] +
        '&model=' + this.selectedOptions['model'] +
        '&year=' + this.selectedOptions['year'])
        .then(response => {
          let searchResults = response.data.data
          console.log('searchResults: ', searchResults)
        })
        .catch(error => {
          console.log(error)
          this.hasError = true
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>
