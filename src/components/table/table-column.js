export default {
  name: "QlTableColumn",
  props: {
    columns: {
      type: Array,
      required: true
    },
    isBody: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    table() {
      let parent = this.$parent;
      while (parent.$options.name !== "QlTableFixed") {
        parent = parent.$parent;
      }
      return parent;
    }
  },
  render() {
    let gutterCol = "";
    if (this.table.height && !this.isBody) {
      gutterCol = <col name="gutter" width="15" />;
    }
    return (
      <colgroup>
        {this.columns.map(item => [
          item.children ? (
            item.children.map(subCol => <col width={subCol.width} />)
          ) : (
            <col width={item.width} />
          )
        ])}
        {gutterCol}
      </colgroup>
    );
  }
};
