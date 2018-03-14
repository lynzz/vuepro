<template>
  <el-dialog :title="title" width="500px" :visible="showDialog" :before-close="handleClose">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="新密码" prop="newPwd">
        <el-input type="password" v-model="form.newPwd"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirmPwd">
        <el-input type="password" v-model="form.confirmPwd"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="showDialog = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import Dialog from "@/mixins/dialog";
import md5 from "md5";
export default {
  name: "QlDialogResetPwd",
  mixins: [Dialog],
  props: {
    id: [String, Number],
    idKey: {
      type: String,
      default: "labId"
    },
    reset: {
      type: Boolean,
      default: true
    },
    onReset: Function
  },
  computed: {
    title() {
      return this.reset ? "重置密码" : "修改密码";
    },
    successMsg() {
      return this.reset ? "密码已重置" : "密码已更新";
    }
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.form.newPwd !== "") {
          this.$refs.form.validateField("confirmPwd");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.newPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        newPwd: "",
        confirmPwd: ""
      },
      rules: {
        newPwd: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        confirmPwd: [
          {
            validator: validatePass2,
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    showDialog(val) {
      if (!val) {
        this.$refs.form.resetFields();
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let form = { ...this.form };

          delete form.confirmPwd;
          form[this.idKey] = this.id;
          form.newPwd = md5(`${this.id}${form.newPwd}`);
          this.onReset(form).then(() => {
            this.$message.success(this.successMsg);
            this.$emit("success");
            this.showDialog = false;
          });
        }
      });
    }
  }
};
</script>
