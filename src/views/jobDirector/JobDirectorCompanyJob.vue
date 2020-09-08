<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="companies"
      sort-by="c_s_code"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>企业</v-toolbar-title>
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
          :to="`/jobDirectorCompanyJobDetail/${item.c_id}`"
        >
          岗位详情
        </v-btn>
      </template>
    </v-data-table>
    <br />
  </div>
</template>

<script>
import { LIST_COMPANIES_JOB_DIRECTOR } from "@/store/types.js";

import { mapState } from "vuex";
export default {
  data: () => ({
    search: "",
    headers: [
      {
        text: "企业名",
        align: "start",
        sortable: false,
        value: "c_name"
      },
      { text: "统一社会信用代码", value: "c_s_code" },
      { text: "联系电话", value: "c_telephone" },
      { text: "邮箱", value: "c_email" },
      { text: "操作", value: "actions", sortable: false }
    ]
  }),

  computed: {
    ...mapState(["companies"])
  },

  created() {
    this.$store.dispatch(LIST_COMPANIES_JOB_DIRECTOR);
  },

  methods: {
    reset() {
      this.$store.dispatch(LIST_COMPANIES_JOB_DIRECTOR);
    }
  }
};
</script>
