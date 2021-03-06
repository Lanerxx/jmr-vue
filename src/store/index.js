import Vue from "vue";
import Vuex from "vuex";
import * as types from "./types";
import axios from "@/axios/MyAxios";
import { updateRoutes } from "@/router/index";
import { author } from "@/util/Const";

Vue.use(Vuex);

const myState = {
  exception: { message: null },
  isLogin: false,
  user: null,
  positions: [],
  professions: [],
  professionsMClass: [],
  professionMClassVos: [],
  professionsSClass: [],
  flag: null,

  //system-admin
  isSystemAdmin: false,

  //general-admin
  isGeneralAdmin: false,
  generalAdmins: [],

  //job-director
  isJobDirector: false,
  jobDirectors: [],

  //company
  isCompany: false,
  company: null,
  companies: [],
  companyJobs: [],
  studentMatchResults: [],
  myJobs: [],

  //student
  isStudent: false,
  student: null,
  students: [],
  studentResumes: [],
  jobMatchResults: [],
  myResumes: []
};

const myMutations = {
  [types.GET_EXCEPTION](state, data) {
    state.exception = data;
  },
  [types.LOGIN](state, data) {
    state.isLogin = data;
  },
  [types.UPDATE_USER](state, data) {
    state.user = data;
  },
  [types.LIST_STUDENTS](state, data) {
    state.students = data;
  },
  [types.GET_STUDENT](state, data) {
    state.student = data;
  },
  [types.LIST_COMPANIES](state, data) {
    state.companies = data;
  },
  [types.GET_COMPANY](state, data) {
    state.company = data;
  },
  [types.LIST_JOB_MATCH_RESULT](state, data) {
    state.jobMatchResults = data;
  },
  [types.LIST_STUDENT_MATCH_RESULT](state, data) {
    state.studentMatchResults = data;
  },
  [types.LIST_STUDENTRESUMES](state, data) {
    state.studentResumes = data;
  },
  [types.LIST_COMPANYJOBS](state, data) {
    state.companyJobs = data;
  },
  //position
  [types.LIST_POSITIONS](state, data) {
    state.positions = data;
  },
  //profession
  [types.LIST_PROFESSIONSMCLASS](state, data) {
    state.professionsMClass = data;
  },
  [types.LIST_PROFESSIONSSCLASS](state, data) {
    state.professionsSClass = data;
  },
  //system-admin
  [types.CERTI_SYSTEM_ADMIN](state, data) {
    state.isSystemAdmin = data;
  },
  //general-admin
  [types.CERTI_GENERAL_ADMIN](state, data) {
    state.isGeneralAdmin = data;
  },
  [types.LIST_PROFESIONMCALSSVO_ADMIN](state, data) {
    state.professionMClassVos = data;
  },
  [types.LIST_JOB_DIRECOR_ADMIN](state, data) {
    state.jobDirectors = data;
  },
  //job-director
  [types.CERTI_JOB_DIRECTOR](state, data) {
    state.isJobDirector = data;
  },
  //company
  [types.CERTI_COMPANY](state, data) {
    state.isCompany = data;
  },
  [types.REGISTER_COMPANY](state, data) {
    state.company = data;
  },
  [types.LIST_JOBS_COMPANY](state, data) {
    state.myJobs = data;
  },
  [types.MATCH_COMPANYJOB_COMPANY](state, data) {
    state.studentMatchResults = data;
  },
  //student
  [types.REGISTER_STUDENT](state, data) {
    state.student = data;
  },
  [types.CERTI_STUDENT](state, data) {
    state.isStudent = data;
  },
  [types.LIST_RESUMES_STUDENT](state, data) {
    state.myResumes = data;
  },
  [types.MATCH_STUDENTRESUME_STUDENT](state, data) {
    state.jobMatchResults = data;
  }
};

const myActions = {
  // ------以下为向springboot发出请求
  // 需要取消mock，配置后端跨域
  //-------Login-------
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

  async [types.UPDATE_USER]({ commit }, data) {
    commit(types.UPDATE_USER, data.user);
  },

  //-------Register-------
  async [types.GET_REGISTER_INDEX]({ commit }) {
    let resp = await axios.get("register/index");
    commit(types.LIST_POSITIONS, resp.data.positions);
    commit(types.LIST_PROFESSIONSMCLASS, resp.data.professionsMClass);
  },
  async [types.GET_REGISTER_INDEX_SCLASS]({ commit }, data) {
    let resp = await axios.post("register/index/professionsSClass", data);
    commit(types.LIST_PROFESSIONSSCLASS, resp.data.professionsSClass);
  },
  //-------Admin-------
  async [types.LIST_STUDENTS_ADMIN]({ commit }) {
    let resp = await axios.get("generalAdmin/students");
    commit(types.LIST_STUDENTS, resp.data.students);
  },
  async [types.LIST_JOB_MATCH_RESULT_ADMIN]({ commit }, data) {
    let resp = await axios.get(`generalAdmin/jmr/${data.sid}`);
    commit(types.LIST_JOB_MATCH_RESULT, resp.data.jobMatchResults);
  },
  async [types.GET_STUDENT_ADMIN]({ commit }, data) {
    let resp = await axios.get(`generalAdmin/student/${data.sid}`);
    commit(types.GET_STUDENT, resp.data.student);
  },
  async [types.LIST_STUDENTRESUMES_ADMIN]({ commit }, data) {
    let resp = await axios.get(`generalAdmin/studentResume/${data.sid}`);
    commit(types.LIST_STUDENTRESUMES, resp.data.studentResumeVos);
  },
  async [types.LIST_COMPANIES_ADMIN]({ commit }) {
    let resp = await axios.get("generalAdmin/companies");
    commit(types.LIST_COMPANIES, resp.data.companies);
  },
  async [types.LIST_STUDENT_MATCH_RESULT_ADMIN]({ commit }, data) {
    let resp = await axios.get(`generalAdmin/smr/${data.cid}`);
    commit(types.LIST_STUDENT_MATCH_RESULT, resp.data.studentMatchResults);
  },
  async [types.GET_COMPANY_ADMIN]({ commit }, data) {
    let resp = await axios.get(`generalAdmin/company/${data.cid}`);
    commit(types.GET_COMPANY, resp.data.company);
  },
  async [types.LIST_COMPANYJOBS_ADMIN]({ commit }, data) {
    let resp = await axios.get(`generalAdmin/companyJob/${data.cid}`);
    commit(types.LIST_COMPANYJOBS, resp.data.companyJobs);
  },
  async [types.LIST_POSITIONS_ADMIN]({ commit }) {
    let resp = await axios.get("generalAdmin/positions");
    commit(types.LIST_POSITIONS, resp.data.positions);
  },
  async [types.LIST_PROFESIONMCALSSVO_ADMIN]({ commit }) {
    let resp = await axios.get("generalAdmin/professionMClassVo");
    commit(types.LIST_PROFESIONMCALSSVO_ADMIN, resp.data.professionMClassVos);
  },
  async [types.LIST_PROFESSIONSSCLASS_ADMIN]({ commit }, data) {
    let resp = await axios.post("generalAdmin/professionsSClass", data);
    commit(types.LIST_PROFESSIONSSCLASS, resp.data.professionsSClass);
  },
  async [types.LIST_JOB_DIRECOR_ADMIN]({ commit }, data) {
    let resp = await axios.get("generalAdmin/jobDirector", data);
    commit(types.LIST_JOB_DIRECOR_ADMIN, resp.data.jobDirectors);
  },
  //-------Company-------
  async [types.REGISTER_COMPANY]({ commit }, data) {
    let resp = await axios.post("register/company", data);
    commit(types.REGISTER_COMPANY, resp.data.company);
    commit(types.UPDATE_USER, resp.data.company);
  },
  async [types.UPDATE_PASSWORD_COMPANY]({ commit }, data) {
    let resp = await axios.patch("company/password", data);
    commit(types.GET_COMPANY, resp.data.company);
  },
  async [types.GET_INDEX_COMPANY]({ commit }) {
    let resp = await axios.get("company/index");
    commit(types.GET_COMPANY, resp.data.company);
  },
  async [types.LIST_JOBS_COMPANY]({ commit }) {
    let resp = await axios.get("company/jobs");
    commit(types.LIST_JOBS_COMPANY, resp.data.companyJobs);
    commit(types.LIST_POSITIONS, resp.data.positions);
    commit(types.LIST_PROFESSIONSMCLASS, resp.data.professionsMClass);
  },
  async [types.UPDATE_JOB_COMPANY]({ commit }, data) {
    let resp = await axios.patch("company/job", data);
    commit(types.LIST_JOBS_COMPANY, resp.data.companyJobs);
  },
  async [types.ADD_JOB_COMPANY]({ commit }, data) {
    let resp = await axios.post("company/job", data);
    commit(types.LIST_JOBS_COMPANY, resp.data.companyJobs);
  },
  async [types.DELETE_JOB_COMPANY]({ commit }, data) {
    let resp = await axios.delete(`company/job/${data.jid}`);
    commit(types.LIST_JOBS_COMPANY, resp.data.companyJobs);
  },
  async [types.MATCH_COMPANYJOB_COMPANY]({ commit }, data) {
    let resp = await axios.get(`company/smr/${data.cjid}`);
    commit(types.MATCH_COMPANYJOB_COMPANY, resp.data.studentMatchResults);
  },
  async [types.ADD_COMPANYJOB_COMPANY]({ commit }, data) {
    let resp = await axios.post("company/companyJob", data);
    commit(types.LIST_JOBS_COMPANY, resp.data.companyJobs);
  },
  async [types.UPDATE_COMPANYJOB_COMPANY]({ commit }, data) {
    let resp = await axios.patch(`company/companyJob/${data.jid}`);
    commit(types.LIST_JOBS_COMPANY, resp.data.companyJobs);
  },
  async [types.UPDATE_INFORMATION_COMPANY]({ commit }, data) {
    let resp = await axios.patch("company/information", data);
    commit(types.GET_COMPANY, resp.data.company);
  },

  //-------Student-------
  async [types.REGISTER_STUDENT]({ commit }, data) {
    let resp = await axios.post("register/student", data);
    commit(types.REGISTER_STUDENT, resp.data);
    commit(types.UPDATE_USER, resp.data.student);
  },
  async [types.UPDATE_PASSWORD_STUDENT]({ commit }, data) {
    let resp = await axios.patch("student/password", data);
    commit(types.GET_STUDENT, resp.data.student);
  },
  async [types.GET_INDEX_STUDENT]({ commit }) {
    let resp = await axios.get("student/index");
    commit(types.GET_STUDENT, resp.data.student);
    commit(types.LIST_POSITIONS, resp.data.positions);
    commit(types.LIST_PROFESSIONSMCLASS, resp.data.professionsMClass);
  },
  async [types.UPDATE_INFORMATION_STUDENT]({ commit }, data) {
    let resp = await axios.patch("student/information", data);
    commit(types.GET_STUDENT, resp.data.student);
  },
  async [types.LIST_RESUMES_STUDENT]({ commit }) {
    let resp = await axios.get("student/resumes");
    commit(types.LIST_RESUMES_STUDENT, resp.data.studentResumeVos);
  },
  async [types.ADD_RESUME_STUDENT]({ commit }, data) {
    let resp = await axios.post("student/resume", data);
    commit(types.LIST_RESUMES_STUDENT, resp.data.studentResumeVos);
  },
  async [types.DELETE_RESUME_STUDENT]({ commit }, data) {
    let resp = await axios.delete(`student/resume/${data.rid}`);
    commit(types.LIST_RESUMES_STUDENT, resp.data.studentResumeVos);
  },
  async [types.UPDATE_RESUME_STUDENT]({ commit }, data) {
    let resp = await axios.patch("student/resume", data);
    commit(types.LIST_RESUMES_STUDENT, resp.data.studentResumeVos);
  },
  async [types.ADD_STUDENTRESUME_STUDENT]({ commit }, data) {
    let resp = await axios.post("student/studentResume", data);
    commit(types.LIST_RESUMES_STUDENT, resp.data.studentResumeVos);
  },
  async [types.DELETE_STUDENTRESUME_STUDENT]({ commit }, data) {
    let resp = await axios.delete(`student/studentResume/${data.rid}`);
    commit(types.LIST_RESUMES_STUDENT, resp.data.studentResumeVos);
  },
  async [types.MATCH_STUDENTRESUME_STUDENT]({ commit }) {
    let resp = await axios.get("student/jmr");
    commit(types.MATCH_STUDENTRESUME_STUDENT, resp.data.jobMatchResults);
  },

  //-------JobDirector-------
  async [types.LIST_STUDENTS_JOB_DIRECTOR]({ commit }) {
    let resp = await axios.get("jobDirector/students");
    commit(types.LIST_STUDENTS, resp.data.students);
  },
  async [types.LIST_JOB_MATCH_RESULT_JOB_DIRECTOR]({ commit }, data) {
    let resp = await axios.get(`jobDirector/jmr/${data.sid}`);
    commit(types.LIST_JOB_MATCH_RESULT, resp.data.jobMatchResults);
  },
  async [types.GET_STUDENT_JOB_DIRECTOR]({ commit }, data) {
    let resp = await axios.get(`jobDirector/student/${data.sid}`);
    commit(types.GET_STUDENT, resp.data.student);
  },
  async [types.LIST_STUDENTRESUMES_JOB_DIRECTOR]({ commit }, data) {
    let resp = await axios.get(`jobDirector/studentResume/${data.sid}`);
    commit(types.LIST_STUDENTRESUMES, resp.data.studentResumeVos);
  },
  async [types.LIST_COMPANIES_JOB_DIRECTOR]({ commit }) {
    let resp = await axios.get("jobDirector/companies");
    commit(types.LIST_COMPANIES, resp.data.companies);
  },
  async [types.LIST_STUDENT_MATCH_RESULT_JOB_DIRECTOR]({ commit }, data) {
    let resp = await axios.get(`jobDirector/smr/${data.cid}`);
    commit(types.LIST_STUDENT_MATCH_RESULT, resp.data.studentMatchResults);
  },
  async [types.GET_COMPANY_JOB_DIRECTOR]({ commit }, data) {
    let resp = await axios.get(`jobDirector/company/${data.cid}`);
    commit(types.GET_COMPANY, resp.data.company);
  },
  async [types.LIST_COMPANYJOBS_JOB_DIRECTOR]({ commit }, data) {
    let resp = await axios.get(`jobDirector/companyJob/${data.cid}`);
    commit(types.LIST_COMPANYJOBS, resp.data.companyJobs);
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
