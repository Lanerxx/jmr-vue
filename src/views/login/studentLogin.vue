<template>
  <v-container class="grey lighten-5">
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
                        v-model="number"
                        label="请输入您的电话号"
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
                        v-model="name"
                        label="*请输入姓名"
                        required
                        @input="$v.name.$touch()"
                        @blur="$v.name.$touch()"
                      ></v-text-field>
                      <v-text-field
                        v-model="phoneNumber"
                        label="*请输入密码"
                        required
                        @input="$v.phoneNumber.$touch()"
                        @blur="$v.phoneNumber.$touch()"
                      ></v-text-field>
                      <v-text-field
                        v-model="phoneNumber"
                        label="*请再次输入密码"
                        required
                        @input="$v.phoneNumber.$touch()"
                        @blur="$v.phoneNumber.$touch()"
                      ></v-text-field>
                      <v-text-field
                        v-model="phoneNumber"
                        label="请输入身份证号"
                        @input="$v.phoneNumber.$touch()"
                        @blur="$v.phoneNumber.$touch()"
                      ></v-text-field>
                      <v-text-field
                        v-model="phoneNumber"
                        label="*请输入性别"
                        required
                        @input="$v.phoneNumber.$touch()"
                        @blur="$v.phoneNumber.$touch()"
                      ></v-text-field>
                      <v-text-field
                        v-model="phoneNumber"
                        label="*请输入出生年月"
                        required
                        @input="$v.phoneNumber.$touch()"
                        @blur="$v.phoneNumber.$touch()"
                      ></v-text-field>
                      <v-text-field
                        v-model="phoneNumber"
                        label="*请输入毕业院校"
                        required
                        @input="$v.phoneNumber.$touch()"
                        @blur="$v.phoneNumber.$touch()"
                      ></v-text-field>
                      <v-text-field
                        v-model="phoneNumber"
                        label="*请输入毕业院校层次"
                        required
                        @input="$v.phoneNumber.$touch()"
                        @blur="$v.phoneNumber.$touch()"
                      ></v-text-field>
                      <v-text-field
                        v-model="phoneNumber"
                        label="*请输入专业"
                        required
                        @input="$v.phoneNumber.$touch()"
                        @blur="$v.phoneNumber.$touch()"
                      ></v-text-field>
                      <v-text-field
                        v-model="phoneNumber"
                        label="*请输入学历"
                        required
                        @input="$v.phoneNumber.$touch()"
                        @blur="$v.phoneNumber.$touch()"
                      ></v-text-field>
                      <v-text-field
                        v-model="phoneNumber"
                        label="*请输入籍贯-省份"
                        required
                        @input="$v.phoneNumber.$touch()"
                        @blur="$v.phoneNumber.$touch()"
                      ></v-text-field>
                      <v-text-field
                        v-model="phoneNumber"
                        label="*请输入籍贯-地级市"
                        required
                        @input="$v.phoneNumber.$touch()"
                        @blur="$v.phoneNumber.$touch()"
                      ></v-text-field>
                      <v-text-field
                        v-model="phoneNumber"
                        label="*请输入外语水平"
                        required
                        @input="$v.phoneNumber.$touch()"
                        @blur="$v.phoneNumber.$touch()"
                      ></v-text-field>
                      <v-text-field
                        v-model="phoneNumber"
                        label="*请输入期望薪资"
                        required
                        @input="$v.phoneNumber.$touch()"
                        @blur="$v.phoneNumber.$touch()"
                      ></v-text-field>
                      <v-text-field
                        v-model="phoneNumber"
                        label="*请输入期望岗位"
                        required
                        @input="$v.phoneNumber.$touch()"
                        @blur="$v.phoneNumber.$touch()"
                      ></v-text-field>
                      <v-text-field
                        v-model="phoneNumber"
                        label="*请输入就业意向地"
                        required
                        @input="$v.phoneNumber.$touch()"
                        @blur="$v.phoneNumber.$touch()"
                      ></v-text-field>
                      <v-text-field
                        v-model="phoneNumber"
                        label="*请输入毕业时间"
                        required
                        @input="$v.phoneNumber.$touch()"
                        @blur="$v.phoneNumber.$touch()"
                      ></v-text-field>
                      <v-text-field
                        v-model="phoneNumber"
                        label="*请输入电话"
                        required
                        @input="$v.phoneNumber.$touch()"
                        @blur="$v.phoneNumber.$touch()"
                      ></v-text-field>
                      <v-text-field
                        v-model="phoneNumber"
                        label="*请输入邮箱"
                        required
                        @input="$v.phoneNumber.$touch()"
                        @blur="$v.phoneNumber.$touch()"
                      ></v-text-field>
                      <v-text-field
                        v-model="phoneNumber"
                        label="*请输入成绩附件地址"
                        required
                        @input="$v.phoneNumber.$touch()"
                        @blur="$v.phoneNumber.$touch()"
                      ></v-text-field>
                      <v-text-field
                        v-model="phoneNumber"
                        label="*是否就业"
                        required
                        @input="$v.phoneNumber.$touch()"
                        @blur="$v.phoneNumber.$touch()"
                      ></v-text-field>
                      <v-text-field
                        v-model="phoneNumber"
                        label="就业地-地级市"
                        required
                        @input="$v.phoneNumber.$touch()"
                        @blur="$v.phoneNumber.$touch()"
                      ></v-text-field>
                      <v-text-field
                        v-model="phoneNumber"
                        label="就业企业"
                        required
                        @input="$v.phoneNumber.$touch()"
                        @blur="$v.phoneNumber.$touch()"
                      ></v-text-field>
                      <v-spacer></v-spacer>
                      <v-btn
                        @click.stop="dialogR = true"
                        class="mr-4"
                        @click="registerEnterprise"
                      >
                        注册
                      </v-btn>
                      <v-dialog v-model="dialogR" max-width="290" v-if="user">
                        <v-card>
                          <v-card-title class="headline" v-if="user">
                            恭喜您，注册成功～
                          </v-card-title>

                          <v-card-text v-if="user">
                            您的账号：{{ user.user.number }}
                          </v-card-text>

                          <v-card-text v-if="user">
                            您的初始密码：{{ user.user.number }}
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
