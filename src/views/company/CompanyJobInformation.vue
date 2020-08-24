<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="myJobs"
      sort-by="endTime"
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
                        v-model="editedItem.name"
                        label="岗位名"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-select
                        :items="sexItems"
                        label="性别要求"
                        v-model="editedItem.sex"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-select
                        :items="historyItems"
                        color="teal"
                        v-model="editedItem.history"
                        label="学历要求"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-select
                        :items="schoolRankItems"
                        color="teal"
                        label="院校层次要求"
                        v-model="editedItem.level"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-autocomplete
                        :items="positions"
                        color="teal"
                        v-model="editedItem.profression"
                        label="专业要求"
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-select
                        :items="languageItems"
                        attach
                        chips
                        color="teal"
                        label="外语水平要求"
                        multiple
                        v-model="editedItem.language"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        :items="rangeItems"
                        color="teal"
                        v-model="editedItem.range"
                        label="薪资范围"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        :items="cityItems"
                        color="teal"
                        label="就业意向地"
                        v-model="editedItem.city"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.expire"
                        label="过期时间"
                        type="date"
                        color="teal"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-textarea
                        name="input-7-1"
                        label="岗位要求"
                        color="teal"
                        hint="书写详细岗位要求，提供给学生参考"
                        v-model="editedItem.require"
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
                        v-model="editedItem.welfare"
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
                        v-model="editedItem.remark"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
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
            >
              mdi-pencil
            </v-icon>
          </template>
          <span>修改</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon small @click="deleteItem(item)" v-bind="attrs" v-on="on">
              mdi-delete
            </v-icon>
          </template>
          <span>删除</span>
        </v-tooltip>
        <v-btn v-if="item.posted" class="ma-2" outlined color="warning">
          收回
        </v-btn>
        <v-btn v-else class="ma-2" outlined color="#E65100">
          发布
        </v-btn>
        <v-btn
          class="ma-2"
          outlined
          color="teal"
          :to="`/enterpriseMatch/${item.id}`"
        >
          匹配
        </v-btn>
      </template>
    </v-data-table>
    <br />

    <p class="font-weight-thin text-end">
      ps :请完善你的企业信息和岗位信息后再进行匹配～
    </p>
  </div>
</template>

<script>
import { LIST_JOBS_COMPANY } from "@/store/types.js";
import { UPDATE_POST_ENTERPRISE } from "@/store/types.js";
import { ADD_POST_ENTERPRISE } from "@/store/types.js";
import { DELETE_POST_ENTERPRISE } from "@/store/types.js";

import { mapState } from "vuex";
export default {
  data: () => ({
    search: "",
    dialog: false,
    headers: [
      {
        text: "岗位",
        align: "start",
        sortable: false,
        value: "job.j_position.p_name"
      },
      { text: "学历要求", value: "job.j_e_history" },
      { text: "性别要求", value: "job.j_sex" },
      { text: "结束时间", value: "job.j_expire" },
      { text: "操作", value: "actions", sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      name: "",
      sex: "",
      j_e_history: "",
      level: "",
      language: [],
      profession: "",
      rang: "",
      city: "",
      requie: "",
      welfare: "",
      remark: "",
      expire: ""
    },
    defaultItem: {
      name: "",
      detail: "",
      count: 1,
      salary: 0,
      startTime: "",
      start1: "",
      start2: "12:00",
      endTime: "",
      end1: "",
      end2: "12:00"
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
    formatDate() {
      return date => date.replace("T", " ").substring(0, 16);
    },
    formatPosted() {
      return this.formatPosted === true ? "已发布" : "未发布";
    },

    ...mapState(["myJobs", "positions", "professions"])
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
      this.editedIndex = this.myPosts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editedItem.start1 = this.editedItem.startTime.substring(0, 10);
      this.editedItem.start2 = this.editedItem.startTime.substring(11, 16);

      this.editedItem.end1 = this.editedItem.endTime.substring(0, 10);
      this.editedItem.end2 = this.editedItem.endTime.substring(11, 16);

      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.myPosts.indexOf(item);
      this.myPosts.splice(index, 1);
      this.$store.dispatch(DELETE_POST_ENTERPRISE, {
        id: item.id
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
      // var flag = true;
      // if (
      //   isNaN(this.editedItem.weight) ||
      //   this.editedItem.weight > 1 ||
      //   this.editedItem.weight < 0 ||
      //   isNaN(this.editedItem.lowestMark) ||
      //   this.editedItem.lowestMark > 100 ||
      //   this.editedItem.lowestMark < 0
      // ) {
      //   flag = false;
      // }
      if (this.editedIndex > -1) {
        this.$store.dispatch(UPDATE_POST_ENTERPRISE, {
          id: this.myPosts[this.editedIndex].id,
          post: {
            name: this.editedItem.name,
            detail: this.editedItem.detail,
            count: this.editedItem.count,
            salary: this.editedItem.salary
          },
          startTime:
            this.editedItem.start1 + " " + this.editedItem.start2 + ":00",
          endTime: this.editedItem.end1 + " " + this.editedItem.end2 + ":00"
        });
      } else {
        this.$store.dispatch(ADD_POST_ENTERPRISE, {
          post: {
            name: this.editedItem.name,
            detail: this.editedItem.detail,
            count: this.editedItem.count,
            salary: this.editedItem.salary
          },
          startTime:
            this.editedItem.start1 + " " + this.editedItem.start2 + ":00",
          endTime: this.editedItem.end1 + " " + this.editedItem.end2 + ":00"
        });
      }
      this.close();
    }
  }
};
</script>
