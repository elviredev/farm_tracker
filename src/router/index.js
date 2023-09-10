import { createRouter, createWebHistory } from 'vue-router'
import {supabase} from "@/supabase/init";
import Home from '../views/Home.vue'
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Create from "@/views/Create.vue";
import ViewTravaux from "@/views/ViewTravaux.vue";


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: "Accueil",
      auth: false
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: "Se connecter",
      auth: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: "S'inscrire",
      auth: false
    }
  },
  {
    path: '/create',
    name: 'Create',
    component: Create,
    meta: {
      title: "Créer",
      auth: true
    }
  },
  {
    path: '/view-travaux/:travauxId',
    name: 'View-Travaux',
    component: ViewTravaux,
    meta: {
      title: "Travaux",
      auth: false
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Change document titles (Onglets Navigateur)
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | House Tracker`
  next()
})

// Route guard for auth routes
router.beforeEach(async (to, from, next) => {
  try {
    // Récupérer la session en utilisant getSession() de manière asynchrone
    const { data: { session } } = await supabase.auth.getSession();

    // Si l'authentification est requise pour la route
    if (to.matched.some((res) => res.meta.auth)) {
      // Si un utilisateur est authentifié, autoriser l'accès à la page
      if (session?.user) {
        next();
        return;
      } else {
        // Si l'utilisateur n'est pas authentifié, rediriger vers page de connexion
        next({ name: 'Login' });
        return;
      }
    }

    // Si l'authentification n'est pas requise, autoriser l'accès à la page
    next();
  } catch (error) {
    // Gérer les erreurs éventuelles ici, par exemple, en affichant un message d'erreur
    console.error('Erreur lors de la récupération de la session :', error);
    next();
  }
});



export default router
