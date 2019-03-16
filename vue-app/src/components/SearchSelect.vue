<template>
  <select class="search__select"
    v-model="selectedOption"
    v-on:change="$emit('select-category-option', selectedOption, categoryType)">
    <option value="">Please select {{ categoryType }}</option>
    <option v-for="(categoryOption, index) in categoryOptions"
      v-bind:value="index"
      v-bind:key="index">
      {{ categoryOption }}
    </option>
  </select>
</template>

<script>
export default {
  data: function () {
    let data = {
      selectedOption: ''
    }
    data = Object.assign({}, data, this.categoryType)
    return data
  },
  name: 'SearchSelect',
  props: [
    'categoryType',
    'categoryOptions'
  ]
}
</script>
