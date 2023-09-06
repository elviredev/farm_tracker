<template>
  <div v-if="dataLoaded" class="container mt-20 px-4">
    <!-- No Data -->
    <div v-if="data.length === 0" class="w-full flex flex-col items-center">
      <h1 class="text-3xl">Ça a l'air vide ici...</h1>
      <router-link :to="{name: 'Create'}" class="mt-10 py-2 px-6 rounded-sm shadow-md text-sm bg-at-light-green-2 text-white duration-200 border-solid border-2 border-transparent hover:bg-at-orange uppercase tracking-wider">Créer vos travaux</router-link>
    </div>
    <!-- Data présentes en BDD -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <!-- Quand clic sur une carte on est renvoyé vers le détail du travaux. Le plus simple est d'entourer les card dans un lien -->
      <router-link
        class="flex flex-col items-center bg-light-grey p-8 shadow-md rounded-md cursor-pointer hover:bg-at-yellow-light hover:scale-105 transition-all duration-200"
        :to="{name: ''}"
        v-for="(travaux, index) in data"
        :key="index"
      >
        <!-- Image pour exterieur -->
        <img
          v-if="travaux.locationType === 'exterieur'"
          src="@/assets/images/garden-green.png"
          class="h-28 w-auto"
          alt="fleurs en pot"
        >

        <!-- Image pour interieur -->
        <img
            v-else
            src="@/assets/images/reparation-green.png"
            class="h-28 w-auto"
            alt="mur en briques"
        >

        <p class="mt-6 py-1 px-3 bg-at-light-green text-xs text-white shadow-md rounded-lg">
          {{ travaux.locationType }}
        </p>

        <h1 class="mt-8 mb-2 text-center text-xl text-at-light-green">
          {{ travaux.placeName }}
        </h1>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { supabase } from "@/supabase/init";
export default {
  name: 'Home',
  components: {},
  setup() {
    // Create data / vars
    const data = ref([])
    // Afficher notre template qu'une seule fois que si data chargées
    const dataLoaded = ref(null)

    // Get data
    const getData = async () => {
      try {
        const { data: travaux, error } = await supabase
            .from('travaux')
            .select('*')
        // si error on passe dans le catch
        if (error) throw error
        // si pas error on récupère nos data
        data.value = travaux
        // on passe la var dataLoaded à true
        dataLoaded.value = true
        // console.log(data.value)
      } catch (error) {
        console.warn(error.message)
      }
    }

    // Run data function (exécuter la fonction)
    getData()
    return { data, dataLoaded }
  }
}
</script>
