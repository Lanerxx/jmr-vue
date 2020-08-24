import Vue from "vue";
import Vuex from "vuex";
import * as types from "./types";
import axios from "@/axios/MyAxios";
import { updateRoutes } from "@/router/index";
import { author } from "@/util/Const";

Vue.use(Vuex);

const myState = {
  exception: { message: null },
  isSystemAdmin: false,
  isGeneralAdmin: false,
  isStudent: false,
  isCompany: false,
  isJobDirector: false,
  isLogin: false,
  notLogin: true,
  user: null,
  admin: null,
  company: null,
  companies: [],
  student: null,
  students: [],
  matchStudent: [],
  posts: [],
  myJobs: [],
  qualified: null,
  rankingIndex: null,
  flag: null,
  studentP: null
};

const myMutations = {
  [types.GET_EXCEPTION](state, data) {
    state.exception = data;
  },
  [types.LOGIN](state, data) {
    state.isLogin = data;
  },
  [types.REGISTER](state, data) {
    state.user = data;
  },
  [types.CERTI_SYSTEM_ADMIN](state, data) {
    state.isSystemAdmin = data;
  },
  [types.CERTI_GENERAL_ADMIN](state, data) {
    state.isGeneralAdmin = data;
  },
  [types.CERTI_STUDENT](state, data) {
    state.isStudent = data;
  },
  [types.CERTI_COMPANY](state, data) {
    state.isCompany = data;
  },
  [types.CERTI_JOB_DIRECTOR](state, data) {
    state.isJobDirector = data;
  },
  [types.LIST_POSITIONS](state, data) {
    state.positions = data;
  },
  [types.LIST_PROFESSIONS](state, data) {
    state.professions = data;
  },
  [types.GET_COMPANY](state, data) {
    state.company = data;
  },
  [types.LIST_JOBS_COMPANY](state, data) {
    state.myJobs = data;
  }
};

const myActions = {
  // 登录
  // ------以下为向springboot发出请求
  // 需要取消mock，配置后端跨域
  async [types.LOGIN]({ commit }, data) {
    let resp = await axios.post("login", data);
    let auth = resp.headers[author];
    if (auth != null) {
      sessionStorage.setItem(author, auth);
      sessionStorage.setItem("role", resp.data.role);
      updateRoutes();
      switch (sessionStorage.getItem("role")) {
        case systemAdminRole:
          commit(types.CERTI_SYSTEM_ADMIN, true);
          break;
        case generalAdminRole:
          commit(types.CERTI_GENERAL_ADMIN, true);
          break;
        case studentRole:
          commit(types.CERTI_STUDENT, true);
          break;
        case companyRole:
          commit(types.CERTI_COMPANY, true);
          break;
        case jobDirectorRole:
          commit(types.CERTI_JOB_DIRECTOR, true);
          break;
      }
      commit(types.LOGIN, true);
    }
  },
  async [types.UPDATE_PASSWORD]({ commit }, data) {
    console.log(data);
    let resp = await axios.patch("user/password", data);
    commit(types.UPDATE_PASSWORD, resp.data);
  },
  async [types.REGISTER_ENTERPRISE]({ commit }, data) {
    let resp = await axios.post("register/enterprise", data);
    commit(types.REGISTER, resp.data);
  },
  async [types.REGISTER_STUDENT]({ commit }, data) {
    let resp = await axios.post("register/student", data);
    commit(types.REGISTER, resp.data);
  },

  async [types.UPDATE_USER]({ commit }, data) {
    commit(types.UPDATE_USER, data.user);
  },
  async [types.GET_INDEX_ADMIN]({ commit }) {
    let resp = await axios.get("admin/index");
    commit(types.GET_ADMIN, resp.data.admin);
  },
  async [types.GET_STUDENTS_ADMIN]({ commit }) {
    let resp = await axios.get("admin/students");
    commit(types.GET_STUDENTS_ADMIN, resp.data.students);
  },
  async [types.ADD_STUDENT_ADMIN]({ commit }, data) {
    let resp = await axios.post("admin/student", data);
    commit(types.GET_STUDENTS_ADMIN, resp.data.students);
  },
  async [types.ADD_STUDENTSINFO_ADMIN]({ commit }, data) {
    let resp = await axios.post("admin/studentInformation", data);
    commit(types.GET_STUDENTS_ADMIN, resp.data.students);
  },
  async [types.DELETE_STUDENT_ADMIN]({ commit }, data) {
    console.log(data);
    let resp = await axios.delete(`admin/student/${data.id}`);
    commit(types.GET_STUDENTS_ADMIN, resp.data.students);
  },
  async [types.GET_ENTERPRISES_ADMIN]({ commit }) {
    let resp = await axios.get("admin/enterprises");
    commit(types.GET_ENTERPRISES_ADMIN, resp.data.enterprises);
  },
  async [types.ADD_ENTERPRISE_ADMIN]({ commit }, data) {
    let resp = await axios.post("admin/enterprise", data);
    commit(types.GET_ENTERPRISES_ADMIN, resp.data.enterprises);
  },
  async [types.DELETE_ENTERPRISE_ADMIN]({ commit }, data) {
    let resp = await axios.delete(`admin/enterprise/${data.id}`);
    commit(types.GET_ENTERPRISES_ADMIN, resp.data.enterprises);
  },
  async [types.GET_INDEX_STUDENT]({ commit }) {
    let resp = await axios.get("student/index");
    commit(types.GET_STUDENT, resp.data.student);
    commit(types.GET_POSTS_STUDENT, resp.data.posts);
  },
  //-------Company-------
  async [types.GET_INDEX_COMPANY]({ commit }) {
    let resp = await axios.get("company/index");
    commit(types.GET_COMPANY, resp.data.company);
  },
  async [types.LIST_JOBS_COMPANY]({ commit }) {
    let resp = await axios.get("company/jobs");
    commit(types.LIST_JOBS_COMPANY, resp.data.companyJobVos);
    commit(types.LIST_POSITIONS, resp.data.positions);
    commit(types.LIST_PROFESSIONS, resp.data.professions);
  },
  async [types.UPDATE_POST_ENTERPRISE]({ commit }, data) {
    let resp = await axios.patch(
      `enterprise/post/information/${data.id}`,
      data
    );
    commit(types.LIST_POSTS_ENTERPRISE, resp.data.posts);
  },
  async [types.ADD_POST_ENTERPRISE]({ commit }, data) {
    let resp = await axios.post("enterprise/post", data);
    commit(types.LIST_POSTS_ENTERPRISE, resp.data.posts);
  },
  async [types.DELETE_POST_ENTERPRISE]({ commit }, data) {
    let resp = await axios.delete(`enterprise/post/${data.id}`);
    commit(types.LIST_POSTS_ENTERPRISE, resp.data.posts);
  },
  async [types.MATCH_POST_ENTERPRISE]({ commit }, data) {
    console.log(data.id);
    let resp = await axios.get(`enterprise/match/post/${data.id}`);
    commit(types.MATCH_POST_ENTERPRISE, resp.data.students);
  }
};
export default new Vuex.Store({
  state: myState,
  mutations: myMutations,
  actions: myActions,
  modules: {}
});

// --------------------------
// 执行时判断，刷新时检测；也可以添加长度等更严格判断

const systemAdminRole = "f2ffae3f953b4983fe01";
const generalAdminRole = "e2ff673f953b4983fe0f";
const studentRole = "bb63e5f7e0f2ffae845c";
const companyRole = "6983f953b49c88210cb9";
const jobDirectorRole = "3483f953b49c88210cb5";

if (sessionStorage.getItem(author) != null) {
  myState.isLogin = true;
  myState.notLogin = false;
  let role = sessionStorage.getItem("role");
  if (role == systemAdminRole) myState.isSystemAdmin = true;
  if (role == generalAdminRole) {
    myState.isGeneralAdmin = true;
  }
  if (role == studentRole) myState.isStudent = true;
  if (role == companyRole) myState.isCompany = true;
  if (role == jobDirectorRole) myState.isJobDirector = true;
}
