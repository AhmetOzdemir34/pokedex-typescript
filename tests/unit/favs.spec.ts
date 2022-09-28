import { mount, shallowMount } from "@vue/test-utils";
import flushPromises from "flush-promises";
import FavsView from "../../src/views/FavsView.vue";

describe('FavsView.vue', ()=>{

    const localStorageMock = (function () {
      interface StorageStore{
        [key:string]: string
      }
      let store = {} as StorageStore;
    
      return {
        getItem(key:string) {
          return store[key];
        },
    
        setItem(key:string, value:string) {
          store[key] = value;
        },
    
        clear() {
          store = {};
        },
    
        removeItem(key:string) {
          delete store[key];
        },
    
        getAll() {
          return store;
        },
      };
    })();
    
    Object.defineProperty(window, "localStorage", { value: localStorageMock });
  
    const setLocalStorage = (id:string, data:any) => {
      window.localStorage.setItem(id, JSON.stringify(data));
    };

    it('should mount page with empty array', ()=>{
      setLocalStorage("pokemons", []);
      const wrapper = mount(FavsView);
      expect(wrapper.exists()).toBe(true);
    });
    it('should mount warning message w/ empty message', ()=>{
      setLocalStorage("pokemons", []);
      const wrapper = mount(FavsView);
      expect(wrapper.text()).toContain('You have not any favourite pokemon(s).')
    });
    it('should mount page with real array', async ()=>{
      const mockValue = [{
        id:1, name:"bulbasaur", weight:69, height:7,
        sprites: {
          back_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
          back_female: null,
          back_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png",
          back_shiny_female: null,
          front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
          front_female: null,
          front_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
          front_shiny_female: null,
      }}];
      setLocalStorage("pokemons", mockValue);
      const wrapper = mount(FavsView);
      expect(wrapper.exists()).toBe(true);
    });
    it('should mount a pokemon card w/ real array', async ()=>{
      const mockValue = [{
        id:1, name:"bulbasaur", weight:69, height:7,
        sprites: {
          back_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
          back_female: null,
          back_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png",
          back_shiny_female: null,
          front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
          front_female: null,
          front_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
          front_shiny_female: null,
      }}];
      setLocalStorage("pokemons", mockValue);
      const wrapper = mount(FavsView);      
      expect(wrapper.get('[data-test="card"]').exists()).toBe(true);
    });
    it('should show pokemon name', async ()=>{
      const mockValue = [{
        id:1, name:"bulbasaur", weight:69, height:7,
        sprites: {
          back_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
          back_female: null,
          back_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png",
          back_shiny_female: null,
          front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
          front_female: null,
          front_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
          front_shiny_female: null,
      }}];
      setLocalStorage("pokemons", mockValue);
      const wrapper = mount(FavsView);
      await wrapper.vm.$nextTick();
      
      expect(wrapper.get('p').text()).toEqual('bulbasaur');
      
    });
    it('should show pokemon image', async ()=>{
      const mockValue = [{
        id:1, name:"bulbasaur", weight:69, height:7,
        sprites: {
          back_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
          back_female: null,
          back_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png",
          back_shiny_female: null,
          front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
          front_female: null,
          front_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
          front_shiny_female: null,
      }}];
      setLocalStorage("pokemons", mockValue);
      const wrapper = mount(FavsView);
      await wrapper.vm.$nextTick();
      
      expect(wrapper.get('[data-test="pokemonImage"]').exists()).toBe(true);
    })
    it('should show pokemon delete button', async ()=>{
      const mockValue = [{
        id:1, name:"bulbasaur", weight:69, height:7,
        sprites: {
          back_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
          back_female: null,
          back_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png",
          back_shiny_female: null,
          front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
          front_female: null,
          front_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
          front_shiny_female: null,
      }}];
      setLocalStorage("pokemons", mockValue);
      const wrapper = mount(FavsView);
      await wrapper.vm.$nextTick();
      
      expect(wrapper.get('[data-test="delete"]').exists()).toBe(true);
    })
    it('should show array whose length bigger than 1', async()=>{
      const mockValue = [{
        id:1, name:"bulbasaur", weight:69, height:7,
        sprites: {
          back_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
          back_female: null,
          back_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png",
          back_shiny_female: null,
          front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
          front_female: null,
          front_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
          front_shiny_female: null,
      }},
      {
        id:2, name:"ivysaur", weight:130, height:10,
        sprites: {
          back_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
          back_female: null,
          back_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png",
          back_shiny_female: null,
          front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
          front_female: null,
          front_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
          front_shiny_female: null,
      }}
      ];
      setLocalStorage("pokemons", mockValue);
      const wrapper = mount(FavsView);
      await wrapper.vm.$nextTick();
      expect(wrapper.findAll('[data-test="miniCard"]').length).toBe(2);
    });
    it('should change page content before adding and deleting', async()=>{
      const mockValue = [{
        id:1, name:"bulbasaur", weight:69, height:7,
        sprites: {
          back_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
          back_female: null,
          back_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png",
          back_shiny_female: null,
          front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
          front_female: null,
          front_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
          front_shiny_female: null,
      }}];
      setLocalStorage("pokemons", mockValue);
      const wrapper = mount(FavsView);

      expect(wrapper.findAll('[data-test="miniCard"]').length).toBe(1);

      const buttonn = wrapper.get('[data-test="delete"]');
      await buttonn.trigger('click');
      wrapper.vm.$nextTick();
      
      expect(wrapper.text()).toContain('You have not any favourite pokemon(s).')
    })
})