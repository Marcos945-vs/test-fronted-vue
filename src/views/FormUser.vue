<script setup>
import { ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import FormUser from '@/components/form/FormUser.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const page = ref({ title: 'User Form' });
const breadcrumbs = ref([
    {
        text: 'Dashboard',
        disabled: false,
        href: '/'
    },
    {
        text: 'Users List',
        disabled: false,
        href: '/TableUsers'
    },
    {
        text: 'New User',
        disabled: true,
        href: '#'
    }
]);

</script>
<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="User">
                <v-col>
                   <FormUser />
                </v-col>
            </UiParentCard>
        </v-col>
    </v-row>
</template>
