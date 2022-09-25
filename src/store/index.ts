import { SearchPokemon } from '@/types';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    value: "", // arama texti
    pokemons: [] as SearchPokemon[],
  }, 
  getters: {
  },
  mutations: {
    SET_ALL(state, data){
      state.pokemons.push(data);
    }
  },
  actions: {
    setAll({commit}, data:any){
      commit('SET_ALL',data);
    }
  },
  modules: {
  }
})
