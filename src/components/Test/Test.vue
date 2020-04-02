<template>
  <div>
    Hola desde el div padre <br>
    <router-link to="/test/hijo">hijo</router-link>
    <router-link to="/test/hija">hija</router-link>
    <router-view></router-view>
  </div>
</template>