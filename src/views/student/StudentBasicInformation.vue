<template>
  <div>
    <v-toolbar flat color="white" class="toolbar" max-height="50"></v-toolbar>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-sheet elevation="1" class="pa-12">
            <v-row>
              <v-col cols="2">
                <v-subheader>企业名</v-subheader>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  color="teal"
                  label="Name"
                  v-model="company.c_name"
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-subheader>统一社会信用码</v-subheader>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  readonly=""
                  color="teal"
                  label="Code"
                  v-model="company.c_s_code"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="2">
                <v-subheader>企业详情</v-subheader>
              </v-col>
              <v-col cols="10">
                <v-text-field
                  color="teal"
                  label="Detail"
                  v-model="company.c_description"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="2">
                <v-subheader>联系人</v-subheader>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  color="teal"
                  label="Contact"
                  v-model="company.c_contact"
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-subheader>联系电话</v-subheader>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  readonly=""
                  color="teal"
                  label="Telephone"
                  v-model="company.c_telephone"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">
                <v-subheader>邮箱</v-subheader>
              </v-col>
              <v-col cols="10">
                <v-text-field
                  color="teal"
                  label="Email"
                  v-model="company.c_email"
                ></v-text-field>
              </v-col>
            </v-row>
            <div class="mt-12 text-right">
              <v-btn color="basil" outlined @click="submit">SUBMIT</v-btn>
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { GET_INDEX_COMPANY } from "@/store/types.js";
import { UPDATE_INFORMATION_COMPANY } from "@/store/types.js";
import { mapState } from "vuex";

export default {
  data: () => ({}),
  created() {
    this.$store.dispatch(GET_INDEX_COMPANY);
  },
  methods: {
    submit() {
      this.$store.dispatch(UPDATE_INFORMATION_COMPANY, {
        c_name: this.company.c_name,
        c_s_code: this.company.c_s_code,
        c_description: this.company.c_description,
        c_contact: this.company.c_contact,
        c_telephone: this.company.c_telephone,
        c_email: this.company.c_email
      });
    }
  },
  computed: {
    ...mapState(["company"])
  }
};
</script>
<style scoped>
.toolbar {
  margin-right: 10px;
  margin-left: 10px;
}
</style>
