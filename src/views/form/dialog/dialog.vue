<template>
  <el-card>
    <el-button @click="showDialog = true">添加用户</el-button>
    <ql-dialog-form
      title="用户"
      :fields="fields"
      v-model="showDialog"></ql-dialog-form>
  </el-card>
</template>

<script>
export default {
  name: "FormDialog",
  data() {
    return {
      showDialog: false,
      fields: [
        {
          prop: "name",
          label: "姓名",
          rules: [
            {
              required: true,
              message: "请输入姓名"
            }
          ]
        },
        {
          prop: "areaId",
          label: "所在地",
          type: "city",
          rules: [
            {
              required: true,
              message: "请选择所在地"
            }
          ]
        },
        {
          prop: "remark",
          label: "备注",
          nativeType: "textarea"
        }
      ]
    };
  },
  methods: {
    handleOpen() {}
  }
};
</script>
