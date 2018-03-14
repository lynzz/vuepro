export default {
  methods: {
    confirmDelete(msg) {
      return new Promise(resolve => {
        this.$confirm(msg, "删除提示", {
          confirmButtonText: "删除",
          confirmButtonClass: "el-button--danger",
          cancelButtonText: "取消",
          type: "error"
        }).then(() => {
          resolve(true);
        });
      });
    }
  }
};
