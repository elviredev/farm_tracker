<template>
  <!-- Indicateur de chargement -->
  <div v-if="dataLoaded" class="container mt-16 px-4">
    <!-- No Data -->
    <div v-show="data.length === 0" class="w-full flex flex-col items-center py-32">
      <h1 class="text-3xl">Ça a l'air vide ici...</h1>
      <router-link :to="{name: 'Create'}" class="m-16 py-2 px-6 rounded-sm shadow-md text-sm bg-at-light-green-2 text-white duration-200 border-solid border-2 border-transparent hover:bg-at-yellow uppercase hover:text-black tracking-wider">Créer vos travaux</router-link>
    </div>
    <!-- Data présentes en BDD -->
    <div class="flex flex-col items-center justify-center gap-14">
      <!-- Total Travaux -->
      <div v-if="total > 0" class="p-8 max-w-screen-sm bg-light-grey flex rounded-md shadow-md ml-0 lg:self-start lg:ml-12">
        <p class="text-2xl text-center text-black">
          Total Travaux : {{ total }} €
        </p>
      </div>
      <!-- Cards Travaux -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <!-- Quand clic sur une carte on est renvoyé vers le détail du travaux. Le plus simple est d'entourer les card dans un lien -->
        <router-link
          class="flex flex-col items-center bg-light-grey p-8 shadow-md rounded-md cursor-pointer hover:bg-at-yellow-light hover:scale-105 transition-all duration-200"
          :to="{name: 'View-Travaux', params: { travauxId: travaux.id }}"
          v-for="(travaux, index) in detailsTravaux"
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

          <p class="mt-2 py-1 px-3 bg-at-gray text-sm text-black shadow-md rounded-lg">Montant: <span class="font-bold">{{ travaux.prix }}</span> €</p>

        </router-link>
      </div>
    </div>
  </div>
  <div v-if="dataLoaded">
    <Footer :isLoading="!dataLoaded" />
  </div>
<!--  <div v-else>-->
<!--    ça charge...-->
<!--  </div>-->

</template>

<script>
import { computed, ref } from "vue";
import { supabase } from "@/supabase/init";
import Footer from "@/components/Footer.vue";
export default {
  name: 'Home',
  components: {Footer},
  setup() {
    // Create data / vars
    const data = ref([])
    // Afficher notre template qu'une seule fois que si data chargées
    const dataLoaded = ref(false)
    const total = ref(0)

    // Propriété calculée permettant de récupérer les elts du detail et de calculer la somme des prix pour chaque détail.
    const detailsTravaux = computed(() => {
      return data.value.map(travaux => {
        if (travaux.details && travaux.details.length > 0) {
          // Si travaux.details existe et a au moins un élément, calculer la somme des prix
          const prix = travaux.details.reduce((acc, detail) => {
            return acc + parseFloat(detail.price)
          }, 0)
          dataLoaded.value = true
          // console.log(prix)
          return {
            ...travaux,
            prix: prix
          }
        } else {
          // Si travaux.details est vide ou n'existe pas, définir prix à 0
          return {
            ...travaux,
            prix: 0
          }
        }
      })

    });

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
        // console.log(travaux[0].details[0].price)
      } catch (error) {
        console.warn(error.message)
      }
    }
    // Run data function (exécuter la fonction)
    getData()

    // Calculer total des prix
    const calculateTotalPrice = async () => {
      try {
        const { data, error } = await supabase
            .from('travaux')
            .select('details')
        if (error) throw error;
        // Récupérer la colonne "price" de chaque ligne
        const prices = data.map(row => {
          return row.details.reduce((acc, detail) => {
            return acc + parseFloat(detail.price)
          }, 0)
        })
        // console.log(data)

        // Calculer la somme totale des prix
        const newTotal = prices.reduce((acc, price) => {
          return acc + price
        }, 0)
        // console.log(newTotal)

        // Mise à jour var "total" du modèle
        total.value = newTotal
        dataLoaded.value = true
        return total
      } catch (error) {
        console.warn(error.message)
      }
    }
    calculateTotalPrice()

    return { data, dataLoaded, total, detailsTravaux }
  }
}
</script>
