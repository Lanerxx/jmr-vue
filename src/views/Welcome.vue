<template>
  <v-container fluid class="grey lighten-5">
    <v-row align="stretch" justify="space-around">
      <v-col>
        <MyHeader id="MyHeader" />
      </v-col>
    </v-row>
    <v-row align="stretch" justify="space-around" top="120">
      <eIndex id="eIndex" v-if="isCompany" />
      <sIndex id="sIndex" v-if="isStudent" />
      <asIndex id="asIndex" v-if="isSystemAdmin" />
      <gsIndex id="gsIndex" v-if="isGeneralAdmin" />
      <jIndex id="jIndex" v-if="isJobDirector" />
    </v-row>
    <v-row>
      <MyFooter id="MyFooter" />
    </v-row>
  </v-container>
</template>
<script>
import MyFooter from "@/views/Footer.vue";
import MyHeader from "@/views/Header.vue";
import { mapState } from "vuex";

export default {
  components: {
    sIndex: () => import("@/views/student/StudentIndex.vue"),
    eIndex: () => import("@/views/company/CompanyIndex.vue"),
    asIndex: () => import("@/views/systemAdmin/SystemAdminIndex.vue"),
    gsIndex: () => import("@/views/generalAdmin/GeneralAdminIndex.vue"),
    jIndex: () => import("@/views/jobDirector/JobDirectorIndex.vue"),
    MyHeader,
    MyFooter
  },
  computed: {
    ...mapState([
      "isLogin",
      "isCompany",
      "isSystemAdmin",
      "isGeneralAdmin",
      "isJobDirector",
      "isStudent"
    ])
  }
};
</script>
