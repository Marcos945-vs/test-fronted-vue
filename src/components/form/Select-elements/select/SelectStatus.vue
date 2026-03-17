<script setup lang="ts">
import { ref } from "vue";
import { statusProject } from '@/enum/enum.js'


const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

</script>

<template>
  <v-select
    :items="statusProject"
    :model-value="props.modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
    label="Select Status"
    hide-details
  />
</template>


  