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
            type="password"

        >
          <ion-input-password-toggle slot="end"/>
        </ion-input>
        <ion-input
            v-model="userCredentials.confPassword"
            label="Confirm Password"
            label-placement="floating"
            fill="outline"
            type="password"
        >
          <ion-input-password-toggle slot="end"/>
        </ion-input>
        <ion-button
            class="ion-margin-top"
            expand="block"
            @click="register"
        >
          Register
        </ion-button>
        <ion-button
            class="ion-margin-top"
            expand="block"
            :router-link="{ name: 'Auth' }"
        >
          LogIn
        </ion-button>
      </ion-card>

      <ion-alert
          :is-open="alertIsOpen"
          message="Password do not match"
          :buttons="alertButtons"
          @didDismiss="() => alertIsOpen = false"
      ></ion-alert>
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonCard,
  IonInput,
  IonButton,
  IonAlert,
  IonInputPasswordToggle,
  alertController
} from "@ionic/vue";
import {Ref, ref} from "vue";
import {UserRegisterCredentials} from "@/types/user";
import {registerUser} from "@/databaseService/auth";
import {useRouter} from "vue-router";

const router = useRouter()

const alertIsOpen = ref(false)
const userCredentials: Ref<UserRegisterCredentials> = ref({
  email: "",
  password: "",
  confPassword: ""
});

const alertButtons = [
  {
    text: 'Cancel',
    role: 'cancel',
    handler: () => { alertIsOpen.value = false  },
  },
];




async function register() {
  if (userCredentials.value.password !== userCredentials.value.confPassword) {
    alertIsOpen.value = true
    return
  }
  try {
    await registerUser(userCredentials.value)
    const alert = await alertController.create({ message: 'User registered successfully'});
    await alert.present();
    await router.push({ name: 'Auth' })
  } catch (e) {
    const alert = await alertController.create({ message: e.message });
    await alert.present();
  }
}

</script>