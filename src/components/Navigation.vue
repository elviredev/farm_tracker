<template>
  <header class="bg-at-light-green text-white">
    <nav class="container py-5 px-4 flex flex-col gap-4 items-center sm:flex-row">
      <!-- Logo & Title -->
      <div class="flex items-center gap-x-4">
        <img class="w-14" src="../assets/images/house-light.png" alt="">
        <h1 class="text-lg">House Tracker</h1>
      </div>
      <!-- Liens -->
      <ul class="flex flex-1 justify-end gap-x-10 text-sm sm:text-base">
        <div class="group">
          <router-link class="cursor-pointer hover:text-at-orange" :to="{name: 'Home'}">Accueil</router-link>
          <div class="mx-2 group-hover:border-b group-hover:border-at-orange"></div>
        </div>

        <div v-if="user"  class="group">
          <router-link class="cursor-pointer hover:text-at-orange" :to="{name: ''}">Créer</router-link>
          <div class="mx-2 group-hover:border-b group-hover:border-at-orange"></div>
        </div>

        <div v-if="!user" class="group">
          <router-link class="cursor-pointer hover:text-at-orange" :to="{name: 'Login'}">Se connecter</router-link>
          <div class="mx-2 group-hover:border-b group-hover:border-at-orange"></div>
        </div>

        <li v-if="user" @click="logout" class="cursor-pointer hover:text-at-orange">Se déconnecter</li>
      </ul>
    </nav>
  </header>
</template>

<script>
import store from "@/store";
import { computed } from "vue";
import { supabase } from "@/supabase/init";
import { useRouter } from "vue-router";
export default {
  setup() {
    // Get user from store
    const user = computed(() => store.state.user)

    // Setup ref to router
    const router = useRouter()

    // Logout function
    const logout = async () => {
      await supabase.auth.signOut()
      await router.push({name: 'Home'})
    }

    return { user, logout }
  }
}
</script>

