<template>
  <div>
    <select class="search__select"
      v-model="selectedOptions[categoryKey]"
      v-on:change="$emit('select-category-option', $event.target.value, categoryKey)">
      <option value="">Please select {{ categoryKey }}</option>
      <option v-for="(categoryOption, index) in categoryOptions"
        v-bind:value="index"
        v-bind:key="index">
        {{ categoryOption }}
      </option>
    </select>
    <div>{{ selectedOptions[categoryKey] }}</div>
  </div>
</template>

<script>
export default {
  name: 'SearchFormSelect',
  props: [
    'categoryKey',
    'categoryOptions',
    'selectedOptions'
  ]
}
</script>
