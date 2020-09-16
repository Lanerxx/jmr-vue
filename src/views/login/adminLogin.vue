<template>
  <v-card class="mx-auto">
    <v-card flat>
      <v-card class="mx-auto ">
        <v-card-title class="title">
          Welcome to the JMR system!
        </v-card-title>
        <v-card-text class="text">
          <form>
            <v-text-field
              v-model="userName"
              label="请输入您的用户名"
              required
            ></v-text-field>
            <v-text-field
              v-model="userPassword"
              label="请输入您的密码"
              required
              type="password"
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn class="mr-4" @click="login" to="/help">
              登陆
            </v-btn>
          </form>
        </v-card-text>
      </v-card>
    </v-card>
  </v-card>
</template>

<script>
import { LOGIN } from "@/store/types.js";

import { mapState } from "vuex";

export default {
  data: () => ({
    dialogR: false,
    tab: null,
    userName: null,
    userPassword: null,
    code: null,
    description: null,
    contact: null,
    email: null
  }),

  methods: {
    login() {
      this.$store.dispatch(LOGIN, {
        userName: this.userName,
        userPassword: this.userPassword,
        admin: true
      });
      if (this.isLogin != null) {
        this.dialog = false;
      }
    }
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>

<style>
.basil--text {
  color: #356859 !important;
}
</style>
