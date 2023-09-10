<template>
  <div class="max-w-screen-xl mx-auto px-4 py-10">
    <!-- App Message -->
    <div v-if="statusMsg || errorMsg" class="mb-10 p-4 rounded-md shadow-md bg-light-grey">
      <p class="text-at-light-green">{{ statusMsg }}</p>
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>

    <!-- Data -->
    <div v-if="dataLoaded">
      <!-- Général Travaux Info (partie haute) -->
      <div class="flex flex-col items-center p-8 rounded-md shadow-md bg-light-grey relative">
        <!-- Icônes -->
        <div v-if="user" class="flex absolute left-2 top-2 gap-x-2">
          <div
            @click="editMode"
            class="h-7 w-7 rounded-full flex justify-center items-center cursor-pointer bg-at-light-green shadow-lg hover:bg-at-orange"
          >
            <img src="@/assets/images/pencil-light.png" class="h-3.5 w-auto" alt="icône edition">
          </div>
          <div
            @click="deleteTravaux"
            class="h-7 w-7 rounded-full flex justify-center items-center cursor-pointer bg-at-light-green shadow-lg hover:bg-at-orange"
          >
            <img src="@/assets/images/trash-light.png" class="h-3.5 w-auto" alt="icône edition">
          </div>
        </div>

        <!-- Image Emplacement type -->
        <img
          v-if="data.locationType === 'exterieur'"
          src="@/assets/images/garden-green.png" alt="fleurs en pot"
          class="h-44 w-auto"
        >
        <img
          v-else
          src="@/assets/images/reparation-green.png" alt="mur en briques"
          class="h-36 w-auto"
        >
        <!-- Etiquette -->
        <span class="mt-6 bg-at-light-green py-1.5 px-5 text-white rounded-lg shadow-md">{{ data.locationType }}</span>

        <!-- Lieu travaux - place name -->
        <div class="w-full mt-6">
          <input
            v-if="edit"
            v-model="data.placeName"
            type="text"
            class="w-full p-2 text-gray-500 focus:outline-none"
          >
          <h1 v-else class="text-at-light-green text-2xl text-center">{{ data.placeName }}</h1>
        </div>

      </div>

      <!-- Details travaux (partie basse) -->
      <div class="mt-10 p-8 rounded-md flex flex-col items-center bg-light-grey shadow-md">
        <!-- Travaux Extérieur  -->
        <div v-if="data.locationType === 'exterieur'" class="w-full flex flex-col gap-y-4">
          <!-- Parcourir les descriptions -->
          <div
            v-for="(item, index) in data.details"
            :key="index"
            class="flex flex-col gap-y-2 gap-x-6 border-b-2 last:border-b-0 relative lg:flex-row"
            :class="{'border-b-transparent': edit}"
          >
            <div class="flex flex-2 flex-col lg:w-1/3">
              <label for="description" class="mb-1 text-sm text-at-light-green">Description</label>
              <input
                type="text"
                id="description"
                class="w-full p-2 text-gray-500 focus:outline-none"
                v-if="edit"
                v-model="item.description"
              >
              <p v-else>{{ item.description }}</p>
            </div>
            <div class="flex flex-1 flex-col ">
              <label for="artisan" class="mb-1 text-sm text-at-light-green">Artisan</label>
              <input
                  type="text"
                  id="artisan"
                  class="w-full p-2 text-gray-500 focus:outline-none"
                  v-if="edit"
                  v-model="item.artisan"
              >
              <p v-else>{{ item.artisan }}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="year" class="mb-1 text-sm text-at-light-green">Mois/Année</label>
              <input
                  type="text"
                  id="year"
                  class="w-full p-2 text-gray-500 focus:outline-none"
                  v-if="edit"
                  v-model="item.year"
              >
              <p v-else>{{ item.year }}</p>
            </div>
            <div class="flex flex-1 flex-col mb-4">
              <label for="price" class="mb-1 text-sm text-at-light-green">Prix (€)</label>
              <input
                  type="text"
                  id="price"
                  class="w-full p-2 text-gray-500 focus:outline-none"
                  v-if="edit"
                  v-model="item.price"
              >
              <p v-else>{{ item.price }}</p>
            </div>

            <!-- Supprimer un detail (description) -->
            <img
              v-if="edit"
              @click="deleteDetail(item.id)"
              class="absolute h-4 w-auto -left-5 cursor-pointer hover:-translate-y-0.5 hover:scale-105 transition-all duration-200"
              src="@/assets/images/trash-light-green.png"
              alt="icône poubelle"
            >
          </div>

          <!-- Ajouter un detail -->
          <Button
              v-if="edit"
              @click="addDetail"
              text="➕ Description"
              type="button"
          />

        </div>

        <!-- Travaux Intérieur  -->
        <div v-else class="w-full flex flex-col gap-y-4">
          <!-- Parcourir les descriptions -->
          <div
            v-for="(item, index) in data.details"
            :key="index"
            class="flex flex-col gap-y-2 gap-x-6 border-b-2 last:border-b-0 relative lg:flex-row"
            :class="{'border-b-transparent': edit}"
          >
            <div class="flex flex-col flex-1">
              <label for="travaux-type" class="mb-1 text-sm text-at-light-green">Type</label>
              <select
                  v-if="edit"
                  id="travaux-type"
                  class="p-2 w-full text-gray-500 focus:outline-none"
                  v-model="item.travauxType"
              >
                <option value="#">Choisir Type</option>
                <option value="electricite">Eléctricité</option>
                <option value="plomberie">Plomberie</option>
                <option value="menuiserie">Menuiserie</option>
                <option value="carrelage">Carrelage</option>
                <option value="maconnerie">Maçonnerie</option>
                <option value="platrerie-peinture">Peinture-Papier</option>
                <option value="decoration">Décoration</option>
                <option value="autre">Autre</option>
              </select>
              <p v-else>{{ item.travauxType }}</p>
            </div>
            <div class="flex flex-col lg:w-1/3">
              <label for="description" class="mb-1 text-sm text-at-light-green">Description</label>
              <input
                  type="text"
                  id="description"
                  class="w-full p-2 text-gray-500 focus:outline-none"
                  v-if="edit"
                  v-model="item.description"
              >
              <p v-else>{{ item.description }}</p>
            </div>
            <div class="flex flex-col lg:w-1/4 ">
              <label for="artisan" class="mb-1 text-sm text-at-light-green">Artisan</label>
              <input
                  type="text"
                  id="artisan"
                  class="w-full p-2 text-gray-500 focus:outline-none"
                  v-if="edit"
                  v-model="item.artisan"
              >
              <p v-else>{{ item.artisan }}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="year" class="mb-1 text-sm text-at-light-green">Mois/Année</label>
              <input
                  type="text"
                  id="year"
                  class="w-full p-2 text-gray-500 focus:outline-none"
                  v-if="edit"
                  v-model="item.year"
              >
              <p v-else>{{ item.year }}</p>
            </div>
            <div class="flex flex-1 flex-col mb-4">
              <label for="price" class="mb-1 text-sm text-at-light-green">Prix (€)</label>
              <input
                  type="text"
                  id="price"
                  class="w-full p-2 text-gray-500 focus:outline-none"
                  v-if="edit"
                  v-model="item.price"
              >
              <p v-else>{{ item.price }}</p>
            </div>

            <!-- Supprimer un detail (description) -->
            <img
                v-if="edit"
                @click="deleteDetail(item.id)"
                class="absolute h-4 w-auto -left-5 cursor-pointer hover:-translate-y-0.5 hover:scale-105 transition-all duration-200"
                src="@/assets/images/trash-light-green.png"
                alt="icône poubelle"
            >
          </div>

          <!-- Ajouter un detail -->
          <Button
              v-if="edit"
              @click="addDetail"
              text="➕ Description"
              type="button"
          />

        </div>
      </div>

      <!-- Button Update Travaux -->
      <Button
       v-if="edit"
       @click="update"
       text="Modifier Travaux"
       type="button" />

    </div>

  </div>
  <div v-if="dataLoaded">
    <Footer :isLoading="!dataLoaded" />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { supabase } from "@/supabase/init";
import { useRoute, useRouter } from "vue-router";
import store from "@/store";
import { uid } from "uid";
import Button from "@/components/Button.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "View-Travaux",
  components: {Footer, Button},
  setup() {
    // Create data / vars
    const data = ref(null)
    const dataLoaded = ref(null)
    const errorMsg = ref(null)
    const statusMsg = ref(null)
    const route = useRoute()
    const router = useRouter()
    const user = computed(() => store.state.user)

    // Get current Id of route
    const currentId = route.params.travauxId

    // Get travaux data
    const getData = async () => {
      try {
        const { data: travaux, error } = await supabase
            .from('travaux')
            .select('*')
            .eq("id", currentId)
        // si error on passe dans le catch
        if (error) throw error
        // Si pas error on récupère nos data. Comme c'est un tableau, je veux recupérer que le 1er elt de ce tableau
        data.value = travaux[0]
        // on passe la var dataLoaded à true
        dataLoaded.value = true
        // console.log(data.value)
      } catch (error) {
        errorMsg.value = error.message
        setTimeout(() => {
          errorMsg.value = false
        }, 5000)
      }
    }
    // Exécuter la fonction
    getData()

    // Edit mode
    const edit = ref(null)

    // Toggle edit mode
    const editMode = () => {
      edit.value = !edit.value
    }

    // Delete travaux
    const deleteTravaux = async () => {
      try {
        const { error } = await supabase
            .from('travaux')
            .delete()
            .eq("id", currentId)
        // si error on va dans le catch
        if (error) throw error
        // Redirection vers Home Page
        await router.push({name: 'Home'})
      } catch (error) {
        errorMsg.value = `Erreur: ${error.message}`
        setTimeout(() => {
          errorMsg.value = false
        }, 5000)
      }
    }

    // Add detail
    const addDetail = () => {
      // Vérifier le type d'emplacement
      if (data.value.locationType === 'exterieur') {
        data.value.details.push({
          id: uid(),
          description: "",
          artisan: "",
          year: "",
          price: ""
        })
        return;
      }
      // si ce n'est pas un type exterieur alors c'est un type interieur
      data.value.details.push({
        id: uid(),
        travauxType: "",
        description: "",
        artisan: "",
        year: "",
        price: ""
      })
    }

    // Delete detail
    const deleteDetail = (id) => {
      // Vérifier que le user dispose d'au moins 2 details dans ses travaux
      if (data.value.details.length > 1) {
        // Filtrer
        data.value.details = data.value.details.filter((detail) => detail.id !== id)
        return;
      }
      // Sinon msg d'erreur
      errorMsg.value = "Erreur: Impossible de supprimer, vous devez disposer d'au moins une description"
      setTimeout(() => {
        errorMsg.value = false
      }, 5000)
    }

    // Update Travaux
    const update = async () => {
      try {
        const { error } = await supabase
            .from('travaux')
            .update({
              placeName: data.value.placeName,
              details: data.value.details
            })
            .eq("id", currentId)
        // Si error on va dans le catch
        if (error) throw error
        // Modifier edit mode et statusMsg
        edit.value = false
        statusMsg.value = "Succès: Travaux modifiés 🧰 !"
        // Faire disparaitre msg après 5sec
        setTimeout(() => {
          statusMsg.value = false
        }, 5000)
      } catch (error) {
        errorMsg.value = `Erreur: ${error.message}`
        setTimeout(() => {
          errorMsg.value = false
        }, 5000)
      }
    }

    return { statusMsg, data, dataLoaded, errorMsg, user, edit, editMode, deleteTravaux, addDetail, deleteDetail, update }
  }
}
</script>
