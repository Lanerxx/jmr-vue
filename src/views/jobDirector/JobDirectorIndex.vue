<template>
  <v-container fluid class="grey lighten-5">
    <v-row align="stretch" justify="space-around" top="120">
      <v-col cols="3">
        <v-card class="mx-auto" width="380" min-height="640" outlined>
          <v-list>
            <v-list-item to="/jobDirectorBasicInformation">
              <v-list-item-icon>
                <v-icon>mdi-account-circle</v-icon>
              </v-list-item-icon>
              <v-list-item-title>个人信息</v-list-item-title>
            </v-list-item>

            <v-list-item to="/jobDirectorSafetyInformation">
              <v-list-item-icon>
                <v-icon>mdi-lock</v-icon>
              </v-list-item-icon>
              <v-list-item-title>安全信息</v-list-item-title>
            </v-list-item>

            <v-list-group prepend-icon="mdi-home" value="true">
              <template v-slot:activator>
                <v-list-item-title>工作区域</v-list-item-title>
              </template>

              <v-list-group no-action sub-group value="true">
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>信息预览</v-list-item-title>
                  </v-list-item-content>
                </template>

                <v-list-item to="/jobDirectorCompanyJob">
                  <v-list-item-title>公司信息</v-list-item-title>
                  <v-list-item-icon>
                    <v-icon>mdi-domain</v-icon>
                  </v-list-item-icon>
                </v-list-item>

                <v-list-item to="/jobDirectorStudentResume">
                  <v-list-item-title>学生信息</v-list-item-title>
                  <v-list-item-icon>
                    <v-icon>mdi-school</v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </v-list-group>

              <v-list-group sub-group no-action>
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>匹配信息</v-list-item-title>
                  </v-list-item-content>
                </template>

                <v-list-item to="/jobDirectorStudentMatchResult">
                  <v-list-item-title>SMR</v-list-item-title>
                  <v-list-item-icon>
                    <v-icon>mdi-domain</v-icon>
                  </v-list-item-icon>
                </v-list-item>

                <v-list-item to="/jobDirectorJobMatchResult">
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

                <v-list-item to="/jobDirectorCompanyStatistics">
                  <v-list-item-title>企业统计</v-list-item-title>
                  <v-list-item-icon>
                    <v-icon>mdi-domain</v-icon>
                  </v-list-item-icon>
                </v-list-item>

                <v-list-item to="/jobDirectorStudentStatistics">
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
