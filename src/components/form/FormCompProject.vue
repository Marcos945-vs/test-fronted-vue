<script setup >
import { ref } from 'vue';
import axios from 'axios';

import SelectStatus from './Select-elements/select/SelectStatus.vue'
import { useRouter } from 'vue-router' 

const router = useRouter()

const name = ref('')
const client_name = ref('')
const status = ref('')
const created_by = ref('')

// ✅ Reglas de validación
const requiredRule = (v) => !!v || 'Este campo es obligatorio'
const minLengthRule = (min) => (v) =>
  (v && v.length >= min) || `Debe tener al menos ${min} caracteres`
const onlyLettersRule = (v) =>
  /^[A-Za-z\s]+$/.test(v) || 'Solo se permiten letras'

const formRef = ref(null)

const handleSubmit = async () => {
    const isValid = formRef.value?.validate()
  if (!isValid) {
    console.log('Formulario inválido')
    } else {
    /* try { 
        const response = await axios.post('http://localhost:3000/api/projects', 
        { 
            name: name.value, 
            client_name: client_name.value, 
            status: status.value, 
            created_by: created_by.value 
        }) 
        console.log('Proyecto creado:', response.data) 
        router.back()
    } catch (error) 
    { 
        console.error('Error al crear proyecto:', error.response?.data || error.message) 
    } */ 
   console.log('Proyecto creado')
   router.back()
  }
}

</script>

<template>
    <v-form ref="formRef">
    <v-row >
        <v-col cols="12">
            <v-label class="font-weight-medium mb-2">Name</v-label>
            <VTextField  
            type="text" 
            placeholder="John Deo" 
            hide-details 
            v-model="name"
            :rules="[requiredRule, minLengthRule(3)]"
            ></VTextField>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-medium mb-2">Client Name</v-label>
            <VTextField  
            type="text" 
            placeholder="Jane Deo" 
            hide-details
            v-model="client_name"
            :rules="[requiredRule, onlyLettersRule]"
            ></VTextField>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-medium mb-2">Status</v-label>
            <SelectStatus v-model="status" :rules="[requiredRule]" />
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-medium mb-2">Created by</v-label>
            <VTextField  
            type="text" 
            placeholder="Jane Deo" 
            hide-details
            v-model="created_by"
            :rules="[requiredRule]" 
            ></VTextField>
        </v-col>
        <v-card-actions>
            <v-btn @click="handleSubmit" color="primary" flat>Create Project</v-btn>
            <v-btn @click="$router.back()">Back</v-btn>
        </v-card-actions>
    
    </v-row>
    </v-form>
</template>
