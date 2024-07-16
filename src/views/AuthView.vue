<template>
  <ion-page>
    <ion-content>
      <ion-card class="ion-padding">
        <ion-input
            v-model="userCredentials.email"
            label="Email"
            label-placement="floating"
            fill="outline"
        />
        <ion-input
            v-model="userCredentials.password"
            label="Password"
            label-placement="floating"
            fill="outline"
        />
        <ion-button
            class="ion-margin-top"
            expand="block"
            @click="authenticate"
        >
          LogIn
        </ion-button>
        <ion-button
            class="ion-margin-top"
            expand="block"
            :router-link="{ name: 'Register' }"
        >
          Register
        </ion-button>
      </ion-card>
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">

import {IonPage, IonContent, IonCard, IonInput, IonButton} from "@ionic/vue";
import {Ref, ref} from "vue";
import {UserCredentials} from "@/types/user";
import {loginUser} from "@/databaseService/auth";
import {useRouter} from "vue-router";

const router = useRouter()

const userCredentials: Ref<UserCredentials> = ref({
  email: "",
  password: ""
});

async function authenticate() {
  await loginUser(userCredentials.value)
  await router.push({name: 'Home'})
}

</script>