<template>
  <td :colspan="colspan" :rowspan="rowspan">
    <div class="cell"><slot></slot></div>
  </td>
</template>

<script>
export default {
  name: "QlTableTd",
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
