<template class="bg-grey-lighten-2">
  <v-app :theme="theme" app>

    <v-navigation-drawer v-model="drawer" app fixed temporary width="300">
      <v-list>
        <v-list-item v-if="authStore.isLoggedIn">
          <v-row>
            <v-col>
              <v-avatar
                  class="me-2"
                  size="70"
                  style="background: blue"
                  @click="goProfil"
              >
                <v-img alt="image avatar profil" src="@/assets/avatars/avatar1.png"></v-img>

              </v-avatar>
            </v-col>
            <v-col>
              <span style="font-size: 1.5rem">{{ name }}</span>
            </v-col>
          </v-row>

        </v-list-item>
        <v-divider></v-divider>

        <v-list-item v-if="authStore.isLoggedIn" style="position: fixed; bottom: 0">
          <v-btn
              block
              color="indigo"
              depressed
              size="large"
              type="button"
              @click="authStore.signOut"
          >
            Deconnexion
            <v-icon class="ms-2" icon="fa-solid fa-right-from-bracket"/>
          </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
        app
        color="indigo"
        elevate-on-scroll
        elevation="6"
        fixed
        height="70"
        hide-on-scroll
        style="padding: 0 90px;"
    >
      <v-app-bar-nav-icon v-if="authStore.isLoggedIn" class="hidden-md-and-up" @click="drawer = true"/>
      <v-app-bar-title style="color: #fff" @click="goHome">
        My Poster
      </v-app-bar-title>
      <div v-if="authStore.isLoggedIn " class="hidden-sm-and-down">
        <div class="float-sm-right">
          <v-avatar
              class="me-2"
              size="45"
              style="background: rgb(243, 244, 246)"
              @click="goProfil"
          >
            <v-img alt="avatar" src="@/assets/avatars/avatar1.png"></v-img>
            <v-tooltip
                activator="parent"
                anchor="bottom"
            >Profile
            </v-tooltip>
          </v-avatar>
          <v-btn
              aria-label="deconnexion"
              class="ms-3" depressed
              @click="authStore.signOut"
          >
            <v-icon icon="fa-solid fa-right-from-bracket"/>
            <v-tooltip
                activator="parent"
                anchor="bottom"
            >D??connexion
            </v-tooltip>
          </v-btn>
        </div>
      </div>
      <v-btn aria-label="theme sombre" class="ms-2 hidden-sm-and-down" @click="toggleTheme">
        <v-icon :icon="icon"/>
        <v-tooltip
            activator="parent"
            anchor="bottom"
        >Th??me sombre
        </v-tooltip>
      </v-btn>
    </v-app-bar>


    <v-main>

      <router-view></router-view>

    </v-main>


  </v-app>


</template>


<script>

import {useUserStore} from "@/stores/useAuth";

import {onAuthStateChanged,} from "firebase/auth";
import {auth} from "@/firebaseDb";
import {useTemplate} from "@/stores/useTemplate";
import {onBeforeMount, ref} from "vue";


let authStore;
let theme;
let tempStore;

export default {
  components: {},
  emits: ['zoomIn'],
  setup() {
    authStore = useUserStore()
    tempStore = useTemplate();

    theme = ref('light')
    let icon = ref('fa-solid fa-moon')

    onBeforeMount(() => {
      tempStore.fetchPosters()
    })

    return {
      authStore,
      tempStore,
      theme,
      icon,

      toggleTheme: () => {
        if (theme.value === 'light') {
          icon.value = "fa-solid fa-sun"
          theme.value = 'dark'
        } else {
          icon.value = "fa-solid fa-moon"
          theme.value = 'light'

        }
      },

    }
  },
  data: () => ({
    drawer: false,
    name: '',
    slider1: 0,
  }),

  mounted() {


    onAuthStateChanged(auth, (user) => {
      if (user.emailVerified) {
        authStore.isLoggedIn = !!user;
      }
      authStore.userID = user.uid;
      authStore.user.id = user.uid;
      this.name = user.email.split('@')[0];
    });
  },

  methods: {
    goProfil() {
      this.$router.push({path: '/profile'})
    },
    goHome() {
      if (authStore.isLoggedIn) {
        this.$router.push({path: '/home'})
      } else {
        this.$router.push({path: '/'})
      }
    }
  }

}
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

* {
  font-family: 'Roboto', sans-serif;
}


* {
  text-transform: none !important;

}

.active {
  background: #3F51B5;
  color: white;
}


.v-toolbar-title {
  font-size: 2rem;
  color: #1A237E;
  font-weight: 700;
  font-family: cursive;
}

</style>
