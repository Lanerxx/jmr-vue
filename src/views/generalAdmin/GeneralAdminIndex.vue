<template>
  <v-container fluid class="grey lighten-5">
    <v-row align="stretch" justify="space-around" top="120">
      <v-col cols="3">
        <v-card class="mx-auto" width="380" min-height="640" outlined>
          <v-list>
            <v-list-item to="/generalAdminBasicInformation">
              <v-list-item-icon>
                <v-icon>mdi-account-circle</v-icon>
              </v-list-item-icon>
              <v-list-item-title>个人信息</v-list-item-title>
            </v-list-item>

            <v-list-item to="/generalAdminSafetyInformation">
              <v-list-item-icon>
                <v-icon>mdi-lock</v-icon>
              </v-list-item-icon>
              <v-list-item-title>安全信息</v-list-item-title>
            </v-list-item>

            <v-list-group prepend-icon="mdi-home" value="true">
              <template v-slot:activator>
                <v-list-item-title>工作区域</v-list-item-title>
              </template>

              <v-list-group no-action sub-group>
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>信息管理</v-list-item-title>
                  </v-list-item-content>
                </template>

                <v-list-item to="/generalAdminCompanyInformation">
                  <v-list-item-title>公司信息</v-list-item-title>
                  <v-list-item-icon>
                    <v-icon>mdi-domain</v-icon>
                  </v-list-item-icon>
                </v-list-item>

                <v-list-item to="/generalAdminStudentInformation">
                  <v-list-item-title>学生信息</v-list-item-title>
                  <v-list-item-icon>
                    <v-icon>mdi-school</v-icon>
                  </v-list-item-icon>
                </v-list-item>

                <v-list-item to="/generalAdminJobDirectorInformation">
                  <v-list-item-title>就业专员信息</v-list-item-title>
                  <v-list-item-icon>
                    <v-icon>mdi-account-circle</v-icon>
                  </v-list-item-icon>
                </v-list-item>

                <v-list-item to="/generalAdminPositionInformation">
                  <v-list-item-title>岗位信息</v-list-item-title>
                  <v-list-item-icon>
                    <v-icon>mdi-receipt</v-icon>
                  </v-list-item-icon>
                </v-list-item>

                <v-list-item to="/generalAdminProfessionInformation">
                  <v-list-item-title>专业信息</v-list-item-title>
                  <v-list-item-icon>
                    <v-icon>mdi-receipt</v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </v-list-group>

              <v-list-group sub-group no-action>
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>匹配信息</v-list-item-title>
                  </v-list-item-content>
                </template>

                <v-list-item to="/generalAdminStudentMatchResultInformation">
                  <v-list-item-title>SMR</v-list-item-title>
                  <v-list-item-icon>
                    <v-icon>mdi-domain</v-icon>
                  </v-list-item-icon>
                </v-list-item>

                <v-list-item to="/generalAdminJobMatchResultInformation">
                  <v-list-item-title>JMR</v-list-item-title>
                  <v-list-item-icon>
                    <v-icon>mdi-school</v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </v-list-group>

              <v-list-group sub-group no-action>
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>报表统计</v-list-item-title>
                  </v-list-item-content>
                </template>

                <v-list-item to="/generalAdminCompanyStatisticsInformation">
                  <v-list-item-title>企业统计</v-list-item-title>
                  <v-list-item-icon>
                    <v-icon>mdi-domain</v-icon>
                  </v-list-item-icon>
                </v-list-item>

                <v-list-item to="/generalAdminStudentStatisticsInformation">
                  <v-list-item-title>高校统计</v-list-item-title>
                  <v-list-item-icon>
                    <v-icon>mdi-school</v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </v-list-group>
            </v-list-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="9">
        <router-view id="router" :key="$route.path"></router-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({})
};
</script>
