<script setup lang="ts">
import { type AdviserItem, type StudentItem } from "@/type";
import { ref, type PropType } from "vue";
import { useMessageStore } from "@/stores/message";
import router from "@/router";
const props = defineProps({
  professer: {
    type: Object as PropType<AdviserItem>,
    require: true,
  },
  student: {
    type: Object as PropType<StudentItem>,
    require: true,
  },
});

// const store = useMessageStore();
// // const comment = ref("");
// // function onSubmit() {
// //   store.updateMessage(String(props.student?.id), comment.value); // assuming adviserId is available from props or elsewhere
// //   comment.value = "";
// //   router.push({
// //     name: "student-detail",
// //   });
// // }

function flashMessagge() {
  //   store.updateflashcard("Welcome to Adviser Profile");
  //   setTimeout(() => {
  //     store.resetflashcard();
  //   }, 3000);
  router.push({
    name: "professer-profile",
    params: {
      id: props.professer?.id,
    },
  });
}
</script>

<template>

  <div class="flex justify-center">
    <div class="text-left font-mono grid grid-cols-2 text-xl">
      <p class="font-bold">Advisor-ID:</p>
      <p class="ml-3">{{ student?.advisor.advisorID }}</p>
      <p class="font-bold">Advisor-Name:</p>
      <p class="ml-3">
        {{ student?.advisor.name }} {{ student?.advisor.surname }}
      </p>
      <p class="font-bold">Department:</p>
      <p class="ml-3">{{ student?.advisor.department }}</p>
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
