// API de composition (store/state)
import { reactive } from "vue";

// Création du state
const state = reactive({
    user: null
})

const methods = {
    setUser(payload) {
        state.user = payload ? payload.user : null
    }
}

// Pour accéder à cet état dans d'autres fichiers
export default {
    state,
    methods
}
