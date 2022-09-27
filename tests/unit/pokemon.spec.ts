import { DetailPokemon } from "@/types";
import { mount } from "@vue/test-utils";
import axios from "axios";
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
            front_shiny_female:null
        },
        moves: [
            {
                move:{
                    name:"pound"
                }
            }
        ],
    };

    const get = jest.spyOn(axios, 'get');
    get.mockResolvedValue({data:pokemonMock});

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
        
        // basarili api istegi
        expect(get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/clefairy');
        
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

        const getFailed = jest.spyOn(axios, 'get');
        getFailed.mockResolvedValue({data:'Not Found'});
        expect(getFailed).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/invalid');        

    })
})