<template>
  <v-card class="mx-auto">
    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
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
            <v-card-text class="text">
              <form>
                <v-text-field
                  color="teal"
                  v-model="s_telephone"
                  label="请输入您的电话号"
                  required
                ></v-text-field>
                <v-text-field
                  color="teal"
                  v-model="s_password"
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
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card class="mx-auto ">
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      required
                      v-model="s_name"
                      label="姓名*"
                      color="teal"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      color="teal"
                      :items="sexItems"
                      label="性别*"
                      v-model="s_sex"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="s_birthday"
                      label="出生年月*"
                      color="teal"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="4" md="4">
                    <v-text-field
                      v-model="s_college"
                      label="毕业院校*"
                      color="teal"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4" md="4">
                    <v-select
                      :items="schoolRankItems"
                      color="teal"
                      label="院校等级*"
                      v-model="s_c_level"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="4" md="4">
                    <v-select
                      :items="historyItems"
                      color="teal"
                      v-model="s_e_history"
                      label="学历*"
                    ></v-select>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-autocomplete
                      color="teal"
                      :items="professionsMClass"
                      label="专业大类*"
                      v-model="s_profession.p_m_class"
                      @change="getprofessionMClass"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-autocomplete
                      color="teal"
                      :items="professionsSClass"
                      label="专业小类*"
                      v-model="s_profession.p_s_class"
                    ></v-autocomplete>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    英语等级*：
                    <v-radio-group v-model="CET" row>
                      <v-radio
                        color="teal"
                        label="英语四级"
                        value="CET4"
                      ></v-radio>
                      <v-radio
                        color="teal"
                        label="英语六级"
                        value="CET6"
                      ></v-radio>
                      <v-radio color="teal" label="无" value="NONE"></v-radio>
                    </v-radio-group>
                    英语等级*:
                    <v-radio-group v-model="JN" row>
                      <v-radio
                        color="teal"
                        label="日语二级"
                        value="JN2"
                      ></v-radio>
                      <v-radio
                        color="teal"
                        label="日语三级"
                        value="JN3"
                      ></v-radio>
                      <v-radio color="teal" label="无" value="NONE"></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="s_id_card"
                      label="身份证号码"
                      hint="非必填"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="s_n_province"
                      label="籍贯-省份*"
                      color="teal"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="s_n_city"
                      label="籍贯-地级市*"
                      color="teal"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      :items="cityItems"
                      color="teal"
                      label="就业意向地*"
                      v-model="s_e_city"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      :items="rangeItems"
                      color="teal"
                      v-model="s_s_range"
                      label="期望薪资*"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-autocomplete
                      color="teal"
                      :items="positions"
                      label="期望岗位*"
                      v-model="s_e_position.p_name"
                    ></v-autocomplete>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="s_telephone"
                      label="电话*"
                      color="teal"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="s_email"
                      color="teal"
                      label="邮箱*"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="s_g_time"
                      label="毕业时间*"
                      color="teal"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="s_s_attachment"
                      label="成绩单附件地址"
                      hint="非必填"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      :items="isWork"
                      color="teal"
                      v-model="s_if_work"
                      label="是否就业*"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" v-if="s_if_work == '已就业'">
                    <v-text-field
                      v-model="s_w_city"
                      label="就业地级市"
                      hint="已就业者必填"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" v-if="s_if_work == '已就业'">
                    <v-text-field
                      v-model="s_company"
                      label="就业企业"
                      hint="已就业者必填"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      type="password"
                      v-model="s_password"
                      label="密码*"
                      color="teal"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      type="password"
                      v-model="s_password_copy"
                      color="teal"
                      label="重复输入密码*"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                @click.stop="dialogR = true"
                class="mr-4"
                @click="registerStudent"
              >
                注册
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-spacer></v-spacer>

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

                <v-btn color="green darken-1" text @click="registered()">
                  OK
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { LOGIN } from "@/store/types.js";
import { GET_REGISTER_INDEX } from "@/store/types.js";
import { GET_REGISTER_INDEX_SCLASS } from "@/store/types.js";
import { REGISTER_STUDENT } from "@/store/types.js";
import { UPDATE_USER } from "@/store/types.js";
import { GET_EXCEPTION } from "@/store/types.js";

import { mapState } from "vuex";

export default {
  data: () => ({
    dialogR: false,
    tab: null,

    s_name: null,
    s_password: null,
    s_password_copy: null,
    s_id_card: null,
    s_sex: null,
    s_birthday: null,
    s_college: null,
    s_c_level: null,
    s_profession: {
      p_m_class: null,
      p_s_class: null
    },
    s_e_history: null,
    s_n_province: null,
    s_n_city: null,
    s_f_language: null,
    s_s_range: null,
    s_e_position: {
      p_name: null
    },
    s_e_city: null,
    s_g_time: null,
    s_telephone: null,
    s_email: null,
    s_s_attachment: null,
    s_if_work: "否",
    s_w_city: null,
    s_company: null,

    CET: "NONE",
    JN: "NONE",
    schoolRankItems: ["_985", "_211", "一批本科", "二批本科", "专科", "高职"],
    historyItems: ["博士", "硕士", "本科", "专科"],
    languageItems: ["CET6", "CET4", "JN3", "JN2", "NONE"],
    sexItems: ["男", "女"],
    rangeItems: ["四k以下", "四至六k", "六至八k", "八至十k", "十K以上"],
    cityItems: ["烟台", "其他"],
    isWork: ["已就业", "未就业"]
  }),

  created() {
    this.$store.dispatch(GET_REGISTER_INDEX);
  },
  computed: {
    formatDate() {
      return date => date.replace("T", " ").substring(0, 16);
    },
    ...mapState(["user", "positions", "professionsMClass", "professionsSClass"])
  },

  methods: {
    login() {
      console.log("login");
      this.$store.dispatch(LOGIN, {
        userPhoneNumber: this.s_telephone,
        userPassword: this.s_password,
        student: true
      });
      if (this.isLogin != null) {
        this.dialog = false;
      }
    },
    jFLanguage() {
      var jFLanguage = 0;
      switch (this.CET) {
        case "CET4":
          jFLanguage += 1;
          break;
        case "CET6":
          jFLanguage += 2;
          break;
        case "NONE":
          jFLanguage += 0;
          break;
      }
      switch (this.JN) {
        case "JN2":
          jFLanguage += 4;
          break;
        case "JN3":
          jFLanguage += 8;
          break;
        case "NONE":
          jFLanguage += 0;
          break;
      }
      if (jFLanguage == 0) jFLanguage = 16;
      console.log(jFLanguage);
      return jFLanguage;
    },
    registerStudent() {
      var flag = true;
      if (this.s_password != this.s_password_copy) {
        flag = false;
      }
      if (flag) {
        this.$store.dispatch(REGISTER_STUDENT, {
          s_name: this.s_name,
          s_password: this.s_password,
          s_id_card: this.s_id_card,
          s_sex: this.s_sex,
          s_birthday: this.s_birthday,
          s_college: this.s_college,
          s_c_level: this.s_c_level,
          s_profession: {
            p_m_class: this.s_profession.p_m_class,
            p_s_class: this.s_profession.p_s_class
          },
          s_e_history: this.s_e_history,
          s_n_province: this.s_n_province,
          s_n_city: this.s_n_city,
          s_f_language: this.jFLanguage(),
          s_s_range: this.s_s_range,
          s_e_position: {
            p_name: this.s_e_position.p_name
          },
          s_e_city: this.s_e_city,
          s_g_time: this.s_g_time,
          s_telephone: this.s_telephone,
          s_email: this.s_email,
          s_s_attachment: this.s_s_attachment,
          s_if_work: this.s_if_work,
          s_w_city: this.s_w_city,
          s_company: this.s_company
        });
      } else {
        this.$store.commit(GET_EXCEPTION, {
          message: "两次输入的密码不一致"
        });
      }
    },
    registered() {
      this.tab = 0;
      this.dialogR = false;
      this.$store.dispatch(UPDATE_USER, {
        user: null
      });
    },
    getprofessionMClass: function() {
      console.log("您选择了", this.s_profession.p_m_class);
      this.$store.dispatch(GET_REGISTER_INDEX_SCLASS, {
        p_id: null,
        p_m_class: this.s_profession.p_m_class,
        p_s_class: "无"
      });
    }
  }
};
</script>

<style>
.basil--text {
  color: #356859 !important;
}
</style>
