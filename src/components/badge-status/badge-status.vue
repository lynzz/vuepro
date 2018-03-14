<template>
  <span class="ql-badge-status">
    <span class="ql-badge-status__dot" :class="[currCls]"></span>
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: "QlBadgeStatus",
  props: {
    // 类型 primary/info/danger/warning
    type: String
  },
  computed: {
    currCls() {
      if (this.type) {
        return `is-${this.type}`;
      }
      return "";
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss">
@import "../../assets/scss/common/var.scss";
@import "../../assets/scss/mixins/mixins.scss";
@include b(badge-status) {
  vertical-align: baseline;

  @include e(dot) {
    width: 6px;
    height: 6px;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    border-radius: 50%;
    top: -1px;
    background-color: #d9d9d9;
    @include when(primary) {
      background-color: $--color-primary;
    }
    @include when(info) {
      background-color: $--color-info;
    }
    @include when(success) {
      background-color: $--color-success;
    }
    @include when(danger) {
      background-color: $--color-danger;
    }
  }
  @include e(text) {
    margin-left: 8px;
  }
}
</style>
