import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 没有角色要求的默认路由
const routes = [
  {
    path: "/login",
    component: () => import("@/views/login/Login.vue")
  },
  {
    path: "/adminLogin",
    component: () => import("@/views/login/adminLogin.vue")
  },
  {
    path: "/companyLogin",
    component: () => import("@/views/login/companyLogin.vue")
  },
  {
    path: "/studentLogin",
    component: () => import("@/views/login/studentLogin.vue")
  },
  {
    path: "/jobDirectorLogin",
    component: () => import("@/views/login/jobDirectorLogin.vue")
  },
  {
    path: "/help",
    component: () => import("@/views/Help.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;

// --------------------------
// 后期追加的路由配置
let systemAdminRoutes = [];

let generalAdminRoutes = [];

let studentRoutes = [
  {
    path: "/studentBasicInformation",
    component: () => import("@/views/student/StudentBasicInformation")
  },
  {
    path: "/studentResumeInformation",
    component: () => import("@/views/student/StudentResumeInformation.vue")
  },
  {
    path: "/studentSafetyInformation",
    component: () => import("@/views/student/StudentSafetyInformation.vue")
  },
  {
    path: "/studentJobMatchResult",
    component: () => import("@/views/student/StudentJobMatchResult.vue")
  }
];

let companyRoutes = [
  {
    path: "/companyBasicInformation",
    component: () => import("@/views/company/CompanyBasicInformation")
  },
  {
    path: "/companyJobInformation",
    component: () => import("@/views/company/CompanyJobInformation.vue")
  },
  {
    path: "/companySafetyInformation",
    component: () => import("@/views/company/CompanySafetyInformation.vue")
  },
  {
    path: "/companyStudentMatchResult/:cjid",
    component: () => import("@/views/company/CompanyStudentMatchResult.vue")
  }
];

let jobDirectorRoutes = [
  {
    path: "/jobDirectorBasicInformation",
    component: () => import("@/views/jobDirector/JobDirectorBasicInformation")
  },
  {
    path: "/jobDirectorCompanyStatistics",
    component: () =>
      import("@/views/jobDirector/JobDirectorCompanyStatistics.vue")
  },
  {
    path: "/jobDirectorCompanyJob",
    component: () => import("@/views/jobDirector/JobDirectorCompanyJob.vue")
  },
  {
    path: "/jobDirectorJobMatchResult",
    component: () => import("@/views/jobDirector/JobDirectorJobMatchResult.vue")
  },
  {
    path: "/jobDirectorJobMatchResult/:sid",
    component: () =>
      import("@/views/jobDirector/JobDirectorStudentJobMatchResult.vue")
  },
  {
    path: "/jobDirectorSafetyInformation",
    component: () => import("@/views/jobDirector/JobDirectorSafetyInformation")
  },
  {
    path: "/jobDirectorStudentMatchResult",
    component: () =>
      import("@/views/jobDirector/JobDirectorStudentMatchResult.vue")
  },
  {
    path: "/jobDirectorStudentMatchResult/:cid",
    component: () =>
      import("@/views/jobDirector/JobDirectorCompanyStudentMatchResult.vue")
  },
  {
    path: "/jobDirectorStudentResume",
    component: () => import("@/views/jobDirector/JobDirectorStudentResume.vue")
  },
  {
    path: "/jobDirectorStudentStatistics",
    component: () =>
      import("@/views/jobDirector/JobDirectorStudentStatistics.vue")
  }
];

// 必须与后端提前约定。按角色，动态加载路由信息
// 使其他角色即使知道路由路径，也无法加载对应的组件
const systemAdminRole = "f2ffae3f953b4983fe01";
const generalAdminRole = "e2ff673f953b4983fe0f";
const studentRole = "bb63e5f7e0f2ffae845c";
const companyRole = "6983f953b49c88210cb9";
const jobDirectorRole = "3483f953b49c88210cb5";

// 暴露该方法。登录后，有vuex调用，通知更新路由信息
export function updateRoutes() {
  switch (sessionStorage.getItem("role")) {
    case systemAdminRole:
      router.addRoutes(systemAdminRoutes);
      break;
    case generalAdminRole:
      router.addRoutes(generalAdminRoutes);
      break;
    case studentRole:
      router.addRoutes(studentRoutes);
      break;
    case companyRole:
      router.addRoutes(companyRoutes);
      break;
    case jobDirectorRole:
      router.addRoutes(jobDirectorRoutes);
      break;
  }
}
// 再此文件模块加载时，也执行。用户登陆后刷新页面时，按sessionstorage中数据初始化
// 没有找到sessionstorage的监听事件
updateRoutes();
