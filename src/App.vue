<template>
  <div id="app">
    <nav class="text-center text-blue-400">
      <router-link class="mx-1 hover:underline" to="/">Home</router-link>
      <router-link class="mx-1 hover:underline" to="/favs">Favs</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}
</style>
