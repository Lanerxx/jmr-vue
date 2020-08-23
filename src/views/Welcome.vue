<template>
  <v-container fluid class="grey lighten-5">
    <v-row>
      <v-col><br /></v-col>
    </v-row>
    <v-row align="stretch" justify="space-around" top="120">
      <eIndex id="eIndex" v-if="isCompany" />
      <sIndex id="sIndex" v-if="isStudent" />
      <asIndex id="asIndex" v-if="isSystemAdmin" />
      <gsIndex id="gsIndex" v-if="isGeneralAdmin" />
      <jIndex id="jIndex" v-if="isJobDirector" />
    </v-row>
  </v-container>
</template>
<script>
import { mapState } from "vuex";

export default {
  components: {
    sIndex: () => import("@/views/student/StudentIndex.vue"),
    eIndex: () => import("@/views/company/CompanyIndex.vue"),
    asIndex: () => import("@/views/systemAdmin/SystemAdminIndex.vue"),
    gsIndex: () => import("@/views/generalAdmin/GeneralAdminIndex.vue"),
    jIndex: () => import("@/views/jobDirector/JobDirectorIndex.vue")
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
