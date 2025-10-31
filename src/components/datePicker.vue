<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const props = defineProps({
  modelValue: String, // Prop do v-model
  label: String,
  placeholder: String,
  disabled: Boolean
})

// Criar emits para v-model
const emit = defineEmits(['update:modelValue'])

// Função para emitir valor atualizado
function updateValue(value: string) {
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <div class="date-wrapper">
      <Datepicker
        :model-value="modelValue"       
        @update:model-value="updateValue"
        :disabled="disabled"
        :placeholder="placeholder"
        :input-class="'form-input'"
        :calendar-button="true"
        :calendar-button-icon="'mdi mdi-calendar'"
        teleport-center
      />
    </div>
  </div>
</template>

<style scoped>

.date-wrapper {
  position: relative;
}

.form-input {
  width: 100%;
  padding-right: 40px; /* espaço para o ícone */
  border-radius: 8px;
  font-size: 1rem;
  padding: 10px 12px;
  box-sizing: border-box;
}

/* Altera a cor do ícone do calendário */
.vue-datepicker__calendar-button {
  color: #22c55e !important;
}
</style>