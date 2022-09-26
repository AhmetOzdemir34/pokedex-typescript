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
    } ;

    const get = jest.spyOn(axios, 'get');
    get.mockResolvedValue({data:pokemonMock})

    const getFailed = jest.spyOn(axios, 'get');
    get.mockResolvedValue({data:'Not Found'})

    it('Should fetch pokemon data in detail page', ()=>{
        const wrapper = mount(PokemonView,{
            mocks: {
                $route: {
                params:{
                    name:'clefairy'
                }
                }
            }
        });
        
        // basarili api istegi
        expect(get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/clefairy');
        // favorilere ekleme butonu var oldu mu?
        expect(wrapper.text()).toContain('Add to Favs');
    })

    it('Should not fetch pokemon data with invalid params', ()=>{
        const wrapper = mount(PokemonView,{
            mocks: {
                $route: {
                params:{
                    name:'invalid'
                }
                }
            }
        });

        expect(getFailed).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/invalid');

    })
})