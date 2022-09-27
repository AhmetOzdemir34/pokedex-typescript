import { SearchPokemon } from "@/types";
import { mount, shallowMount } from "@vue/test-utils";
import axios from "axios";
import flushPromises from "flush-promises";
import Vue from "vue";
import Vuex from "vuex";
import HomeView from "../../src/views/HomeView.vue";

describe('HomeView.vue', ()=>{
    const pokemonMock:SearchPokemon = {
        name: "clefairy",
        id: 35,
        height: 6,
        weight: 75,
        sprites: {
            back_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/35.png",
            back_female:null,
            back_shiny:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/35.png",
            back_shiny_female:null,
            front_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png",
            front_female:null,
            front_shiny:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/35.png",
            front_shiny_female:null
        }
    };

    const get = jest.spyOn(axios, 'get');
    get.mockResolvedValue({data:pokemonMock});
    
    const getFailed = jest.spyOn(axios, 'get');
    getFailed.mockResolvedValue({data:"Not Found"});
    
    Vue.use(Vuex);
    const store = new Vuex.Store({
        state: {
            value: "clefairy",
            pokemons: []
        }
    })
    const store2 = new Vuex.Store({
        state: {
            value: "invalid",
            pokemons: []
        }
    })

    it('should mount a page or view', ()=>{
        const wrapper = mount(HomeView,{
            store
        });

        expect(wrapper.exists()).toBe(true);
    });

    it('should include search button', ()=>{
        const wrapper = mount(HomeView,{
            store
        });
        const searchBtn = wrapper.get('[data-test="search"]')

        expect(searchBtn.exists()).toBe(true);
    });

    it('should give pokemon data', async ()=>{
        const wrapper = mount(HomeView,{
            store:store
        });
        await wrapper.get('[data-test="search"]').trigger('click');
        expect(get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/'+store.state.value);
    })

    it('should not give pokemon data with invalid', async ()=>{
        const wrapper = mount(HomeView,{
            store : store2,
        });
        await wrapper.get('[data-test="search"]').trigger('click');
        expect(getFailed).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/'+store.state.value);
    })
})