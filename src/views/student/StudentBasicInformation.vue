<template>
  <div>
    <v-toolbar flat color="white" class="toolbar" max-height="50">
      <v-spacer></v-spacer>
      ps:因为延迟加载的缘故，首次登陆信息可能未完全加载，点击RESET按钮即可！
      <v-btn class="ma-2" outlined color="teal" @click="reset">
        <v-icon left>mdi-cached</v-icon>
        RESET
      </v-btn>
    </v-toolbar>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-sheet elevation="1" class="pa-12">
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  required
                  v-model="student.s_name"
                  label="姓名*"
                  color="teal"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  color="teal"
                  :items="sexItems"
                  label="性别*"
                  v-model="student.s_sex"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="student.s_birthday"
                  label="出生年月*"
                  color="teal"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="4" md="4">
                <v-text-field
                  v-model="student.s_college"
                  label="毕业院校*"
                  color="teal"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-select
                  :items="schoolRankItems"
                  color="teal"
                  label="院校等级*"
                  v-model="student.s_c_level"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-select
                  :items="historyItems"
                  color="teal"
                  v-model="student.s_e_history"
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
                  v-model="student.s_profession.p_m_class"
                  @change="getprofessionMClass"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-autocomplete
                  color="teal"
                  :items="professionsSClass"
                  label="专业小类*"
                  v-model="student.s_profession.p_s_class"
                ></v-autocomplete>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6" md="6">
                英语等级*：
                <v-radio-group v-model="CET" row>
                  <v-radio color="teal" label="英语四级" value="CET4"></v-radio>
                  <v-radio color="teal" label="英语六级" value="CET6"></v-radio>
                  <v-radio color="teal" label="无" value="NONE"></v-radio>
                </v-radio-group>
                英语等级*:
                <v-radio-group v-model="JN" row>
                  <v-radio color="teal" label="日语二级" value="JN2"></v-radio>
                  <v-radio color="teal" label="日语三级" value="JN3"></v-radio>
                  <v-radio color="teal" label="无" value="NONE"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="student.s_id_card"
                  label="身份证号码"
                  hint="非必填"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="student.s_n_province"
                  label="籍贯-省份*"
                  color="teal"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="student.s_n_city"
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
                  v-model="student.s_e_city"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  :items="rangeItems"
                  color="teal"
                  v-model="student.s_s_range"
                  label="期望薪资*"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-autocomplete
                  color="teal"
                  :items="positions"
                  label="期望岗位*"
                  v-model="student.s_e_position.p_name"
                ></v-autocomplete>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  readonly
                  v-model="student.s_telephone"
                  label="电话*"
                  color="teal"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="student.s_email"
                  color="teal"
                  label="邮箱*"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="student.s_g_time"
                  label="毕业时间*"
                  color="teal"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="student.s_s_attachment"
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
                  v-model="student.s_if_work"
                  label="是否就业*"
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
                v-if="student.s_if_work == '已就业'"
              >
                <v-text-field
                  v-model="student.s_w_city"
                  label="就业地级市"
                  hint="已就业者必填"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
                v-if="student.s_if_work == '已就业'"
              >
                <v-text-field
                  v-model="student.s_company"
                  label="就业企业"
                  hint="已就业者必填"
                ></v-text-field>
              </v-col>
            </v-row>

            <div class="mt-12 text-right">
              <v-btn color="basil" outlined @click="submit">SUBMIT</v-btn>
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { GET_INDEX_STUDENT } from "@/store/types.js";
import { GET_REGISTER_INDEX_SCLASS } from "@/store/types.js";
import { UPDATE_INFORMATION_STUDENT } from "@/store/types.js";
import { mapState } from "vuex";

export default {
  data: () => ({
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
    this.$store.dispatch(GET_INDEX_STUDENT);
    this.$store.dispatch(GET_REGISTER_INDEX_SCLASS, {
      p_id: null,
      p_m_class: this.student.s_profession.p_m_class,
      p_s_class: "无"
    });
    switch (this.student.s_f_language) {
      case 1:
        this.CET = "CET4";
        this.JN = "NONE";
        break;
      case 2:
        this.CET = "CET6";
        this.JN = "NONE";
        break;
      case 4:
        this.CET = "NONE";
        this.JN = "JN2";
        break;
      case 8:
        this.CET = "NONE";
        this.JN = "JN3";
        break;
      case 5:
        this.CET = "CET4";
        this.JN = "JN2";
        break;
      case 6:
        this.CET = "CET6";
        this.JN = "JN2";
        break;
      case 9:
        this.CET = "CET4";
        this.JN = "JN3";
        break;
      case 10:
        this.CET = "CET6";
        this.JN = "JN3";
        break;
      case 16:
        this.CET = "NONE";
        this.JN = "NONE";
        break;
    }
    console.log(this.student.s_if_work);
  },
  methods: {
    jFLanguageR() {
      switch (this.student.s_f_language) {
        case 1:
          this.CET = "CET4";
          this.JN = "NONE";
          break;
        case 2:
          this.CET = "CET6";
          this.JN = "NONE";
          break;
        case 4:
          this.CET = "NONE";
          this.JN = "JN2";
          break;
        case 8:
          this.CET = "NONE";
          this.JN = "JN3";
          break;
        case 5:
          this.CET = "CET4";
          this.JN = "JN2";
          break;
        case 6:
          this.CET = "CET6";
          this.JN = "JN2";
          break;
        case 9:
          this.CET = "CET4";
          this.JN = "JN3";
          break;
        case 10:
          this.CET = "CET6";
          this.JN = "JN3";
          break;
        case 16:
          this.CET = "NONE";
          this.JN = "NONE";
          break;
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

    reset() {
      this.$store.dispatch(GET_INDEX_STUDENT);
      this.$store.dispatch(GET_REGISTER_INDEX_SCLASS, {
        p_id: null,
        p_m_class: this.student.s_profession.p_m_class,
        p_s_class: "无"
      });
      this.jFLanguageR();
    },
    submit() {
      this.$store.dispatch(UPDATE_INFORMATION_STUDENT, {
        s_name: this.student.s_name,
        s_id_card: this.student.s_id_card,
        s_sex: this.student.s_sex,
        s_birthday: this.student.s_birthday,
        s_college: this.student.s_college,
        s_c_level: this.student.s_c_level,
        s_profession: {
          p_m_class: this.student.s_profession.p_m_class,
          p_s_class: this.student.s_profession.p_s_class
        },
        s_e_history: this.student.s_e_history,
        s_n_province: this.student.s_n_province,
        s_n_city: this.student.s_n_city,
        s_f_language: this.jFLanguage(),
        s_s_range: this.student.s_s_range,
        s_e_position: {
          p_name: this.student.s_e_position.p_name
        },
        s_e_city: this.student.s_e_city,
        s_g_time: this.student.s_g_time,
        s_telephone: this.student.s_telephone,
        s_email: this.student.s_email,
        s_s_attachment: this.student.s_s_attachment,
        s_if_work: this.student.s_if_work,
        s_w_city: this.student.s_w_city,
        s_company: this.student.s_company
      });
    },
    getprofessionMClass: function() {
      console.log("您选择了", this.student.s_profession.p_m_class);
      this.$store.dispatch(GET_REGISTER_INDEX_SCLASS, {
        p_id: null,
        p_m_class: this.student.s_profession.p_m_class,
        p_s_class: "无"
      });
    }
  },
  computed: {
    ...mapState([
      "student",
      "positions",
      "professionsMClass",
      "professionsSClass"
    ])
  }
};
</script>
<style scoped>
.toolbar {
  margin-right: 10px;
  margin-left: 10px;
}
</style>
