<template>
  <th :colspan="colspan" :rowspan="rowspan">
    <div class="cell"><slot></slot></div>
  </th>
</template>

<script>
export default {
  name: "QlTableTh",
  props: {
    colspan: {
      type: [String, Number],
      default: ""
    },
    rowspan: {
      type: [String, Number],
      default: ""
    }
  }
};
</script>
