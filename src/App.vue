<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { ref, type PropType } from "vue";
import { useMessageStore } from "./stores/message";
import { storeToRefs } from "pinia";
import { useAuthStore } from "./stores/auth";
import { useRouter } from "vue-router";
import type { StudentItem } from "./type";

const store = useMessageStore();
const { flashMessage } = storeToRefs(store);
const authStore = useAuthStore();
const router = useRouter();

function logout() {
  authStore.logout();
  router.push({ name: "login" });
}

const token = localStorage.getItem("token");
const student = localStorage.getItem("student");
const advisor = localStorage.getItem("advisor");
if (token && student) {
  authStore.reloadStudent(token, JSON.parse(student));
} else if (token && advisor) {
  authStore.reloadStudent(token, JSON.parse(advisor));
} else {
  authStore.logout();
}

const props = defineProps({
  student: {
    type: Object as PropType<StudentItem>,
    require: true,
  },
});
</script>

<!-- <template>
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
      <ul v-if="!authStore.currentUserNameAdvisor && !authStore.currentUserNameStudent">
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
      <ul v-if="authStore.currentUserNameAdvisor">
        <div class="space-x-10 mr-20 font-mono">
          <RouterLink
            to="/adviserProfile"
            class="font-black transition-colors duration-300 hover:text-yellow-500 text-lg"
            active-class="active-link"
            exact-active-class="active-link"
            >{{authStore.currentUserNameAdvisor}}</RouterLink
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
      <ul v-if="authStore.currentUserNameStudent">
        <div class="space-x-10 mr-20 font-mono">
          <RouterLink
            to="/"
            class="font-black transition-colors duration-300 hover:text-yellow-500 text-lg"
            active-class="active-link"
            exact-active-class="active-link"
            >{{ authStore.currentUserNameStudent}}</RouterLink
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
          <span v-if="authStore.isAdmin">
            <RouterLink
            to="/registerAdvisor"
            class="text-red-700 transition-colors duration-300 hover:text-yellow-500 text-lg font-extrabold"
            active-class="active-link"
            exact-active-class="active-link"
            >Add Adviser</RouterLink
          >
          </span>
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
</template> -->

<template>
  <header>
    <nav
      class="navbar-bg h-20 border-b-2 border-black flex justify-between items-center text-white font-mono"
    >
      <div>
        <p class="text-white text-left text-4xl ml-10">Wait We Have Project?</p>
      </div>
      <!-- For user un-login page -->
      <ul
        v-if="
          !authStore.currentUserNameAdvisor && !authStore.currentUserNameStudent
        "
      >
        <div class="space-x-5 mr-10">
          <RouterLink
            to="/Login"
            class="text-black transition-colors duration-300 hover:text-black text-xl underline underline-offset-1"
            active-class="active-link"
            exact-active-class="active-link"
            >Login</RouterLink
          >
        </div>
      </ul>
      <!-- for Student -->
      <ul v-if="authStore.isStudent">
        <div class="flex space-x-5 mr-10 ">
          <p
            class="text-black transition-colors duration-300 hover:text-black text-xl font-bold"
          >
            {{ authStore.currentUserNameStudent }}
          </p>
          <RouterLink
            to="/Login"
            class="text-black transition-colors duration-300 hover:text-black text-xl underline underline-offset-1"
            active-class="active-link"
            exact-active-class="active-link"
            @click="logout"
            >Logout</RouterLink
          >
        </div>
      </ul>
      <!-- for Advisor or Admin(advisor)-->
      <ul v-if="authStore.isAdvisor">
        <div class="flex space-x-5 mr-10">
          <p
            class="text-black transition-colors duration-300 hover:text-black text-xl font-bold"
          >
            {{ authStore.currentUserNameAdvisor }}
          </p>
          <RouterLink
            to="/Login"
            class="text-black transition-colors duration-300 hover:text-black text-xl underline underline-offset-1"
            active-class="active-link"
            exact-active-class="active-link"
            @click="logout"
            >Logout</RouterLink
          >
        </div>
      </ul>
      <!-- for Admin -->
      <ul v-if="authStore.isAdmin">
        <div class="flex space-x-5 mr-10">
          <p
            class="text-black transition-colors duration-300 hover:text-black text-xl font-bold"
          >
            {{ authStore.currentUserNameAdvisor }}
          </p>
          <RouterLink
            to="/Login"
            class="text-black transition-colors duration-300 hover:text-black text-xl underline underline-offset-1"
            active-class="active-link"
            exact-active-class="active-link"
            @click="logout"
            >Logout</RouterLink
          >
          </div>
      </ul>
    </nav>
  </header>
  <div>
    <RouterView />
  </div>
</template>

<style scoped>
.active-link {
  color: rgb(0, 0, 0);
}
.navbar-bg {
  background: rgb(0, 0, 0);
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(245, 245, 245, 1) 59%,
    rgba(255, 255, 255, 1) 100%
  );
}
</style>
