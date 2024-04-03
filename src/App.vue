<template>
  <nav-bar></nav-bar>
  <router-view></router-view>
</template>

<script>
import NavBar from "./components/ui/NavBar.vue";
export default {
  name: "App",
  components: {
    NavBar,
  },
};
</script>

<style>
.contact-img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
.contact-img-big {
  width: 250px;
  height: 250px;
  border-radius: 50%;
}
</style>