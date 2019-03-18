<template>
  <select class="search__category-select"
    v-model="selectedOptions[categoryKey]"
    v-on:change="$emit('select-category-option', $event.target.value, categoryKey)">
    <option value="">Please select {{ categoryKey }}</option>
    <option v-for="(categoryOption, index) in categoryOptions"
      v-bind:value="index"
      v-bind:key="index">
      <span v-if="categoryOption.hasOwnProperty('name')">
        {{ categoryOption.name }}
      </span>
      <span v-else>
        {{ categoryOption }}
      </span>
    </option>
  </select>
</template>

<script>
export default {
  name: 'SearchCategorySelect',
  props: [
    'categoryOptions',
    'categoryKey',
    'selectedOptions'
  ]
}
</script>
