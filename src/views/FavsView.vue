<template>
    <div class="max-w-7xl mx-auto">
        <div v-if="favs.length!==0" class="mt-5" data-test="card">
            <div class="flex flex-row flex-wrap justify-start items-center">
                <div v-for="(e,i) in favs" :key="i" data-test="miniCard" class="w-10/12 sm:w-4/12 md:w-3/12 lg:w-2/12 rounded-t p-2">
                    <div class="p-2 bg-slate-200">
                        <img v-bind:src="e.sprites.front_default" alt="no image" data-test="pokemonImage" class="w-[150px] h-[150px] mx-auto block">
                        <p class="text-center uppercase font-bold mb-2" data-test="name">{{e.name}}</p>
                        <button data-test="delete" type="button" @click="discardItInFavs(e.id)" class="text-center w-full block p-2 bg-red-500 hover:bg-red-400 transition-all duration-300">
                            <i class="fa-solid fa-trash text-white"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="mt-5 text-center text-3xl">
            {{"You have not any favourite pokemon(s)."}}
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class  extends Vue {
    
        favs = [];

        created(){
            var ls = JSON.parse(localStorage.getItem('pokemons') as string) as [];

            if(ls || ls.length>0){
                this.favs = ls;
            }
            
        }
        
        discardItInFavs(id:number){
            var ls = JSON.parse(localStorage.getItem('pokemons') as string) as [];
            ls = ls.filter(e=> e.id!== id);
            localStorage.setItem('pokemons', JSON.stringify(ls));
            this.favs = this.favs.filter(e=> e.id !== id);
        }
    }
</script>

<style scoped>

</style>