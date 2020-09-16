<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="studentMatchResults"
      sort-by="smr_value"
      sort-desc="true"
      class="elevation-1"
      :search="search"
      loading
      loading-text="Loading... Please wait"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>匹配学生</v-toolbar-title>
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
            to="/jobDirectorStudentMatchResult"
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
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        readonly
                        v-model="editedItem.smr_student.s_name"
                        label="姓名*"
                        color="teal"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="性别*"
                        v-model="editedItem.smr_student.s_sex"
                        readonly
                        color="teal"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.smr_student.s_birthday"
                        label="出生年月*"
                        readonly
                        color="teal"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItem.smr_student.s_college"
                        readonly
                        label="毕业院校*"
                        color="teal"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        readonly
                        v-model="editedItem.smr_student.s_c_level"
                        label="院校等级*"
                        color="teal"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        readonly
                        color="teal"
                        v-model="editedItem.smr_student.s_e_history"
                        label="学历*"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        readonly
                        v-model="editedItem.smr_student.s_profession.p_m_class"
                        label="专业大类*"
                        color="teal"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        readonly
                        label="专业小类*"
                        v-model="editedItem.smr_student.s_profession.p_s_class"
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
                        v-model="editedItem.smr_student.s_id_card"
                        label="身份证号码"
                        readonly
                        hint="非必填"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.smr_student.s_n_province"
                        readonly
                        label="籍贯-省份*"
                        color="teal"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.smr_student.s_n_city"
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
                        v-model="editedItem.smr_student.s_e_city"
                        label="就业意向地*"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        readonly
                        v-model="editedItem.smr_student.s_s_range"
                        label="期望薪资*"
                        color="teal"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        readonly
                        label="期望岗位*"
                        v-model="editedItem.smr_student.s_e_position.p_name"
                        color="teal"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        readonly
                        v-model="editedItem.smr_student.s_telephone"
                        label="电话*"
                        color="teal"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.smr_student.s_email"
                        color="teal"
                        readonly
                        label="邮箱*"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.smr_student.s_g_time"
                        readonly
                        label="毕业时间*"
                        color="teal"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.smr_student.s_s_attachment"
                        label="成绩单附件地址"
                        readonly
                        hint="非必填"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        readonly
                        v-model="editedItem.smr_student.s_if_work"
                        label="是否就业*"
                        color="teal"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                      v-if="editedItem.smr_student.s_if_work == '已就业'"
                    >
                      <v-text-field
                        v-model="editedItem.smr_student.s_w_city"
                        readonly
                        label="就业地级市"
                        hint="已就业者必填"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                      v-if="editedItem.smr_student.s_if_work == '已就业'"
                    >
                      <v-text-field
                        v-model="editedItem.smr_student.s_company"
                        readonly
                        label="就业企业"
                        hint="已就业者必填"
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
      ps : 若无匹配信息，则公司可能未发布岗位。
    </p>

    <v-row>
      <v-col cols="12">
        <v-sheet elevation="1" class="pa-12">
          <v-row>
            <v-col cols="2">
              <v-subheader>企业名</v-subheader>
            </v-col>
            <v-col cols="4">
              <v-text-field
                readonly
                color="teal"
                label="Name"
                v-model="company.c_name"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-subheader>统一社会信用码</v-subheader>
            </v-col>
            <v-col cols="4">
              <v-text-field
                readonly=""
                color="teal"
                label="Code"
                v-model="company.c_s_code"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="2">
              <v-subheader>企业详情</v-subheader>
            </v-col>
            <v-col cols="10">
              <v-text-field
                color="teal"
                readonly
                label="Detail"
                v-model="company.c_description"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="2">
              <v-subheader>联系人</v-subheader>
            </v-col>
            <v-col cols="4">
              <v-text-field
                color="teal"
                readonly
                label="Contact"
                v-model="company.c_contact"
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
                v-model="company.c_telephone"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <v-subheader>邮箱</v-subheader>
            </v-col>
            <v-col cols="10">
              <v-text-field
                color="teal"
                readonly
                label="Email"
                v-model="company.c_email"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { LIST_STUDENT_MATCH_RESULT_JOB_DIRECTOR } from "@/store/types.js";
import { GET_COMPANY_JOB_DIRECTOR } from "@/store/types.js";
import { mapState } from "vuex";
export default {
  props: ["cid"],
  created() {
    this.$store.dispatch(LIST_STUDENT_MATCH_RESULT_JOB_DIRECTOR, {
      cid: this.$route.params.cid
    });
    this.$store.dispatch(GET_COMPANY_JOB_DIRECTOR, {
      cid: this.$route.params.cid
    });
  },
  data: () => ({
    search: "",
    dialog: false,
    language: "NONE",
    headers: [
      {
        text: "学生名",
        align: "start",
        sortable: false,
        value: "smr_student.s_name"
      },
      { text: "匹配值", value: "smr_value" },
      { text: "学校", value: "smr_student.s_college" },
      { text: "学校等级", value: "smr_student.s_c_level" },
      { text: "学历", value: "smr_student.s_e_history" },
      { text: "专业", value: "smr_student.s_profession.p_s_class" },
      { text: "操作", value: "actions", sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      smr_student: {
        s_name: "",
        s_profession: { p_s_class: "" },
        s_e_position: { p_name: "" }
      },
      smr_company: {},
      smr_job: {}
    },
    CET: "NONE",
    JN: "NONE"
  }),

  computed: {
    formatDate() {
      return date => date.replace("T", " ").substring(0, 16);
    },
    ...mapState(["studentMatchResults", "company"])
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    reset() {
      this.$store.dispatch(LIST_STUDENT_MATCH_RESULT_JOB_DIRECTOR, {
        cid: this.$route.params.cid
      });
      this.$store.dispatch(GET_COMPANY_JOB_DIRECTOR, {
        cid: this.$route.params.cid
      });
    },
    detailItem(item) {
      switch (item.smr_student.s_f_language) {
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
      this.editedIndex = this.studentMatchResults.indexOf(item);
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
