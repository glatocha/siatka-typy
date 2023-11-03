const routes = [
  {
    path: "/",
    redirect: { path: "/index" }, // redirect property
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/index",
        name: "Witaj",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "/main",
        name: "Menu główne",
        component: () => import("pages/MainPage.vue"),
      },
      {
        path: "/games",
        name: "Lista meczy",
        component: () => import("pages/GamesPage.vue"),
      },
      {
        path: "/mybets",
        name: "Typuj",
        component: () => import("pages/BetsPage.vue"),
      },
      {
        path: "/allbets",
        name: "Wszystkie typy",
        component: () => import("pages/AllBetsPage.vue"),
      },
      {
        path: "/add",
        name: "Dodaj mecz",
        component: () => import("pages/AddGamePage.vue"),
      },
      {
        path: "/table",
        name: "Tabela",
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
