<template>
  <v-container class="grey lighten-5">
    {{ this.tab }}
    <v-row>
      <v-col>
        <v-card class="mx-auto">
          <v-tabs
            v-model="tab"
            background-color="transparent"
            color="basil"
            grow
          >
            <v-tab>
              登陆
            </v-tab>
            <v-tab>
              注册
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-card flat>
                <v-card class="mx-auto ">
                  <v-card-title class="title">
                    Welcome to the JMR system!
                  </v-card-title>
                  <v-card-text class="text">
                    <form>
                      <v-text-field
                        color="teal"
                        v-model="c_telephone"
                        label="请输入您的电话号"
                        required
                        @input="$v.c_telephone.$touch()"
                        @blur="$v.c_telephone.$touch()"
                      ></v-text-field>
                      <v-text-field
                        color="teal"
                        v-model="c_password"
                        label="请输入您的密码"
                        required
                        type="password"
                        @input="$v.c_password.$touch()"
                        @blur="$v.c_password.$touch()"
                      ></v-text-field>
                      <v-spacer></v-spacer>
                      <v-btn class="mr-4" @click="login" to="/help">
                        登陆
                      </v-btn>
                    </form>
                  </v-card-text>
                </v-card>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card class="mx-auto ">
                  <v-card-title class="title">
                    Welcome to the JMR system!
                  </v-card-title>
                  <v-card-text class="text">
                    <form>
                      <v-text-field
                        v-model="c_name"
                        label="*请输入企业名"
                        required
                        @input="$v.c_name.$touch()"
                        @blur="$v.c_name.$touch()"
                      ></v-text-field>
                      <v-text-field
                        v-model="c_password"
                        label="*请输入密码"
                        required
                        type="password"
                        @input="$v.c_password.$touch()"
                        @blur="$v.c_password.$touch()"
                      ></v-text-field>
                      <v-text-field
                        v-model="c_password_copy"
                        type="password"
                        label="*请再次输入密码"
                        required
                        @input="$v.c_password_copy.$touch()"
                        @blur="$v.c_password_copy.$touch()"
                      ></v-text-field>
                      <v-text-field
                        v-model="c_s_code"
                        label="*请输入企业统一社会信用代码"
                        required
                        @input="$v.c_s_code.$touch()"
                        @blur="$v.c_s_code.$touch()"
                      ></v-text-field>
                      <v-text-field
                        v-model="c_description"
                        label="*请输入企业简介"
                        required
                        @input="$v.c_description.$touch()"
                        @blur="$v.c_description.$touch()"
                      ></v-text-field>
                      <v-text-field
                        v-model="c_contact"
                        label="*请输入企业联系人"
                        required
                        @input="$v.c_contact.$touch()"
                        @blur="$v.c_contact.$touch()"
                      ></v-text-field>
                      <v-text-field
                        v-model="c_telephone"
                        label="*请输入企业联系电话"
                        required
                        @input="$v.c_telephone.$touch()"
                        @blur="$v.c_telephone.$touch()"
                      ></v-text-field>
                      <v-text-field
                        v-model="c_email"
                        label="*请输入企业邮箱"
                        required
                        @input="$v.c_email.$touch()"
                        @blur="$v.c_email.$touch()"
                      ></v-text-field>
                      <v-spacer></v-spacer>
                      <v-btn
                        @click.stop="dialogR = true"
                        class="mr-4"
                        @click="registerCompany"
                      >
                        注册
                      </v-btn>
                      <v-dialog v-model="dialogR" max-width="290" v-if="user">
                        <v-card>
                          <v-card-title class="headline" v-if="user">
                            恭喜您，注册成功！
                          </v-card-title>
                          <v-card-text v-if="user">
                            您可以使用手机号和密码登陆。
                          </v-card-text>

                          <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn
                              color="green darken-1"
                              text
                              @click="registered()"
                            >
                              OK
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </form>
                  </v-card-text>
                </v-card>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { LOGIN } from "@/store/types.js";
import { REGISTER_COMPANY } from "@/store/types.js";
import { GET_EXCEPTION } from "@/store/types.js";
import { UPDATE_USER } from "@/store/types.js";

import { mapState } from "vuex";

export default {
  data: () => ({
    dialogR: false,
    tab: null,
    c_name: null,
    c_password: null,
    c_password_copy: null,
    c_s_code: null,
    c_description: null,
    c_contact: null,
    c_telephone: null,
    c_email: null
  }),

  methods: {
    login() {
      this.$store.dispatch(LOGIN, {
        userPhoneNumber: this.c_telephone,
        userPassword: this.c_password,
        company: true
      });
      if (this.isLogin != null) {
        this.dialog = false;
      }
    },
    registerCompany() {
      var flag = true;
      if (
        this.c_name == null ||
        this.c_telephone == null ||
        !this.c_password == null ||
        this.c_password_copy == null ||
        this.c_s_code == null ||
        this.c_description == null ||
        this.c_contact == null ||
        this.c_email == null
      ) {
        flag = false;
      }
      if (flag) {
        this.$store.dispatch(REGISTER_COMPANY, {
          c_name: this.c_name,
          c_password: this.c_password,
          c_s_code: this.c_s_code,
          c_description: this.c_description,
          c_contact: this.c_contact,
          c_telephone: this.c_telephone,
          c_email: this.c_email
        });
      } else {
        this.$store.commit(GET_EXCEPTION, {
          message: "请完善所有信息后再注册！"
        });
      }
    },
    registered() {
      this.tab = 0;
      this.dialogR = false;
      this.$store.dispatch(UPDATE_USER, {
        user: null
      });
    }
  },
  computed: {
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
