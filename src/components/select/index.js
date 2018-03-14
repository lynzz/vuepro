import Select from "./select.vue";
export default {
  name: "QlSelect",
  mixins: [Select],
  props: {
    // 下拉列表请求方法
    fetch: Function,
    // 静态数据
    data: Array
  },
  watch: {
    data(val) {
      if (val) {
        this.transformData(val);
      }
    }
  },
  mounted() {
    if (typeof this.fetch === "function") {
      this.fetch().then(data => {
        this.transformData(data);
      });
    } else if (Array.isArray(this.data)) {
      this.transformData(this.data);
    }
  }
};
