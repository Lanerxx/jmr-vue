<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="students"
      sort-by="s_name"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>学生</v-toolbar-title>
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
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn
          class="ma-2"
          outlined
          color="teal"
          :to="`/jobDirectorStudentResumeDetail/${item.s_id}`"
        >
          简历详情
        </v-btn>
      </template>
    </v-data-table>
    <br />
  </div>
</template>

<script>
import { LIST_STUDENTS_JOB_DIRECTOR } from "@/store/types.js";

import { mapState } from "vuex";
export default {
  data: () => ({
    search: "",
    headers: [
      {
        text: "姓名",
        align: "start",
        sortable: false,
        value: "s_name"
      },
      { text: "学历", value: "s_e_history" },
      { text: "性别", value: "s_sex" },
      { text: "学校", value: "s_college" },
      { text: "学校", value: "s_c_level" },
      { text: "操作", value: "actions", sortable: false }
    ]
  }),

  computed: {
    ...mapState(["students"])
  },

  created() {
    this.$store.dispatch(LIST_STUDENTS_JOB_DIRECTOR);
  },

  methods: {
    reset() {
      this.$store.dispatch(LIST_STUDENTS_JOB_DIRECTOR);
    }
  }
};
</script>
