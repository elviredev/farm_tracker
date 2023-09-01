<template>
  <div>
    <Navigation />
    <router-view/>
  </div>
</template>


<script>
import Navigation from "@/components/Navigation.vue";
  export default {
    components: {
      Navigation
    },
    setup() {
      // Create data / vars

      // Vérifier si l'utilisateur est déjà connecté

      // Si l'utilisateur n'existe pas, préparer l'application

      /* S'exécute lorsqu'il y a un changement d'état
       * d'authentification. Si l'utilisateur est connecté, le
       * changement d'état se déclenchera
       */


      return {}
    }
  }
</script>

<style lang="css">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap");
</style>