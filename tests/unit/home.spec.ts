import { SearchPokemon } from "@/types";
import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import axios from "axios";
import flushPromises from "flush-promises";
import Vuex from "vuex";
import HomeView from "../../src/views/HomeView.vue";
import { mutations } from "../../src/store";
import { pokemonsMock } from "../../src/mocks/index";

const localVue = createLocalVue()

localVue.use(Vuex)

describe('HomeView.vue', ()=>{

    const get = jest.spyOn(axios, 'get').mockResolvedValue({data:pokemonsMock});
    
    let state;
    let store:any;
  
    beforeEach(() => {
      state = {
        pokemons: [] as SearchPokemon[],
        value:'pikachu' as string
      }

      store = new Vuex.Store({
        mutations, state
      })
    })

    it('should mount a page or view', async ()=>{
        const wrapper = mount(HomeView,{
            store,localVue
        });

        expect(wrapper.exists()).toBe(true);
    });

    it('should mount search button', async ()=>{
        const wrapper = mount(HomeView,{
            store,localVue
        });
        expect(wrapper.get('[data-test="search"]').exists()).toBe(true);
    });

    /* it('should mount first 20 pokemon data', async ()=>{
       const wrapper = mount(HomeView,{
            store,localVue
        });        
        await flushPromises();
        console.log(wrapper.html());
        
        expect(wrapper.findAll('[data-test="init-cards"]').length).toBe(20);
    }) */

    /* it('should not give pokemon data with invalid', async ()=>{
        const wrapper = mount(HomeView,{
            store,localVue
        });
        await wrapper.get('[data-test="search"]').trigger('click');
        expect(getFailed).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/'+store.state.value);
    }) */
})