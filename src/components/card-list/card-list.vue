<template>
  <el-row :gutter="24" class="ql-card-list">
    <el-col
      :key="index"
      :xs="10"
      :sm="8"
      :md="6"
      :lg="4"
      :xl="3"
      v-for="(item, index) in data">
      <el-card class="ql-card-list__item" :style="{height: height}">
        <slot :card="item"></slot>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "QlCardList",
  props: {
    height: {
      type: String,
      default: "200px"
    },
    data: Array
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss">
@import "../../assets/scss/common/var.scss";
@import "../../assets/scss/mixins/mixins.scss";
@include b(card-list) {
  @include e(item) {
    margin-bottom: 16px;
  }
}
</style>
