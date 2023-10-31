<script setup lang="ts">
import { type AdviserItem, type StudentItem } from "@/type";
import { ref, type PropType } from "vue";
import { useMessageStore } from "@/stores/message";
import router from "@/router";
import AdviserService from "@/services/AdviserService";
const props = defineProps({
  student: {
    type: Object as PropType<StudentItem>,
    require: true,
  },
});


const professor = ref<AdviserItem>()
AdviserService.getAdviserById(props.student?.advisor.id as number)
.then(res => {
  professor.value = res.data as AdviserItem
})

function flashMessagge() {
  //   store.updateflashcard("Welcome to Adviser Profile");
  //   setTimeout(() => {
  //     store.resetflashcard();
  //   }, 3000);
  router.push({
    name: "professer-profile",
    params: {
      id: professor.id,
    },
  });
}
</script>

<template>
  <div v-if="professor">
    <div class="mt-10 flex justify-center">
      <img :src="professor?.image[0]" 
      class="border-4 border-black h-60 w-60 object-cover rounded-xl"
      />
    </div>
  <div class="flex justify-center mt-10" >
    <div class="text-left font-mono grid grid-cols-2 text-xl">
      <p class="font-bold">Advisor-ID:</p>
      <p class="ml-3">{{ professor.advisorID }}</p>
      <p class="font-bold">Advisor-Name:</p>
      <p class="ml-3">
        {{ student?.advisor.name }} {{ professor.surname }}
      </p>
      <p class="font-bold">Department:</p>
      <p class="ml-3">{{ professor.department }}</p>
    </div>
  </div>
  </div>

  
    <!-- <div class="text-center font-mono">
      <input
        type="text"
        placeholder="Enter comment .."
        v-model="comment"
        class="border-2 border-black h-16 w-80 p-2 break-words mt-2 text-center"
      />
      <div>
        <button
          @click="onSubmit"
          class="my-2 hover:text-red-800 font-extrabold underline"
        >
          Submit
        </button>
      </div>
    </div> -->

</template>

<style scoped>
.active-link {
  color: red;
}
</style>
