<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="myResumes"
      sort-by="resume.r_m_course"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>
            简历
          </v-toolbar-title>
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

          <v-dialog v-model="dialog" max-width="850px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="rgba(0, 128, 128, 0.712)"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                添加简历
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-textarea
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
                        :rules="honorRules"
                        rows="1"
                        v-model="editedItem.resume.r_honor"
                      ></v-textarea>
                    </v-col>

                    <v-col cols="12" sm="12" md="12">
                      <v-textarea
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
                <v-btn color="teal" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-btn
            class="ma-2"
            outlined
            fab
            color="teal"
            to="/studentJobMatchResult"
          >
            匹配
          </v-btn>
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
              :disabled="item.posted"
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
              :disabled="item.posted"
            >
              mdi-delete
            </v-icon>
          </template>
          <span>删除</span>
        </v-tooltip>

        <v-btn
          v-if="item.posted"
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
      </template>
    </v-data-table>
    <br />
    <p class="font-weight-thin text-end">
      ps : 简历发布前可进行修改和删除操作；简历发布后可进行匹配操作。
    </p>
  </div>
</template>

<script>
import { LIST_RESUMES_STUDENT } from "@/store/types.js";
import { UPDATE_RESUME_STUDENT } from "@/store/types.js";
import { ADD_RESUME_STUDENT } from "@/store/types.js";
import { DELETE_RESUME_STUDENT } from "@/store/types.js";
import { ADD_STUDENTRESUME_STUDENT } from "@/store/types.js";
import { DELETE_STUDENTRESUME_STUDENT } from "@/store/types.js";

import { mapState } from "vuex";
export default {
  data: () => ({
    search: "",
    CET: "NONE",
    JN: "NONE",
    dialog: false,
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
    mCourseRules: [v => v.length <= 200 || "Max 200 characters"],
    skillRules: [v => v.length <= 200 || "Max 200 characters"],
    sCertificateRules: [v => v.length <= 50 || "Max 50 characters"],
    honorRules: [v => v.length <= 50 || "Max 50 characters"],
    careerRules: [v => v.length <= 500 || "Max 500 characters"],
    pExperienceRules: [v => v.length <= 500 || "Max 500 characters"],
    sEvaluateRules: [v => v.length <= 200 || "Max 200 characters"],
    remarkRules: [v => v.length <= 200 || "Max 200 characters"],
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

    defaultItem: {
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
        },
        posted: false
      }
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapState(["myResumes"])
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.$store.dispatch(LIST_RESUMES_STUDENT);
  },

  methods: {
    reset() {
      this.$store.dispatch(LIST_RESUMES_STUDENT);
    },
    editItem(item) {
      this.editedIndex = this.myResumes.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      console.log(item);
      confirm("Are you sure you want to delete this item?") &&
        this.$store.dispatch(DELETE_RESUME_STUDENT, {
          rid: item.resume.r_id
        });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      console.log("save" + this.editedIndex);
      if (this.editedIndex > -1) {
        console.log("-----UPDATE_RESUME_STUDENT----");
        this.$store.dispatch(UPDATE_RESUME_STUDENT, {
          r_id: this.editedItem.resume.r_id,
          r_m_course: this.editedItem.resume.r_m_course,
          r_skill: this.editedItem.resume.r_skill,
          r_s_certificate: this.editedItem.resume.r_s_certificate,
          r_honor: this.editedItem.resume.r_honor,
          r_career: this.editedItem.resume.r_career,
          r_p_experience: this.editedItem.resume.r_p_experience,
          r_s_evaluate: this.editedItem.resume.r_s_evaluate,
          r_remark: this.editedItem.resume.r_remark,
          r_student: {
            s_name: ""
          }
        });
      } else {
        this.$store.dispatch(ADD_RESUME_STUDENT, {
          r_id: this.editedItem.resume.r_id,
          r_m_course: this.editedItem.resume.r_m_course,
          r_skill: this.editedItem.resume.r_skill,
          r_s_certificate: this.editedItem.resume.r_s_certificate,
          r_honor: this.editedItem.resume.r_honor,
          r_career: this.editedItem.resume.r_career,
          r_p_experience: this.editedItem.resume.r_p_experience,
          r_s_evaluate: this.editedItem.resume.r_s_evaluate,
          r_remark: this.editedItem.resume.r_remark,
          r_student: {
            s_name: ""
          }
        });
      }
      this.close();
    },
    release(item) {
      console.log(item);
      this.$store.dispatch(ADD_STUDENTRESUME_STUDENT, {
        student_resume_pk: {
          resume: {
            r_id: item.resume.r_id
          }
        }
      });
    },
    withdraw(item) {
      console.log(item);
      this.$store.dispatch(DELETE_STUDENTRESUME_STUDENT, {
        rid: item.resume.r_id
      });
    }
  }
};
</script>
