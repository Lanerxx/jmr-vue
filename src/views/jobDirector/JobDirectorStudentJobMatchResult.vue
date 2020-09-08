<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="jobMatchResults"
      sort-by="jmr_value"
      sort-desc="true"
      class="elevation-1"
      :search="search"
      loading
      loading-text="Loading... Please wait"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>匹配岗位</v-toolbar-title>
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
            to="/jobDirectorJobMatchResult"
          >
            返回
          </v-btn>
          <v-dialog v-model="dialog" max-width="800px">
            <v-card>
              <v-card-title>
                <span class="headline">学生详情</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="2">
                      <v-subheader>企业名</v-subheader>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        readonly=""
                        color="teal"
                        label="Name"
                        v-model="editedItem.jmr_company.c_name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="2">
                      <v-subheader>统一社会信用码</v-subheader>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        readonly
                        color="teal"
                        label="Code"
                        v-model="editedItem.jmr_company.c_s_code"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="2">
                      <v-subheader>企业详情</v-subheader>
                    </v-col>
                    <v-col cols="10">
                      <v-text-field
                        readonly
                        color="teal"
                        label="Detail"
                        v-model="editedItem.jmr_company.c_description"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="2">
                      <v-subheader>联系人</v-subheader>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        readonly
                        color="teal"
                        label="Contact"
                        v-model="editedItem.jmr_company.c_contact"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="2">
                      <v-subheader>联系电话</v-subheader>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        readonly=""
                        color="teal"
                        label="Telephone"
                        v-model="editedItem.jmr_company.c_telephone"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="2">
                      <v-subheader>邮箱</v-subheader>
                    </v-col>
                    <v-col cols="10">
                      <v-text-field
                        readonly
                        color="teal"
                        label="Email"
                        v-model="editedItem.jmr_company.c_email"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        readonly
                        v-model="editedItem.jmr_job.j_position.p_name"
                        label="岗位名"
                        color="teal"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        readonly
                        v-model="editedItem.jmr_job.j_sex"
                        label="性别要求"
                        color="teal"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        readonly
                        color="teal"
                        v-model="editedItem.jmr_job.j_e_history"
                        label="学历要求"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        readonly
                        color="teal"
                        v-model="editedItem.jmr_job.j_c_level"
                        label="院校层次要求"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        readonly
                        color="teal"
                        v-model="editedItem.jmr_job.j_profession.p_m_class"
                        label="专业要求"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        readonly
                        v-model="language"
                        label="语言要求"
                        color="teal"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        readonly
                        color="teal"
                        v-model="editedItem.jmr_job.j_s_range"
                        label="薪资范围"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        readonly
                        color="teal"
                        v-model="editedItem.jmr_job.j_e_city"
                        label="就业意向地"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.jmr_job.j_expire"
                        label="过期时间"
                        type="date"
                        readonly=""
                        color="teal"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        readonly
                        color="teal"
                        v-model="editedItem.jmr_job.j_p_require"
                        label="岗位要求"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        readonly
                        color="teal"
                        v-model="editedItem.jmr_job.j_welfare"
                        label="福利待遇"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        readonly
                        color="teal"
                        v-model="editedItem.jmr_job.j_remark"
                        label="备注"
                      ></v-text-field>
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
      ps : 若无匹配信息，则学生可能未发布简历。
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
                readonly
                v-model="student.s_sex"
                label="性别*"
                color="teal"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                readonly
                v-model="student.s_birthday"
                label="出生年月*"
                color="teal"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="4" md="4">
              <v-text-field
                readonly
                v-model="student.s_college"
                label="毕业院校*"
                color="teal"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="4">
              <v-text-field
                v-model="student.s_c_level"
                label="院校等级*"
                readonly
                color="teal"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="4">
              <v-text-field
                readonly
                v-model="student.s_e_history"
                label="学历*"
                color="teal"
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
                v-model="student.s_profession.p_s_class"
                label="专业小类*"
                color="teal"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" md="6">
              英语等级*：
              <v-radio-group v-model="CET" row readonly>
                <v-radio color="teal" label="英语四级" value="CET4"></v-radio>
                <v-radio color="teal" label="英语六级" value="CET6"></v-radio>
                <v-radio color="teal" label="无" value="NONE"></v-radio>
              </v-radio-group>
              英语等级*:
              <v-radio-group v-model="JN" row readonly>
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
                readonly
                hint="非必填"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                readonly
                v-model="student.s_n_province"
                label="籍贯-省份*"
                color="teal"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                readonly
                v-model="student.s_n_city"
                label="籍贯-地级市*"
                color="teal"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                readonly
                v-model="student.s_e_city"
                label="就业意向地*"
                color="teal"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="student.s_s_range"
                readonly
                label="期望薪资*"
                color="teal"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                readonly
                v-model="student.s_e_position.p_name"
                label="期望岗位*"
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
                readonly
                v-model="student.s_email"
                color="teal"
                label="邮箱*"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                readonly
                v-model="student.s_g_time"
                label="毕业时间*"
                color="teal"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                readonly
                v-model="student.s_s_attachment"
                label="成绩单附件地址"
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
                readonly
                v-model="student.s_w_city"
                label="就业地级市"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4" v-if="student.s_if_work == '已就业'">
              <v-text-field
                readonly
                v-model="student.s_company"
                label="就业企业"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>

    <br />
  </div>
</template>

<script>
import { LIST_JOB_MATCH_RESULT_JOB_DIRECTOR } from "@/store/types.js";
import { GET_STUDENT_JOB_DIRECTOR } from "@/store/types.js";
import { mapState } from "vuex";
export default {
  props: ["sid"],

  created() {
    this.$store.dispatch(LIST_JOB_MATCH_RESULT_JOB_DIRECTOR, {
      sid: this.$route.params.sid
    });
    this.$store.dispatch(GET_STUDENT_JOB_DIRECTOR, {
      sid: this.$route.params.sid
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
  },
  data: () => ({
    search: "",
    dialog: false,
    language: "NONE",
    headers: [
      {
        text: "岗位名",
        align: "start",
        sortable: false,
        value: "jmr_job.j_position.p_name"
      },
      { text: "匹配度", value: "jmr_value" },
      { text: "所属公司", value: "jmr_company.c_name" },
      { text: "薪资范围", value: "jmr_job.j_s_range" },
      { text: "等级要求", value: "jmr_job.j_c_level" },
      { text: "学历要求", value: "jmr_job.j_e_history" },
      { text: "操作", value: "actions", sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      jmr_job: {
        j_profession: { p_s_class: "" },
        j_position: { p_name: "" }
      },
      jmr_company: {}
    },
    CET: "NONE",
    JN: "NONE"
  }),

  computed: {
    formatDate() {
      return date => date.replace("T", " ").substring(0, 16);
    },
    ...mapState(["jobMatchResults", "student"])
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    reset() {
      this.$store.dispatch(LIST_JOB_MATCH_RESULT_JOB_DIRECTOR, {
        sid: this.$route.params.sid
      });
      this.$store.dispatch(GET_STUDENT_JOB_DIRECTOR, {
        sid: this.$route.params.sid
      });
      this.jFLanguageR();
    },
    detailItem(item) {
      switch (item.jmr_job.j_f_language) {
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
      this.editedIndex = this.jobMatchResults.indexOf(item);
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
