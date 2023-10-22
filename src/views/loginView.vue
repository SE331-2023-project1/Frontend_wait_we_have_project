<script setup lang="ts">
import InputText from "@/components/InputText.vue";
import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

import { useMessageStore } from '@/stores/message'

const messageStore = useMessageStore()
const router = useRouter();

const authStore = useAuthStore();

const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});
const { errors, handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    username: "",
    password: "",
  },
});

const { value: username } = useField<string>("username");
const { value: password } = useField<string>("password");


const onSubmit = handleSubmit((value) => {
  authStore
    .login(value.username, value.password)
    .then(() => {
      router.push({ name: "students" });
      messageStore.updateflashcard('Log-in Success')
      setTimeout(() => {
        messageStore.resetflashcard()
      },3000)
    })
    .catch(() => {
      // messageStore.updateflashcard('Could not login')
      messageStore.updateflashcard('Could not login')
      console.log("Could not login")
      setTimeout(() => {
        messageStore.resetflashcard()
      },3000)
    });
});
</script>

<template>
  <div class="flex justify-center my-20">
    <div class="border-black-50 border-2 w-2/5">
      <div class="flex flex-col justify-center my-10">
        <div class="font-mono text-red-700">
          <h2 class="font-bold text-3xl text-center">Sign in to your account</h2>
        </div>
        <div class="sm:mx-auto sm:w-full sm:max-w-sm font-mono mt-10">
          <form @submit.prevent="onSubmit">
            <div class="my-2">
              <label for="username" class="block text-sm font-bold leading-6 text-gray-900 ">Username</label>
              <InputText type="text" v-model="username" :error="errors['username']"></InputText>
            </div>
            <div class="my-2">
              <div>
                <label for="password" class="block text-sm font-bold leading-6 text-gray-900 ">Password</label>
                <InputText type="password" v-model="password" :error="errors['password']"></InputText>
              </div>
            </div>
            <div class="flex justify-center mt-8">
              <button type="submit"
                class="font-mono text-center bg-red-700 p-2 text-white font-bold rounded-xl w-24">Sign-In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
  
