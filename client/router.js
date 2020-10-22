import Vue from "vue";
import VueRouter from 'vue-router';

import store from "./store";

import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import GameView from "./views/GameView";
import Empire from "./views/game/Empire";
import Planet from "./views/game/Planet";
import ResearchTree from "./views/game/ResearchTree";
import FleetCommand from "./views/game/FleetCommand";
import Settings from "./views/game/Settings";

Vue.use(VueRouter);

const routes = [{
    path: '/',
    component: Home,
    name: 'Default',
    meta: {
      requiresAuth: false
    },

  },
  {
    path: '/login',
    component: Login,
    name: "Login",
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/register',
    component: Register,
    name: "Register"
  },
  {
    path: '/game',
    component: GameView,
    beforeEnter: (to, from, next) => {
      let loginStatus = store.dispatch('getLoginStatus');

      loginStatus.then(() => {
        let overview = store.dispatch('getEmpireOverview');
        overview.then(() => {
          next();
        });
      });

      loginStatus.catch(() => {
        next('/login');
      });
    },
    name: 'Game',
    children: [{
        path: 'empire',
        name: "EmpireView",
        component: Empire,
      },
      {
        path: 'planet/:id',
        name: "planet",
        component: Planet,
        props: true,
        beforeEnter: (to, from, next) => {
          store.dispatch('setCurrentPlanet', to.params.id)
          .then(() => {
            next();
          });
        }
      },
      {
        path: 'research',
        name: "research",
        component: ResearchTree
      },
      {
        path: 'fleet',
        name: "fleet",
        component: FleetCommand
      },
      {
        path: 'settings',
        name: "settings",
        component: Settings,
      },
      {
        // default 
        path: '',
        component: Empire,
      }
    ],
  }
];


export default new VueRouter({
  routes
});