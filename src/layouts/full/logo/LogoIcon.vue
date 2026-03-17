<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Logoicn from '@/assets/images/logos/Logoicon.svg';
</script>
<template>
    <div class="logo">
        <RouterLink to="/">
            <img :src="Logoicn" alt="home" />
        </RouterLink>
    </div>
</template>
