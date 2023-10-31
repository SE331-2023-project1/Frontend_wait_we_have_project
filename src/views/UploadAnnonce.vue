<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <div class="mb-4">
      <label for="Name" class="block text-gray-700 font-bold mb-2">Name</label>
      <input
        type="text"
        v-model="currentAdviser.name"
        class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
      />
    </div>
    <h2 class="text-2xl font-bold mb-4">Upload Announcement File</h2>
    <UploadFile v-model="currentAdviser.announce" />
    <h1>{{ currentAdviser.announce }}</h1>
    <button
      type="submit"
      class="mt-4 bg-red-800 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
      @click="updateAdvisor"
    >
      Update
    </button>
  </div>
</template>

<script setup lang="ts">
import UploadFile from "@/components/UploadImage.vue";
</script>

<script lang="ts">
import { defineComponent } from "vue";
import { type AdviserItem } from "@/type";
import { type ResponseData } from "@/ResponseData";
import AdviserService from "@/services/AdviserService";

export default defineComponent({
  name: "student",
  data() {
    return {
      currentAdviser: {} as AdviserItem,
      message: "",
    };
  },
  methods: {
    getStudet(id: any) {
      AdviserService.getAdviserById(id)
        .then((response: ResponseData) => {
          this.currentAdviser = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    updateAdvisor() {
      let data = {
        id: this.currentAdviser.id,
        name: this.currentAdviser.name,
        surname: this.currentAdviser.surname,
        image: this.currentAdviser.image,
        department: this.currentAdviser.department,
        position: this.currentAdviser.position,
        announcements: this.currentAdviser.announcements,
      };
      AdviserService.updateAdvisorById(this.currentAdviser.id, data)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.message = "The Adviser Information was updated successfully!";
          setTimeout(() => {
            this.message = "";
          }, 3000);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getStudet(this.$route.params.id);
  },
});
</script>
