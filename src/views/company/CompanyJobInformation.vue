<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="myJobs"
      sort-by="company_job_pk.job.j_expire"
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
          ></v-text-field>

          <v-dialog v-model="dialog" max-width="850px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="rgba(0, 128, 128, 0.712)"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                添加岗位
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-autocomplete
                        :items="positions"
                        color="teal"
                        v-model="
                          editedItem.company_job_pk.job.j_position.p_name
                        "
                        label="岗位名"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-select
                        color="teal"
                        :items="sexItems"
                        label="性别要求"
                        v-model="editedItem.company_job_pk.job.j_sex"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-select
                        :items="historyItems"
                        color="teal"
                        v-model="editedItem.company_job_pk.job.j_e_history"
                        label="学历要求"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-select
                        :items="schoolRankItems"
                        color="teal"
                        label="院校层次要求"
                        v-model="editedItem.company_job_pk.job.j_c_level"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-autocomplete
                        color="teal"
                        :items="professionsMClass"
                        label="专业要求"
                        v-model="
                          editedItem.company_job_pk.job.j_profession.p_m_class
                        "
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      英语要求：
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
                      日语要求：
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
                      <v-select
                        :items="rangeItems"
                        color="teal"
                        v-model="editedItem.company_job_pk.job.j_s_range"
                        label="薪资范围"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        :items="cityItems"
                        color="teal"
                        label="就业意向地"
                        v-model="editedItem.company_job_pk.job.j_e_city"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.company_job_pk.job.j_expire"
                        label="过期时间"
                        type="date"
                        color="teal"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-textarea
                        label="岗位要求"
                        color="teal"
                        no-resize
                        rows="2"
                        hint="书写详细岗位要求，提供给学生参考"
                        v-model="editedItem.company_job_pk.job.j_p_require"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-textarea
                        color="teal"
                        label="福利待遇"
                        no-resize
                        rows="2"
                        v-model="editedItem.company_job_pk.job.j_welfare"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-textarea
                        color="teal"
                        label="备注"
                        no-resize
                        rows="2"
                        v-model="editedItem.company_job_pk.job.j_remark"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="teal" text @click="close">Cancel</v-btn>
                <v-btn color="teal" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
              v-bind="attrs"
              v-on="on"
              :disabled="item.cj_focus"
            >
              mdi-pencil
            </v-icon>
          </template>
          <span>修改</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              small
              @click="deleteItem(item)"
              v-bind="attrs"
              v-on="on"
              :disabled="item.cj_focus"
            >
              mdi-delete
            </v-icon>
          </template>
          <span>删除</span>
        </v-tooltip>
        <v-btn
          v-if="item.cj_focus"
          class="ma-2"
          outlined
          color="warning"
          @click="withdraw(item)"
        >
          收回
        </v-btn>
        <v-btn
          v-else
          class="ma-2"
          outlined
          color="#E65100"
          @click="release(item)"
        >
          发布
        </v-btn>
        <v-btn
          class="ma-2"
          outlined
          color="teal"
          :to="`/companyStudentMatchResult/${item.company_job_pk.job.j_id}`"
          :disabled="!item.cj_focus"
        >
          匹配
        </v-btn>
      </template>
    </v-data-table>
    <br />

    <p class="font-weight-thin text-end">
      ps : 岗位发布前可进行修改和删除操作；岗位发布后可进行匹配操作。
    </p>
  </div>
</template>

<script>
import { LIST_JOBS_COMPANY } from "@/store/types.js";
import { UPDATE_JOB_COMPANY } from "@/store/types.js";
import { ADD_JOB_COMPANY } from "@/store/types.js";
import { DELETE_JOB_COMPANY } from "@/store/types.js";
import { ADD_COMPANYJOB_COMPANY } from "@/store/types.js";
import { UPDATE_COMPANYJOB_COMPANY } from "@/store/types.js";

import { mapState } from "vuex";
export default {
  data: () => ({
    search: "",
    CET: "NONE",
    JN: "NONE",
    dialog: false,
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

    defaultItem: {
      company_job_pk: {
        job: {
          j_position: {
            p_name: ""
          },
          j_sex: "无要求",
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
          j_remark: "无",
          j_expire: "",
          j_company: {}
        },
        focus: false
      }
    },
    schoolRankItems: ["_985", "_211", "一批本科", "二批本科", "专科", "高职"],
    historyItems: ["博士", "硕士", "本科", "专科"],
    languageItems: ["CET6", "CET4", "JN3", "JN2", "NONE"],
    sexItems: ["男", "女", "无要求"],
    rangeItems: ["四k以下", "四至六k", "六至八k", "八至十k", "十K以上"],
    cityItems: ["烟台", "其他"]
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapState(["myJobs", "positions", "professionsMClass"])
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.$store.dispatch(LIST_JOBS_COMPANY);
  },

  methods: {
    reset() {
      this.$store.dispatch(LIST_JOBS_COMPANY);
    },
    editItem(item) {
      this.editedIndex = this.myJobs.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      switch (item.company_job_pk.job.j_f_language) {
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

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        this.$store.dispatch(DELETE_JOB_COMPANY, {
          jid: item.company_job_pk.job.j_id
        });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
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

    save() {
      console.log("save" + this.editedIndex);
      if (this.editedIndex > -1) {
        console.log("-------");
        this.$store.dispatch(UPDATE_JOB_COMPANY, {
          j_id: this.editedItem.company_job_pk.job.j_id,
          j_position: {
            p_name: this.editedItem.company_job_pk.job.j_position.p_name
          },
          j_sex: this.editedItem.company_job_pk.job.j_sex,
          j_e_history: this.editedItem.company_job_pk.job.j_e_history,
          j_c_level: this.editedItem.company_job_pk.job.j_c_level,
          j_f_language: this.jFLanguage(),
          j_profession: {
            p_m_class: this.editedItem.company_job_pk.job.j_profession.p_m_class
          },
          j_s_range: this.editedItem.company_job_pk.job.j_s_range,
          j_e_city: this.editedItem.company_job_pk.job.j_e_city,
          j_p_require: this.editedItem.company_job_pk.job.j_p_require,
          j_welfare: this.editedItem.company_job_pk.job.j_welfare,
          j_remark: this.editedItem.company_job_pk.job.j_remark,
          j_expire: this.editedItem.company_job_pk.job.j_expire,
          j_company: {}
        });
      } else {
        console.log("add");
        console.log(this.editedIndex);
        this.$store.dispatch(ADD_JOB_COMPANY, {
          j_id: this.editedItem.company_job_pk.job.j_id,
          j_position: {
            p_name: this.editedItem.company_job_pk.job.j_position.p_name
          },
          j_sex: this.editedItem.company_job_pk.job.j_sex,
          j_e_history: this.editedItem.company_job_pk.job.j_e_history,
          j_c_level: this.editedItem.company_job_pk.job.j_c_level,
          j_f_language: this.jFLanguage(),
          j_profession: {
            p_m_class: this.editedItem.company_job_pk.job.j_profession.p_m_class
          },
          j_s_range: this.editedItem.company_job_pk.job.j_s_range,
          j_e_city: this.editedItem.company_job_pk.job.j_e_city,
          j_p_require: this.editedItem.company_job_pk.job.j_p_require,
          j_welfare: this.editedItem.company_job_pk.job.j_welfare,
          j_remark: this.editedItem.company_job_pk.job.j_remark,
          j_expire: this.editedItem.company_job_pk.job.j_expire,
          j_company: {}
        });
      }
      this.close();
    },
    release(item) {
      console.log(item.company_job_pk.job.j_id);
      this.$store.dispatch(ADD_COMPANYJOB_COMPANY, {
        company_job_pk: {
          job: {
            j_id: item.company_job_pk.job.j_id
          }
        },
        cj_focus: true
      });
    },
    withdraw(item) {
      this.$store.dispatch(UPDATE_COMPANYJOB_COMPANY, {
        jid: item.company_job_pk.job.j_id
      });
    }
  }
};
</script>
