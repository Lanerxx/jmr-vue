<template>
  <div>
    {{ this.oldPassword }}
    {{ this.newPassword }}
    {{ this.newPasswordR }}
    <v-expansion-panels v-model="panel" :readonly="readonly" multiple>
      <v-expansion-panel>
        <v-expansion-panel-header>
          --- 学号 : 暂无
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          学号作为学生的唯一标识，不可更改。
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          --- 密码 : **********
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-btn
            class="ma-2"
            fab
            outlined
            color="indigo"
            small
            @click.stop="dialog = true"
          >
            修改
          </v-btn>
          <v-dialog v-model="dialog" max-width="350">
            <v-card>
              <v-card-text class="text">
                <form>
                  <v-card-title class="title">
                    Update Your Password
                  </v-card-title>
                  <v-text-field
                    color="teal"
                    v-model="oldPassword"
                    label="请输入旧密码"
                    required
                    type="password"
                  ></v-text-field>
                  <v-text-field
                    color="teal"
                    v-model="newPassword"
                    label="请输入新密码"
                    required
                    type="password"
                  ></v-text-field>
                  <v-text-field
                    color="teal"
                    v-model="newPasswordR"
                    label="请重复输入新密码"
                    required
                    type="password"
                  ></v-text-field>
                  <v-spacer></v-spacer>
                </form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="green darken-1" text @click="dialog = false">
                  Cancel
                </v-btn>

                <v-btn color="green darken-1" text @click="updatePsw()">
                  Update
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          --- 手机号 : {{ student.s_telephone }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          待扩张····
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { GET_INDEX_STUDENT } from "@/store/types.js";
import { UPDATE_PASSWORD_STUDENT } from "@/store/types.js";
import { GET_EXCEPTION } from "@/store/types.js";

import { mapState } from "vuex";

export default {
  data: () => ({
    dialog: false,
    newPassword: null,
    newPasswordR: null,
    oldPassword: null,
    panel: [0, 1],
    readonly: true
  }),
  created() {
    this.$store.dispatch(GET_INDEX_STUDENT);
  },

  computed: {
    ...mapState(["student"])
  },
  methods: {
    updatePsw() {
      this.dialog = false;
      var flag = true;
      if (this.newPassword != this.newPasswordR) {
        flag = false;
      }
      if (flag) {
        this.$store.dispatch(UPDATE_PASSWORD_STUDENT, {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword
        });
      } else {
        this.$store.commit(GET_EXCEPTION, {
          message: "两次输入的密码不一致"
        });
      }
    }
  }
};
</script>
