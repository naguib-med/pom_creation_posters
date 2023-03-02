<template>
  <v-container>
    <v-btn class="mb-3" color="primary" @click="goHome">Revenir</v-btn>

    <v-alert v-model="sendReset" border="start" closable type="success">
      Un mail de réinitialisation à été envoyé. Veuillez regarder votre boite e-mail.
    </v-alert>
    <v-flex class="d-flex justify-center pa-3 mb-5">
      <p class="h3info">Renseignez votre e-mail pour pouvoir réinitialiser votre mot de passe.</p>
    </v-flex>
    <v-form>
      <v-card class="pa-lg-5 rounded-xl mx-auto border" elevation="3" width="800">
        <v-card-header>
          <v-card-header-text>
            <v-card-title class="text-primary">Réinitialisation</v-card-title>
          </v-card-header-text>
        </v-card-header>

        <v-card-text class="pa-lg-5">
          <v-text-field
              v-model="authStore.email"
              :rules="emailRules"
              color="primary"
              label="name@example.com"
              prepend-inner-icon="fa-solid fa-at"
              required
              variant="outlined"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-btn class="bg-primary" color="white" @click="reset_password">Reinitialiser</v-btn>
        </v-card-actions>
      </v-card>

    </v-form>
  </v-container>
</template>

<script>
import {useUserStore} from "@/stores/useAuth";
import router from "@/router";

let authStore;
export default {
  name: "ForgotPassword.vue",
  setup() {
    authStore = useUserStore()

    return {authStore}
  },
  data: () => ({
    emailRules: [
      v => !!v || 'Veuillez entrer un email valide',
      v => /.+@.+\..+/.test(v) || 'E-mail doit être valide',
    ],
    sendReset: false
  }),
  methods: {
    goHome() {
      router.push({
        path: '/login'
      })
    },
    reset_password() {
      authStore.reset_password().then(() => {
        this.sendReset = true;
        authStore.email = ''
      })
    }


  }
}
</script>

<style scoped>

</style>