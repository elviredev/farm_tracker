<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!-- Error Handling -->
    <div v-if="errorMsg" class="mb-10 p-4 bg-light-grey rounded-md shadow-lg">
      <p class="text-red-500"> {{ errorMsg }}</p>
    </div>

    <!-- Login -->
    <form @submit.prevent="login" class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg">

      <h1 class="text-3xl text-at-light-green-2 mb-4">Se connecter</h1>

      <div class="flex flex-col mb-2">
        <label for="email" class="mb-1 text-sm text-at-light-green-2">Email</label>
        <input
            v-model="email"
            type="text"
            id="email"
            class="p-2 text-gray-500 focus:outline-none"
            required
        >
      </div>
      <div class="flex flex-col mb-2">
        <label for="password" class="mb-1 text-sm text-at-light-green-2">Mot de passe</label>
        <input
            v-model="password"
            type="password"
            id="password"
            class="p-2 text-gray-500 focus:outline-none"
            required
        >
      </div>

      <!-- Button Component -->
      <Button text="Se connecter" type="submit" />
      <!-- Lien vers page de Register -->
      <router-link class="text-sm mt-6 text-center" :to="{name: 'Register'}">
        Vous n'avez pas encore de compte ? <span class="text-at-light-green-2 hover:text-at-orange">S'inscrire'</span>
      </router-link>

    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import Button from "@/components/Button.vue";
import { supabase } from "@/supabase/init";
import { useRouter } from "vue-router";
export default {
  name: "Login",
  components: {
    Button
  },
  setup() {
    // Create data / vars
    const email = ref(null)
    const password = ref(null)
    const errorMsg = ref(null)
    const router = useRouter()

    // Login function
    const login = async () => {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.value,
          password: password.value
        })
        if (error) throw error
        await router.push({name: 'Home'})
      } catch (error) {
        errorMsg.value = `Erreur: ${error.message}`
        // Le msg s'affiche 5 sec
        setTimeout(() => {
          errorMsg.value = null
        }, 5000)
      }
    }

    return { email, password, errorMsg, login }
  }
}
</script>
