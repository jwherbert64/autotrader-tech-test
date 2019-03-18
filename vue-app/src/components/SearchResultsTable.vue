<template>
  <table class="search__results-table">
    <tr>
      <th>Variant</th>
      <th>HxWxL (cm)</th>
      <th>Kerb Weight (kg)</th>
    </tr>
    <tr v-for="(resultsDimension, index) in resultsDimensions"
      v-if="resultsDimension.variant != null &&
        resultsDimension.height != null &&
        resultsDimension.width != null &&
        resultsDimension.length != null &&
        resultsDimension.kerbWeight != null"
      v-bind:key="index">
      <td>{{ resultsDimension.variant }}</td>
      <td>{{ resultsDimension.height }}x{{ resultsDimension.width }}x{{ resultsDimension.length }}</td>
      <td>{{ resultsDimension.kerbWeight }}</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'SearchResultsTable',
  props: [
    'resultsDimensions'
  ]
}
</script>
