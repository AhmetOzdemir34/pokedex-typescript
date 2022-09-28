import { DetailPokemon } from "@/types";
import { mount } from "@vue/test-utils";
import axios from "axios";
import flushPromises from "flush-promises";
import PokemonView from "../../src/views/PokemonView.vue";


describe('PokemonView.vue', ()=>{

    const pokemonMock:DetailPokemon = {
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
            front_shiny_female:null,
            other:{
                home:{
                    front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/35.png",
                }
            }
        },
        moves: [
            {
                move:{
                    name:"pound"
                }
            }
        ],
    };

    jest.spyOn(axios, 'get').mockResolvedValue({data:pokemonMock});

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

    it('should mount a page or view', ()=>{
        const wrapper = mount(PokemonView,{
            mocks: {
                $route: {
                    params:{
                        name:'clefairy'
                    }
                },
            }
        });
        
        expect(wrapper.exists()).toBe(true);
    });
    it('Should fetch pokemon data in detail page', async ()=>{
        const wrapper = mount(PokemonView,{
            mocks: {
                $route: {
                    params:{
                        name:'clefairy'
                    }
                },
            }
        });
        expect(axios.get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/clefairy');
        /* await flushPromises();
        console.log(wrapper.html()); */

    });
    it('Should mount pokemon data', async ()=>{
        const wrapper = mount(PokemonView,{
            mocks: {
                $route: {
                    params:{
                        name:'clefairy'
                    }
                },
            }
        });
        expect(axios.get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/clefairy');
        await flushPromises();
        // console.log(wrapper.html());
        expect(wrapper.get('h2').text()).toContain('clefairy');
        expect(wrapper.get('[src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/35.png"]').exists()).toBe(true);
    })
    it('Add favs button should work', async ()=>{
        setLocalStorage("pokemons", []);
        const wrapper = mount(PokemonView,{
            mocks: {
                $route: {
                    params:{
                        name:'clefairy'
                    }
                },
            }
        });
        expect(axios.get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/clefairy');
        await flushPromises();
        wrapper.get('[data-test="btn-favs-plus"]').trigger('click');
        await flushPromises();
        expect(wrapper.get('[data-test="btn-favs-minus"]').exists()).toBe(true);
        
    })
    it('Discard it to Favs button should work', async ()=>{
        setLocalStorage("pokemons", [{id:35}]);
        const wrapper = mount(PokemonView,{
            mocks: {
                $route: {
                    params:{
                        name:'clefairy'
                    }
                },
            }
        });
        expect(axios.get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/clefairy');
        await flushPromises();
        wrapper.get('[data-test="btn-favs-minus"]').trigger('click');
        await flushPromises();
        expect(wrapper.get('[data-test="btn-favs-plus"]').exists()).toBe(true);
        
    })
    it('Should not fetch pokemon data with invalid params', async ()=>{
        const wrapper = mount(PokemonView,{
            mocks: {
                $route: {
                    params:{
                        name:'invalid'
                    }
                },
            }
        });

        const getFailed = jest.spyOn(axios, 'get');
        getFailed.mockResolvedValue({data:'Not Found'});
        expect(getFailed).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/invalid');        

    })
})