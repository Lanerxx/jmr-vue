<template>
  <v-container class="grey lighten-5">
    <v-row>
      <v-col><br /></v-col>
    </v-row>
    <v-row>
      <v-col cols="2"></v-col>
      <v-col cols="8">
        <router-view id="router" :key="$route.path"></router-view>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2"></v-col>
      <v-col cols="4">
        <v-btn
          x-large
          class="ma-2"
          tile
          outlined
          color="#00796B"
          block
          to="/companyLogin"
        >
          <v-icon left>mdi-domain</v-icon>
          企业端
        </v-btn>
      </v-col>
      <v-col cols="4">
        <v-btn
          x-large
          class="ma-2"
          tile
          outlined
          color="#00796B"
          to="/studentLogin"
          block
        >
          <v-icon left>mdi-school</v-icon>
          学生端
        </v-btn>
      </v-col>
      <v-col cols="2"></v-col>
    </v-row>
    <v-row>
      <v-col cols="2"></v-col>
      <v-col cols="4">
        <v-btn
          x-large
          class="ma-2"
          tile
          outlined
          color="#00796B"
          block
          to="/adminLogin"
        >
          <v-icon left>mdi-lock</v-icon>
          管理端
        </v-btn>
      </v-col>
      <v-col cols="4">
        <v-btn
          x-large
          class="ma-2"
          tile
          outlined
          color="#00796B"
          block
          to="/jobDirectorLogin"
        >
          <v-icon left>mdi-account-circle</v-icon>
          就业专员端
        </v-btn>
      </v-col>
      <v-col cols="2"></v-col>
    </v-row>
  </v-container>
</template>
