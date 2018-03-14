<template>
  <el-card>
    <ql-form :fields="fields" :on-add="onAdd"></ql-form>
  </el-card>
</template>

<script>
export default {
  name: "FormBase",
  data() {
    return {
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
    onAdd() {
      return new Promise(resolve => {
        resolve({
          data: true
        });
      });
    }
  }
};
</script>
