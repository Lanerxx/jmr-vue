<template>
  <v-container class="grey lighten-5">
    <v-row>
      <v-col>
        <v-card class="mx-auto">
          <v-card flat>
            <v-card class="mx-auto ">
              <v-card-title class="title">
                Welcome to the JMR system!
              </v-card-title>
              <v-card-text class="text">
                <form>
                  <v-text-field
                    v-model="number"
                    label="请输入您的用户名"
                    required
                    @input="$v.number.$touch()"
                    @blur="$v.number.$touch()"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    label="请输入您的密码"
                    required
                    type="password"
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { LOGIN } from "@/store/types.js";
import { REGISTER_ENTERPRISE } from "@/store/types.js";
import { REGISTER_STUDENT } from "@/store/types.js";
import { GET_EXCEPTION } from "@/store/types.js";
import { UPDATE_USER } from "@/store/types.js";

import { mapState } from "vuex";

export default {
  data: () => ({
    dialogR: false,
    tab: null,
    number: null,
    password: null,
    name: null,
    phoneNumber: null,
    code: null,
    description: null,
    contact: null,
    email: null
  }),

  methods: {
    login() {
      this.$store.dispatch(LOGIN, {
        number: this.number,
        password: this.password
      });
      if (this.isLogin != null) {
        this.dialog = false;
      }
    },
    registerStudent() {
      var flag = true;
      if (this.name == null || this.phoneNumber == null) {
        flag = false;
      }
      if (flag)
        this.$store.dispatch(REGISTER_STUDENT, {
          name: this.name,
          phoneNumber: this.phoneNumber
        });
    },
    registerEnterprise() {
      var flag = true;
      if (this.name == null || this.phoneNumber == null) {
        flag = false;
      }
      if (flag)
        this.$store.dispatch(REGISTER_ENTERPRISE, {
          name: this.name,
          phoneNumber: this.phoneNumber
        });
      else {
        this.$store.commit(GET_EXCEPTION, {
          message: "请完善所有信息后再注册！"
        });
      }
    },
    registered() {
      this.dialogR = false;
      this.$store.dispatch(UPDATE_USER, {
        user: null
      });
    }
  },
  computed: {
    formatDate() {
      return date => date.replace("T", " ").substring(0, 16);
    },
    ...mapState(["user"])
  }
};
</script>

<style>
/* Helper classes */
.basil {
  background-color: #fffbe6 !important;
}
.basil--text {
  color: #356859 !important;
}
</style>
