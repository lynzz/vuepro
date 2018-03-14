<template>
  <i :class="[cls]" @click="handleClick"></i>
</template>

<script>
export default {
  name: "QlIcon",
  props: {
    name: String,
    family: {
      type: String,
      default: "ant"
    }
  },
  computed: {
    cls() {
      if (this.name) {
        return `${this.family}icon icon-${this.name}`;
      }
      return "";
    }
  },
  methods: {
    handleClick(e) {
      this.$emit("click", e);
    }
  }
};
</script>
