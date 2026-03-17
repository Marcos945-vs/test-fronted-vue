<script setup lang="ts">
import { MailIcon , ArrowRightSquareIcon } from 'vue-tabler-icons';
import { profileDD } from '@/_mockApis/headerData';
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
</script>

<template>
    <!-- ---------------------------------------------- -->
    <!-- notifications DD -->
    <!-- ---------------------------------------------- -->
    <v-menu open-on-hover open-on-click class="Profile_popup">
        <template v-slot:activator="{ props }">
            <v-btn variant="text" class="custom-hover-primary" size="small" v-bind="props" icon>
                <v-avatar size="35">
                    <img src="@/assets/images/profile/user-1.jpg" width="35" alt="Julia" />
                </v-avatar>
            </v-btn>
        </template>
        <v-sheet rounded="md" width="360" elevation="10">
            <div class="px-8 pt-6">
                <h6 class="text-h5 font-weight-semibold">User Profile</h6>
                <div class="d-flex align-center mt-4 pb-6">
                    <v-avatar size="80">
                        <img src="@/assets/images/profile/user-1.jpg" width="80" />
                    </v-avatar>
                    <div class="ml-3">
                        <h6 class="text-h6">{{ authStore.user.firstName || 'Unknown' }}</h6>
                        <span class="text-subtitle-1 font-weight-regular textSecondary">Administrator</span>
                        <div class="d-flex align-center mt-1 textSecondary">
                            <MailIcon size="18" stroke-width="1" />
                            <span class="text-subtitle-1 font-weight-regular ms-2">info@flexy.com</span>
                        </div>
                    </div>
                </div>
                </div>
                <v-divider></v-divider>
                    <v-btn @click="authStore.logout()">
                        <ArrowRightSquareIcon stroke-width="1.5" size="22" />
                        Logout
                    </v-btn>
                </v-sheet>
            </v-menu>
                
</template>
