<template>
  <el-dialog :title="currTitle" :visible="showDialog" :before-close="handleClose">
    <ql-form
      v-if="showDialog"
      :title="title"
      :id="id"
      :id-key="idKey"
      :on-add="onAdd"
      :on-update="onUpdate"
      :before-submit="beforeSubmit"
      :fields="fields"
      ref="form">
    </ql-form>
    <div slot="footer">
      <slot>
        <el-button @click="showDialog = false">{{cancelText}}</el-button>
        <el-button type="primary" @click="handleSave">{{confirmText}}</el-button>
      </slot>
    </div>
  </el-dialog>
</template>

<script>
import emitter from "@/mixins/emitter";
import Dialog from "@/mixins/dialog";
import QlForm from "./form";
export default {
  name: "QlDialogForm",
  componentName: "QlDialogForm",
  mixins: [Dialog, emitter],
  components: {
    QlForm
  },
  props: {
    title: String,
    id: [String, Number],
    idKey: String,
    onAdd: Function,
    onUpdate: Function,
    onGet: Function,
    afterGet: Function,
    beforeSubmit: Function,
    confirmText: {
      type: String,
      default: "保存"
    },
    cancelText: {
      type: String,
      default: "关闭"
    },
    fields: Array
  },
  computed: {
    currTitle() {
      return this.id ? `编辑${this.title}` : `添加${this.title}`;
    }
  },
  data() {
    return {};
  },
  watch: {
    showDialog(val) {
      if (val && this.id) {
        this.onGet(this.id).then(data => {
          if (typeof this.afterGet === "function") {
            data = this.afterGet(data);
          }
          this.broadcast("QlForm", "ql.form.view", [data]);
        });
      }
    }
  },
  created() {
    this.$on("ql.form.update", data => {
      this.showDialog = false;
      this.$emit("update", data);
    });
    this.$on("ql.form.add", data => {
      this.showDialog = false;
      this.$emit("add", data);
    });
  },
  methods: {
    handleSave() {
      this.$refs.form.submit();
    }
  }
};
</script>
