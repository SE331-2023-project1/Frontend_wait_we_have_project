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
    studentID: yup.string().required("Username is required."),
    password: yup.string().required("Password is required."),
    firstname: yup.string().required("Firstname is required."),
    lastname: yup.string().required("Lastname is required.")
});
const { errors, handleSubmit } = useForm({
    validationSchema,
    initialValues: {
        studentID: "",
        password: "",
        firstname: "",
        lastname: "",
    },
});

const { value: studentID } = useField<string>("studentID");
const { value: password } = useField<string>("password");
const { value: firstname } = useField<string>("firstname");
const { value: lastname } = useField<string>("lastname");

const OnSubmit = handleSubmit((values) => {
    console.log(values);
    authStore
        .registerStudent(
            values.studentID,
            values.password,
            values.firstname,
            values.lastname
        )
        .then(() => {
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
                        Sign Up to Website 
                    </h2>
                </div>
                <div class="sm:mx-auto sm:w-full sm:max-w-sm font-mono mt-10">
                    <form @submit.prevent="OnSubmit">
                        <div class="my-2">
                            <label for="studentID" class="block text-sm font-bold leading-6 text-gray-900">Username</label>
                            <InputText type="text" v-model="studentID" :error="errors['studentID']"></InputText>
                        </div>
                        <div class="my-2">
                            <label for="password" class="block text-sm font-bold leading-6 text-gray-900">Password</label>
                            <InputText type="password" v-model="password" :error="errors['password']"></InputText>
                        </div>
                        <div class="my-2">
                            <label for="firstname" class="block text-sm font-bold leading-6 text-gray-900">Firstname</label>
                            <InputText type="text" v-model="firstname" :error="errors['firstname']"></InputText>
                        </div>
                        <div class="my-2">
                            <label for="lastname" class="block text-sm font-bold leading-6 text-gray-900">Lastname</label>
                            <InputText type="text" v-model="lastname" :error="errors['lastname']"></InputText>
                        </div>
                        <div class="flex justify-center mt-8">
                            <button type="submit"
                                class="font-mono text-center bg-red-700 p-2 text-white font-bold rounded-xl w-24">
                                Sign-Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
