import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/about",
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
    },
    {
      path: "/retireAlert",
      name: "retireAlert",
      component: () => import("../views/RetireAlertView.vue"),
    },
    {
      path: '/action118',
      name: 'Action_118',
      component: () => import('../views/Action118View.vue')
    },
    {
      path: '/actionVol',
      name: 'Action_Vol',
      component: () => import('../views/ActionVolView.vue')
    },
    {
      path: '/actionCert',
      name: 'Action_Cert',
      component: () => import('../views/ActionCertView.vue')
    },
  ]
})

export default router;
