<script setup>
import SampleCard from './SampleCard.vue'
import UpcommingActivityCard from './UpcommingActivityCard.vue';
import { cardsSam } from './card';

</script>

<template>
  <div class="dashboard">
    <!-- Resumen numérico -->
      <SampleCard :items="cardsSam"/>
    <!-- Indicadores rápidos -->
    <div class="mt-6">
      <upcomming-activity-card />
    </div>
  </div>
</template>

<style scoped>

</style>
