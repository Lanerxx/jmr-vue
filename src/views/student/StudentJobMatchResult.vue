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
            to="/studentResumeInformation"
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
  </div>
</template>

<script>
import { MATCH_STUDENTRESUME_STUDENT } from "@/store/types.js";
import { mapState } from "vuex";
export default {
  created() {
    this.$store.dispatch(MATCH_STUDENTRESUME_STUDENT, {});
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
      { text: "联系电话", value: "jmr_company.c_telephone" },
      { text: "操作", value: "actions", sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      jmr_job: {
        j_profession: { p_s_class: "" },
        j_position: { p_name: "" }
      },
      jmr_company: {}
    }
  }),

  computed: {
    formatDate() {
      return date => date.replace("T", " ").substring(0, 16);
    },
    ...mapState(["jobMatchResults"])
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    reset() {
      this.$store.dispatch(MATCH_STUDENTRESUME_STUDENT);
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
