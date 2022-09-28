<template>
    <div>
        <div v-if="pokemon.id" class="mx-auto w-10/12 sm:w-9/12 md:w-8/12 lg:w-1/2">
            <div class="flex flex-col justify-center items-center mt-5">
                <h2 class="font-bold uppercase text-xl mb-2">{{pokemon.name}}</h2>
                <hr  class="border border-gray-200 w-full md:w-1/3"/>
                <img v-bind:src="pokemon.sprites.other.home.front_default" alt="no image" class="w-[250px] h-[250px] mx-auto object-cover">
                <div class="flex flex-row flex-nowrap gap-x-4 mb-3 w-full mx-auto sm:9/12 md:w-1/5">
                    <div class="w-5/12 mx-auto text-center">
                        <p class="text-3xl">{{pokemon.height}}</p>
                        <p>Height</p>
                    </div>
                    <div class="w-5/12 mx-auto text-center">
                        <p class="text-3xl">{{pokemon.weight}}</p>
                        <p>Weight</p>
                    </div>
                </div>
                <div v-if="!favourite" @click="addFavs" data-test="btn-favs-plus" class="w-[200px] p-2 text-center bg-green-500 text-white my-1 rounded cursor-pointer">Add to Favs</div>
                <div v-else @click="discardItInFavs" data-test="btn-favs-minus" class="w-[200px] p-2 text-center bg-red-500 text-white my-1 rounded cursor-pointer">Discard it in Favs</div>
                
                <hr class="border border-gray-200 w-full md:w-1/3 mt-3"/>
                <h3 class="text-xl my-4">Moves</h3>
                <div class="flex flex-row items-center flex-wrap">
                    <div v-for="(p,i) in pokemon.moves" :key="i" class="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2 text-white text-center">
                        <div class="bg-blue-300 rounded p-2 cursor-pointer hover:scale-105">{{p.move.name}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="text-center mt-5 text-xl"> 
            {{"Pokemon was not found!"}}
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import axios from "axios";
    import { DetailPokemon } from '../types/index';

    @Component
    export default class  extends Vue {
        
        pokemon = {} as DetailPokemon;
        favourite = false as boolean;
        
        async created(){
            
            const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.$route.params.name}`);
            this.pokemon = {
                id: result.data.id,
                name: result.data.name,
                weight: result.data.weight,
                height: result.data.height,
                sprites: result.data.sprites,
                moves: result.data.moves
            }
            var ls = JSON.parse(localStorage.getItem('pokemons') as string) as [];
            if(!ls || ls.length===0){
                this.favourite = false;
            }else{
                if(ls.some(e => e.id === this.pokemon.id)){
                    this.favourite = true;
                }else{
                    this.favourite = false;
                }
            }
            
        }
        addFavs(){
            var ls = JSON.parse(localStorage.getItem('pokemons') as string) as [];
            if(!ls || ls.length===0){
                localStorage.setItem("pokemons",JSON.stringify([this.pokemon]));
                this.favourite = true;
            }else{
                ls.push(this.pokemon);
                localStorage.setItem("pokemons",JSON.stringify(ls));
                this.favourite = true;
            }
        }
        discardItInFavs(){
            var ls = JSON.parse(localStorage.getItem('pokemons') as string) as [];
            ls = ls.filter(e=> e.id !== this.pokemon.id);
            localStorage.setItem('pokemons', JSON.stringify(ls));
            this.favourite = false;
        }
    }
</script>

<style scoped>

</style>