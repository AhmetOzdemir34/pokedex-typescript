<template>
    <div class="max-w-7xl mx-auto">
        <FavsComp :favs="favs" />
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import FavsComp from "../components/FavsComp.vue";

    @Component({
        components:{
            FavsComp,
        }
    })
    export default class  extends Vue {
    
        favs = [];

        mounted(){
            var ls = JSON.parse(localStorage.getItem('pokemons') as string) as [];
            /* if(!ls || ls.length===0){
            }else{
                this.favs = ls;
            } */
            if(ls || ls.length>0){
                this.favs = ls;
            }
        }
    }
</script>

<style scoped>

</style>