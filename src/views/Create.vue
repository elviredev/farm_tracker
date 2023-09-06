<template>
  <div>
    <div class="max-w-screen-xl mx-auto px-4 py-28">
      <!-- Status/Error Message -->
      <div v-if="statusMsg || errorMsg" class="mb-10 p-4 bg-light-grey rounded-md shadow-lg">
        <p class="text-at-light-green">{{ statusMsg }}</p>
        <p class="text-red-500">{{ errorMsg }}</p>
      </div>

      <!-- Create Form -->
      <div class="p-8 flex items-start bg-light-grey rounded-md shadow-lg">
        <!-- Form -->
        <form @submit.prevent="createTravaux" class="flex flex-col gap-y-5 w-full">
          <h1 class="text-2xl text-at-light-green">Enregistrer Travaux</h1>

          <div class="flex flex-col gap-y-2 gap-x-6 md:flex-row mb-8">
            <!-- Place Name -->
            <div class="flex flex-col md:w-1/2">
              <label for="place-name" class="mb-1 text-sm text-at-light-green">Lieux des travaux (pièce concernée, jardin)</label>
              <input
                  type="text"
                  class="p-2 text-gray-500 focus:outline-none"
                  id="place-name"
                  v-model="placeName"
                  required
              >
            </div>

            <!-- Location Type -->
            <div class="flex flex-col flex-1">
              <label for="location-type" class="mb-1 text-sm text-at-light-green">Emplacement (intérieur, extérieur)</label>
              <select
                  id="location-type"
                  class="p-2 text-gray-500 focus:outline-none"
                  @change="locationTypeChange"
                  v-model="locationType"
                  required
              >
                <option value="choisir-emplacement">Choisir Emplacement</option>
                <option value="exterieur">Extérieur 🌳</option>
                <option value="interieur">Intérieur 🏠</option>
              </select>
            </div>
          </div>

          <!-- Extérieur inputs -->
          <div v-if="locationType === 'exterieur'" class="flex flex-col gap-y-4">
            <!-- Pour chaque detail -->
            <div
              class="flex flex-col gap-y-2 gap-x-6 relative lg:flex-row"
              v-for="(item, index) in details"
              :key="index"
            >
              <div class="flex flex-col lg:w-1/2">
                <label for="description" class="mb-1 text-sm text-at-light-green">Description</label>
                <input
                  type="text"
                  id="description"
                  class="p-2 w-full text-gray-500 focus:outline-none"
                  v-model="item.description"
                  required
                >
              </div>
              <div class="flex flex-col lg:w-1/4">
                <label for="artisan" class="mb-1 text-sm text-at-light-green">Artisan</label>
                <input
                    type="text"
                    id="artisan"
                    class="p-2 w-full text-gray-500 focus:outline-none"
                    v-model="item.artisan"
                    required
                >
              </div>
              <div class="flex flex-col flex-1">
                <label for="year" class="mb-1 text-sm text-at-light-green">Mois/Année</label>
                <input
                    type="text"
                    id="year"
                    class="p-2 w-full text-gray-500 focus:outline-none"
                    v-model="item.year"
                    required
                >
              </div>
              <div class="flex flex-col flex-1">
                <label for="price" class="mb-1 text-sm text-at-light-green">Prix (€)</label>
                <input
                    type="text"
                    id="price"
                    class="p-2 w-full text-gray-500 focus:outline-none"
                    v-model="item.price"
                    required
                >
              </div>

              <img
               @click="deleteDetail(item.id)"
               src="@/assets/images/trash-light-green.png"
               class="h-4 w-auto absolute -left-5 cursor-pointer"
               alt="icon poubelle"
              >
            </div>
            <Button
              @click="addDetail"
              text="➕ Description"
              type="button"
            />
          </div>

          <!-- Intérieur inputs -->
          <div v-if="locationType === 'interieur'" class="flex flex-col gap-y-4">
            <!-- Pour chaque detail -->
            <div
                class="flex flex-col gap-y-2 gap-x-6 relative lg:flex-row"
                v-for="(item, index) in details"
                :key="index"
            >
              <div class="flex flex-col flex-1">
                <label for="travaux-type" class="mb-1 text-sm text-at-light-green">Type</label>
                <select
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
              </div>
              <div class="flex flex-col lg:w-1/3">
                <label for="description" class="mb-1 text-sm text-at-light-green">Description</label>
                <input
                    type="text"
                    id="description"
                    class="p-2 w-full text-gray-500 focus:outline-none"
                    v-model="item.description"
                    required
                >
              </div>
              <div class="flex flex-col lg:w-1/4">
                <label for="artisan" class="mb-1 text-sm text-at-light-green">Artisan</label>
                <input
                    type="text"
                    id="artisan"
                    class="p-2 w-full text-gray-500 focus:outline-none"
                    v-model="item.artisan"
                    required
                >
              </div>
              <div class="flex flex-col flex-1">
                <label for="year" class="mb-1 text-sm text-at-light-green">Mois/Année</label>
                <input
                    type="text"
                    id="year"
                    class="p-2 w-full text-gray-500 focus:outline-none"
                    v-model="item.year"
                    required
                >
              </div>
              <div class="flex flex-col flex-1">
                <label for="price" class="mb-1 text-sm text-at-light-green">Prix (€)</label>
                <input
                    type="text"
                    id="price"
                    class="p-2 w-full text-gray-500 focus:outline-none"
                    v-model="item.price"
                    required
                >
              </div>

              <img
                  @click="deleteDetail(item.id)"
                  src="@/assets/images/trash-light-green.png"
                  class="h-4 w-auto absolute -left-5 cursor-pointer"
                  alt="icon poubelle"
              >
            </div>
            <Button
                @click="addDetail"
                text="➕ Description"
                type="button"
            />
          </div>

          <Button text="Enregistrer Travaux" type="submit" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { uid } from "uid";
import { supabase } from "@/supabase/init";
import Button from "@/components/Button.vue";
export default {
  name: "Create",
  components: {
    Button
  },
  setup() {
    // Create data
    const placeName = ref("")
    const locationType = ref("choisir-emplacement")
    const details = ref([])
    const statusMsg = ref(null)
    const errorMsg = ref(null)

    // Add detail au tableau details selon le type d'activité sélectionnée
    const addDetail = () => {
      // Vérifier le type d'emplacement
      if (locationType.value === 'exterieur') {
        details.value.push({
          id: uid(),
          description: "",
          artisan: "",
          year: "",
          price: ""
        })
        return;
      }
      // si ce n'est pas un type exterieur alors c'est un type interieur
      details.value.push({
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
      if (details.value.length > 1) {
        // Filtrer
        details.value = details.value.filter((detail) => detail.id !== id)
        return;
      }
      // Sinon msg d'erreur
      errorMsg.value = "Erreur: Impossible de supprimer, vous devez disposer d'au moins une description"
      setTimeout(() => {
        errorMsg.value = false
      }, 5000)
    }

    // Fonction pour écouter le type d'emplacement sélectionné au niveau de l'input "locationType" afin d'afficher les inputs associés au type d'emplacement
    const locationTypeChange = () => {
      details.value = []
      addDetail()
    }

    // Create travaux (envoi des données à supabase)
    const createTravaux = async () => {
      try {
        const { error } = await supabase.from('travaux').insert([
          {
            placeName: placeName.value,
            locationType: locationType.value,
            details: details.value
          }
        ])
        // si error on va dans le catch
        if (error) throw error
        // si pas error, les données sont envoyées et on transmet un msg à l'utilisateur
        statusMsg.value = 'Succès: Enregistrement de travaux effectué 🧰 !'
        // réinitialiser les données
        placeName.value = null
        locationType.value = "choisir-emplacement"
        details.value = []
        // temps d'affichage du msg de succès
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

    return { placeName, locationType, details, statusMsg, errorMsg, addDetail, locationTypeChange, deleteDetail, createTravaux }
  }
}
</script>
