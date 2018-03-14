<template>
  <div class="el-table el-table--fit el-table--border ql-table-fixed" :style="{width: tableWidth ? tableWidth + 'px' : ''}">
    <div class="el-table__header-wrapper" style="position: relative;" ref="headerWrapper">
      <table-head :columns="columns" :style="{width: headWidth ? headWidth + 'px' : ''}"></table-head>
      <slot name="header"></slot>
    </div>
    <div ref="bodyWrapper" class="el-table__body-wrapper" :style="{height: bodyHeight ? bodyHeight + 'px' : ''}">
      <table class="el-table__body" :style="{width: bodyWidth ? bodyWidth + 'px' : ''}">
        <table-column :columns="columns" :is-body="true"></table-column>
        <tbody>
          <slot></slot>
        </tbody>
      </table>
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
import throttle from "throttle-debounce/throttle";
import emitter from "@/mixins/emitter";
import TableHead from "./table-head";
import TableColumn from "./table-column";
import { mousewheel } from "./util";
const SCROLL_WIDTH = 15;
export default {
  name: "QlTableFixed",
  mixins: [emitter],
  components: {
    TableHead,
    TableColumn
  },
  props: {
    height: [Number, String],
    width: [Number, String],
    rowHeight: Number,
    columns: {
      type: Array,
      required: true
    }
  },

  computed: {
    bodyWrapper() {
      return this.$refs.bodyWrapper;
    },
    headerWrapper() {
      return this.$refs.headerWrapper;
    },
    bodyHeight() {
      if (this.height) {
        return this.height - this.rowHeight * 2;
      }
      return 0;
    },
    headWidth() {
      let width = 0;
      this.columns.forEach(item => {
        if (item.width) {
          width += item.width;
        }
        if (item.children) {
          item.children.forEach(subItem => {
            if (subItem.width) {
              width += subItem.width;
            }
          });
        }
      });
      console.log("table width", width);
      return width || 0;
    },
    tableWidth() {
      let width = 0;
      if (this.headWidth) {
        width = this.headWidth + (this.height ? 17 : 2);
        if (this.width && width >= this.width) {
          width = this.width;
        }
      }
      return width;
    },
    bodyWidth() {
      if (this.headWidth) {
        return this.headWidth - (this.height ? SCROLL_WIDTH : 0);
      }
      return 0;
    }
  },

  watch: {
    tableWidth(val) {
      val && this.$emit("change-width", val - SCROLL_WIDTH);
    }
  },

  mounted() {
    this.bindEvents();
    if (this.tableWidth) {
      this.$emit("change-width", this.tableWidth - SCROLL_WIDTH);
    }
  },
  methods: {
    scrollToBottom(val) {
      console.log("first scroll top", val);
      this.$refs.bodyWrapper.scrollTop = val;
    },
    bindEvents() {
      const self = this;
      const { headerWrapper, bodyWrapper } = this.$refs;
      if (bodyWrapper) {
        bodyWrapper.addEventListener("scroll", function() {
          if (headerWrapper) headerWrapper.scrollLeft = this.scrollLeft;
          self.dispatch("ViewQcd", "ql.tableFixed.scroll", [
            this.scrollTop,
            this.scrollLeft
          ]);
        });
        mousewheel(
          bodyWrapper,
          throttle(1000, () => {
            this.dispatch("ViewQcd", "ql.tableFixed.mousewheel");
          }),
          true
        );
      }

      if (headerWrapper) {
        mousewheel(
          headerWrapper,
          throttle(16, event => {
            const deltaX = event.deltaX;
            if (deltaX > 0) {
              this.bodyWrapper.scrollLeft += 10;
            } else {
              this.bodyWrapper.scrollLeft -= 10;
            }
          })
        );
      }
    }
  }
};
</script>
<style lang="postcss">
@import "../../assets/css/common/var.css";
@component-namespace ql {
  @b table-fixed {
    & td {
      border-bottom: 1px solid var(--table-border-color);
      border-color: var(--table-border-color);
      text-align: center;
      background: var(--table-td-background);
      color: var(--table-td-text);
      & .cell {
        padding-left: 8px;
        padding-right: 8px;
        color: var(--table-td-text);
        word-break: initial;
        background: transparent;
        & .qicon-bianji2 {
          color: var(--color-info);
          font-size: 18px;
          cursor: pointer;
          margin: 0 4px;
        }
        & .qicon-shanchu1 {
          color: var(--color-danger);
          margin: 0 4px;
          cursor: pointer;
          font-size: 18px;
        }
      }
    }
    & th {
      background: var(--table-header-background);
      text-align: center;
      color: var(--table-header-text);
      border-color: var(--table-border-color);
      & .cell {
        color: var(--table-header-text);
        background: var(--table-header-background);
      }
    }
    & .level-judge {
      text-align: left;
    }
    & .td-act {
      text-align: left;
      background: #33597f;
      color: white;
      & .cell {
        display: flex;
        & .el-tag--primary {
          background: var(--color-primary);
          color: white;
          margin-right: 5px;
        }
        & .info {
          color: white;
        }
      }
      & .info {
        @utils-ellipsis;
        height: 24px;
      }
    }
    & .td-edit {
      text-align: left;
      padding: 5px 2px;
      .el-form-item {
        margin-bottom: 0;
        vertical-align: middle;
        label {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
