import { API, AUTH } from "../../config";

import { Resources, Buildings, Ships, ResearchTree } from "../../static/Stats";

import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  loaded: false,
  player: {
    playerId: null,
    username: '',
  },

  planets: [],
  currentPlanet: [],

  buildings: Buildings,
  ships: Ships,
  research: ResearchTree,
  resources: Resources,
  shipList: [],
  defenceList: [],
  researchTree: [],
};

const mutations = {
  setPlayerDetails: (state, player) => {
    state.player = player;
  },

  setPlanets: (state, planets) => {
    state.planets = planets;

    state.loaded = true;
  },

  setCurrentPlanet: (state, planet) => {
    state.currentPlanet = planet;
  },
};

// Actions can deal only with logic pertaining to only the data its dealing with at the moment.

const actions = {
  getLoginStatus: ({ commit }) => {
    
    return fetch(`${AUTH}/isloggedin`)
    .then(res => res.json())
    .then(userInfo => {     
      return new Promise((resolve, reject) => {
        if(!userInfo) {
          reject();
        }        
        commit('setPlayerDetails', userInfo);
        resolve();
      })
    })
  },

  getEmpireOverview: ({ state, commit }) => {
    
    if(!state.player.playerId)  return;

    
    return fetch(`${API}/overview/${state.player.playerId}`)
    .then(res => res.json())
    .then(planets => {
      commit('setPlanets', planets);
    });    
  },


  createPlanet: ({ state, commit }) => {
    fetch(`${API}/planet/create/${state.player.playerId}`)
    .then(res => res.json()) 
    .then(planet => {
      commit('addPlanet', planet);
    })
  },

  upgradeItemOnPlanet: ({ state, commit }, payload) => {
    let body = {
      ...payload,
      planetId: state.currentPlanet.info.id,
      playerId: state.player.playerId,
    };

    fetch(`${API}/planet/upgrade`, {
      method: "POST",
      mode: "cors", 
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", 
      referrerPolicy: "no-referrer", 
      body: JSON.stringify(body), 
    })
  },




  // planet specific 
  setCurrentPlanet: ({ state, commit, dispatch }, planetId) => {

    if(!state.player.playerId)  return;
    return fetch(`${API}/planet/${planetId}`)
    .then(res => res.json())
    .then(planet => {
      commit('setCurrentPlanet', planet);
    });
  }
};

const getters = {
  isLoaded: state => {
    return state.loaded
  },

  getPlanets: state => {
    return state.planets;
  },
 

  // planet specific (if this gets bloated I will convert these into modules)
  // returns specific information for planet information tab
  planetInfo: (state) => {
    return state.currentPlanet.info;
  },

  planetResources: (state) => {
    return state.currentPlanet.resources;
  },

  planetBuildingQueue: (state) => {
    return  state.currentPlanet.buildingQueue;
  },

  planetBuildings: (state) => {
    return {
      levels: state.currentPlanet.levels,
      times: state.currentPlanet.buildingTimes
    };
  },

  buildingLevelByKey: (state) => (key) => {
    return state.currentPlanet.levels[key];
  },
  

  planetMilitary: (state) => {
    return state.currentPlanet.military;
  },

  // loops through the Stats building object and returns an object that has each building under their respective type.
  // This is done as we can just pass each key, value pair into the ActionList component.
  buildings: (state) => {
    let buildingsByType = {};

    state.buildings.map(ele => {
      if(!buildingsByType[ele.type]) {
        buildingsByType[ele.type] = new Array();
      }

      buildingsByType[ele.type].push(ele);
    });
    return buildingsByType;
  },

  ships: (state) => {
    let shipsByType = {};
    state.ships.map(ele => {
      if(!shipsByType[ele.type]) {
        shipsByType[ele.type] = new Array();
      }

      shipsByType[ele.type].push(ele);
    });

    return shipsByType;
  },

  research: (state) => {
    let researchByType = {};

    state.research.map(ele => {
      if(!researchByType[ele.type]) {
        researchByType[ele.type] = new Array();
      }

      researchByType[ele.type].push(ele);
    });
    return researchByType;
  },


  resourceStats: (state) => {
    return state.resources;
  }
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})