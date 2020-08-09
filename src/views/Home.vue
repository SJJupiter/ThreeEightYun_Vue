<template>
  <div class="home">
    <Back/>
   
    <Games/>

  </div>
</template>

<script>
// @ is an alias to /src
import Games from "@/components/Games.vue";
import Back from "@/components/Back.vue";
export default {
  name: "Home",
  components: {
    Back,
    Games
  }
};
</script>


<style scoped>
  .home{
      height: auto;
      scroll-behavior: auto;
  }
</style>