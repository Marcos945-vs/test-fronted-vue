<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Module fields
const objective = ref('')
const inputs = ref([])
const dataStructure = ref('')
const logicRules = ref('')
const outputs = ref([])
const responsibility = ref('')
const failureScenarios = ref('')
const auditTrailRequirements = ref('')
const dependencies = ref([])
const versionNote = ref('')

// Validation rules
const requiredRule = (v) => !!v || 'This field is required'
const minLengthRule = (min) => (v) =>
  (v && v.length >= min) || `Must have at least ${min} characters`

const formRef = ref(null)

// Module validation rule
const canValidate = () => {
  return (
    objective.value.trim() !== '' &&
    inputs.value.length > 0 &&
    outputs.value.length > 0 &&
    responsibility.value.trim() !== ''
  )
}

const handleSubmit = () => {
  const isValid = formRef.value?.validate()
  if (!isValid) {
    console.log('Invalid form')
    return
  }
  if (!canValidate()) {
    console.log('Module does not meet validation rules')
    return
  }
  console.log('Module created and validated')
  router.back()
}
</script>

<template>
  <v-form ref="formRef">
    <v-row>
      <v-col cols="12">
        <v-label class="font-weight-medium mb-2">Objective</v-label>
        <VTextField
          v-model="objective"
          placeholder="Enter module objective"
          :rules="[requiredRule, minLengthRule(5)]"
          hide-details="auto"
        />
      </v-col>

      <v-col cols="12">
        <v-label class="font-weight-medium mb-2">Inputs</v-label>
        <VTextField
          v-model="inputs"
          placeholder='Example: input1, input2'
          :rules="[requiredRule]"
          hide-details="auto"
        />
      </v-col>

      <v-col cols="12">
        <v-label class="font-weight-medium mb-2">Data Structure</v-label>
        <VTextField
          v-model="dataStructure"
          placeholder="Describe data structure or JSON"
          hide-details="auto"
        />
      </v-col>

      <v-col cols="12">
        <v-label class="font-weight-medium mb-2">Logic Rules</v-label>
        <VTextField
          v-model="logicRules"
          placeholder="Enter business logic rules"
          hide-details="auto"
        />
      </v-col>

      <v-col cols="12">
        <v-label class="font-weight-medium mb-2">Outputs</v-label>
        <VTextField
          v-model="outputs"
          placeholder='Example: output1, output2'
          :rules="[requiredRule]"
          hide-details="auto"
        />
      </v-col>

      <v-col cols="12">
        <v-label class="font-weight-medium mb-2">Responsibility</v-label>
        <VTextField
          v-model="responsibility"
          placeholder="Enter responsible team or owner"
          :rules="[requiredRule]"
          hide-details="auto"
        />
      </v-col>

      <v-col cols="12">
        <v-label class="font-weight-medium mb-2">Failure Scenarios</v-label>
        <VTextField
          v-model="failureScenarios"
          placeholder="Possible failure scenarios"
          hide-details="auto"
        />
      </v-col>

      <v-col cols="12">
        <v-label class="font-weight-medium mb-2">Audit Trail Requirements</v-label>
        <VTextField
          v-model="auditTrailRequirements"
          placeholder="Audit trail requirements"
          hide-details="auto"
        />
      </v-col>

      <v-col cols="12">
        <v-label class="font-weight-medium mb-2">Dependencies</v-label>
        <VTextField
          v-model="dependencies"
          placeholder='Example: moduleA, moduleB'
          hide-details="auto"
        />
      </v-col>

      <v-col cols="12">
        <v-label class="font-weight-medium mb-2">Version Note</v-label>
        <VTextField
          v-model="versionNote"
          placeholder="Enter version note"
          hide-details="auto"
        />
      </v-col>

      <v-card-actions>
        <v-btn
          @click="handleSubmit"
          color="primary"
          flat
          :disabled="!canValidate()"
        >
          Validate Module
        </v-btn>
        <v-btn @click="$router.back()">Back</v-btn>
      </v-card-actions>
    </v-row>
  </v-form>
</template>
