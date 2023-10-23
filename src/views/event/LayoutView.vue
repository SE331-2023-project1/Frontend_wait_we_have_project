<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useStudentStore } from "@/stores/student";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const store = useStudentStore();
const { student, professer } = storeToRefs(store);
const id = ref(student?.value?.id);

const authStore = useAuthStore();
</script>

<template>
  <div class="flex justify-center">
    <div v-if="student" class="flex flex-col items-center gap-4 my-6  w-1/2 p-10 border-black border-4">
    <img
      v-for="image in student?.image"
      :key="image"
      :src="image"
      alt="Student Image"
      class="border-4 border-black h-48 w-42 object-cover"
    />
    <h1 class="font-mono font-bold text-2xl">
      StudentID: {{ student.studentID }}
    </h1>
    <div class="mb-4">
      <RouterLink
        :to="{ name: 'student-detail', params: { id } }"
        class="font-mono font-semibold hover:text-red-800"
        active-class="active-link"
        exact-active-class="active-link"
      >
        Student Details
      </RouterLink>
      |
      <RouterLink
        :to="{ name: 'adviser-detail', params: { id } }"
        class="font-mono font-semibold hover:text-red-800"
        active-class="active-link"
        exact-active-class="active-link"
      >
        Adviser Details
      </RouterLink>
      
      <RouterLink
      v-if="authStore.isStudent"
        :to="{ name: 'update-student', params: { id } }"
        class="font-mono font-semibold hover:text-red-800"
        active-class="active-link"
        exact-active-class="active-link"
      >
      |
        Edit Student Details
      </RouterLink>
    </div>

    <RouterView :student="student" :professer="professer"></RouterView>
  </div>
  </div>
</template>

<style scoped>
.active-link {
  color: red;
}
</style>
