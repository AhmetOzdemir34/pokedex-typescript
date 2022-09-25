<template>
  <div class="home max-w-7xl mx-auto">
    <img alt="Pokemon Logo" src="../assets/pokemon.png" class="w-10/12 mx-auto block sm:w-9/12 md:w-8/12 lg:w-1/2 animate-pulse">
    <div class="w-10/12 mx-auto sm:w-9/12 md:w-7/12 lg:w-1/2">
      <input v-model="searchText" type="text" placeholder="Enter pokemon name or id" class="rounded-l p-2 bg-slate-300 w-11/12">
      <button @click="searchResult()" type="button" class="w-1/12 p-2 rounded-r bg-yellow-500">
        <i class="fa-solid fa-magnifying-glass text-blue-600"></i>
      </button>
    </div>
    <div v-if="pokemon.id" class="mt-5 w-7/12 mx-auto sm:w-6/12 md:w-5/12 lg:w-1/5">
      <div class="p-2 rounded bg-gray-200">
        <p class="text-center uppercase font-bold">{{pokemon.name}}</p>
        <hr class="border-white"/>
        <img v-bind:src="pokemon.sprites.front_default" alt="no image" class="w-[150px] h-[150px] block mx-auto object-cover cursor-pointer">
        <div class="flex flex-row flex-nowrap justify-around items-center">
          <div class="w-1/2 mx-auto">
            <p class="text-3xl text-center italic">{{pokemon.height}}</p>
            <p class="text-center">Height</p>
          </div>
          <div class="w-1/2 mx-auto">
            <p class="text-3xl text-center italic">{{pokemon.weight}}</p>
            <p class="text-center">Weight</p>
          </div>
        </div>
        <h3 class="text-center p-2 bg-green-500 text-white mt-2">
          <router-link :to="{name: 'pokemon', params: {name: pokemon.name}}" class="block">Details</router-link>
        </h3>
      </div>
    </div>
    <div v-else class="mx-auto w-10/12 mt-10">
      <div class="flex flex-row flex-wrap items-center">
        <div v-for="(e,i) in pokemons" :key="i" class="w-10/12 mx-auto sm:w-1/3 lg:w-1/4 p-3">
          <div class="rounded bg-gray-200 p-2">
            <p class="text-center uppercase font-bold">{{e.name}}</p>
            <hr class="border-white"/>
            <img v-bind:src="e.sprites.front_default" alt="no image" class="w-[150px] h-[150px] block mx-auto object-cover cursor-pointer">
            <div class="flex flex-row flex-nowrap justify-around items-center">
              <div class="w-1/2 mx-auto">
                <p class="text-3xl text-center italic">{{e.height}}</p>
                <p class="text-center">Height</p>
              </div>
              <div class="w-1/2 mx-auto">
                <p class="text-3xl text-center italic">{{e.weight}}</p>
                <p class="text-center">Weight</p>
              </div>
            </div>
            <h3 class="text-center p-2 bg-green-500 text-white mt-2">
              <router-link :to="{name: 'pokemon', params: {name: e.name}}" class="block">Details</router-link>
            </h3>
          </div>
        </div>
      </div>
      <p class="text-right px-3 font-bold">{{`Total Result: ${limit}`}}</p>
      <p v-if="isActive" class="text-center text-blue-500 my-5 cursor-pointer hover:underline" @click="more()">{{"More"}}</p>
      <p v-else class="text-center text-red-700 my-5 cursor-pointer hover:underline" >{{"All Pokemons was shown."}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from "axios";
import { SearchPokemon } from "../types/index";

@Component
export default class HomeView extends Vue {
  

  searchText = "";
  results: any = null;
  limit = 20;
  pokemon = {} as SearchPokemon;
  pokemons = [] as SearchPokemon[];
  isActive = true;

  async mounted(){
    for(let i=1;i<=this.limit;i++){
      const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
      this.pokemons.push({
        name: data.name,
        id: data.id,
        height: data.height,
        weight: data.weight,
        sprites: data.sprites
      });
    }
  }

  async searchResult(){
    const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.searchText}`);

    this.pokemon = {
      name: data.name,
      id: data.id,
      height: data.height,
      weight: data.weight,
      sprites: data.sprites
    };
  }

  async more(){
    if(this.limit<=860){
      let oldLimit =this.limit;
      this.limit += 20;
      for(let i=oldLimit+1;i<=this.limit;i++){
        const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
        this.pokemons.push({
          name: data.name,
          id: data.id,
          height: data.height,
          weight: data.weight,
          sprites: data.sprites
        });
      }
    }else{
      this.isActive = false;
    }
  }
}
</script>
