<template>
  <div>
    <v-app-bar max-height="90px"></v-app-bar>
    <v-card color="basil">
      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold display-2 basil--text">Welcome</h1>
      </v-card-title>

      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tab>
          企业端
        </v-tab>
        <v-tab>
          学生端
        </v-tab>
        <v-tab>
          就业专业端
        </v-tab>
        <v-tab>
          管理端
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card color="basil" flat>
            <companyLogin id="companyLogin" />
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card color="basil" flat>
            <studentLogin id="studentLogin" />
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card color="basil" flat>
            <jobDiectorLogin id="jobDiectorLogin" />
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card color="basil" flat>
            <adminLogin id="adminLogin" />
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>
<script>
export default {
  components: {
    companyLogin: () => import("@/views/login/companyLogin.vue"),
    studentLogin: () => import("@/views/login/studentLogin.vue"),
    jobDiectorLogin: () => import("@/views/login/jobDirectorLogin.vue"),
    adminLogin: () => import("@/views/login/adminLogin.vue")
  },
  data() {
    return {
      tab: null
    };
  }
};
</script>

<style>
.basil--text {
  color: #356859 !important;
}
</style>
