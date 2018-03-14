import TableColumn from "./table-column";
export default {
  name: "QlTableHead",
  components: {
    TableColumn
  },
  props: {
    columns: {
      type: Array,
      required: true
    }
  },
  render() {
    let parentCells = [];
    let childCells = [];
    this.columns.forEach(item => {
      if (item.children) {
        item.colspan = item.children.length;
        item.rowspan = 1;
        item.children.forEach(subItem => {
          childCells.push(subItem);
        });
      } else {
        item.colspan = 1;
        item.rowspan = 2;
      }
      parentCells.push(item);
    });
    let scrollY = this.$parent.height;
    return (
      <table class="el-table__header">
        <table-column columns={this.columns} />
        <thead>
          <tr>
            {parentCells.map(item => (
              <th rowspan={item.rowspan} colspan={item.colspan}>
                <div class="cell">{item.title}</div>
              </th>
            ))}
            <th class="gutter" style={{ width: scrollY ? "15px" : "0" }} />
          </tr>
          <tr>
            {childCells.map(item => (
              <th>
                <div class="cell">{item.title}</div>
              </th>
            ))}
            <th class="gutter" style={{ width: scrollY ? "15px" : "0" }} />
          </tr>
        </thead>
      </table>
    );
  }
};
