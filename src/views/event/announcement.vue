<script setup lang="ts">
import { type StudentItem } from "@/type";
import { type PropType } from "vue";

const props = defineProps({
  student: {
    type: Object as PropType<StudentItem>,
    require: true,
  },
});
</script>

<template>
  <div v-if="student" class="font-mono ">
    <div>
      <p class="font-semibold text-left text-xl mt-2">Announcement List By {{ student.advisor.name }}</p>
    </div>
    <div class="text-left ml-20">
      <ul class="my-2 ">
        <li
          v-for="(announce, index) in student.advisor.announcements"
          :key="index"
        >
          <a> - </a>
          <a :href="announce" target="_blank" class="underline">announcement {{ index + 1 }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
