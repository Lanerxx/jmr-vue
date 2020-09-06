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
            to="/companyJobInformation"
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
                        readonly=""
                        v-model="editedItem.smr_student.s_name"
                        label="姓名"
                        color="teal"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.smr_student.s_sex"
                        label="性别"
                        color="teal"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.smr_student.s_birthday"
                        label="出生年月"
                        color="teal"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.smr_student.s_college"
                        label="毕业院校"
                        color="teal"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.smr_student.s_c_level"
                        label="院校等级"
                        color="teal"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.smr_student.s_profession.p_s_class"
                        label="专业"
                        color="teal"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.smr_student.s_e_history"
                        label="学历"
                        color="teal"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        readonly=""
                        v-model="language"
                        label="外语水平"
                        color="teal"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.smr_student.s_id_card"
                        label="身份证号码"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.smr_student.s_n_province"
                        label="籍贯-省份"
                        color="teal"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.smr_student.s_n_city"
                        label="籍贯-地级市"
                        color="teal"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.smr_student.s_e_city"
                        label="就业意向地"
                        color="teal"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.smr_student.s_s_range"
                        label="期望薪资"
                        color="teal"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.smr_student.s_e_position.p_name"
                        label="期望岗位"
                        color="teal"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.smr_student.s_telephone"
                        label="电话"
                        color="teal"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.smr_student.s_email"
                        color="teal"
                        label="邮箱"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.smr_student.s_g_time"
                        label="毕业时间"
                        color="teal"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.smr_student.s_s_attachment"
                        label="成绩单附件地址"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.smr_student.s_if_work"
                        label="是否就业"
                        color="teal"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.smr_student.s_w_city"
                        label="就业地级市"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.smr_student.s_company"
                        label="就业企业"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.smr_resume.r_m_course"
                        label="主修课程"
                        color="teal"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.smr_resume.r_skill"
                        color="teal"
                        label="掌握技能"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.smr_resume.r_s_certificate"
                        color="teal"
                        label="专业技能证书"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.smr_resume.r_honor"
                        color="teal"
                        label="获得荣誉/奖项"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.smr_resume.r_career"
                        color="teal"
                        label="实习或工作经历"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.smr_resume.r_p_experience"
                        color="teal"
                        label="项目经验"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.smr_resume.r_s_evaluate"
                        color="teal"
                        label="自我陈述"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.smr_resume.r_remark"
                        color="teal"
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
        <v-btn
          disabled
          class="ma-2"
          outlined
          color="indigo"
          @click="downloadResume(item)"
        >
          下载
        </v-btn>
      </template>
    </v-data-table>
    <br />
    <!-- 
    <template>
      <v-progress-linear indeterminate color="teal"></v-progress-linear>
      <br />
      <v-progress-linear indeterminate color="green"></v-progress-linear>
      <br />
      <v-progress-linear indeterminate color="cyan"></v-progress-linear>
    </template> -->
  </div>
</template>

<script>
import { MATCH_COMPANYJOB_COMPANY } from "@/store/types.js";
import { DOWNLOAD_RESUME_ENTERPRISE } from "@/store/types.js";
import { mapState } from "vuex";
export default {
  props: ["cjid"],
  created() {
    this.$store.dispatch(MATCH_COMPANYJOB_COMPANY, {
      cjid: this.$route.params.cjid
    });
  },
  data: () => ({
    language: "NONE",
    search: "",
    dialog: false,
    headers: [
      {
        text: "姓名",
        align: "start",
        sortable: false,
        value: "smr_student.s_name"
      },
      { text: "匹配度", value: "smr_value" },
      { text: "毕业学校", value: "smr_student.s_college" },
      { text: "性别", value: "smr_student.s_sex" },
      { text: "专业", value: "smr_student.s_profession.p_s_class" },
      { text: "联系电话", value: "smr_student.s_telephone" },
      { text: "操作", value: "actions", sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      smr_student: {
        s_profession: { p_s_class: "" },
        s_e_position: { p_name: "" }
      },
      smr_resume: {}
    }
  }),

  computed: {
    formatDate() {
      return date => date.replace("T", " ").substring(0, 16);
    },
    ...mapState(["studentMatchResults"])
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    reset() {
      this.$store.dispatch(MATCH_COMPANYJOB_COMPANY, {
        cjid: this.$route.params.cjid
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
    },
    downloadResume(item) {
      console.log(item.student.id);
      this.$store.dispatch(DOWNLOAD_RESUME_ENTERPRISE, {
        id: item.student.id
      });
    }
  }
};
</script>
