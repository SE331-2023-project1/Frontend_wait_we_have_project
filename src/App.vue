<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { ref } from "vue";
import { useMessageStore } from "./stores/message";
import { storeToRefs } from "pinia";
import { useAuthStore } from "./stores/auth";
import { useRouter } from "vue-router";

const store = useMessageStore();
const { flashMessage } = storeToRefs(store);
const authStore = useAuthStore();
const router = useRouter();

function logout() {
  authStore.logout();
  router.push({ name: "login" });
}

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
if (token && user) {
  authStore.reloadStudent(token, JSON.parse(user));
  authStore.reloadAdvisor(token, JSON.parse(user));
} else {
  authStore.logout();
}
</script>

<template>
  <header>
    <nav
      class="flex justify-between items-center text-white font-mono mb-2 bg-red-800"
    >
      <div class="flex items-center font-mono">
        <img
          alt="Vue logo"
          src="https://logolook.net/wp-content/uploads/2021/11/Hogwarts-Logo.png"
          class="mt-5 mb-5 ml-20 h-16 w-70"
        />
        <p class="font-bold font-mono text-xl">HOGWARTS MAGIC AWAKENED</p>
      </div>
      <ul v-if="!authStore.currentUserName">
        <div class="space-x-10 mr-20 font-mono">
          <RouterLink
            to="/registerStudent"
            class="font-black transition-colors duration-300 hover:text-yellow-500 text-lg"
            active-class="active-link"
            exact-active-class="active-link"
            >Sign-Up</RouterLink
          >
          <RouterLink
            to="/Login"
            class="font-black transition-colors duration-300 hover:text-yellow-500 text-lg"
            active-class="active-link"
            exact-active-class="active-link"
            >Login</RouterLink
          >
        </div>
      </ul>
      <ul v-if="authStore.currentUserName">
        <div class="space-x-10 mr-20 font-mono">
          <RouterLink
            to="/userProfile"
            class="font-black transition-colors duration-300 hover:text-yellow-500 text-lg"
            active-class="active-link"
            exact-active-class="active-link"
            >{{ authStore.currentUserName }}</RouterLink
          >
          <RouterLink
          to="/Login"
            class="font-black transition-colors duration-300 hover:text-yellow-500 text-lg"
            active-class="active-link"
            exact-active-class="active-link"
            @click="logout"
            >LogOut
          </RouterLink>
        </div>
      </ul>
    </nav>
    <header class="max-h-screen leading-normal">
      <nav class="sm:flex ml-10 mt-5">
        <div class="space-x-2 font-mono">
          <RouterLink
            to="/"
            class=" text-red-700 transition-colors duration-300 hover:text-yellow-500 text-lg font-extrabold"
            active-class="active-link"
            exact-active-class="active-link"
            >Student |</RouterLink
          >
          <RouterLink
            to="/advisors"
            class="text-red-700 transition-colors duration-300 hover:text-yellow-500 text-lg font-extrabold"
            active-class="active-link"
            exact-active-class="active-link"
            >Advisor |</RouterLink
          >
          <RouterLink
            to="/registerAdvisor"
            class="text-red-700 transition-colors duration-300 hover:text-yellow-500 text-lg font-extrabold"
            active-class="active-link"
            exact-active-class="active-link"
            >Add Adviser</RouterLink
          >
        </div>
      </nav>
    </header>
    <div
      class="transition bg-red-700 duration-3000 m-2 p-2"
      v-if="flashMessage"
    >
      <h4 class="text-center font-mono text-white">{{ flashMessage }}</h4>
    </div>
    <RouterView />
  </header>
</template>

<style scoped>
.active-link {
  color: rgb(255, 223, 63);
}
</style>
