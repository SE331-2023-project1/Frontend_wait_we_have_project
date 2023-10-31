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
  <div v-if="student" class="font-mono grid grid-cols-2">
    <p class="font-semibold text-left">Announcement List</p>
    <div class="text-center">
      <ul>
        <li
          v-for="(announce, index) in student.advisor.announcements"
          :key="index"
        >
          <a :href="announce" target="_blank">announcement {{ index + 1 }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
