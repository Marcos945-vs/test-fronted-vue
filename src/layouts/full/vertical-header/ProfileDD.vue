<script setup lang="ts">
import { MailIcon , ArrowRightSquareIcon, UserIcon } from 'vue-tabler-icons';
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
                    <v-icon size="38" color="#00000" icon="mdi-account"></v-icon>
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
                        <h6 class="text-h6">{{ authStore.user.user.name || 'Unknown' }}</h6>
                        <span class="text-subtitle-1 font-weight-regular textSecondary">{{ authStore.user.user.roles[0].name || 'Unknown' }}</span>
                        <div class="d-flex align-center mt-1 textSecondary">
                            <MailIcon size="18" stroke-width="1" />
                            <span class="text-subtitle-1 font-weight-regular ms-2">{{ authStore.user.user.email || 'Unknown' }}</span>
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
