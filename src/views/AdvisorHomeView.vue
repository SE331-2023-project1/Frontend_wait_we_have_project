<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Welcome, {{ currentUser }}</h1>
    <div v-if="advisorProfile">
      <h2 class="text-xl font-semibold mb-2">Advisor Profile</h2>
      <img
        v-for="image in advisorProfile?.image"
        :key="image"
        :src="image"
        alt="Advisor image"
        class="border-2 border-black h-48 w-42 object-cover mb-4"
      />
      <p class="text-lg font-semibold">Name: {{ advisorProfile?.name }}</p>
      <p class="text-lg font-semibold">
        Surname: {{ advisorProfile?.surname }}
      </p>
    </div>
    <h3 class="text-xl font-semibold mt-6 mb-2">Students:</h3>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <router-link
        v-for="student in advisorProfile?.studentList"
        :key="student.id"
        :to="{ name: 'studentOwn', params: { id: student.id } }"
        class="text-center cursor-pointer"
      >
        <div class="p-4 border border-gray-200 rounded shadow-md">
          <p class="text-lg font-semibold">
            {{ student.name }} {{ student.surname }}
          </p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import { onMounted } from "vue";

const authStore = useAuthStore();

const currentUser = authStore.currentUserName;
const advisorProfile = authStore.advisor;
console.log("data" + advisorProfile?.id);

onMounted(async () => {
  try {
    await authStore.fetchUserProfile();
    console.log("Advisor Profile Data:", advisorProfile);
  } catch (error) {
    console.error("Error fetching advisor profile:", error);
  }
});
</script>
