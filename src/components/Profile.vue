<template>

  <v-btn class="ml-16 ma-6 bg-blue-grey-darken-2" to="/home">
    <v-icon class="float-left me-2" color="white" icon="fa-solid fa-angles-left"/>
    <span style="color: white">Revenir</span>
  </v-btn>


  <v-container class="d-flex justify-center" fluid>
    <v-card class="mt-5 rounded-xl pa-5" style="background-color: #ECF0F1 " elevation="5" width="80rem">
      <v-card-text>
        <v-flex class="d-flex justify-center mb-5">
          <v-avatar class="mr-4" size="150">
            <v-img alt="Avatar" src="@/assets/avatars/avatar1.png"></v-img>
          </v-avatar>
        </v-flex>
        <v-text-field
            v-model="form.firstName"
            variant="outlined"
            color="primary"
            class="text-black"
            label="Prénom"></v-text-field>
        <v-text-field
            v-model="form.Email"
            variant="outlined"
            color="primary"
            class="text-black"
            label="Email Address"></v-text-field>
      </v-card-text>

      <v-card-actions class="pa-4">
        <v-btn :loading="loading" class="bg-indigo" @click="updateProfile">
          <v-icon class="me-2" dark icon="fa-solid fa-check" left/>
          Sauvegarder
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import {getAuth, onAuthStateChanged, updateEmail} from "firebase/auth";
import {auth} from "@/firebaseDb";

export default {
  name: "Profile",
  data() {
    return {
      loading: false,
      form: {
        firstName: '',
        Email: '',
      },
    }
  },

  beforeMount() {
    onAuthStateChanged(auth, (user) => {
      this.form.firstName = user.email.split('@')[0];
      this.form.Email = user.email;
    });
  },
  methods: {
    updateProfile() {
      const auth = getAuth();
      console.log(this.form.Email)
      updateEmail(auth.currentUser, this.form.Email).then(() => {
      }).catch((error) => {
        console.log(error)
      });

    }
  }
}
</script>

<style scoped>

</style>