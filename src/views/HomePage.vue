<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-button
            slot="end"
            router-direction="forward"
            @click="signOut"
        >
          <ion-icon :icon="logInOutline"/>
        </ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-card>
        <ion-card-header>
          <ion-row>
            <ion-col class="ion-align-items-center">
              <ion-card-title>Balance:</ion-card-title>
            </ion-col>
            <ion-col class="ion-text-end">
              <ion-card-title>{{ balance }}$</ion-card-title>
            </ion-col>
          </ion-row>
        </ion-card-header>
      </ion-card>

      <ion-row>
        <ion-col class="ion-align-items-center">
          <ion-button
              expand="block"
              @click="openFoundsModal(false)"
          >
            Add funds
          </ion-button>
        </ion-col>
        <ion-col>
          <ion-button
              color="danger"
              expand="block"
              @click="openFoundsModal(true)"
          >
            Reduce funds
          </ion-button>
        </ion-col>
      </ion-row>

      <ion-card>
        <ion-row v-for="item in recordsList" :key="item.id">
          <ion-col>
            <ion-card-title>{{ item.comment }}</ion-card-title>
            <ion-card-subtitle>{{ item.date }}</ion-card-subtitle>
          </ion-col>
          <ion-col class="ion-text-end">
            <ion-card-title :color="item.isExpense ? 'danger' : 'success'">
              {{ item.isExpense ? '-' : '+'}} {{ item.value }}
            </ion-card-title>
          </ion-col>
        </ion-row>
      </ion-card>



      <ion-modal
          :is-open="isAddFundsModalOpen"
          @will-dismiss="closeFoundsModal"
          :initial-breakpoint="0.5"
          :brealpoints="[0, .5, 1]"
          handle-behaviour="cycle"
      >
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="end">
              <ion-button @click="closeFoundsModal">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
          <ion-input
              v-model="record.comment"
              label="Comment"
              label-placement="floating"
              fill="outline"
          />
          <ion-input
              v-model="record.value"
              label="Value"
              label-placement="floating"
              fill="outline"
          />
          <ion-button
              expand="block"
              class="ion-margin-top"
              @click="handleNewFound"
          >
            Submit
          </ion-button>
        </ion-content>

      </ion-modal>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {IonPage, IonIcon, IonContent, IonCardTitle, IonInput, IonHeader, IonToolbar, IonCardSubtitle, IonButton, IonCard, IonCardHeader, IonRow, IonButtons, IonModal, IonCol} from '@ionic/vue';
import {computed, onMounted, Ref, ref} from "vue";
import { FoundRecord } from "@/types/record";
import { addNewRecord, getAllRecord } from "@/databaseService/addNewFoundRecord";
import { logInOutline } from 'ionicons/icons'
import { signOutUser } from "@/databaseService/auth";
import {useRouter} from "vue-router";


const router = useRouter()


const recordsList: Ref<FoundRecord[]> = ref([])
const isAddFundsModalOpen = ref(false)
const isNewRecordIsExpense = ref(false)
const balance = computed(() => {
  if (recordsList.value.length === 0) return

  return recordsList.value.reduce((acc, item) => {
    return item.isExpense ? acc - Number(item.value) : acc + Number(item.value)
  }, 0)
})

const record: Ref<FoundRecord> = ref({
  id: '',
  comment: '',
  value: 0,
  date: '',
  isExpense: false
})


function closeFoundsModal() {
  isAddFundsModalOpen.value = false
  record.value = {
    id: '',
    comment: '',
    value: 0,
    date: '',
    isExpense: false
  }
}

async function handleNewFound() {
  if (!record.value.value || !record.value.comment) return

  const newRecord = {
    id: new Date().getTime().toString(),
    comment: record.value.comment,
    value: record.value.value,
    date: new Date().toDateString(),
    isExpense: isNewRecordIsExpense.value
  }

  await addNewRecord(newRecord)

  recordsList.value.push(newRecord)
  closeFoundsModal()
}



function openFoundsModal(isExpense: boolean) {
  isNewRecordIsExpense.value = isExpense
  isAddFundsModalOpen.value = true
}

async function signOut() {
  await signOutUser()
  await router.push({ name: 'Auth'})
}

onMounted(async () => {
  recordsList.value = await getAllRecord()
})
</script>

<style scoped>

</style>
