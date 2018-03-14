<template>
  <transition name="el-fade-in">
    <div class="ql-frame-viewer" v-show="showDialog">
      <div
        class="ql-frame-viewer__header">
        <!-- <el-button @click="handleClose" type="text" icon="el-icon-arrow-left">返回</el-button> -->
        <h3>{{title}}</h3>
        <i class="el-icon-close ql-frame-viewer__close" @click="handleClose"></i>
      </div>
      <iframe class="ql-frame-viewer__body" :src="url" frameborder="0"></iframe>
    </div>
  </transition>
</template>

<script>
import Dialog from "@/mixins/dialog";
export default {
  name: "QlFrameViewer",
  mixins: [Dialog],
  props: {
    title: String,
    url: String
  },
  data() {
    return {};
  },
  methods: {
    handleClose() {
      this.showDialog = false;
    }
  }
};
</script>
<style lang="scss">
@import "../../assets/scss/mixins/mixins.scss";
@import "../../assets/scss/mixins/utils.scss";
@import "../../assets/scss/common/var.scss";
$top-height: 40px;
@include b(frame-viewer) {
  @include e(header) {
    position: fixed;
    top: 0;
    left: 0;
    height: $top-height;
    line-height: $top-height;
    text-align: center;
    background: #545c64;
    color: #fff;
    width: 100%;
    z-index: 9999;
    @include utils-clearfix();
    .el-button {
      float: left;
      color: #fff;
    }
    h3 {
      color: #fff;
    }
  }
  @include e(close) {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
  @include e(body) {
    position: fixed;
    top: $top-height;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    z-index: 9999;
  }
}
</style>
