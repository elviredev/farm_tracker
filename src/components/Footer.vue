<template>
  <footer :class="{ 'loading': isLoading }" class="mt-24 py-20 border-t bg-black border-at-border text-white">
    <div class="container flex flex-col items-center justify-between mx-auto space-y-16 px-6 lg:flex-row lg:space-y-0">
      <!-- Logo & Menu -->
      <div class="flex flex-col items-center justify-between space-y-8 text-lg font-light lg:flex-row lg:space-y-0 lg:space-x-14 text-at-light-green">
        <!-- Logo & Title -->
        <div class="flex items-center space-x-4">
          <img class="w-20" src="@/assets/images/logo-ews-green.png" alt="">
          <h1 class="text-lg">House Tracker</h1>
        </div>

        <!-- Liens -->
        <div class="group">
          <router-link class="cursor-pointer uppercase hover:text-at-yellow" :to="{name: 'Home'}">Accueil</router-link>
          <div class="mx-2 group-hover:border-b group-hover:border-at-yellow"></div>
        </div>

        <div v-show="user"  class="group">
          <router-link class="cursor-pointer uppercase hover:text-at-yellow" :to="{name: 'Create'}">Créer</router-link>
          <div class="mx-2 group-hover:border-b group-hover:border-at-yellow"></div>
        </div>

        <div :class="{ 'hidden': user }" class="group">
          <router-link class="cursor-pointer uppercase hover:text-at-yellow" :to="{name: 'Login'}">Se connecter</router-link>
          <div class="mx-2 group-hover:border-b group-hover:border-at-yellow"></div>
        </div>

        <div v-if="user" class="group">
          <a @click="logout" class="cursor-pointer uppercase hover:text-at-yellow">Se déconnecter</a>
          <div class="mx-2 group-hover:border-b group-hover:border-at-yellow"></div>
        </div>

    </div>

      <!-- Social Container -->
      <div class="text-gray-500 text-sm text-center">
        &copy; 2023 Elvirewebsite. Tous droits réservés
      </div>
    </div>
  </footer>
</template>

<script>
import store from "@/store";
import { computed, ref } from "vue";
import { supabase } from "@/supabase/init";
import { useRouter } from "vue-router";
export default {

  setup() {
    // Get user from store
    const user = computed(() => store.state.user)

    // Setup ref to router
    const router = useRouter()
    const isLoading = ref(false)

    router.beforeEach(() => {
      isLoading.value = true
    })

    router.afterEach(() => {
      isLoading.value = false
    })

    // Logout function
    const logout = async () => {
      await supabase.auth.signOut()
      await router.push({name: 'Home'})
    }

    return { user, isLoading, logout }
  }
}
</script>

<style>
/* Ajoutez des styles pour masquer le pied de page pendant le chargement */
.loading {
  display: none;
}
</style>

