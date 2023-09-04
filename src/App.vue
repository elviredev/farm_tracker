<template>
  <div v-if="appReady" class="min-h-full font-Poppins box-border">
    <Navigation />
    <router-view/>
  </div>
</template>


<script>
import Navigation from "@/components/Navigation.vue";
import { ref } from "vue";
import { supabase } from "@/supabase/init";
import store from "@/store";
  export default {
    components: {
      Navigation
    },
    setup() {
      // Create data / vars
      const appReady = ref(null)

      // Vérifier si l'utilisateur est déjà connecté
      const user = supabase.auth.getUser()

      // Si l'utilisateur n'existe pas, préparer l'application
      if (!user) {
        appReady.value = true
      }
      /* S'exécute lorsqu'il y a un changement d'état
       * d'authentification. Si l'utilisateur est connecté, le
       * changement d'état se déclenchera
       */
      supabase.auth.onAuthStateChange((_, session) => {
        // console.log("hello")
        store.methods.setUser(session)
        appReady.value = true
      })

      return { appReady }
    }
  }
</script>

<style lang="css">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap");
</style>