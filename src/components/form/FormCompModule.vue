<script setup>
import { ref } from 'vue';
import axios from 'axios';

import { useRouter } from 'vue-router' 
import { statusModule, urlModule } from '@/enum/enum.js'

const router = useRouter()

const name = ref('')
const project_id = ref('')
const domain = ref('')
const status = ref('')

const handleSubmit = async () => {
     try { 
        const response = await axios.post(urlModule, 
        { 
            name: name.value,
            project_id: project_id.value, 
            domain: domain.value,
            status: status.value, 
        }) 
        console.log('Modulo creado:', response.data) 
        router.push('/FormProject')
    } catch (error) 
    { 
        console.error('Error al crear modulo:', error.response?.data || error.message) 
    } 
}

</script>

<template>
    <v-row >
    <v-col cols="12">
            <v-label class="font-weight-medium mb-2">Name</v-label>
            <VTextField  
            type="text" 
            placeholder="Jane Doe" 
            hide-details 
            v-model="name"
            ></VTextField>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-medium mb-2">Proyect ID</v-label>
            <VTextField  
            type="text" 
            placeholder="123456" 
            hide-details 
            v-model="project_id"
            ></VTextField>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-medium mb-2">Domain</v-label>
            <VTextField  
            type="text" 
            placeholder="123456" 
            hide-details 
            v-model="domain"
            ></VTextField>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-medium mb-2">Status</v-label>
                <v-select
                :items="statusModule"
                v-model="status"
                label="Select Status"
                hide-details
            />
        </v-col>
        <v-col cols="2">
            <v-btn @click="handleSubmit" color="primary" flat>Create Module</v-btn>
        </v-col>
        <v-col cols="1">
            <v-btn @click="router.push('/FormProject')" color="primary" flat>Cancel</v-btn>
        </v-col>
    </v-row>
</template>
