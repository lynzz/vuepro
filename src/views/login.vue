<template>
  <div class="ql-login">
    <el-card class="ql-login-form">
      <div slot="header">
        <i class="anticon icon-login"></i> 欢迎登录
      </div>
      <el-form :model="userForm">
        <el-form-item >
          <el-input prefix-icon="anticon icon-user" v-model="userForm.userCode" placeholder="user code"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input prefix-icon="anticon icon-lock" type="password" v-model="userForm.userPwd" placeholder="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="submited" @click="login" style="width: 100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import md5 from "md5";
import store from "@/utils/store";
export default {
  data() {
    return {
      submited: false,
      userForm: {
        userCode: "",
        userPwd: ""
      }
    };
  },

  mounted() {
    if (store.get("userForm")) {
      this.$router.replace("/");
    }
  },

  methods: {
    login() {
      let { userCode, userPwd } = this.userForm;
      this.submited = true;
      userPwd = md5(userPwd);
      this.$store.dispatch("login", { userCode, userPwd }).then(() => {
        this.submited = false;
        this.$router.push({ path: this.$route.query.redirect || "/" });
      });
    }
  }
};
</script>
<style lang="scss">
.ql-login {
  background: #f0f2f5;
  background-image: url("../assets/img/login-bg.svg");
  width: 100%;
  min-height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  &-form {
    width: 368px;
  }
}
</style>
