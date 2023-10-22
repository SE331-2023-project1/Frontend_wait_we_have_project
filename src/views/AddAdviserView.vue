<script setup lang="ts">
import { useRouter } from "vue-router";
import { useMessageStore } from "@/stores/message";
import { useAuthStore } from "@/stores/auth";
import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import InputText from "@/components/InputText.vue";

const router = useRouter();
const authStore = useAuthStore();
const messageStore = useMessageStore();

const validationSchema = yup.object({
  advisorID: yup.string().required("ID is required"),
  name: yup.string().required("Name is required"),
  surname: yup.string().required("Lastname is required"),
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required")
});
const { errors, handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    advisorID: "",
    name: "",
    surname: "",
    username: "",
    password: ""
  }
});

const { value: advisorID } = useField<string>("advisorID");
const { value: name } = useField<string>("name");
const { value: surname } = useField<string>("surname");
const { value: username } = useField<string>("username");
const { value: password } = useField<string>("password");

const OnSubmit = handleSubmit((values) => {
  console.log(values);
  authStore
    .registerAdvisor(
      values.advisorID,
      values.name,
      values.surname,
      values.username,
      values.password
    ).then(() => {
      console.log("Register Success");
      router.push({ name: "" });
    })
    .catch((err) => {
      messageStore.updateflashcard("Success");
      router.push({ name: "" });
      console.log(err);
      setTimeout(() => {
        messageStore.resetflashcard();
      }, 3000);
    });
});
</script>

<template>
  <div class="flex justify-center my-20">
    <div class="border-black-50 border-2 w-2/5">
      <div class="flex flex-col justify-center my-10">
        <div class="font-mono text-red-700">
          <h2 class="font-bold text-3xl text-center">
            Add advisor to Website
          </h2>
        </div>
        <div class="sm:mx-auto sm:w-full sm:max-w-sm font-mono mt-10">
          <form @submit.prevent="OnSubmit">
            <div class="my-2">
              <label for="advisorID" class="block text-sm font-bold leading-6 text-gray-900">Advisor-ID</label>
              <InputText type="text" v-model="advisorID" :error="errors['advisorID']"></InputText>
            </div>
            <div class="my-2">
              <label for="name" class="block text-sm font-bold leading-6 text-gray-900">Firstname</label>
              <InputText type="text" v-model="name" :error="errors['name']"></InputText>
            </div>
            <div class="my-2">
              <label for="surname" class="block text-sm font-bold leading-6 text-gray-900">Lastname</label>
              <InputText type="text" v-model="surname" :error="errors['surname']"></InputText>
            </div>
            <div class="my-2">
              <label for="username" class="block text-sm font-bold leading-6 text-gray-900">Username</label>
              <InputText type="username" v-model="username" :error="errors['username']"></InputText>
            </div>
            <div class="my-2">
              <label for="password" class="block text-sm font-bold leading-6 text-gray-900">Password</label>
              <InputText type="password" v-model="password" :error="errors['password']"></InputText>
            </div>
            
            <div class="flex justify-center mt-8">
              <button type="submit" class="font-mono text-center bg-red-700 p-2 text-white font-bold rounded-xl w-24">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>