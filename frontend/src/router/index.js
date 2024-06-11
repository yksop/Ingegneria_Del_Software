import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      name: "home",
      component: () => import("../views/HomePageView.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/registration",
      name: "registration",
      component: () => import("../views/RegistrationView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/history",
      name: "history",
      component: () => import("../views/HistoryView.vue"),
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("../views/ContactView.vue"),
    },
    {
      path: "/upgradeDowngrade",
      name: "upgradeDowngrade",
      component: () => import("../views/UpgradeDowngradeView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/retireAlert",
      name: "retireAlert",
      component: () => import("../views/RetireAlertView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/createAlert",
      name: "createAlert",
      component: () => import("../views/CreateAlertView.vue"),
    },
    {
      path: "/action118",
      name: "Action_118",
      component: () => import("../views/Action118View.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/actionVol",
      name: "Action_Vol",
      component: () => import("../views/ActionVolView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/actionCert",
      name: "Action_Cert",
      component: () => import("../views/ActionCertView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/agreeToAlert",
      name: "agreeToAlert",
      component: () => import("../views/AgreeToAlertView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/forgotPassword",
      name: "forgotPassword",
      component: () => import("../views/ForgotPasswordView.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/retrievePassword/:token",
      name: "retrievePassword",
      component: () => import("../views/RetrievePasswordView.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/changeCredentials",
      name: "changeCredentials",
      component: () => import("../views/ChangeCredentialsView.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push({ name: "login", query: { nextUrl: to.fullPath } });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
