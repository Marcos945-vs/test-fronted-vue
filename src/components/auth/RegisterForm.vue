<script setup lang="ts">
import { ref } from 'vue';
import Logo from '@/layouts/full/logo/Logo.vue';
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAuditEventsStore } from '@/stores/auditEvents';

const auditStore = useAuditEventsStore()
const router = useRouter()
const form = ref<any>(null)
const valid = ref(true);
const show1 = ref(false);
const password = ref('');
const email = ref('');
const passwordRules = ref([
    (v: string) => !!v || 'Password is required',
    (v: string) => (v && v.length <= 10) || 'Password must be less than 10 characters'
]);
const emailRules = ref([(v: string) => !!v || 'E-mail is required', (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid']);
const fname = ref('');
const fnameRules = ref([
    (v: string) => !!v || 'Name is required',
    (v: string) => (v && v.length <= 10) || 'Name must be less than 10 characters'
]);

const submitForm = async () => {
 /*  if (form.value?.validate()) {
    try {
      const response = await axios.post('/api/register', {
        name: fname.value,
        email: email.value,
        password: password.value,
      })

      console.log('Respuesta del servidor:', response.data)
      router.push('/pages/boxedlogin')
    } catch (error) {
      console.error('Error al registrar:', error)
    }
  } */
  auditStore.addEvent('New user: ${fname}', 'medium')
  router.push('/auth/login')
}

</script>
<template>
    <v-form ref="form" v-model="valid" lazy-validation action="/pages/boxedlogin" class="mt-5">
        <v-label class="text-subtitle-1 font-weight-medium pb-2">Name</v-label>
        <VTextField v-model="fname" :rules="fnameRules" required ></VTextField>
        <v-label class="text-subtitle-1 font-weight-medium pb-2">Email Adddress</v-label>
        <VTextField v-model="email" :rules="emailRules" required ></VTextField>
        <v-label class="text-subtitle-1 font-weight-medium pb-2">Password</v-label>
        <VTextField
            v-model="password"
            :counter="10"
            :rules="passwordRules"
            required
            variant="outlined"
            type="password"
            color="primary"
        ></VTextField>
        <v-btn  size="large" class="mt-2" color="primary" block @click="submitForm" flat>Sign Up</v-btn>
    </v-form>
</template>
