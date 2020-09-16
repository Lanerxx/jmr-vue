<template>
  <div>
    <v-app-bar
      app
      absolute
      color="#43a047"
      dark
      shrink-on-scroll
      prominent
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-5"
      scroll-threshold="500"
      max-height="100px"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>
      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            class="ma-2 font-italic font-weight-bold"
            x-large
            text
            color="#004D40"
          >
            大学生岗位匹配系统
          </v-btn>
        </template>
        <span>主页</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="ma-2"
            outlined
            fab
            color="#80CBC4"
            v-bind="attrs"
            v-on="on"
            to="/help"
          >
            <v-icon>mdi-format-list-bulleted-square</v-icon>
          </v-btn>
        </template>
        <span>帮助</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="ma-2"
            outlined
            fab
            color="#4DD0E1"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>
        <span>登出</span>
      </v-tooltip>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  methods: {}
};
</script>
