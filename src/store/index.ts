import { SearchPokemon } from '@/types';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const mutations = {
  SET_ALL(state:any, data:any){
    state.pokemons.push(data);
  }
}
export const state = {
  value: "", // arama texti
  pokemons: [] as SearchPokemon[],
}
export default new Vuex.Store({
  state, 
  getters: {
  },
  mutations,
  actions: {
  },
  modules: {
  }
})
