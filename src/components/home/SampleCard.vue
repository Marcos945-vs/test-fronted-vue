<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()

interface CardItem {
  title: string;
  subtitle: string;
  description: string;
  number: number;
  color: string;
  actionLabel: string;
  to: string;
}

const props = defineProps<{
  items: CardItem[];
}>();

const emit = defineEmits<{
  (e: "action", item: CardItem): void;
}>();


</script>

<template>
  <v-row>
    <v-col
      cols="12"
      lg="4"
      v-for="(item, i) in props.items"
      :key="i"
    >
      <v-card elevation="10" class="overflow-hidden">
        <v-card-item :class="'py-4 px-6 text-white bg-' + item.color">
          <h4 class="text-h6">{{ item.title }}</h4>
        </v-card-item>
        <v-card-text class="pa-6">
          <h5 class="text-h6 title">{{ item.subtitle }}:</h5>
          <p class="text-subtitle-1 textSecondary mt-3">
            {{ item.description }}
          </p>
          <h5 class="text-h6 title mt-2">{{ item.number }}</h5>
          <v-btn
            variant="flat"
            class="mt-4 text-white"
            :color="item.color"
            @click="router.push(item.to)"
          >
            {{ item.actionLabel }}
          </v-btn>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
