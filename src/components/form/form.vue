<template>
  <el-form :inline="inline" ref="form" :model="form" :rules="rules" :label-width="labelWidth">
    <el-form-item
      :key="item.prop"
      :prop="item.prop"
      :label="item.label"
      :ref="item.prop"
      v-for="item in fields">
      <template v-if="item.type === 'text'">
        {{item.formatter ? item.formatter(form[item.prop]) : form[item.prop]}}
      </template>
      <el-input
        v-else-if="item.type === 'input'"
        :type="item.nativeType"
        :placeholder="item.placeholder"
        v-model="form[item.prop]">
      </el-input>
      <el-date-picker
        v-model="form[item.prop]"
        :type="item.nativeType || 'date'"
        :editable="false"
        :clearable="false"
        :id="item.prop"
        v-else-if="item.type === 'date'">
      </el-date-picker>
      <el-switch
        v-model="form[item.prop]"
        :active-text="item.attrs.activeText"
        :inactive-text="item.attrs.inactiveText"
        :active-value="item.attrs.activeValue"
        :inactive-value="item.attrs.inactiveValue"
        v-else-if="item.type === 'switch'">
      </el-switch>
      <ql-select-city
        v-model="form[item.prop]"
        :default-value="item.value"
        only-area
        v-else-if="item.type === 'city'">
      </ql-select-city>
      <el-input
        v-else
        :type="item.nativeType || 'text'"
        :placeholder="item.attrs ? item.attrs.placeholder || '' : ''"
        v-model="form[item.prop]">
      </el-input>
    </el-form-item>
    <el-form-item v-if="hasSubmit">
      <el-button type="primary" @click="handleSubmit">提交</el-button>
      <el-button @click="handleReset" v-if="hasReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import emitter from "@/mixins/emitter";
export default {
  name: "QlForm",
  componentName: "QlForm",
  mixins: [emitter],
  props: {
    // 表单字段 [{prop, label, type, rules:[{required, message}]]
    labelWidth: {
      type: String,
      default: "100px"
    },
    hasSubmit: {
      default: false
    },
    hasReset: {
      default: false
    },
    inline: Boolean,
    id: [String, Number],
    title: String,
    beforeSubmit: Function,
    idKey: {
      type: String,
      default: "id"
    },
    onAdd: Function,
    onUpdate: Function,
    fields: Array
  },
  data() {
    const fields = this.fields;
    const form = {};
    const rules = {};
    fields.forEach(item => {
      form[item.prop] = item.value !== undefined ? item.value : "";

      if (item.rules) {
        rules[item.prop] = item.rules;
      }
    });
    return {
      form,
      rules
    };
  },

  computed: {
    cityProp() {
      let item = this.fields.find(item => item.type === "city");
      return item ? item.prop : null;
    }
  },

  created() {
    this.$on("ql.form.view", data => {
      this.form = Object.assign({}, this.form, data);
    });
  },

  mounted() {
    // 修复城市下拉 form item 首次不验证
    this.cityProp &&
      this.$watch(`form.${this.cityProp}`, val => {
        this.$refs[this.cityProp][0].$emit("el.form.change", val);
      });
  },

  methods: {
    handleSubmit() {
      this.submit();
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let params = { ...this.form };
          if (typeof this.beforeSubmit === "function") {
            params = this.beforeSubmit(params);
          }
          if (this.id) {
            params[this.idKey] = this.id;
            this.onUpdate(params).then(data => {
              this.$message.success(`${this.title}已更新`);
              this.dispatch("QlDialogForm", "ql.form.update", [data]);
              this.$emit("update", data);
            });
          } else {
            this.onAdd(params).then(data => {
              this.$message.success(`${this.title}已添加`);
              this.dispatch("QlDialogForm", "ql.form.add", [data]);
              this.$emit("add", data);
            });
          }
        }
      });
    },
    handleReset() {
      this.$refs.form.resetFields();
    }
  }
};
</script>
