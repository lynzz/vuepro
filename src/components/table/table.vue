<template>
  <table
    :class="{
      'ql-table--border': border,
      'ql-table--center': center,
      'ql-table--compact': compact,
      'is-gray': gray,
      'is-dark': dark,
      'is-fixed-cell': fixedCell
    }"
    class="ql-table">
    <slot></slot>
  </table>
</template>

<script>
export default {
  name: "QlTable",
  props: {
    border: {
      type: Boolean,
      default: true
    },
    center: Boolean,
    // 背景暗色系
    dark: Boolean,
    gray: Boolean,
    // 固定单元格高度为 40 px
    fixedCell: Boolean,
    compact: Boolean
  },
  data() {
    return {};
  },
  mounted() {}
};
</script>
<style lang="postcss">
$border-gray-color: #c8c8c8;
$background-gray-color: #d3d3d3;
@component-namespace ql {
  @b table {
    border-color: var(--table-border-color);
    & th,
    td {
      padding: 3px 8px;
      min-width: 0;
      box-sizing: border-box;
      @utils-ellipsis;
      vertical-align: middle;
      position: relative;
    }
    & th {
      padding: 6px 8px;
    }

    @m border {
      & th,
      td {
        border: 1px solid var(--table-border-color);
      }

      @when gray {
        & th,
        td {
          border-color: $border-gray-color;
        }
      }

      @when dark {
        & th,
        td {
          color: white;
          border-color: rgba(255, 255, 255, 0.3);
          background-color: rgba(100, 100, 100, 0.8);
          border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        }
      }
    }
    @m center {
      & th,
      td {
        text-align: center;
      }
    }
    @m compact {
      & td {
        padding: 0;
      }
    }
    @when gray {
      border-color: $border-gray-color;
      & th,
      td {
        color: #333;
      }

      & th {
        background: $background-gray-color;
      }
    }
    @when fixed-cell {
      & th,
      td {
        padding: 0;
        height: 40px;
        .cell {
          padding-left: 8px;
          padding-right: 8px;
          @utils-ellipsis;
          color: var(--table-td-text);
          word-break: initial;
        }
      }
      & th .cell {
        color: #ccc;
      }
    }
    & td {
      background: var(--table-td-background);
      color: var(--table-td-text);
    }
    & th {
      background: var(--table-header-background);
      color: var(--table-header-text);
    }
  }
}
</style>
