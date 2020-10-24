import { API, AUTH } from "../../config";

import { Buildings } from "../../public/Stats";

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

  buildingList: Buildings,
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
      console.log(userInfo);
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

    console.log(body);


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
      console.log(planet);
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
    console.log(state.currentPlanet.resources);
    return state.currentPlanet.resources;
  },

  planetBuildings: (state) => {
    return {
      levels: state.currentPlanet.levels,
      times: state.currentPlanet.buildingTimes
    };
  },

  planetMilitary: (state) => {
    return state.currentPlanet.military;
  },


  buildings: (state) => {
    return state.buildingList;
  },


  resourceModifiers: (state) => {
    let mods = {}
    // TODO: need to think of a better way of doing this
    state.buildingList.filter(ele => {
      if(ele.key === 'mine') {
        mods.minerals = ele.resource_mod;
      }
      if(ele.key === 'chemical') {
        mods.chemicals = ele.resource_mod;
      }
      if(ele.key === 'gas') {
        mods.gases = ele.resource_mod;
      }
    });

    return mods;
  }
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})