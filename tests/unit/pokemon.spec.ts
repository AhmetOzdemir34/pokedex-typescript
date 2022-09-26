import { DetailPokemon } from "@/types";
import { mount } from "@vue/test-utils";
import flushPromises from "flush-promises";
import axios from "axios";
import PokemonView from "../../src/views/PokemonView.vue";

describe('PokemonView.vue', ()=>{
    const localStorageMock = (function () {
        let store = {} as any;
      
        return {
          getItem(key:string) {
            return store[key];
          },
      
          setItem(key:string, value:any) {
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
            front_shiny_female:null
        },
        moves: [
            {
                move:{
                    name:"pound"
                }
            }
        ],
    } ;

    const get = jest.spyOn(axios, 'get');
    get.mockResolvedValue({data:pokemonMock})

    const getFailed = jest.spyOn(axios, 'get');
    get.mockResolvedValue({data:'Not Found'});


    it('should mount a page or view', ()=>{
        const wrapper = mount(PokemonView,{
            mocks: {
                $route: {
                    params:{
                        name:'clefairy'
                    }
                },
            },
        });
        expect(wrapper.exists()).toBe(true);
    })

    it('Should fetch pokemon data in detail page', async ()=>{
        const wrapper = mount(PokemonView,{
            mocks: {
                $route: {
                    params:{
                        name:'clefairy'
                    }
                },
            },
        });
        /* await flushPromises();

        const button = wrapper.find('[data-test="btn-favs-plus"]')
        
        // basarili api istegi
        expect(get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/clefairy');
        expect(button.exists()).toBe(false); */
        
    })

    it('Should not fetch pokemon data with invalid params', async ()=>{
        const wrapper = mount(PokemonView,{
            mocks: {
                $route: {
                    params:{
                        name:'invalid'
                    }
                }
            }
        });

        await flushPromises();
        expect(getFailed).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/invalid');        

    })
    //addFavs
    /* it('Should be active plus button', async ()=>{
        
    }) */
    //discardFavs
})