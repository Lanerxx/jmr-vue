<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="studentResumes"
      sort-by="resume.r_m_course"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>简历</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-btn color="rgba(0, 128, 128, 0.712)" text @click="reset">
            Reset The Table
          </v-btn>

          <v-spacer></v-spacer>

          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            color="teal"
          ></v-text-field>
          <v-btn
            class="ma-2"
            outlined
            fab
            color="teal"
            to="/jobDirectorStudentResume"
          >
            返回
          </v-btn>
          <v-dialog v-model="dialog" max-width="800px">
            <v-card>
              <v-card-title>
                <span class="headline">简历详情</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-textarea
                        readonly
                        counter
                        color="teal"
                        label="主修课程"
                        :rules="mCourseRules"
                        rows="2"
                        v-model="editedItem.resume.r_m_course"
                      ></v-textarea>
                    </v-col>

                    <v-col cols="12" sm="12" md="12">
                      <v-textarea
                        readonly
                        counter
                        color="teal"
                        label="掌握技能"
                        :rules="skillRules"
                        rows="2"
                        v-model="editedItem.resume.r_skill"
                      ></v-textarea>
                    </v-col>

                    <v-col cols="12" sm="12" md="12">
                      <v-textarea
                        counter
                        readonly
                        color="teal"
                        label="专业证书"
                        :rules="sCertificateRules"
                        rows="1"
                        v-model="editedItem.resume.r_s_certificate"
                      ></v-textarea>
                    </v-col>

                    <v-col cols="12" sm="12" md="12">
                      <v-textarea
                        counter
                        color="teal"
                        label="获得荣誉/奖项"
                        readonly
                        :rules="honorRules"
                        rows="1"
                        v-model="editedItem.resume.r_honor"
                      ></v-textarea>
                    </v-col>

                    <v-col cols="12" sm="12" md="12">
                      <v-textarea
                        readonly
                        counter
                        color="teal"
                        label="实习（或工作）经历"
                        :rules="careerRules"
                        rows="5"
                        v-model="editedItem.resume.r_career"
                      ></v-textarea>
                    </v-col>

                    <v-col cols="12" sm="12" md="12">
                      <v-textarea
                        counter
                        readonly
                        color="teal"
                        label="项目经验"
                        :rules="pExperienceRules"
                        rows="5"
                        v-model="editedItem.resume.r_p_experience"
                      ></v-textarea>
                    </v-col>

                    <v-col cols="12" sm="12" md="12">
                      <v-textarea
                        counter
                        readonly
                        color="teal"
                        label="自我评价"
                        :rules="sEvaluateRules"
                        rows="2"
                        v-model="editedItem.resume.r_s_evaluate"
                      ></v-textarea>
                    </v-col>

                    <v-col cols="12" sm="12" md="12">
                      <v-textarea
                        counter
                        color="teal"
                        readonly
                        label="备注"
                        :rules="remarkRules"
                        rows="2"
                        v-model="editedItem.resume.r_remark"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="teal" text @click="close">Cancel</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn class="ma-2" outlined color="teal" @click="detailItem(item)">
          详情
        </v-btn>
      </template>
    </v-data-table>
    <br />
    <p class="font-weight-thin text-end">
      ps : 若无简历信息，则学生可能未发布简历。
    </p>
    <v-row>
      <v-col cols="12">
        <v-sheet elevation="1" class="pa-12">
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                readonly
                v-model="student.s_name"
                label="姓名*"
                color="teal"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="性别*"
                v-model="student.s_sex"
                readonly
                color="teal"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="student.s_birthday"
                label="出生年月*"
                readonly
                color="teal"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="4" md="4">
              <v-text-field
                v-model="student.s_college"
                label="毕业院校*"
                readonly
                color="teal"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="4">
              <v-text-field
                readonly
                v-model="student.s_c_level"
                label="院校等级*"
                color="teal"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="4">
              <v-text-field
                readonly
                color="teal"
                v-model="student.s_e_history"
                label="学历*"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                readonly
                v-model="student.s_profession.p_m_class"
                label="专业大类*"
                color="teal"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                readonly
                label="专业小类*"
                v-model="student.s_profession.p_s_class"
                color="teal"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                readonly
                color="teal"
                label="语言等级*"
                v-model="language"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="student.s_id_card"
                label="身份证号码"
                readonly
                hint="非必填"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="student.s_n_province"
                label="籍贯-省份*"
                readonly
                color="teal"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="student.s_n_city"
                label="籍贯-地级市*"
                readonly
                color="teal"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                readonly
                color="teal"
                v-model="student.s_e_city"
                label="就业意向地*"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                readonly
                v-model="student.s_s_range"
                label="期望薪资*"
                color="teal"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                readonly
                label="期望岗位*"
                v-model="student.s_e_position.p_name"
                color="teal"
              ></v-text-field>
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
                readonly
                color="teal"
                label="邮箱*"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="student.s_g_time"
                readonly
                label="毕业时间*"
                color="teal"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="student.s_s_attachment"
                readonly
                label="成绩单附件地址"
                hint="非必填"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                readonly
                v-model="student.s_if_work"
                label="是否就业*"
                color="teal"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4" v-if="student.s_if_work == '已就业'">
              <v-text-field
                v-model="student.s_w_city"
                readonly
                label="就业地级市"
                hint="已就业者必填"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4" v-if="student.s_if_work == '已就业'">
              <v-text-field
                v-model="student.s_company"
                readonly
                label="就业企业"
                hint="已就业者必填"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { LIST_STUDENTRESUMES_JOB_DIRECTOR } from "@/store/types.js";
import { GET_STUDENT_JOB_DIRECTOR } from "@/store/types.js";
import { mapState } from "vuex";
export default {
  props: ["sid"],
  created() {
    this.$store.dispatch(GET_STUDENT_JOB_DIRECTOR, {
      sid: this.$route.params.sid
    });
    console.log("vue data");
    this.$store.dispatch(LIST_STUDENTRESUMES_JOB_DIRECTOR, {
      sid: this.$route.params.sid
    });
    switch (this.student.s_f_language) {
      case 1:
        this.language = "CET4";
        break;
      case 2:
        this.language = "CET6";
        break;
      case 4:
        this.language = "JN2";
        break;
      case 8:
        this.language = "JN3";
        break;
      case 5:
        this.language = "CET4 + JN2";
        break;
      case 6:
        this.language = "CET6 + JN2";
        break;
      case 9:
        this.language = "CET4 + JN3";
        break;
      case 10:
        this.language = "CET6 + JN3";
        break;
    }
  },
  data: () => ({
    search: "",
    dialog: false,
    language: "NONE",
    headers: [
      {
        text: "姓名",
        align: "start",
        sortable: false,
        value: "resume.r_student.s_name"
      },
      { text: "主修课程", value: "resume.r_m_course" },
      { text: "操作", value: "actions", sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      resume: {
        r_id: "",
        r_m_course: "",
        r_skill: "",
        r_s_certificate: "",
        r_honor: "",
        r_career: "",
        r_p_experience: "",
        r_s_evaluate: "",
        r_remark: "",
        r_student: {
          s_name: ""
        }
      },
      posted: false
    },

    CET: "NONE",
    JN: "NONE"
  }),

  computed: {
    formatDate() {
      return date => date.replace("T", " ").substring(0, 16);
    },
    ...mapState(["studentResumes", "student"])
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    reset() {
      this.$store.dispatch(LIST_STUDENTRESUMES_JOB_DIRECTOR, {
        sid: this.$route.params.sid
      });
      this.$store.dispatch(GET_STUDENT_JOB_DIRECTOR, {
        sid: this.$route.params.sid
      });
    },
    detailItem(item) {
      this.editedIndex = this.studentResumes.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedIndex = -1;
      });
    },

    save() {
      this.close();
    }
  }
};
</script>
