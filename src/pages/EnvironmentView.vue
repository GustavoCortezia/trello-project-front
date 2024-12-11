<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { createCards, createSection, deleteCard, deleteCards, deleteSection, editCard, editCards, editSection, getCards, getSections, showEnvironment } from '@/services/api';
import { EnvironmentType } from '@/types/EnvironmentType';
import { useRoute } from 'vue-router';
import { SectionType } from '@/types/SectionType';
import { CardType } from '@/types/CardType';
import Draggable from 'vuedraggable';

const environments = ref<EnvironmentType[]>([]);
const sections = ref<SectionType[]>([]);
const cards = ref<CardType[]>([]);
const route = useRoute();

const name = ref<string>('');
const sectionIdRef = ref<number>(0);
const cardIdRef = ref<number>(0);
const showdate = ref<boolean>(false);
const cardName = ref<string>('');
const date = ref<any>(null);
const modalSection = ref<boolean>(false);
const modalCard = ref<boolean>(false);
const modalDelete = ref<boolean>(false);
const modalEdit = ref<boolean>(false);
const color = ref<string>('#ff0000');
const error = ref<boolean>(false);

const modalDeleteCard = ref<boolean>(false);
const modalEditCard = ref<boolean>(false);


onMounted(async () => {
  try {
    const response = await showEnvironment(route.params.id);
    environments.value = response.data.data;
    console.log("Response:", environments.value);
  } catch (error) {
    console.error("Error:", error);
  }

  try {
    const response2 = await getSections(route.params.id);
    sections.value = response2.data.data;
    console.log("Response:", sections.value);
  } catch (error) {
    console.error("Error:", error);
  }

  try {
    const response3 = await getCards();
    cards.value = response3.data.data;
    console.log("Response:", cards.value);
  } catch (error) {
    console.error("Error:", error);
  }
  console.log(cards.value);
});

function openSectionModal(){
  modalSection.value = true;
}
function closeSectionModal(){
  modalSection.value = false;
}

function openDeleteCard(cardId: number){
  cardIdRef.value = cardId;
  modalDeleteCard.value = true;
}

function closeDeleteCard(){
  modalDeleteCard.value = false;
}

function closeEditCard(){
  modalDeleteCard.value = false;
}

function openEditCard(cardId: number, sectionId:number){
  cardIdRef.value = cardId;
  sectionIdRef.value = sectionId;
  modalEditCard.value = true;
}

function openDelete(sectionId: number){
  sectionIdRef.value = sectionId;
  modalDelete.value = true;
}

function openEdit(sectionId: number){
  sectionIdRef.value = sectionId;
  modalEdit.value = true;
}

function closeEdit(){
  modalEdit.value = false;
}

function closeDelete(){
  modalDelete.value = false;
}

async function handleDeleteSection(){
  console.log(sectionIdRef.value);

  const response = await deleteSection(sectionIdRef.value);
  if(response.status == 200){
    window.location.reload();
  }
}

function openCardModal(sectionId:number){
  sectionIdRef.value = sectionId
  modalCard.value = true;
}
function closeCardModal(){
  modalCard.value = false;
}

async function handleCreateSection(){
  if(name.value.length >= 30 || name.value.length <= 1) {
    error.value = true;
    return;
  }
  const response = await createSection(name.value, route.params.id, color.value);
  console.log(response);
  if (response?.status == 201) {
    modalSection.value = false;
    error.value = false;
    window.location.reload();
  }
}

async function handleCreateCard(){
  const formattedDate = date.value ? date.value.toISOString().slice(0, 10) : '';
  if(cardName.value.length >= 30 || cardName.value.length <= 1) {
    error.value = true;
    console.log(new Date(formattedDate));
    return;
  }

  const response = await createCards(cardName.value, date.value, sectionIdRef.value, route.params.id);
  console.log(response);
  if (response?.status == 201) {
    modalSection.value = false;
    error.value = false;
    window.location.reload();
  }
}

async function handleEditSection() {
  if(name.value.length >= 30 || name.value.length <= 1) {
    error.value = true;
    return;
  }

  const response = await editSection(sectionIdRef.value, name.value, color.value);
  console.log(response);

  if (response?.status == 200) {
    modalSection.value = false;
    error.value = false;
    window.location.reload();
  }
}

async function handleDeleteCard() {
  const response = await deleteCard(cardIdRef.value);
  console.log(response);

  if(response.status == 200){
    window.location.reload();
  }
}

async function handleEditCard() {
  const formattedDate = date.value ? date.value.toISOString().slice(0, 10) : '';
  if(cardName.value.length >= 30 || cardName.value.length <= 1) {
    error.value = true;
    console.log(new Date(formattedDate));
    return;
  }
  console.log(sectionIdRef.value);

  const response = await editCard(cardIdRef.value, cardName.value, date.value, sectionIdRef.value, route.params.id);
  if (response?.status == 200) {
    modalSection.value = false;
    error.value = false;
    window.location.reload();
  }
}


async function updateCardSection(card: CardType, newSectionId: number) {
  card.sectionId = newSectionId;
  await editCard(card.id, card.name, card.date, newSectionId, route.params.id);
}



const holdingCard = ref<CardType>(cards.value[1]);
const dropSectionID = ref<number>(0);




function allowDrop(ev: any) {
  ev.preventDefault();
}

function drag(card: CardType, ev: any) {
  holdingCard.value = card;
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(section: number, ev: any) {
  dropSectionID.value = section;
 updateCardSection(holdingCard.value, dropSectionID.value)

  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}











</script>

<template>
    <v-app-bar class="nav-bar d-flex justify-center" :elevation="5" rounded>
      <v-app-bar-title><img class="nav-img mt-11" src="../assets/planify logo nome.png" alt=""></v-app-bar-title>
      <v-btn class="btn-add-section mx-15" @click="openSectionModal" ><v-icon icon="mdi-plus" start></v-icon>Add Section</v-btn>
  </v-app-bar>
<div class="env-title-div">
  <h2 class="env-title mb-15">{{ environments.name }}</h2>
</div>

<div class="env-container">
  <div class="environment-div mx-15 d-flex">
      <div v-for="section in sections" :key="section.id" class="section-div d-flex align-center flex-column mx-4" @drop="drop(section.id)" @dragover="allowDrop">
      <div class="btn-show-more-div">

        <v-speed-dial
          location="right top"
          transition="slide-y-reverse-transition">

          <template v-slot:activator="{ props: activatorProps }">
            <button
              class="btn-show-more"
              v-bind="activatorProps"
            ><v-icon icon="mdi-dots-horizontal"></v-icon></button>
          </template>
          <v-btn elevation="10" @click="openDelete(section.id)" key="1" icon="mdi-delete"></v-btn>
          <v-btn elevation="10" @click="openEdit(section.id)" key="2" icon="mdi-pencil"></v-btn>
        </v-speed-dial>

      </div>
      <div class="section-name-div">
        <p class="section-name my-3 px-4 py-2 rounded-xl" ><v-icon class="mr-0" icon="mdi-arrow-down-drop-circle-outline" :style="{ color: section.color }" start></v-icon> {{ section.name}}</p>


      </div>
      <div class="create-card-btn-div d-flex" :style="{ backgroundColor: section.color }">
          <v-btn  @click="openCardModal(section.id)" class="create-card-btn"><v-icon icon="mdi-plus" start></v-icon>Add Card </v-btn>
      </div>

      <!-- <div  id="div1" @drop="drop(section.id)" @dragover="allowDrop"> </div> -->
      <div v-for="card in cards" :key="card.id" class="card-for-div d-flex justify-center" >
        <div id="drag1" draggable="true" @dragstart="drag(card)" width="336" height="69" v-if="card.sectionId == section.id" class="card-div d-flex justify-center mb-3 " :style="{ border: `2px solid ${section.color}` }">


          <h4 class="card-name d-flex justtify-center ma-2">{{ card.name }}</h4>

          <div class="dots-div" >
            <v-speed-dial
              location="right top"
              transition="slide-y-reverse-transition">

              <template v-slot:activator="{ props: activatorProps }">
                <button
                class="btn-show-more"
                  v-bind="activatorProps"
                ><v-icon icon="mdi-dots-horizontal"></v-icon></button>
              </template>
               <v-btn elevation="10" @click="openDeleteCard(card.id)" key="1" icon="mdi-delete"></v-btn>
              <v-btn elevation="10" @click="openEditCard(card.id, section.id)" key="2" icon="mdi-pencil"></v-btn>
            </v-speed-dial>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  <!-- MODAL SECTION -->
<v-dialog
      v-model="modalSection"
      transition="dialog-bottom-transition"
      width="auto"
    >
      <v-card
        class="d-flex flex-column justify-center align-center pa-15 rounded-xl"
        style="min-width: 600px; min-height: 400px;"
      >
      <form class="form d-flex justify-center align-center flex-column">
        <h1 class="card-title">Add Section</h1>
        <v-text-field
        width="300"
        class="input mt-10"
            v-model="name"
            label="Name"
            required
          ></v-text-field>

          <div>
            <v-color-picker
              hide-canvas
              class="color-picker mt-5 mb-7"
              v-model="color"
              hide-inputs
              show-sliders
              mode="hex"
              hide-mode-switcher
            ></v-color-picker>
          </div>

          <p v-if="error" class="text-red mb-2">error: Enter a valid section name!</p>

          <v-btn class="create-button" @click="handleCreateSection" width="300px">Create</v-btn>
      </form>

        <v-card-actions class="justify-end">
          <v-btn
            class="close-btn"
            width="200px"
            text="Close"
            @click="closeSectionModal"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
   <!-- END MODAL SECTION -->



     <!-- MODAL Card -->
<v-dialog
      v-model="modalCard"
      transition="dialog-bottom-transition"
      width="auto"
    >
      <v-card
        class="d-flex flex-column justify-center align-center pa-15 rounded-xl"
        style="min-width: 600px; min-height: 400px;"
      >
      <form class="form d-flex justify-center align-center flex-column">
        <h1 class="card-title">Add Card</h1>
        <v-text-field
        width="300"
        class="input mt-10"
            v-model="cardName"
            label="Name"
            required
          ></v-text-field>

            <v-checkbox v-model="showdate" label="Select due date"></v-checkbox>

            <v-container v-if="showdate">
              <v-row justify="space-around">
                <v-date-picker v-model="date" color="blue-darken-1" class="date-picker mb-5" v-date-picker elevation="4">
                  <template v-slot:title>Due Date</template>
                </v-date-picker>
              </v-row>
            </v-container>



          <p v-if="error" class="text-red mb-2">error: Enter a valid section name!</p>

          <v-btn class="create-button" @click="handleCreateCard" width="300px">Create</v-btn>
      </form>

        <v-card-actions class="justify-end">
          <v-btn
            class="close-btn"
            width="200px"
            text="Close"
            @click="closeCardModal"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
   <!-- END MODAL Card -->

<!-- MODAL DELETE -->
   <v-dialog
      v-model="modalDelete"
      transition="dialog-bottom-transition"
      width="auto"
    >
      <v-card
        class="d-flex flex-column justify-center align-center pa-15 rounded-xl"
        style="min-width: 200px; min-height: 200px;"
      >
        <h2 class="card-title">DELETE SECTION</h2>
        <h4 class="mb-5 mt-5">Are you sure you want to delete this section and all the cards in it?</h4>

        <v-card-actions class="justify-end">

          <v-btn @click="handleDeleteSection" class="bg-red" width="200px">DELETE</v-btn>

          <v-btn
            class="close-btn bg-blue"
            width="200px"
            text="Close"
            @click="closeDelete"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- END MODAL DELETE -->

     <!-- MODAL Edit -->
     <v-dialog
      v-model="modalEdit"
      transition="dialog-bottom-transition"
      width="auto"
    >
      <v-card
        class="d-flex flex-column justify-center align-center pa-15 rounded-xl"
        style="min-width: 600px; min-height: 400px;"
      >
      <form class="form d-flex justify-center align-center flex-column">
        <h1 class="card-title">Edit Section</h1>
        <v-text-field
          width="300"
          class="input mt-10"
            v-model="name"
            label="Name"
            required
          ></v-text-field>

          <div>
            <v-color-picker
              hide-canvas
              class="color-picker mt-5 mb-7"
              v-model="color"
              hide-inputs
              show-sliders
              mode="hex"
              hide-mode-switcher
            ></v-color-picker>
          </div>

          <p v-if="error" class="text-red mb-2">error: Enter a valid section name!</p>

          <v-btn class="create-button" @click="handleEditSection" width="300px">Edit</v-btn>
      </form>

        <v-card-actions class="justify-end">
          <v-btn
            class="close-btn"
            width="200px"
            text="Close"
            @click="closeEdit"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- END MODAL Edit -->

    <!-- MODAL DELETE CARD -->
    <v-dialog
      v-model="modalDeleteCard"
      transition="dialog-bottom-transition"
      width="auto"
    >
      <v-card
        class="d-flex flex-column justify-center align-center pa-15 rounded-xl"
        style="min-width: 200px; min-height: 200px;"
      >
        <h2 class="card-title">DELETE CARD</h2>
        <h4 class="mb-5 mt-5">Are you sure you want to delete this card?</h4>

        <v-card-actions class="justify-end">

          <v-btn @click="handleDeleteCard" class="bg-red" width="200px">DELETE</v-btn>

          <v-btn
            class="close-btn bg-blue"
            width="200px"
            text="Close"
            @click="closeDeleteCard"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- END MODAL DELETE CARD -->


     <!-- MODAL EDIT Card -->
     <v-dialog
      v-model="modalEditCard"
      transition="dialog-bottom-transition"
      width="auto"
    >
      <v-card
        class="d-flex flex-column justify-center align-center pa-15 rounded-xl"
        style="min-width: 600px; min-height: 400px;"
      >
      <form class="form d-flex justify-center align-center flex-column">
        <h1 class="card-title">Edit Card</h1>
        <v-text-field
        width="300"
        class="input mt-10"
            v-model="cardName"
            label="Name"
            required
          ></v-text-field>

            <v-checkbox v-model="showdate" label="Select due date"></v-checkbox>

            <v-container v-if="showdate">
              <v-row justify="space-around">
                <v-date-picker v-model="date" color="blue-darken-1" class="date-picker mb-5" v-date-picker elevation="4">
                  <template v-slot:title>Due Date</template>
                </v-date-picker>
              </v-row>
            </v-container>



          <p v-if="error" class="text-red mb-2">error: Enter a valid section name!</p>

          <v-btn class="create-button" @click="handleEditCard" width="300px">Edit</v-btn>
      </form>

        <v-card-actions class="justify-end">
          <v-btn
            class="close-btn"
            width="200px"
            text="Close"
            @click="closeEditCard"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
   <!-- END MODAL EDIT Card -->


</template>


<style scoped>
#div1{
  border: 1px solid aqua;
  width: 250px;
  height: 250px;
}

  .dots-div{
    display: flex;
    justify-content:flex-end;
    align-items: flex-start;
    margin-left: -28px;
  }

  .btn-show-more-div{
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-bottom: -1px;
  }

  .section-name{
    white-space: nowrap;
    width: 240px !important;
  }

  .btn-show-more{
    display: flex;
    box-shadow: none !important;
    margin-right: 5px;
    margin-bottom: -25px;
  }


  ::v-deep(.v-date-picker-header){
    display: none !important;
  }

  .env-title{
    margin-top: 100px;
    color: rgb(2, 152, 213);
    border-bottom: 3px solid rgb(254, 50, 158) ;
  }

  .env-title-div{
    display: flex;
    justify-content: center;
  }


  .environment-div {
  display: flex;
  margin-left: 0px !important;
  min-width: 100vw;
  overflow-x: auto;
  scroll-snap-type: both mandatory;
  /* justify-content: center; */
}

.env-container {
  bottom: 0;
  left: 0;
  display: flex;
  /* width: auto; */
  /* justify-content: center; */
}

.section-div {
  border: 2px solid rgb(226, 226, 226);
  border-radius: 15px;
  height: fit-content;
}
  .create-card-btn-div{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    width: 100%;
    margin-bottom: 10px;
  }

  .create-card-btn{
    width: 75%;
  }

  .card-div{
    border-radius: 10px;
    height: 220px;
    width: 90%;
  }

  .card-name{
    height: 20px;
    width: 100% !important;
    display: flex;
    justify-content: center;
  }

  .card-for-div{
    width: 100%;
  }

  .btn-add-section{
    color: rgb(254, 50, 158);
    width: 200px !important;
    border-radius: 5px;
    font-size: 0.9rem;
  }
  .v-toolbar-title__placeholder{
    background-color: aqua !important;
  }
  .nav-bar{
    height: 100px;
    border-bottom: 2px solid rgb(254, 50, 158);
  }
  ::v-deep(.v-toolbar__content) {
    height: 80px !important;
  }
  .nav-img{
    margin: 2%;
    width: 130px;
  }

  .color-div{
    width: 30px;
  }

  .close-btn {
    color: rgb(2, 152, 213);
  }
  .create-button{
    background-color: rgb(254, 50, 158);
    color: white;
    border: 1px solid rgb(254, 50, 158);
  }

  .create-button:hover{
    background-color: white;
    color: rgb(254, 50, 158);
  }

  .card-title{
    color: rgb(254, 50, 158);
  }

</style>
