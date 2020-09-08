<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="companyJobs"
      sort-by="company_job_pk.job.j_expire"
      sort-desc="true"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>岗位</v-toolbar-title>
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
            to="/jobDirectorCompanyJob"
          >
            返回
          </v-btn>
          <v-dialog v-model="dialog" max-width="800px">
            <v-card>
              <v-card-title>
                <span class="headline">岗位详情</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        readonly
                        color="teal"
                        v-model="
                          editedItem.company_job_pk.job.j_position.p_name
                        "
                        label="岗位名"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        readonly
                        color="teal"
                        label="性别要求"
                        v-model="editedItem.company_job_pk.job.j_sex"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        readonly
                        v-model="editedItem.company_job_pk.job.j_e_history"
                        label="学历要求"
                        color="teal"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        readonly
                        label="院校层次要求"
                        v-model="editedItem.company_job_pk.job.j_c_level"
                        color="teal"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        readonly
                        label="专业要求"
                        color="teal"
                        v-model="
                          editedItem.company_job_pk.job.j_profession.p_m_class
                        "
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        readonly
                        color="teal"
                        v-model="language"
                        label="语言要求"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        readonly
                        v-model="editedItem.company_job_pk.job.j_s_range"
                        label="薪资范围"
                        color="teal"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        readonly
                        label="就业意向地"
                        v-model="editedItem.company_job_pk.job.j_e_city"
                        color="teal"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        readonly
                        v-model="editedItem.company_job_pk.job.j_expire"
                        label="过期时间"
                        color="teal"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        readonly
                        label="岗位要求"
                        v-model="editedItem.company_job_pk.job.j_p_require"
                        color="teal"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        readonly
                        color="teal"
                        v-model="editedItem.company_job_pk.job.j_welfare"
                        label="福利待遇"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        readonly
                        v-model="editedItem.company_job_pk.job.j_remark"
                        label="备注"
                        color="teal"
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
      ps : 若无岗位信息，则公司可能未发布岗位。
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
import { LIST_COMPANYJOBS_JOB_DIRECTOR } from "@/store/types.js";
import { GET_COMPANY_JOB_DIRECTOR } from "@/store/types.js";
import { mapState } from "vuex";
export default {
  props: ["cid"],
  created() {
    this.$store.dispatch(LIST_COMPANYJOBS_JOB_DIRECTOR, {
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
        text: "岗位",
        align: "start",
        sortable: false,
        value: "company_job_pk.job.j_position.p_name"
      },
      { text: "学历要求", value: "company_job_pk.job.j_e_history" },
      { text: "性别要求", value: "company_job_pk.job.j_sex" },
      { text: "结束时间", value: "company_job_pk.job.j_expire" },
      { text: "操作", value: "actions", sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      company_job_pk: {
        job: {
          j_position: {
            p_name: ""
          },
          j_sex: "",
          j_e_history: "",
          j_c_level: "",
          j_f_language: 16,
          j_profession: {
            p_m_class: ""
          },
          j_s_range: "",
          j_e_city: "",
          j_p_require: "",
          j_welfare: "",
          j_remark: "",
          j_expire: "",
          j_company: {}
        },
        focus: false
      }
    },
    CET: "NONE",
    JN: "NONE"
  }),

  computed: {
    formatDate() {
      return date => date.replace("T", " ").substring(0, 16);
    },
    ...mapState(["companyJobs", "company"])
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    reset() {
      this.$store.dispatch(LIST_COMPANYJOBS_JOB_DIRECTOR, {
        cid: this.$route.params.cid
      });
      this.$store.dispatch(GET_COMPANY_JOB_DIRECTOR, {
        cid: this.$route.params.cid
      });
    },
    detailItem(item) {
      switch (item.company_job_pk.job.j_f_language) {
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
      this.editedIndex = this.companyJobs.indexOf(item);
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
