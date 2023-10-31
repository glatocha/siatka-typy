const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "Welcome",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "/main",
        name: "Main",
        component: () => import("pages/MainPage.vue"),
      },
      {
        path: "/games",
        name: "Games",
        component: () => import("pages/GamesPage.vue"),
      },
      {
        path: "/bets",
        name: "Bets",
        component: () => import("pages/BetsPage.vue"),
      },
      {
        path: "/add",
        name: "Add",
        component: () => import("pages/AddGamePage.vue"),
      },
      {
        path: "/table",
        name: "Table",
        component: () => import("pages/TablePage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
