<template>
  <div class="max-w-screen-sm mx-auto px-4 py-28">
    <!-- Error Handling -->
    <div v-if="errorMsg" class="mb-10 p-4 bg-light-grey rounded-md shadow-lg">
      <p class="text-red-500"> {{ errorMsg }}</p>
    </div>

    <!-- Registration -->
    <form @submit.prevent="register" class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg">

      <h1 class="text-3xl text-at-light-green-2 mb-4">Inscription</h1>

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
      <div class="flex flex-col mb-2">
        <label for="confirmPassword" class="mb-1 text-sm text-at-light-green-2">Confirmer le mot de passe</label>
        <input
            v-model="confirmPassword"
            type="password"
            id="confirmPassword"
            class="p-2 text-gray-500 focus:outline-none"
            required
        >
      </div>
      <!-- Button Component -->
      <Button text="S'inscrire" type="submit" />
      <!-- Lien vers page de Login -->
      <router-link class="text-sm mt-6 text-center" :to="{name: 'Login'}">
        Vous avez déja un compte ? <span class="text-at-light-green-2 hover:text-at-orange">Se connecter</span>
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
  name: "Register",
  components: {
    Button
  },
  setup() {
    // Create data / vars
    const email = ref(null)
    const password = ref(null)
    const confirmPassword = ref(null)
    const errorMsg = ref(null)
    const router = useRouter()

    // Register function
    const register = async () => {
      // check mdp = confirm mdp
      if (password.value === confirmPassword.value) {
        try {
          const { error } = await supabase.auth.signUp({
            email: email.value,
            password: password.value
          })
          if (error) throw error
          // Si aucune erreur, user redirigé vers page de login
          await router.push({name: 'Login'})
        } catch (error) {
          errorMsg.value = error.message
          // Le msg s'affiche 5 sec
          setTimeout(() => {
            errorMsg.value = null
          }, 5000)
        }
        return;
      }
      // si les mdp ne match pas
      errorMsg.value = "Erreur: les mots de passe ne correspondent pas"
      setTimeout(() => {
        errorMsg.value = null
      }, 5000)
    }

    return { email, password, confirmPassword, errorMsg, register }
  }
}
</script>
