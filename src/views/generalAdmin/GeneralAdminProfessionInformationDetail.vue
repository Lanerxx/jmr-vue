<template>
  <v-data-table
    :headers="headers"
    :items="professionsSClass"
    sort-by="calories"
    class="elevation-1"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>专业小类</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-btn
          color="rgba(0, 128, 128, 0.712)"
          text
          to="/generalAdminProfessionInformation"
        >
          返回大类
        </v-btn>
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

        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="rgba(0, 128, 128, 0.712)"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      color="teal"
                      v-model="editedItem.p_s_class"
                      label="专业小类名"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="teal" text @click="close">Cancel</v-btn>
              <v-btn color="teal" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="reset">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { LIST_PROFESSIONSSCLASS_ADMIN } from "@/store/types.js";

import { mapState } from "vuex";
export default {
  props: ["pid"],

  data: () => ({
    search: "",
    dialog: false,
    headers: [
      {
        text: "专业小类",
        align: "start",
        sortable: false,
        value: "p_s_class"
      },
      { text: "操作", value: "actions", sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      p_s_class: ""
    },
    defaultItem: {
      p_s_class: ""
    }
  }),
  created() {
    this.$store.dispatch(LIST_PROFESSIONSSCLASS_ADMIN, {
      p_id: this.$route.params.pid,
      p_m_class: "无",
      p_s_class: "无"
    });
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapState(["professionsSClass"])
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    reset() {
      this.$store.dispatch(LIST_PROFESSIONSSCLASS_ADMIN, {
        p_id: this.$route.params.pid,
        p_m_class: "无",
        p_s_class: "无"
      });
    },

    editItem(item) {
      this.editedIndex = this.professionsSClass.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.professionsSClass.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.professionsSClass.splice(index, 1);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(
          this.professionsSClass[this.editedIndex],
          this.editedItem
        );
      } else {
        this.professionsSClass.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
