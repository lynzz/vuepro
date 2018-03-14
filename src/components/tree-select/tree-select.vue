<template>
  <div class="ql-tree-select" v-clickoutside="handleClickout">
    <el-input
      v-model="filterText"
      @focus="showTree = true"
      @click="showTree = !showTree"
      :style="{width: width ? width + 'px' : ''}"
      :icon="showTree ? 'arrow-up' : 'arrow-down'"
      :placeholder="placeholder">
    </el-input>
    <transition name="el-zoom-in-top">
      <el-scrollbar v-show="showTree" class="ql-tree-select__scroll" :style="{width: width ? width + 'px' : ''}">
        <el-tree
          :show-checkbox="showCheckbox"
          :node-key="nodeKey"
          ref="tree"
          default-expand-all
          :filter-node-method="filterNode"
          :props="defaultProps"
          :expand-on-click-node="false"
          @check-change="handleNodeCheck"
          @node-click="handleNodeClick"
          :data="data">
        </el-tree>
      </el-scrollbar>
    </transition>
  </div>
</template>

<script>
export default {
  name: "QlTreeSelect",
  componentName: "ql-tree-select",
  model: {
    prop: "currentValue",
    event: "value-change"
  },
  props: {
    width: [String, Number],
    showCheckbox: Boolean,
    placeholder: {
      type: String,
      default: "请选择"
    },
    nodeKey: String,
    defaultProps: {
      type: Object,
      default() {
        return {
          children: "children",
          label: "name"
        };
      }
    },
    currentValue: [Object, Array],
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      showTree: false,
      filterText: ""
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    currentValue(val) {
      this.$emit("value-change", val);
      if (val && val.name) {
        this.filterText = val.name;
      }
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return (
        data.name.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !== -1
      );
    },
    handleNodeClick(data) {
      if (data.zkxmId) {
        this.filterText = data.name;
        this.$emit("value-change", data);
        this.showTree = false;
      }
    },
    handleNodeCheck() {
      let checkedNodes = this.$refs.tree.getCheckedNodes();
      this.$emit("value-change", checkedNodes);
    },
    handleClickout() {
      this.showTree = false;
    }
  }
};
</script>
<style lang="postcss">
@component-namespace ql {
  @b tree-select {
    position: relative;

    @e scroll {
      position: absolute;
      top: 40px;
      min-width: 200px;
      min-height: 36px;
      background: #fff;
      z-index: 1000;
      border: 1px solid var(--border-color-base);
      & .el-scrollbar__view {
        max-height: 300px;
      }
      & .el-tree {
        border: 0;
      }
    }
  }
}
</style>
