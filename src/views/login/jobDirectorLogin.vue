<template>
  <v-card class="mx-auto">
    <v-card class="mx-auto ">
      <v-card-title class="title">
        Welcome to the JMR system!
      </v-card-title>
      <v-card-text class="text">
        <form>
          <v-text-field
            color="teal"
            v-model="jd_telephone"
            label="请输入您的电话号"
            required
          ></v-text-field>
          <v-text-field
            color="teal"
            v-model="jd_password"
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
</template>

<script>
import { LOGIN } from "@/store/types.js";

import { mapState } from "vuex";

export default {
  data: () => ({
    jd_telephone: null,
    jd_password: null
  }),

  methods: {
    login() {
      this.$store.dispatch(LOGIN, {
        userPhoneNumber: this.jd_telephone,
        userPassword: this.jd_password,
        jobDirector: true
      });
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
